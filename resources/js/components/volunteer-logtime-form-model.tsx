import { SelectScrollable } from '@/components/ui/select-scrollable';
import { TimeLog } from './ui/time-log';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function VolunteerLogTimeForm() {

    const items = [
        { value: 'event', label: 'Red Cross Volunteer' },
        { value: 'event', label: 'Habitat for Humanity' },
        { value: 'event', label: 'Food Bank Drive' },
        { value: 'event', label: 'Community Clean-Up' },
        { value: 'event', label: 'Animal Shelter' },
    ];
    return (
        <Card className="w-full max-w-sm">
        <CardHeader>
        <CardTitle>VolunteerMatch</CardTitle>
        <CardDescription>
          Log your volunteering hours here
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <SelectScrollable 
                placeholder="Select your event:" 
                items={items} />
                {/* Additional form elements can be added here */}
            <div className="grid gap-2">
              <TimeLog />
              <TimeLog />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="comments">Status:</Label>
              <Input id="comments" placeholder="Not revised" aria-readonly/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
    );
}