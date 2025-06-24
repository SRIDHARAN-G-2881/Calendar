import { create } from "zustand";
import { createCalendarSlice } from "./calendarSlice";
import { createEventsSlice } from "./eventsSlice";
import { createUISlice } from "./uiSlice";

export const useStore = create((...args) => ({
  ...createCalendarSlice(...args),
  ...createEventsSlice(...args),
  ...createUISlice(...args),
}));
