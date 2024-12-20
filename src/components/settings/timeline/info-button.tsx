import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";

export function InfoButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="absolute top-2 right-2">
          <Info className="h-4 w-4" />
          <span className="sr-only">More information</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Interactive Timeline Scheduler Information</DialogTitle>
          <DialogDescription>
            Detailed information about using the Interactive Timeline Scheduler
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <h3 className="text-lg font-semibold">Overview</h3>
          <p>
            The Interactive Timeline Scheduler allows you to manage meal order
            windows and breaks throughout the day. You can add, delete, and link
            events on a visual timeline.
          </p>
          <h3 className="text-lg font-semibold">Key Features</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Add meal order windows and breaks</li>
            <li>Visualize events on a timeline from 6 AM to 10 PM</li>
            <li>Link breaks to specific meal order windows</li>
            <li>Delete events as needed</li>
          </ul>
          <h3 className="text-lg font-semibold">How to Use</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Click "Add New Event" to create a new meal or break event</li>
            <li>Fill in the event details in the dialog that appears</li>
            <li>
              For break events, use the info icon to link them to meal events
            </li>
            <li>To delete an event, click the "×" button on the event card</li>
          </ol>
          <h3 className="text-lg font-semibold">Tips</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Hover over events to see more details</li>
            <li>
              Use the timeline to visualize your day's schedule at a glance
            </li>
            <li>
              Ensure breaks are linked to appropriate meal windows for better
              organization
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
