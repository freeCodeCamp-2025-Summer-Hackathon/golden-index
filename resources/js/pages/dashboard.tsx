import RegisterDrawerDialog from '@/components/register-drawer-dialog';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { EventCard, EventType } from '@/components/events-card';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Users, Info } from "lucide-react";
import { useEffect, useState } from 'react';

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
      event_id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      organization_id: "org123",
      event_title: "Community Garden Cleanup",
      event_description: "Help us beautify the local community garden by weeding, planting, and general tidying.",
      start_datetime: "2025-08-10T09:00:00Z",
      end_datetime: "2025-08-10T13:00:00Z",
      location: "Central Park Community Garden",
      event_address: "123 Garden Lane, Cityville",
      is_virtual: false,
      max_volunteers: 20,
      current_volunteers: 12,
      is_urgent: false,
      recurrence_pattern: null,
      category_id: 1,
      event_status_id: 1,
      is_high_risk: false,
      is_group_friendly: true,
      required_skills: ["Gardening", "Teamwork"],
      created_at: "2025-07-01T10:00:00Z",
      updated_at: "2025-07-05T11:00:00Z",
    },
    {
      event_id: "b2c3d4e5-f6a7-7890-1234-567890abcdef0",
      organization_id: "org124",
      event_title: "Online Tutoring Session",
      event_description: "Provide academic support to students in various subjects via video call.",
      start_datetime: "2025-08-15T14:00:00Z",
      end_datetime: "2025-08-15T16:00:00Z",
      location: "Online",
      event_address: null,
      is_virtual: true,
      max_volunteers: 10,
      current_volunteers: 8,
      is_urgent: true,
      recurrence_pattern: "Weekly",
      category_id: 2,
      event_status_id: 1,
      is_high_risk: false,
      is_group_friendly: false,
      required_skills: ["Teaching", "Communication"],
      created_at: "2025-07-02T12:00:00Z",
      updated_at: "2025-07-06T13:00:00Z",
    },
    {
      event_id: "c3d4e5f6-a7b8-9012-3456-7890abcdef01",
      organization_id: "org125",
      event_title: "Food Bank Distribution",
      event_description: "Assist with sorting and distributing food items to families in need.",
      start_datetime: "2025-08-20T10:00:00Z",
      end_datetime: "2025-08-20T15:00:00Z",
      location: "Downtown Food Bank",
      event_address: "456 Main Street, Townsville",
      is_virtual: false,
      max_volunteers: 30,
      current_volunteers: 25,
      is_urgent: false,
      recurrence_pattern: null,
      category_id: 3,
      event_status_id: 1,
      is_high_risk: false,
      is_group_friendly: true,
      required_skills: ["Lifting", "Organization"],
      created_at: "2025-07-03T09:00:00Z",
      updated_at: "2025-07-07T10:00:00Z",
    },
    {
      event_id: "d4e5f6a7-b8c9-0123-4567-890abcdef02",
      organization_id: "org123",
      event_title: "Park Beautification Day",
      event_description: "Join us to clean up litter and plant new trees in Oakwood Park.",
      start_datetime: "2025-08-25T08:30:00Z",
      end_datetime: "2025-08-25T12:30:00Z",
      location: "Oakwood Park",
      event_address: "789 Park Ave, Villageton",
      is_virtual: false,
      max_volunteers: 15,
      current_volunteers: 15,
      is_urgent: true,
      recurrence_pattern: null,
      category_id: 1,
      event_status_id: 1,
      is_high_risk: false,
      is_group_friendly: true,
      required_skills: ["Outdoor Work"],
      created_at: "2025-07-04T14:00:00Z",
      updated_at: "2025-07-08T15:00:00Z",
    },
    {
      event_id: "e5f6a7b8-c9d0-1234-5678-90abcdef03",
      organization_id: "org126",
      event_title: "Senior Companion Calls",
      event_description: "Make friendly phone calls to isolated seniors to provide companionship.",
      start_datetime: "2025-08-28T11:00:00Z",
      end_datetime: "2025-08-28T13:00:00Z",
      location: "Remote",
      event_address: null,
      is_virtual: true,
      max_volunteers: 8,
      current_volunteers: 3,
      is_urgent: false,
      recurrence_pattern: "Bi-weekly",
      category_id: 4,
      event_status_id: 1,
      is_high_risk: false,
      is_group_friendly: false,
      required_skills: ["Communication", "Empathy"],
      created_at: "2025-07-05T10:00:00Z",
      updated_at: "2025-07-09T11:00:00Z",
    },
  ];
}

export default function Dashboard() {
  const allEvents = getEvents();
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
            <EventCard key={event.event_id} event={event} onClick={setSelectedEvent} />
          ))}
        </div>

        <div className="flex-1 rounded-xl border border-dashed shadow-sm p-4 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start text-muted-foreground bg-card text-card-foreground">
          {selectedEvent ? (
            <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8 items-center md:items-start text-center md:text-left">
              <div className="flex-shrink-0 p-4 bg-primary text-primary-foreground rounded-lg flex items-center justify-center size-24 md:size-32">
                <CalendarDays className="size-12 md:size-16" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">{selectedEvent.event_title}</h2>
                <p className="text-base md:text-lg text-muted-foreground mb-4 line-clamp-3">
                  {selectedEvent.event_description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm md:text-base mb-4">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <CalendarDays className="size-4 text-muted-foreground" />
                    <span>
                      {new Date(selectedEvent.start_datetime).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Info className="size-4 text-muted-foreground" />
                    <span>
                      {new Date(selectedEvent.start_datetime).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" - "}
                      {new Date(selectedEvent.end_datetime).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <span>{selectedEvent.is_virtual ? "Virtual Event" : selectedEvent.location}</span>
                    <MapPin className="size-4 text-muted-foreground" />
                  </div>
                    <Users className="size-4 text-muted-foreground" />
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <span>
                      {selectedEvent.current_volunteers}
                      {selectedEvent.max_volunteers ? ` / ${selectedEvent.max_volunteers}` : ""} volunteers
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  {selectedEvent.is_urgent && <Badge variant="destructive">Urgent</Badge>}
                  {selectedEvent.is_virtual && <Badge variant="secondary">Virtual</Badge>}
                  {selectedEvent.is_group_friendly && <Badge variant="secondary">Group Friendly</Badge>}
                  {selectedEvent.required_skills?.map((skill) => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                  ))}
                </div>

                <div className="flex justify-center md:justify-start">
                  <Button
                  className='bg-[#C8A74B] rounded-full'
                    onClick={() => alert(`Joining event: ${selectedEvent.event_title}`)}
                    variant="default"
                    size="lg"
                    disabled={selectedEvent.current_volunteers >= (selectedEvent.max_volunteers ?? Infinity)}
                  >
                    {selectedEvent.current_volunteers >= (selectedEvent.max_volunteers ?? Infinity)
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
      </div>
    </AppLayout>
  );
}
