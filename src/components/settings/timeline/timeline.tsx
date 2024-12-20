import { MealEvent, BreakEvent, TimeEvent } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info, XIcon } from "lucide-react";
import { AddEventDialog } from "@/components/settings/timeline/add-event-dialog";

interface TimelineProps {
  events: (MealEvent | BreakEvent)[];
  onAddEvent: (event: TimeEvent) => void;
  onUpdateEvent: (event: MealEvent | BreakEvent) => void;
  onDeleteEvent: (id: string) => void;
  onLinkBreakToMeal: (breakId: string, mealId: string) => void;
  onUnlinkBreakFromMeal: (breakId: string, mealId: string) => void;
}

export function Timeline({
  events,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLinkBreakToMeal,
  onUnlinkBreakFromMeal,
}: TimelineProps) {
  const timelineStart = 6; // 6 AM
  const timelineEnd = 22; // 10 PM

  const getEventStyle = (event: MealEvent | BreakEvent) => {
    const startHour = parseInt(event.start.split(":")[0]);
    const startMinute = parseInt(event.start.split(":")[1]);
    const endHour = parseInt(event.end.split(":")[0]);
    const endMinute = parseInt(event.end.split(":")[1]);

    const startPosition =
      ((startHour - timelineStart + startMinute / 60) /
        (timelineEnd - timelineStart)) *
      100;
    const duration =
      ((endHour - startHour + (endMinute - startMinute) / 60) /
        (timelineEnd - timelineStart)) *
      100;

    return {
      left: `${startPosition}%`,
      width: `${duration}%`,
      backgroundColor:
        event.type === "meal" ? "rgb(34 197 94)" : "rgb(59 130 246)",
    };
  };

  const mealEvents = events.filter(
    (event): event is MealEvent => event.type === "meal",
  );

  return (
    <Card className="w-full mt-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-2">Timeline</h2>
        <p className="text-secondary-foreground mb-4">
          This timeline shows your scheduled meal order windows (green) and
          breaks (blue) from 6 AM to 10 PM. Hover over events for more details,
          and use the info icon on breaks to link them to meals.
        </p>
        <div className="relative h-[16rem] w-full bg-muted rounded-lg mt-8 mr-6 overflow-x-auto ">
          <div className="absolute top-0 bottom-0 left-0 right-0 min-w-[800px]">
            {/* Time labels */}
            <div className="absolute top-0 left-0 right-0 h-8 flex items-end">
              {Array.from({ length: timelineEnd - timelineStart + 1 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="flex-1 text-center text-xs font-medium text-500"
                    style={{ marginLeft: index === 0 ? "0" : "-0.5em" }}
                  >
                    {(index + timelineStart).toString().padStart(2, "0")}:00
                  </div>
                ),
              )}
            </div>

            {/* Vertical lines */}
            {Array.from({ length: timelineEnd - timelineStart + 1 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="absolute top-8 bottom-0 border-l border-gray-300 dark:border-gray-700"
                  style={{
                    left: `${(index / (timelineEnd - timelineStart)) * 100}%`,
                  }}
                />
              ),
            )}

            {/* Events */}
            {events.map((event) => (
              <TooltipProvider key={event.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="absolute h-16 rounded-md p-2 text-white text-xs cursor-pointer"
                      style={{
                        ...getEventStyle(event),
                        top: "3rem",
                      }}
                    >
                      <div className="font-bold">{event.name}</div>
                      <div>
                        {event.start} - {event.end}
                      </div>
                      {event.type === "break" && (
                        <div className="absolute bottom-1 right-1">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 rounded-full p-0 bg-muted bg-opacity-20 hover:bg-opacity-30 transition-colors"
                              >
                                <Info className="h-4 w-4 text-white" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48">
                              <Select
                                value={event.linkedMealId || "unlinked"}
                                onValueChange={(value) =>
                                  value !== "unlinked"
                                    ? onLinkBreakToMeal(event.id, value)
                                    : onUnlinkBreakFromMeal(
                                        event.id,
                                        event.linkedMealId!,
                                      )
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Link to meal" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="unlinked">
                                    Unlink
                                  </SelectItem>
                                  {mealEvents.map((mealEvent) => (
                                    <SelectItem
                                      key={mealEvent.id}
                                      value={mealEvent.id}
                                    >
                                      {mealEvent.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </PopoverContent>
                          </Popover>
                        </div>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex flex-col absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 items-center justify-center"
                        onClick={() => onDeleteEvent(event.id)}
                      >
                        <XIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{event.name}</p>
                    <p>
                      {event.start} - {event.end}
                    </p>
                    {event.type === "meal" && event.linkedBreaks.length > 0 && (
                      <p>Linked Breaks: {event.linkedBreaks.length}</p>
                    )}
                    {event.type === "break" && event.linkedMealId && (
                      <p>
                        Linked to:{" "}
                        {events.find((e) => e.id === event.linkedMealId)?.name}
                      </p>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <AddEventDialog onAddEvent={onAddEvent} />
        </div>
      </CardContent>
    </Card>
  );
}
