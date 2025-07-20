"use client" // Mark as client component

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Users } from "lucide-react"

// Define the EventType based on your dummy data structure
export interface EventType {
  event_id: string
  organization_id: string
  event_title: string
  event_description: string
  start_datetime: string
  end_datetime: string
  location: string
  event_address: string | null
  is_virtual: boolean
  max_volunteers?: number
  current_volunteers: number
  is_urgent: boolean
  recurrence_pattern: string | null
  category_id: number
  event_status_id: number
  is_high_risk: boolean
  is_group_friendly: boolean
  required_skills?: string[]
  created_at: string
  updated_at: string
}

interface EventCardProps {
  event: EventType // Pass the entire event object
  onClick: (event: EventType) => void // Click handler
}

export function EventCard({ event, onClick }: EventCardProps) {
  const startDate = new Date(event.start_datetime)
  const endDate = new Date(event.end_datetime)

  const formattedDate = startDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const formattedTime = `${startDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${endDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`

  return (
    <Card
      className="w-[300px] flex-shrink-0 cursor-pointer hover:border-primary transition-colors"
      onClick={() => onClick(event)} // Call onClick with the event object
    >
      <CardHeader>
        <CardTitle className="text-lg">{event.event_title}</CardTitle>
        <CardDescription className="line-clamp-2 text-sm">{event.event_description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2 text-sm">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-4 text-muted-foreground" />
          <span>
            {formattedDate} at {formattedTime}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-muted-foreground" />
          <span>{event.is_virtual ? "Virtual" : event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="size-4 text-muted-foreground" />
          <span>
            {event.current_volunteers}
            {event.max_volunteers ? ` / ${event.max_volunteers}` : ""} volunteers
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {event.is_urgent && <Badge variant="destructive">Urgent</Badge>}
          {event.is_virtual && <Badge variant="secondary">Virtual</Badge>}
          {event.is_group_friendly && <Badge variant="secondary">Group Friendly</Badge>}
          {event.required_skills?.map((skill) => (
            <Badge key={skill} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>{/* Add action buttons here if needed */}</CardFooter>
    </Card>
  )
}
