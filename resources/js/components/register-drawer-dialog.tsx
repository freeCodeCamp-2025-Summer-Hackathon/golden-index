'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { ArrowLeft, Building2, Users } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

type UserType = 'volunteer' | 'organization' | null;

type OrganisationDataType = {
    organisationName: string;
    organisationDescription: string;
    organisationEmail: string;
    organisationPhone: string;
    organisationAddress: string;
    website: string;
    contactInfo: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        other?: string;
    };
    missionStatement: string;
    orgType: string;
}


type VolunteerDataType = {
  onboarding_status: 'pending' | 'approved' | 'rejected';
  bio: string;
  skills: string[];
  experience: string;
  availability: string;
};

export default function RegisterDrawerDialog() {
    const { auth } = usePage<SharedData>().props;
    const [open, setOpen] = React.useState(true); // Auto-open the dialog
    const [userType, setUserType] = React.useState<UserType>(null);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    console.log(auth.token, 'rishan token');

    const handleClose = () => {
        setOpen(false);
        setUserType(null);
    };

    const handleBack = () => {
        setUserType(null);
    };

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>
                            {userType === null
                                ? 'Join Our Community'
                                : userType === 'volunteer'
                                  ? 'Volunteer Registration'
                                  : 'Organization Registration'}
                        </DialogTitle>
                        <DialogDescription>
                            {userType === null
                                ? "Choose how you'd like to get involved with our community."
                                : userType === 'volunteer'
                                  ? 'Fill out your information to become a volunteer.'
                                  : 'Register your organization to partner with us.'}
                        </DialogDescription>
                    </DialogHeader>
                    {userType === null ? (
                        <UserTypeSelection onSelect={setUserType} />
                    ) : (
                        <div className="space-y-4">
                            <Button variant="ghost" size="sm" onClick={handleBack} className="flex h-auto items-center gap-2 p-0">
                                <ArrowLeft className="h-4 w-4" />
                                Back to selection
                            </Button>
                            {userType === 'volunteer' ? <VolunteerForm onClose={handleClose} /> : <OrganizationForm onClose={handleClose} />}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>
                        {userType === null ? 'Join Our Community' : userType === 'volunteer' ? 'Volunteer Registration' : 'Organization Registration'}
                    </DrawerTitle>
                    <DrawerDescription>
                        {userType === null
                            ? "Choose how you'd like to get involved with our community."
                            : userType === 'volunteer'
                              ? 'Fill out your information to become a volunteer.'
                              : 'Register your organization to partner with us.'}
                    </DrawerDescription>
                </DrawerHeader>
                <div className="px-4">
                    {userType === null ? (
                        <UserTypeSelection onSelect={setUserType} />
                    ) : (
                        <div className="space-y-4">
                            <Button variant="ghost" size="sm" onClick={handleBack} className="flex h-auto items-center gap-2 p-0">
                                <ArrowLeft className="h-4 w-4" />
                                Back to selection
                            </Button>
                            {userType === 'volunteer' ? <VolunteerForm onClose={handleClose} /> : <OrganizationForm onClose={handleClose} />}
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
    );
}

function UserTypeSelection({ onSelect }: { onSelect: (type: UserType) => void }) {
    return (
        <div className="grid gap-4 py-4">
            <Button
                variant="outline"
                className="flex h-auto flex-col items-center gap-3 bg-transparent p-6 hover:bg-primary/5"
                onClick={() => onSelect('volunteer')}
            >
                <Users className="h-8 w-8 text-primary" />
                <div className="text-center">
                    <div className="font-semibold">I'm a Volunteer</div>
                    <div className="text-sm text-muted-foreground">Join as an individual volunteer</div>
                </div>
            </Button>
            <Button
                variant="outline"
                className="flex h-auto flex-col items-center gap-3 bg-transparent p-6 hover:bg-primary/5"
                onClick={() => onSelect('organization')}
            >
                <Building2 className="h-8 w-8 text-primary" />
                <div className="text-center">
                    <div className="font-semibold">I'm an Organization</div>
                    <div className="text-sm text-muted-foreground">Register your organization or company</div>
                </div>
            </Button>
        </div>
    );
}


const submitRegistrationData = async (data: VolunteerDataType | OrganisationDataType, url: string, token: string) => {
    console.log("Data before submit", data);

        const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

        let responseData;
            try {
                responseData = await response.json();
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (parseError) {
                throw new Error('Server returned invalid response. Please try again.');
            }

            if (!response.ok) {
                throw new Error(responseData.error || responseData.message || 'Failed to register');
            }

            console.log('Registration successful');
            // Refresh the page to update user roles and hide the dialog
            // window.location.reload();
            toast('Registration successful');
    }

function VolunteerForm({ className }: React.ComponentProps<'form'> & { onClose?: () => void }) {
    const { auth } = usePage<SharedData>().props;
    const [bio, setBio] = React.useState('');
    const [skills, setSkills] = React.useState('');
    const [experience, setExperience] = React.useState('none');
    const [availability, setAvailability] = React.useState('weekends');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const token = auth.token;

            if (!token) {
                throw new Error('Authentication token not available');
            }

            // Prepare volunteer data according to requirements
            const volunteerData : VolunteerDataType = {
                onboarding_status: 'pending',
                bio: bio || 'sample bio',
                skills: skills ? skills.split(',').map((skill) => skill.trim()) : ['skill1', 'skill2'],
                experience,
                availability,
            };

            // Submit volunteer registration to /api/volunteers route

            submitRegistrationData(volunteerData, '/api/volunteers', token);

            
        } catch (error) {
            console.error('Error registering volunteer:', error);
            setError(error instanceof Error ? error.message : 'Failed to register as volunteer. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className={cn('grid items-start gap-4', className)} onSubmit={handleSubmit}>
            {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200">{error}</div>}
            <div className="grid gap-2">
                <Label htmlFor="volunteer-bio">Bio</Label>
                <Textarea id="volunteer-bio" placeholder="Tell us about yourself..." value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="volunteer-skills">Skills (comma-separated)</Label>
                <Input
                    id="volunteer-skills"
                    placeholder="e.g., Teaching, Cooking, Event Planning"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="volunteer-experience">Experience Level</Label>
                <Select value={experience} onValueChange={setExperience}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">No Experience</SelectItem>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="volunteer-availability">Availability</Label>
                <Select value={availability} onValueChange={setAvailability}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="weekdays">Weekdays</SelectItem>
                        <SelectItem value="weekends">Weekends</SelectItem>
                        <SelectItem value="evenings">Evenings</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Registering...' : 'Register as Volunteer'}
            </Button>
        </form>
    );
}

function OrganizationForm({ className, onClose }: React.ComponentProps<'form'> & { onClose?: () => void }) {
    const { auth } = usePage<SharedData>().props;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<OrganisationDataType>(
        {
            organisationName: "",
            organisationDescription: "",
            organisationEmail: "",
            organisationPhone: "",
            organisationAddress: "",
            website: "",
            contactInfo: {},
            missionStatement: "",
            orgType: "",
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    }
    const handleSelectChange = (value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            orgType: value,
        }));
    };
    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            contactInfo: {
                ...prevData.contactInfo,
                [id]: value,
            },
        }));
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle organization form submission
        setIsSubmitting(true);
        setError(null);

        try {
            const token = auth.token;

            if (!token) {
                throw new Error('Authentication token not available');
            }

            // Submit organization registration to /api/organizations route
            submitRegistrationData(formData, '/api/organisations', token);

            
        } catch (error) {
            console.error('Error registering organization:', error);
            setError(error instanceof Error ? error.message : 'Failed to register organization. Please try again.');
        } finally {
            setIsSubmitting(false);
        }

        console.log('Organization form submitted');
        onClose?.();
    };



    return (
        <form className={cn('grid max-h-[60vh] items-start gap-4 overflow-y-auto', className)} onSubmit={handleSubmit}>
            {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200">{error}</div>}
            <div className="grid gap-2">
                <Label htmlFor="organisationName">Organization Name *</Label>
                <Input id="organisationName" value={formData.organisationName} onChange={handleChange} placeholder="Your Organization Name" required />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="organisationDescription">Description *</Label>
                <Textarea id="organisationDescription" value={formData.organisationDescription} onChange={handleChange} placeholder="Brief description of your organization" className="min-h-[80px]" required />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="organisationEmail">Organization Email *</Label>
                <Input type="email" id="organisationEmail" value={formData.organisationEmail} onChange={handleChange} placeholder="contact@organization.com" required />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="organisationPhone">Organization Phone *</Label>
                <Input type="tel" id="organisationPhone" value={formData.organisationPhone} onChange={handleChange} placeholder="+1 (555) 123-4567" required />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="organisationAddress">Address *</Label>
                <Textarea id="organisationAddress" value={formData.organisationAddress} onChange={handleChange} placeholder="Full address of your organization" className="min-h-[60px]" required />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input type="url" id="website" value={formData.website} onChange={handleChange} placeholder="https://www.yourorganization.com" />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="orgType">Organization Type *</Label>
                <Select value={formData.orgType} onValueChange={handleSelectChange} required>
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
                <Label htmlFor="missionStatement">Mission Statement *</Label>
                <Textarea id="missionStatement" value={formData.missionStatement} placeholder="Your organization's mission and goals" className="min-h-[80px]" onChange={handleChange} required />
            </div>

            <div className="grid gap-2">
                <Label aria-label='Primary Contact Information'>Primary Contact Information</Label>
                <Input id="facebook" value={formData.contactInfo.facebook} placeholder="Facebook page"
                    onChange={handleContactChange} />
                <Input id="twitter" value={formData.contactInfo.twitter} placeholder="Twitter handle"
                    onChange={handleContactChange} />
                <Input id="linkedin" value={formData.contactInfo.linkedin} placeholder="LinkedIn profile URL"
                    onChange={handleContactChange} />
                <Input id="other" value={formData.contactInfo.other} placeholder="Others"
                    onChange={handleContactChange} />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Registering...' : 'Register Organization'}
            </Button>
        </form>
    );
}
