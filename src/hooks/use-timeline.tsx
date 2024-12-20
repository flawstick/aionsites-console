import { useState, useCallback } from "react";
import { TimeEvent, MealEvent, BreakEvent } from "@/lib/types";

export function useTimelineScheduler() {
  const [events, setEvents] = useState<(MealEvent | BreakEvent)[]>([]);

  const addEvent = useCallback((newEvent: Omit<TimeEvent, "id">) => {
    const eventWithId = {
      ...newEvent,
      id: Date.now().toString(),
      linkedBreaks: newEvent.type === "meal" ? [] : undefined,
      linkedMealId: newEvent.type === "break" ? undefined : undefined,
    } as MealEvent | BreakEvent;
    setEvents((prevEvents) => [...prevEvents, eventWithId]);
  }, []);

  const updateEvent = useCallback((updatedEvent: MealEvent | BreakEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    );
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.filter((event) => event.id !== id);
      return updatedEvents.map((event) => {
        if (event.type === "meal") {
          return {
            ...event,
            linkedBreaks: event.linkedBreaks.filter(
              (breakId) => breakId !== id,
            ),
          };
        } else if (event.type === "break" && event.linkedMealId === id) {
          return { ...event, linkedMealId: undefined };
        }
        return event;
      });
    });
  }, []);

  const linkBreakToMeal = useCallback((breakId: string, mealId: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        if (event.id === breakId && event.type === "break") {
          return {
            ...event,
            linkedMealId: mealId === "unlinked" ? undefined : mealId,
          };
        }
        if (
          event.id === mealId &&
          event.type === "meal" &&
          mealId !== "unlinked"
        ) {
          return { ...event, linkedBreaks: [...event.linkedBreaks, breakId] };
        }
        return event;
      }),
    );
  }, []);

  const unlinkBreakFromMeal = useCallback((breakId: string, mealId: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        if (event.id === breakId && event.type === "break") {
          return { ...event, linkedMealId: undefined };
        }
        if (event.id === mealId && event.type === "meal") {
          return {
            ...event,
            linkedBreaks: event.linkedBreaks.filter((id) => id !== breakId),
          };
        }
        return event;
      }),
    );
  }, []);

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    linkBreakToMeal,
    unlinkBreakFromMeal,
  };
}
