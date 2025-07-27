import EventCreationForm from '@/components/event-creation-model';
import { EventCard, EventType } from '@/components/events-card';
import RegisterDrawerDialog from '@/components/register-drawer-dialog';
import ToggleFormModalButton from '@/components/toggle-form-modal-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import VolunteerLogTimeForm from '@/components/volunteer-logtime-form-model';
import AppLayout from '@/layouts/app-layout';
import useEventStore from '@/store/eventStore';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { CalendarDays, Info, Loader2, MapPin, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// Function to filter events based on organisation ID
const filterOrganisationEvents = (events: EventType[], organisationId: string) => {
    return events.filter((event) => {
        if (!('organisation_id' in event)) return true; // This line to be removed later when organisation_id is added to Event
        return event?.organisation_id === organisationId;
    });
};

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    console.log('within Dashboard Auth:', auth);
    const { events, fetchEvents, hasFetched, isLoading } = useEventStore();
    const isUserOrgAdmin = auth.user?.roles?.length === 2 && auth.user.roles[1] === 'organisation-admin';
    // const isUserVolunteer = auth.user?.roles?.length === 2 && auth.user.roles[1] === 'volunteer';
    const isUserVolunteer = auth.user.roles[0] === 'volunteer' || auth.user.roles[1] === 'volunteer';
    const organisationId: string = typeof auth.user?.organisationId === 'string' ? auth.user.organisationId : '';

    const filteredEvents = filterOrganisationEvents(events, organisationId || '');

    console.log('Events:', events);

    useEffect(() => {
        if (!hasFetched && auth?.token) {
            fetchEvents(auth.token);
        }
    }, [hasFetched, auth?.token, fetchEvents]);

    const allEvents = isUserOrgAdmin ? filteredEvents : events;

    // console.log(allEvents);
    // console.log("Auth", auth);

    const now = new Date();
    const defaultUpcomingEvent = allEvents
        .filter((event) => new Date(event.start_datetime) > now)
        .sort((a, b) => new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime())[0];
    const [selectedEvent, setSelectedEvent] = useState<EventType | null>(defaultUpcomingEvent || null);
    useEffect(() => {
        if (!selectedEvent && defaultUpcomingEvent) {
            setSelectedEvent(defaultUpcomingEvent);
        }
    }, [defaultUpcomingEvent, selectedEvent]);

    // Check if user has only the 'user' role with safety checks
    const shouldShowRegisterDialog = auth.user?.roles?.length === 1 && auth.user.roles[0] === 'user';
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {shouldShowRegisterDialog && <RegisterDrawerDialog />}

                {isLoading && (
                <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground py-4">
                    <Loader2 className="animate-spin h-4 w-4" />
                    Refreshing events...
                </div>
                )}
                {isUserVolunteer && (
                    <ToggleFormModalButton buttonLabel="Log in your Hours" buttonClassName="bg-[#C8A74B]" FormComponent={VolunteerLogTimeForm} />
                )}
                {/* If user is organisation admin, show create events button */}
                {/* Top right button, only if form is NOT shown */}
                {isUserOrgAdmin && (
                    <ToggleFormModalButton buttonLabel="Create New Event" buttonClassName="bg-[#C8A74B]" FormComponent={EventCreationForm} />
                )}

                <div className="scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent flex gap-4 overflow-x-auto pb-4">
                    {allEvents.map((event) => (
                        <EventCard key={event.event_id} event={event} onClick={setSelectedEvent} />
                    ))}
                </div>

                <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed bg-card p-4 text-card-foreground text-muted-foreground shadow-sm md:flex-row md:items-start md:justify-start">
                    {selectedEvent ? (
                        <div className="flex w-full flex-col items-center gap-4 text-center md:flex-row md:items-start md:gap-8 md:text-left">
                            <div className="flex size-24 flex-shrink-0 items-center justify-center rounded-lg bg-primary p-4 text-primary-foreground md:size-32">
                                <CalendarDays className="size-12 md:size-16" />
                            </div>
                            <div className="flex-1">
                                <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">{selectedEvent.event_title}</h2>
                                <p className="mb-4 line-clamp-3 text-base text-muted-foreground md:text-lg">{selectedEvent.event_description}</p>
                                <div className="mb-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 md:text-base">
                                    <div className="flex items-center justify-center gap-2 md:justify-start">
                                        <CalendarDays className="size-4 text-muted-foreground" />
                                        <span>
                                            {new Date(selectedEvent.start_datetime).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 md:justify-start">
                                        <Info className="size-4 text-muted-foreground" />
                                        <span>
                                            {new Date(selectedEvent.start_datetime).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                            {' - '}
                                            {new Date(selectedEvent.end_datetime).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 md:justify-start">
                                        <span>{selectedEvent.is_virtual ? 'Virtual Event' : selectedEvent.location}</span>
                                        <MapPin className="size-4 text-muted-foreground" />
                                    </div>
                                    <Users className="size-4 text-muted-foreground" />
                                    <div className="flex items-center justify-center gap-2 md:justify-start">
                                        <span>
                                            {selectedEvent.current_volunteers}
                                            {selectedEvent.max_volunteers ? ` / ${selectedEvent.max_volunteers}` : ''} volunteers
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-4 flex flex-wrap justify-center gap-2 md:justify-start">
                                    {selectedEvent.is_urgent && <Badge variant="destructive">Urgent</Badge>}
                                    {selectedEvent.is_virtual && <Badge variant="secondary">Virtual</Badge>}
                                    {selectedEvent.is_group_friendly && <Badge variant="secondary">Group Friendly</Badge>}
                                    {selectedEvent.required_skills?.map((skill) => (
                                        <Badge key={skill} variant="outline">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex justify-center md:justify-start">
                                    {isUserVolunteer && <Button
                                        className="rounded-full bg-[#C8A74B] hover:cursor-pointer"
                                        onClick={() => alert(`Joining event: ${selectedEvent.event_title}`)}
                                        variant="default"
                                        size="lg"
                                        disabled={selectedEvent.current_volunteers >= (selectedEvent.max_volunteers ?? Infinity)}
                                    >
                                        {selectedEvent.current_volunteers >= (selectedEvent.max_volunteers ?? Infinity) ? 'Event Full' : 'Join Event'}
                                    </Button>}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <h2 className="mb-2 text-2xl font-semibold">No Upcoming Events</h2>
                            <p className="text-lg">
                                There are no upcoming events at the moment. Click on an event above to see its details, or register for a new event to
                                get started!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
