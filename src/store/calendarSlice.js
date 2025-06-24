import dayjs from "dayjs";

export const createCalendarSlice = (set, get) => ({
  // State
  currentDate: new Date(),
  view: "month", // month, week, day

  // Actions
  setCurrentDate: (date) => set({ currentDate: date }),
  navigateMonth: (direction) =>
    set((state) => ({
      currentDate: dayjs(state.currentDate).add(direction, "month").toDate(),
    })),
  navigateWeek: (direction) =>
    set((state) => ({
      currentDate: dayjs(state.currentDate).add(direction, "week").toDate(),
    })),
  setView: (view) => set({ view }),

  // Computed values (can be used with selectors)
  getCurrentMonthDays: () => {
    const state = get();
    const d = dayjs(state.currentDate);
    const firstDayOfMonth = d.startOf("month");
    const lastDayOfMonth = d.endOf("month");
    const startOfMonthDay = firstDayOfMonth.day();
    const daysInMonth = d.daysInMonth();
    const calendarDays = [];

    // Previous month's days
    const daysFromPrevMonth = startOfMonthDay === 0 ? 6 : startOfMonthDay - 1;
    for (let i = daysFromPrevMonth; i > 0; i--) {
      const date = firstDayOfMonth.subtract(i, "day");
      calendarDays.push({
        day: date.date(),
        date: date.toDate(),
        isCurrentMonth: false,
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = firstDayOfMonth.date(day);
      calendarDays.push({
        day,
        date: date.toDate(),
        isCurrentMonth: true,
      });
    }

    // Next month's days
    const remainingDays = 42 - calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = lastDayOfMonth.add(i, "day");
      calendarDays.push({
        day: date.date(),
        date: date.toDate(),
        isCurrentMonth: false,
      });
    }

    return calendarDays;
  },
});
