"use client" // Mark as client component

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Users } from "lucide-react"

// Define the EventType based on your dummy data structure
export interface EventType {
  eventId: string
  organizationId: string
  eventTitle: string
  eventDescription: string
  startDatetime: string
  endDatetime: string
  location: string
  eventAddress: string | null
  isVirtual: boolean
  maxVolunteers?: number
  currentVolunteers: number
  isUrgent: boolean
  recurrencePattern: string | null
  categoryId: number
  eventStatusId: number
  isHighRisk: boolean
  isGroupFriendly: boolean
  requiredSkills?: string[]
  createdAt: string
  updatedAt: string
}

interface EventCardProps {
  event: EventType // Pass the entire event object
  onClick: (event: EventType) => void // Click handler
}

export function EventCard({ event, onClick }: EventCardProps) {
  const startDate = new Date(event.startDatetime)
  const endDate = new Date(event.endDatetime)

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
        <CardTitle className="text-lg">{event.eventTitle}</CardTitle>
        <CardDescription className="line-clamp-2 text-sm">{event.eventDescription}</CardDescription>
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
          <span>{event.isVirtual ? "Virtual" : event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="size-4 text-muted-foreground" />
          <span>
            {event.currentVolunteers}
            {event.maxVolunteers ? ` / ${event.maxVolunteers}` : ""} volunteers
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {event.isUrgent && <Badge variant="destructive">Urgent</Badge>}
          {event.isVirtual && <Badge variant="secondary">Virtual</Badge>}
          {event.isGroupFriendly && <Badge variant="secondary">Group Friendly</Badge>}
          {event.requiredSkills?.map((skill) => (
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
