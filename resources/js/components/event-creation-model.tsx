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
import { Textarea } from '@/components/ui/textarea';
//import { useMediaQuery } from '@/hooks/use-media-query';

export default function EventCreationForm({ className }: React.ComponentProps<'form'> & { onClose?: () => void }) {

  //Extract auth info (including token) from the global page props via Inertia.js
  const { auth } = usePage<SharedData>().props;
  //console.log('Auth data:', auth);
  //Use a custom hook to determine if the screen size is desktop or mobile
  //const isDesktop = useMediaQuery('(min-width: 768px)');

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [location, setLocation] = useState('');
    const [eventAddress, setEventAddress] = useState('');
    const [isVirtual, setIsVirtual] = useState(false);
    const [maxVolunteers, setMaxVolunteers] = useState<number | null>(null);
    const [isUrgent, setIsUrgent] = useState(false);
    const [recurrencePattern, setRecurrencePattern] = useState('');
    const [isHighRisk, setIsHighRisk] = useState(false);
    const [isGroupFriendly, setIsGroupFriendly] = useState(false);
    const [requiredSkills, setRequiredSkills] = useState<string[]>([]);

     useEffect(() => {
        
    }, []);
    
   // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const token = auth.token;
      if (!token) throw new Error('Authentication token not available');



      // Prepare data object, parse skills into array, fallback with defaults if empty
      const eventData = {
        eventTitle: eventTitle,
        eventDescription: eventDescription,
        startDateTime: new Date(startDateTime).toISOString(),
        endDateTime: new Date(endDateTime).toISOString(),
        location: location,
        eventAddress: eventAddress,
        isVirtual: isVirtual,
        maxVolunteers: maxVolunteers,
        isUrgent: isUrgent,
        recurrencePattern: recurrencePattern,
        isHighRisk: isHighRisk,
        isGroupFriendly: isGroupFriendly,
        requiredSkills: requiredSkills.length > 0 ? requiredSkills : ['none'], // Fallback to 'none' if no skills are selected
      };

      console.log('Event Data:', eventData);

      // Send POST request to register volunteer time log
      const response = await fetch('/api/volunteer_time_logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
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
      console.log('Volunteer time registration successful');
      window.location.reload(); // Refresh page to update roles/state
      toast('Volunteering time registration successful');
      
    } catch (error) {
      console.error('Error registering volunteer time log:', error);
      const message = error instanceof Error ? error.message : 'Failed to register as volunteer. Please try again.';
      setError(message);

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
        {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200">{error}</div>}
        <Card className="w-full max-w-sm">
        <CardHeader>
        <CardTitle>VolunteerMatch</CardTitle>
        <CardDescription>
          Create your Events Here!
        </CardDescription>
      </CardHeader>
      <CardContent> 
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="event-title">Event Title</Label>
              <Input
                id="event-title"
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-description">Event Description</Label>
              <Textarea
                id="event-description"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}  
              />
            </div>
            <Label>How often do you want to hold this event?</Label>
            <Select
              value={recurrencePattern}
              onValueChange={setRecurrencePattern}
              required
            >
            <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
              <SelectContent>
              <SelectItem value="one-time">One Time</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
            <div className="grid gap-2">
              <Label htmlFor="check-in">Event Start Date and Time</Label>
              <Input
                id="check-in"
                type="datetime-local"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="check-out">Event End Date and Time</Label>
              <Input
                id="check-out"
                type="datetime-local"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-location">Event Location</Label>
              <Input
                id="event-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-address">Event Address</Label>
              <Input
                id="event-address"
                type="text"
                value={eventAddress}
                onChange={(e) => setEventAddress(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-location">Maximum number of volunteers</Label>
              <Input
                id="event-location"
                type="number"
                value={maxVolunteers !== null ? maxVolunteers : ''}
                onChange={(e) => setMaxVolunteers(e.target.value === '' ? null : Number(e.target.value))}
              />
            </div>
             {/*<div className="grid gap-2">
              <Label htmlFor="event-skills">Required Skills</Label>
              <Input
                id="event-skills"
                type="text"
                value={eventSkills}
                onChange={(e) => setEventSkills(e.target.value)}
              />*/}
            </div>
            <Label>Is the event virtual?</Label>
            <Select
              value={isVirtual.toString()}
              onValueChange={(value) => setIsVirtual(value === 'true')}
              required
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                </SelectTrigger>
                  <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
            </Select>
            <Label>Is the event urgent?</Label>
            <Select
              value={isUrgent.toString()}
              onValueChange={(value) => setIsUrgent(value === 'true')}
              required
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                </SelectTrigger>
                  <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
            </Select>
            <Label>Is the event high risk?</Label>
            <Select
              value={isHighRisk.toString()}
              onValueChange={(value) => setIsHighRisk(value === 'true')}
              required
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                </SelectTrigger>
                  <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
            </Select>
            <Label>Is the event group friendly?</Label>
            <Select
              value={isGroupFriendly.toString()}
              onValueChange={(value) => setIsGroupFriendly(value === 'true')}
              required
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                </SelectTrigger>
                  <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
            </Select>        
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Event...' : 'Create Event'}
        </Button>
      </CardFooter>
    </Card>
    </form>
    );
};
