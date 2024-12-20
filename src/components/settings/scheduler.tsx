"use client";

import { useTimelineScheduler } from "@/hooks/use-timeline";
import { Timeline } from "@/components/settings/timeline/timeline";
import { TimeEvent } from "@/lib/types";
import { InfoButton } from "@/components/settings/timeline/info-button";

export function Scheduler() {
  const {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    linkBreakToMeal,
    unlinkBreakFromMeal,
  } = useTimelineScheduler();

  const handleAddEvent = (newEvent: TimeEvent) => {
    addEvent(newEvent);
  };

  return (
    <div className="mx-auto">
      <InfoButton />
      <p className="mb-6 text-secondary-foreground">
        Efficiently manage your meal order windows and breaks throughout the
        day. Use this interactive timeline to visualize, add, and organize your
        schedule.
      </p>

      <Timeline
        events={events}
        onAddEvent={handleAddEvent}
        onUpdateEvent={updateEvent}
        onDeleteEvent={deleteEvent}
        onLinkBreakToMeal={linkBreakToMeal}
        onUnlinkBreakFromMeal={unlinkBreakFromMeal}
      />

      <div className="mt-6 p-4 bg-muted rounded-lg ">
        <h2 className="text-xl font-semibold mb-2">How to Use</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Click "Add New Event" to create a meal order window or break</li>
          <li>Drag events on the timeline to adjust their time</li>
          <li>
            For breaks, use the info icon to link them to meal order windows
          </li>
          <li>Click the "×" to delete an event</li>
        </ol>
      </div>
    </div>
  );
}
