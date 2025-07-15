import { SelectScrollable } from '@/components/ui/select-scrollable';

<SelectScrollable placeholder="Select the event you want to log your hours for:" />

export default function VolunteerLogTimeForm() {

    const items = [
        { value: 'event', label: 'Red Cross Volunteer' },
        { value: 'event', label: 'Habitat for Humanity' },
        { value: 'event', label: 'Food Bank Drive' },
        { value: 'event', label: 'Community Clean-Up' },
        { value: 'event', label: 'Animal Shelter' },
    ];
    return (
        <div className="flex flex-col gap-4">
            <SelectScrollable placeholder="Select the event you want to log your hours for:" items={items} />
            {/* Additional form elements can be added here */}
        </div>
    );
}