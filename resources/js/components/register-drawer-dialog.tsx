"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Users, Building2 } from "lucide-react"

type UserType = "volunteer" | "organization" | null

export default function RegisterDrawerDialog() {
  const [open, setOpen] = React.useState(false)
  const [userType, setUserType] = React.useState<UserType>(null)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const handleClose = () => {
    setOpen(false)
    setUserType(null)
  }

  const handleBack = () => {
    setUserType(null)
  }

  if (isDesktop) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Join Us</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {userType === null
                  ? "Join Our Community"
                  : userType === "volunteer"
                    ? "Volunteer Registration"
                    : "Organization Registration"}
              </DialogTitle>
              <DialogDescription>
                {userType === null
                  ? "Choose how you'd like to get involved with our community."
                  : userType === "volunteer"
                    ? "Fill out your information to become a volunteer."
                    : "Register your organization to partner with us."}
              </DialogDescription>
            </DialogHeader>
            {userType === null ? (
              <UserTypeSelection onSelect={setUserType} />
            ) : (
              <div className="space-y-4">
                <Button variant="ghost" size="sm" onClick={handleBack} className="flex items-center gap-2 p-0 h-auto">
                  <ArrowLeft className="h-4 w-4" />
                  Back to selection
                </Button>
                {userType === "volunteer" ? (
                  <VolunteerForm onClose={handleClose} />
                ) : (
                  <OrganizationForm onClose={handleClose} />
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline">Join Us</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>
              {userType === null
                ? "Join Our Community"
                : userType === "volunteer"
                  ? "Volunteer Registration"
                  : "Organization Registration"}
            </DrawerTitle>
            <DrawerDescription>
              {userType === null
                ? "Choose how you'd like to get involved with our community."
                : userType === "volunteer"
                  ? "Fill out your information to become a volunteer."
                  : "Register your organization to partner with us."}
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            {userType === null ? (
              <UserTypeSelection onSelect={setUserType} />
            ) : (
              <div className="space-y-4">
                <Button variant="ghost" size="sm" onClick={handleBack} className="flex items-center gap-2 p-0 h-auto">
                  <ArrowLeft className="h-4 w-4" />
                  Back to selection
                </Button>
                {userType === "volunteer" ? (
                  <VolunteerForm onClose={handleClose} />
                ) : (
                  <OrganizationForm onClose={handleClose} />
                )}
              </div>
            )}
          </div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

function UserTypeSelection({ onSelect }: { onSelect: (type: UserType) => void }) {
  return (
    <div className="grid gap-4 py-4">
      <Button
        variant="outline"
        className="h-auto p-6 flex flex-col items-center gap-3 hover:bg-primary/5 bg-transparent"
        onClick={() => onSelect("volunteer")}
      >
        <Users className="h-8 w-8 text-primary" />
        <div className="text-center">
          <div className="font-semibold">I'm a Volunteer</div>
          <div className="text-sm text-muted-foreground">Join as an individual volunteer</div>
        </div>
      </Button>
      <Button
        variant="outline"
        className="h-auto p-6 flex flex-col items-center gap-3 hover:bg-primary/5 bg-transparent"
        onClick={() => onSelect("organization")}
      >
        <Building2 className="h-8 w-8 text-primary" />
        <div className="text-center">
          <div className="font-semibold">I'm an Organization</div>
          <div className="text-sm text-muted-foreground">Register your organization or company</div>
        </div>
      </Button>
    </div>
  )
}

function VolunteerForm({ className, onClose }: React.ComponentProps<"form"> & { onClose?: () => void }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle volunteer form submission
    console.log("Volunteer form submitted")
    onClose?.()
  }

  return (
    <form className={cn("grid items-start gap-4", className)} onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="volunteer-mobile">Mobile Number *</Label>
        <Input type="tel" id="volunteer-mobile" placeholder="+1 (555) 123-4567" required />
      </div>
       <div className="grid gap-2">
        <Label htmlFor="volunteer-mobile">Bio</Label>
        <Textarea id="volunteer-bio" placeholder="Hi I'm Sam" required />
      </div>
       <div className="grid gap-2">
        <Label htmlFor="volunteer-mobile">Emergency Contact Number *</Label>
        <Input type="tel" id="volunteer-emergency-mobile" placeholder="+1 (555) 123-4567" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="volunteer-cv">CV/Resume (Optional)</Label>
        <Input
          type="file"
          id="volunteer-cv"
          accept=".pdf,.doc,.docx"
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
        />
        <p className="text-xs text-muted-foreground">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
      </div>
      <Button type="submit" className="w-full">
        Register as Volunteer
      </Button>
    </form>
  )
}

function OrganizationForm({ className, onClose }: React.ComponentProps<"form"> & { onClose?: () => void }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle organization form submission
    console.log("Organization form submitted")
    onClose?.()
  }

  return (
    <form className={cn("grid items-start gap-4 max-h-[60vh] overflow-y-auto", className)} onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="org-name">Organization Name *</Label>
        <Input id="org-name" placeholder="Your Organization Name" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="org-description">Description *</Label>
        <Textarea
          id="org-description"
          placeholder="Brief description of your organization"
          className="min-h-[80px]"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="org-email">Organization Email *</Label>
        <Input type="email" id="org-email" placeholder="contact@organization.com" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="org-phone">Organization Phone *</Label>
        <Input type="tel" id="org-phone" placeholder="+1 (555) 123-4567" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="org-address">Address *</Label>
        <Textarea id="org-address" placeholder="Full address of your organization" className="min-h-[60px]" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="org-website">Website</Label>
        <Input type="url" id="org-website" placeholder="https://www.yourorganization.com" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="org-type">Organization Type *</Label>
        <Select required>
          <SelectTrigger>
            <SelectValue placeholder="Select organization type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nonprofit">Non-Profit</SelectItem>
            <SelectItem value="corporate">Corporate</SelectItem>
            <SelectItem value="government">Government</SelectItem>
            <SelectItem value="educational">Educational Institution</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="religious">Religious Organization</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="org-mission">Mission Statement *</Label>
        <Textarea
          id="org-mission"
          placeholder="Your organization's mission and goals"
          className="min-h-[80px]"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="org-contact">Primary Contact Information *</Label>
        <Input id="org-contact" placeholder="Primary contact person name and title" required />
      </div>

      <Button type="submit" className="w-full">
        Register Organization
      </Button>
    </form>
  )
}
