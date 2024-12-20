import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimeEvent } from "@/lib/types";
import { AlarmClockPlus, CalendarPlus } from "lucide-react";

interface AddEventDialogProps {
  onAddEvent: (event: TimeEvent) => void;
}

export function AddEventDialog({ onAddEvent }: AddEventDialogProps) {
  const [newEvent, setNewEvent] = useState<Partial<TimeEvent>>({});
  const [isOpen, setIsOpen] = useState(false);

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 6; hour < 22; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        options.push(time);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const handleAddEvent = () => {
    if (newEvent.name && newEvent.start && newEvent.end && newEvent.type) {
      onAddEvent(newEvent as TimeEvent);
      setNewEvent({});
      setIsOpen(false);
    } else {
      alert("Please fill in all fields before adding an event.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <CalendarPlus className="h-5 w-5" />
          Add New Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>
            Create a new event for your timeline. Fill out the details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="event-name" className="text-right">
              Name
            </Label>
            <Input
              id="event-name"
              value={newEvent.name || ""}
              onChange={(e) =>
                setNewEvent({ ...newEvent, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="event-type" className="text-right">
              Type
            </Label>
            <Select
              value={newEvent.type}
              onValueChange={(value) =>
                setNewEvent({ ...newEvent, type: value as "meal" | "break" })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meal">Meal</SelectItem>
                <SelectItem value="break">Break</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="event-start" className="text-right">
              Start Time
            </Label>
            <Select
              value={newEvent.start}
              onValueChange={(value) =>
                setNewEvent({ ...newEvent, start: value })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select start time" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="event-end" className="text-right">
              End Time
            </Label>
            <Select
              value={newEvent.end}
              onValueChange={(value) =>
                setNewEvent({ ...newEvent, end: value })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select end time" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddEvent}>Add Event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
