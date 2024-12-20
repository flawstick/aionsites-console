import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

interface EditEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: TimeEvent;
  onUpdateEvent: (updatedEvent: TimeEvent) => void;
  children: React.ReactNode;
}

export function EditEventDialog({
  open,
  onOpenChange,
  event,
  onUpdateEvent,
}: EditEventDialogProps) {
  const [editedEvent, setEditedEvent] = useState<TimeEvent>(event);

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

  const handleUpdateEvent = () => {
    if (
      editedEvent.name &&
      editedEvent.start &&
      editedEvent.end &&
      editedEvent.type
    ) {
      onUpdateEvent(editedEvent);
      onOpenChange(false);
    } else {
      alert("Please fill in all fields before updating the event.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>
            Modify the details of your event. Make sure all fields are filled
            out.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="event-name" className="text-right">
              Name
            </Label>
            <Input
              id="event-name"
              value={editedEvent.name || ""}
              onChange={(e) =>
                setEditedEvent({ ...editedEvent, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="event-type" className="text-right">
              Type
            </Label>
            <Select
              value={editedEvent.type}
              onValueChange={(value) =>
                setEditedEvent({
                  ...editedEvent,
                  type: value as "meal" | "break",
                })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meal">Meal Ordering</SelectItem>
                <SelectItem value="break">Break</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="event-start" className="text-right">
              Start Time
            </Label>
            <Select
              value={editedEvent.start}
              onValueChange={(value) =>
                setEditedEvent({ ...editedEvent, start: value })
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
              value={editedEvent.end}
              onValueChange={(value) =>
                setEditedEvent({ ...editedEvent, end: value })
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
          <Button onClick={handleUpdateEvent}>Update Event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
