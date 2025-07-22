import RegisterDrawerDialog from '@/components/register-drawer-dialog';
import { EventCard, EventType } from '@/components/events-card';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Users, Info } from "lucide-react";
import { useEffect, useState } from 'react';
import  VolunteerLogTimeForm from '@/components/volunteer-logtime-form-model';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

// Dummy data fetching function (synchronous)
function getEvents(): EventType[] {
  return [
    {
      eventId: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      organizationId: "org123",
      eventTitle: "Community Garden Cleanup",
      eventDescription: "Help us beautify the local community garden by weeding, planting, and general tidying.",
      startDatetime: "2025-08-10T09:00:00Z",
      endDatetime: "2025-08-10T13:00:00Z",
      location: "Central Park Community Garden",
      eventAddress: "123 Garden Lane, Cityville",
      isVirtual: false,
      maxVolunteers: 20,
      currentVolunteers: 12,
      isUrgent: false,
      recurrencePattern: null,
      categoryId: 1,
      eventStatusId: 1,
      isHighRisk: false,
      isGroupFriendly: true,
      requiredSkills: ["Gardening", "Teamwork"],
      createdAt: "2025-07-01T10:00:00Z",
      updatedAt: "2025-07-05T11:00:00Z",
    },
    {
      eventId: "b2c3d4e5-f6a7-7890-1234-567890abcdef0",
      organizationId: "org124",
      eventTitle: "Online Tutoring Session",
      eventDescription: "Provide academic support to students in various subjects via video call.",
      startDatetime: "2025-08-15T14:00:00Z",
      endDatetime: "2025-08-15T16:00:00Z",
      location: "Online",
      eventAddress: null,
      isVirtual: true,
      maxVolunteers: 10,
      currentVolunteers: 8,
      isUrgent: true,
      recurrencePattern: "Weekly",
      categoryId: 2,
      eventStatusId: 1,
      isHighRisk: false,
      isGroupFriendly: false,
      requiredSkills: ["Teaching", "Communication"],
      createdAt: "2025-07-02T12:00:00Z",
      updatedAt: "2025-07-06T13:00:00Z",
    },
    {
      eventId: "c3d4e5f6-a7b8-9012-3456-7890abcdef01",
      organizationId: "org125",
      eventTitle: "Food Bank Distribution",
      eventDescription: "Assist with sorting and distributing food items to families in need.",
      startDatetime: "2025-08-20T10:00:00Z",
      endDatetime: "2025-08-20T15:00:00Z",
      location: "Downtown Food Bank",
      eventAddress: "456 Main Street, Townsville",
      isVirtual: false,
      maxVolunteers: 30,
      currentVolunteers: 25,
      isUrgent: false,
      recurrencePattern: null,
      categoryId: 3,
      eventStatusId: 1,
      isHighRisk: false,
      isGroupFriendly: true,
      requiredSkills: ["Lifting", "Organization"],
      createdAt: "2025-07-03T09:00:00Z",
      updatedAt: "2025-07-07T10:00:00Z",
    },
    {
      eventId: "d4e5f6a7-b8c9-0123-4567-890abcdef02",
      organizationId: "org123",
      eventTitle: "Park Beautification Day",
      eventDescription: "Join us to clean up litter and plant new trees in Oakwood Park.",
      startDatetime: "2025-08-25T08:30:00Z",
      endDatetime: "2025-08-25T12:30:00Z",
      location: "Oakwood Park",
      eventAddress: "789 Park Ave, Villageton",
      isVirtual: false,
      maxVolunteers: 15,
      currentVolunteers: 15,
      isUrgent: true,
      recurrencePattern: null,
      categoryId: 1,
      eventStatusId: 1,
      isHighRisk: false,
      isGroupFriendly: true,
      requiredSkills: ["Outdoor Work"],
      createdAt: "2025-07-04T14:00:00Z",
      updatedAt: "2025-07-08T15:00:00Z",
    },
    {
      eventId: "e5f6a7b8-c9d0-1234-5678-90abcdef03",
      organizationId: "org126",
      eventTitle: "Senior Companion Calls",
      eventDescription: "Make friendly phone calls to isolated seniors to provide companionship.",
      startDatetime: "2025-08-28T11:00:00Z",
      endDatetime: "2025-08-28T13:00:00Z",
      location: "Remote",
      eventAddress: null,
      isVirtual: true,
      maxVolunteers: 8,
      currentVolunteers: 3,
      isUrgent: false,
      recurrencePattern: "Bi-weekly",
      categoryId: 4,
      eventStatusId: 1,
      isHighRisk: false,
      isGroupFriendly: false,
      requiredSkills: ["Communication", "Empathy"],
      createdAt: "2025-07-05T10:00:00Z",
      updatedAt: "2025-07-09T11:00:00Z",
    },
  ];
}

export default function Dashboard() {
  const allEvents = getEvents();
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

    const { auth } = usePage<SharedData>().props;
    // Check if user has only the 'user' role with safety checks
    const shouldShowRegisterDialog = auth.user?.roles?.length === 1 && auth.user.roles[0] === 'user';
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {shouldShowRegisterDialog && <RegisterDrawerDialog />}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent">
          {allEvents.map((event) => (
            <EventCard key={event.eventId} event={event} onClick={setSelectedEvent} />
          ))}
        </div>

        <div className="flex-1 rounded-xl border border-dashed shadow-sm p-4 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start text-muted-foreground bg-card text-card-foreground">
          {selectedEvent ? (
            <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8 items-center md:items-start text-center md:text-left">
              <div className="flex-shrink-0 p-4 bg-primary text-primary-foreground rounded-lg flex items-center justify-center size-24 md:size-32">
                <CalendarDays className="size-12 md:size-16" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">{selectedEvent.eventTitle}</h2>
                <p className="text-base md:text-lg text-muted-foreground mb-4 line-clamp-3">
                  {selectedEvent.eventDescription}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm md:text-base mb-4">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <CalendarDays className="size-4 text-muted-foreground" />
                    <span>
                      {new Date(selectedEvent.startDatetime).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Info className="size-4 text-muted-foreground" />
                    <span>
                      {new Date(selectedEvent.startDatetime).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" - "}
                      {new Date(selectedEvent.endDatetime).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <span>{selectedEvent.isVirtual ? "Virtual Event" : selectedEvent.location}</span>
                    <MapPin className="size-4 text-muted-foreground" />
                  </div>
                    <Users className="size-4 text-muted-foreground" />
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <span>
                      {selectedEvent.currentVolunteers}
                      {selectedEvent.maxVolunteers ? ` / ${selectedEvent.maxVolunteers}` : ""} volunteers
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  {selectedEvent.isUrgent && <Badge variant="destructive">Urgent</Badge>}
                  {selectedEvent.isVirtual && <Badge variant="secondary">Virtual</Badge>}
                  {selectedEvent.isGroupFriendly && <Badge variant="secondary">Group Friendly</Badge>}
                  {selectedEvent.requiredSkills?.map((skill) => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                  ))}
                </div>

                <div className="flex justify-center md:justify-start">
                  <Button
                  className='bg-[#C8A74B] rounded-full'
                    onClick={() => alert(`Joining event: ${selectedEvent.eventTitle}`)}
                    variant="default"
                    size="lg"
                    disabled={selectedEvent.currentVolunteers >= (selectedEvent.maxVolunteers ?? Infinity)}
                  >
                    {selectedEvent.currentVolunteers >= (selectedEvent.maxVolunteers ?? Infinity)
                      ? "Event Full"
                      : "Join Event"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-8">
              <h2 className="text-2xl font-semibold mb-2">No Upcoming Events</h2>
              <p className="text-lg">
                There are no upcoming events at the moment. Click on an event above to see its details, or register for
                a new event to get started!
              </p>
            </div>
          )}
        </div>
        <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <VolunteerLogTimeForm />
                </div>
      </div>
    </AppLayout>
  );
}
