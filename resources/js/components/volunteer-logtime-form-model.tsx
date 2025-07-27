import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
//import { useMediaQuery } from '@/hooks/use-media-query';
import useEventStore from '@/store/eventStore';

// Define the structure of the volunteer time log data
// interface EventsResponse {
//     '@context': string;
//     '@id': string;
//     '@type': string;
//     totalItems: number;
//     member: EventType[];
// }
type Props = React.ComponentProps<'form'> & {
  onClose?: () => void;
  scrollToTop?: () => void;
};

export default function VolunteerLogTimeForm({ className }: Props) {
    //Extract auth info (including token) from the global page props via Inertia.js
    const { auth } = usePage<SharedData>().props;
    //Use a custom hook to determine if the screen size is desktop or mobile
    //const isDesktop = useMediaQuery('(min-width: 768px)');

    const [selectedEvent, setSelectedEvent] = useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    // const [events, setEvents] = useState<EventType[]>([]);
    const formRef = useRef<HTMLFormElement>(null);
    const { events } = useEventStore();

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
            //console.log('Check-in time:', start);
            const end = new Date(checkOutTime);
            //console.log('Check-out time:', end);

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
                eventId: selectedEvent,
                checkInTime: start.toISOString(),
                checkOutTime: end.toISOString(),
                hoursLogged: hoursLogged.toString(), // Convert to string with 2 decimal places
                logMethod: 'manual', // Assuming manual log method for this example
                volunteerTimeLogStatus: 'pending',
            };

            //console.log('Volunteer Time Log Data:', volunteerTimeLogData);

            // Send POST request to register volunteer time log
            const response = await fetch('/api/volunteer_time_logs', {
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
                throw new Error(responseData.error || responseData.message || 'Failed to register your volunteering hours');
            }
            //console.log('Volunteer time registration successful');
            // window.location.reload(); // Refresh page to update roles/state
            toast('Volunteering time registration successful');
        } catch (error) {
            console.error('Error registering volunteer time log:', error);
            const message = error instanceof Error ? error.message : 'Failed to register as volunteer. Please try again.';
            setError(message);
            formRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form ref={formRef} className={cn('grid max-h-[60vh] items-start gap-4 overflow-y-auto', className)} onSubmit={handleSubmit} noValidate>
            {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200">{error}</div>}
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>VolunteerMatch</CardTitle>
                    <CardDescription>Log your volunteering hours here</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <Label>Select an Event</Label>
                        <Select value={selectedEvent} onValueChange={setSelectedEvent} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select event" />
                            </SelectTrigger>
                            <SelectContent>
                                {events.length > 0 &&
                                    events.map((event) => (
                                        <SelectItem key={event.event_id} value={event.event_id}>
                                            {event.event_title}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
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
                            <span className="w-fit rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground">Not revised</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting your log...' : 'Submit time log'}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
