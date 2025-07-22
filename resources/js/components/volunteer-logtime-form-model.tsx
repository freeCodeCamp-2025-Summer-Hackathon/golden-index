import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState, useEffect } from 'react';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { EventType } from './events-card'; // Adjust the import path as necessary

// Define the structure of the volunteer time log data
interface EventsResponse {
  '@context': string;
  '@id': string;
  '@type': string;
  totalItems: number;
  member: EventType[];
}

export default function VolunteerLogTimeForm({ className }: React.ComponentProps<'form'> & { onClose?: () => void }) {

  //Extract auth info (including token) from the global page props via Inertia.js
  const { auth } = usePage<SharedData>().props;
  //Use a custom hook to determine if the screen size is desktop or mobile
  const isDesktop = useMediaQuery('(min-width: 768px)');

  //Dummy data for events
    const items = [
        { value: 'event1', label: 'Red Cross Volunteer' },
        { value: 'event2', label: 'Habitat for Humanity' },
        { value: 'event3', label: 'Food Bank Drive' },
        { value: 'event4', label: 'Community Clean-Up' },
        { value: 'event5', label: 'Animal Shelter' },
    ];

    const [selectedEvent, setSelectedEvent] = useState("");
     const [isSubmitting, setIsSubmitting] = React.useState(false);
     const [error, setError] = React.useState<string | null>(null);
     const [checkInTime, setCheckInTime] = useState('');
     const [checkOutTime, setCheckOutTime] = useState('');
     const [events, setEvents] = useState<EventType[]>([]);

     useEffect(() => {
    // Fetch events from the API
    const fetchEvents = async () => {
      try {
        const response = await fetch('api/events', {
          headers: {
            'Authorization': `Bearer ${auth.token}`,
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) throw new Error('Failed to fetch events');

        const data: EventsResponse = await response.json();
        setEvents(data.member || []);
        // console.log('useEffect data:', data.member);
        // console.log('Events count:', events.length);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]); // Reset events on error
      }
      }
    fetchEvents();
    }, []);
    
    // useEffect(() => {
    //   if (events.length > 0) {
    //     console.log('data2:', events);
    //   }
    // }, [events]);
   // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const token = auth.token;
      if (!token) throw new Error('Authentication token not available');

      const start = new Date(checkInTime);
      console.log('Check-in time:', start);
      const end = new Date(checkOutTime);
      console.log('Check-out time:', end);

if (isNaN(start.getTime()) || isNaN(end.getTime())) {
  throw new Error('Invalid check-in or check-out time');
}

const durationMs = end.getTime() - start.getTime();
const hoursLogged = durationMs / (1000 * 60 * 60); // convert ms to hours

if (hoursLogged <= 0) {
  throw new Error('Check-out must be after check-in');
}

      // Prepare data object, parse skills into array, fallback with defaults if empty
      const volunteerTimeLogData = {
        user_id: auth.user.id,
        event_id: selectedEvent,
        check_in_time: start.toISOString(),
        check_out_time: end.toISOString(),
        hours_logged: hoursLogged,
        log_method: 'manual', // Assuming manual log method for this example
        dispute_reason: null,
        volunteer_time_log_status: 'pending',
        is_disputed: false,
        created_at: new Date().toISOString(),
        updated_at: null
      };

      console.log('Volunteer Time Log Data:', volunteerTimeLogData);

      // Send POST request to register volunteer time log
      const response = await fetch('/api/volunteer-time-logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(volunteerTimeLogData),
      });

      // Attempt to parse JSON response safely
      let responseData;
      try {
        responseData = await response.json();
      } catch {
        throw new Error('Server returned invalid response. Please try again.');
      }

      if (!response.ok) {
        throw new Error(
          responseData.error || responseData.message || 'Failed to register your volunteering hours'
        );
      }

      toast.success('Volunteer registration successful');
      window.location.reload(); // Refresh page to update roles/state
      if (onClose) onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to register as volunteer. Please try again.';
      setError(message);
      console.error('Error registering volunteer:', message);
    } finally {
      setIsSubmitting(false);
    }
  };

    return (
      <form
      className={cn('grid items-start gap-4', className)}
      onSubmit={handleSubmit}
      noValidate
      >
        <Card className="w-full max-w-sm">
        <CardHeader>
        <CardTitle>VolunteerMatch</CardTitle>
        <CardDescription>
          Log your volunteering hours here
        </CardDescription>
      </CardHeader>
      <CardContent>
        
          <div className="flex flex-col gap-6">
            <Label>Select an Event</Label>
            <Select
              value={selectedEvent}
              onValueChange={setSelectedEvent}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select event" />
              </SelectTrigger>
              <SelectContent>
              {/* {console.log('Events:', events)} */}
              {events.length > 0 &&
                events.map(event => (
                  <SelectItem key={event.eventId} value={event.eventId}>
                    {event.eventTitle}
                  </SelectItem>
                )) 
              }
          </SelectContent>
        </Select>
          {/* {console.log('data2:', events.member)} */}
            <div className="grid gap-2">
              <Label htmlFor="check-in">Check In Time</Label>
              <Input
                id="check-in"
                type="datetime-local"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="check-out">Check Out Time</Label>
              <Input
                id="check-out"
                type="datetime-local"
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Status:</Label>
               <span className="rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground w-fit">
    Not revised
  </span>
            </div>
          </div>
        
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
    </form>
    );
};