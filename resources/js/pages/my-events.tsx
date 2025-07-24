import { EventCard, EventType } from '@/components/events-card';
import { Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import EventCreationForm from '@/components/event-creation-model';
import AppLayout from '@/layouts/app-layout';
import useEventStore from '@/store/eventStore';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { CalendarDays, Info, MapPin, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import VolunteerLogTimeForm from '@/components/volunteer-logtime-form-model';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Events',
        href: '/my-events',
    },
];

// Dummy data fetching function (synchronous)
// function getEvents(): EventType[] {

//   // return [
//   //   {
//   //     event_id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
//   //     organization_id: "org123",
//   //     event_title: "Community Garden Cleanup",
//   //     event_description: "Help us beautify the local community garden by weeding, planting, and general tidying.",
//   //     startDatetime: "2025-08-10T09:00:00Z",
//   //     endDatetime: "2025-08-10T13:00:00Z",
//   //     location: "Central Park Community Garden",
//   //     event_address: "123 Garden Lane, Cityville",
//   //     isVirtual: false,
//   //     maxVolunteers: 20,
//   //     currentVolunteers: 12,
//   //     isUrgent: false,
//   //     recurrence_pattern: null,
//   //     category_id: 1,
//   //     event_status_id: 1,
//   //     is_high_risk: false,
//   //     isGroupFriendly: true,
//   //     requiredSkills: ["Gardening", "Teamwork"],
//   //     created_at: "2025-07-01T10:00:00Z",
//   //     updated_at: "2025-07-05T11:00:00Z",
//   //   },
//   //   {
//   //     event_id: "b2c3d4e5-f6a7-7890-1234-567890abcdef0",
//   //     organization_id: "org124",
//   //     event_title: "Online Tutoring Session",
//   //     event_description: "Provide academic support to students in various subjects via video call.",
//   //     startDatetime: "2025-08-15T14:00:00Z",
//   //     endDatetime: "2025-08-15T16:00:00Z",
//   //     location: "Online",
//   //     event_address: null,
//   //     isVirtual: true,
//   //     maxVolunteers: 10,
//   //     currentVolunteers: 8,
//   //     isUrgent: true,
//   //     recurrence_pattern: "Weekly",
//   //     category_id: 2,
//   //     event_status_id: 1,
//   //     is_high_risk: false,
//   //     isGroupFriendly: false,
//   //     requiredSkills: ["Teaching", "Communication"],
//   //     created_at: "2025-07-02T12:00:00Z",
//   //     updated_at: "2025-07-06T13:00:00Z",
//   //   },
//   //   {
//   //     event_id: "c3d4e5f6-a7b8-9012-3456-7890abcdef01",
//   //     organization_id: "org125",
//   //     event_title: "Food Bank Distribution",
//   //     event_description: "Assist with sorting and distributing food items to families in need.",
//   //     startDatetime: "2025-08-20T10:00:00Z",
//   //     endDatetime: "2025-08-20T15:00:00Z",
//   //     location: "Downtown Food Bank",
//   //     event_address: "456 Main Street, Townsville",
//   //     isVirtual: false,
//   //     maxVolunteers: 30,
//   //     currentVolunteers: 25,
//   //     isUrgent: false,
//   //     recurrence_pattern: null,
//   //     category_id: 3,
//   //     event_status_id: 1,
//   //     is_high_risk: false,
//   //     isGroupFriendly: true,
//   //     requiredSkills: ["Lifting", "Organization"],
//   //     created_at: "2025-07-03T09:00:00Z",
//   //     updated_at: "2025-07-07T10:00:00Z",
//   //   },
//   //   {
//   //     event_id: "d4e5f6a7-b8c9-0123-4567-890abcdef02",
//   //     organization_id: "org123",
//   //     event_title: "Park Beautification Day",
//   //     event_description: "Join us to clean up litter and plant new trees in Oakwood Park.",
//   //     startDatetime: "2025-08-25T08:30:00Z",
//   //     endDatetime: "2025-08-25T12:30:00Z",
//   //     location: "Oakwood Park",
//   //     event_address: "789 Park Ave, Villageton",
//   //     isVirtual: false,
//   //     maxVolunteers: 15,
//   //     currentVolunteers: 15,
//   //     isUrgent: true,
//   //     recurrence_pattern: null,
//   //     category_id: 1,
//   //     event_status_id: 1,
//   //     is_high_risk: false,
//   //     isGroupFriendly: true,
//   //     requiredSkills: ["Outdoor Work"],
//   //     created_at: "2025-07-04T14:00:00Z",
//   //     updated_at: "2025-07-08T15:00:00Z",
//   //   },
//   //   {
//   //     event_id: "e5f6a7b8-c9d0-1234-5678-90abcdef03",
//   //     organization_id: "org126",
//   //     event_title: "Senior Companion Calls",
//   //     event_description: "Make friendly phone calls to isolated seniors to provide companionship.",
//   //     startDatetime: "2025-08-28T11:00:00Z",
//   //     endDatetime: "2025-08-28T13:00:00Z",
//   //     location: "Remote",
//   //     event_address: null,
//   //     isVirtual: true,
//   //     maxVolunteers: 8,
//   //     currentVolunteers: 3,
//   //     isUrgent: false,
//   //     recurrence_pattern: "Bi-weekly",
//   //     category_id: 4,
//   //     event_status_id: 1,
//   //     is_high_risk: false,
//   //     isGroupFriendly: false,
//   //     requiredSkills: ["Communication", "Empathy"],
//   //     created_at: "2025-07-05T10:00:00Z",
//   //     updated_at: "2025-07-09T11:00:00Z",
//   //   },
//   // ];
// }

// Function to filter events based on organisation ID
const filterOrganisationEvents = (events: EventType[], organisationId: string) => {
    return events.filter((event) => {
        if (!('organisation_id' in event)) return true; // This line to be removed later when organisation_id is added to Event
        return event?.organisation_id === organisationId;
    });
};

export default function MyEvents() {
    const { auth } = usePage<SharedData>().props;
    console.log('Auth:', auth.user);
    const { events, fetchEvents, hasFetched } = useEventStore();
    const [showForm, setShowForm] = useState(false);

    const filteredEvents = filterOrganisationEvents(events, auth?.user?.organisationId || '');

    useEffect(() => {
        if (!hasFetched && auth?.token) {
            fetchEvents(auth.token);
        }
    }, [hasFetched, auth?.token, fetchEvents]);

    const allEvents = filteredEvents;

    console.log(allEvents);
    // console.log("Auth", auth);

    const now = new Date();
    const defaultUpcomingEvent = allEvents
        .filter((event) => new Date(event.startDatetime) > now)
        .sort((a, b) => new Date(a.startDatetime).getTime() - new Date(b.startDatetime).getTime())[0];
    const [selectedEvent, setSelectedEvent] = useState<EventType | null>(defaultUpcomingEvent || null);
    useEffect(() => {
        if (!selectedEvent && defaultUpcomingEvent) {
            setSelectedEvent(defaultUpcomingEvent);
        }
    }, [defaultUpcomingEvent, selectedEvent]);

    // Check if user has only the 'organisation-admin' role with safety checks
    const isUserOrgAdmin = auth.user?.roles?.length === 2 && auth.user.roles[1] === 'organisation-admin';
    // Check if user has only the 'volunteer' role with safety checks
    const isUserVolunteer = auth.user?.roles?.length === 2 && auth.user.roles[1] === 'volunteer';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                 {/* If user is volunteer, show log time form button */}
                 {/* Top right button, only if form is NOT shown */}
                 {!showForm && isUserVolunteer && (
                    <div className='flex justify-end'>
                        <Button 
                            variant="default"
                            className="bg-[#C8A74B]"
                            onClick={() => setShowForm(true)}
                        >
                            <Plus /> Log in your Hours
                        </Button>
                    </div>
                 )}
                 {/* Show form centered if visible */}
                 {showForm && isUserVolunteer && (
                    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
                        <div className="relative w-full max-w-lg mx-auto p-4">
                            <div className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-6">
                            {/* Make a close button */}
                            <button
                              onClick={() => setShowForm(false)}
                              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                              ✕
                            </button>
                    <VolunteerLogTimeForm
                        onClose={() => setShowForm(false)}
                        className='w-full'
                    />
                    </div>
                    </div>
                    </div>
                 )}
                {/* If user is organisation admin, show create events button */}
                 {/* Top right button, only if form is NOT shown */}
                 {!showForm && isUserOrgAdmin && (
                    <div className='flex justify-end'>
                        <Button 
                            variant="default"
                            className="bg-[#C8A74B]"
                            onClick={() => setShowForm(true)}
                        >
                            <Plus /> Create New Event
                        </Button>
                    </div>
                 )}
                 {/* Show form centered if visible */}
                 {showForm && isUserOrgAdmin && ( 
                    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
                        <div className="relative w-full max-w-lg mx-auto p-4">
                            <div className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-6">
                            {/* Make a close button */}
                            <button
                              onClick={() => setShowForm(false)}
                              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                              ✕
                            </button>
                    <EventCreationForm
                        onClose={() => setShowForm(false)}
                        className='w-full'
                    />
                    </div>
                    </div>
                    </div>
                 )}
                <div className="scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent flex gap-4 overflow-x-auto pb-4">
                    {allEvents.map((event) => (
                        <EventCard key={event.eventId} event={event} onClick={setSelectedEvent} />
                    ))}
                </div>

                <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed bg-card p-4 text-card-foreground text-muted-foreground shadow-sm md:flex-row md:items-start md:justify-start">
                    {selectedEvent ? (
                        <div className="flex w-full flex-col items-center gap-4 text-center md:flex-row md:items-start md:gap-8 md:text-left">
                            <div className="flex size-24 flex-shrink-0 items-center justify-center rounded-lg bg-primary p-4 text-primary-foreground md:size-32">
                                <CalendarDays className="size-12 md:size-16" />
                            </div>
                            <div className="flex-1">
                                <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">{selectedEvent.eventTitle}</h2>
                                <p className="mb-4 line-clamp-3 text-base text-muted-foreground md:text-lg">{selectedEvent.eventDescription}</p>
                                <div className="mb-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 md:text-base">
                                    <div className="flex items-center justify-center gap-2 md:justify-start">
                                        <CalendarDays className="size-4 text-muted-foreground" />
                                        <span>
                                            {new Date(selectedEvent.startDatetime).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 md:justify-start">
                                        <Info className="size-4 text-muted-foreground" />
                                        <span>
                                            {new Date(selectedEvent.startDatetime).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                            {' - '}
                                            {new Date(selectedEvent.endDatetime).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 md:justify-start">
                                        <span>{selectedEvent.isVirtual ? 'Virtual Event' : selectedEvent.location}</span>
                                        <MapPin className="size-4 text-muted-foreground" />
                                    </div>
                                    <Users className="size-4 text-muted-foreground" />
                                    <div className="flex items-center justify-center gap-2 md:justify-start">
                                        <span>
                                            {selectedEvent.currentVolunteers}
                                            {selectedEvent.maxVolunteers ? ` / ${selectedEvent.maxVolunteers}` : ''} volunteers
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-4 flex flex-wrap justify-center gap-2 md:justify-start">
                                    {selectedEvent.isUrgent && <Badge variant="destructive">Urgent</Badge>}
                                    {selectedEvent.isVirtual && <Badge variant="secondary">Virtual</Badge>}
                                    {selectedEvent.isGroupFriendly && <Badge variant="secondary">Group Friendly</Badge>}
                                    {selectedEvent.requiredSkills?.map((skill) => (
                                        <Badge key={skill} variant="outline">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex justify-center md:justify-start">
                                    <Button
                                        className="rounded-full bg-[#C8A74B]"
                                        onClick={() => alert(`Joining event: ${selectedEvent.eventTitle}`)}
                                        variant="default"
                                        size="lg"
                                        disabled={selectedEvent.currentVolunteers >= (selectedEvent.maxVolunteers ?? Infinity)}
                                    >
                                        {selectedEvent.currentVolunteers >= (selectedEvent.maxVolunteers ?? Infinity) ? 'Event Full' : 'Join Event'}
                                    </Button>
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
