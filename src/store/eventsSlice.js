import dayjs from "dayjs";

const sampleEvents = {
  "2025-06-12": [
    {
      id: 1,
      title: "Little Tigers Karate",
      color: "#3B82F6",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
    },
    {
      id: 2,
      title: "Advanced Karate",
      color: "#8B5CF6",
      startTime: "10:30 AM",
      endTime: "11:30 AM",
    },
    {
      id: 3,
      title: "Belt Testing",
      color: "#F97316",
      startTime: "2:00 PM",
      endTime: "3:00 PM",
    },
    {
      id: 4,
      title: "Evening Class",
      color: "#22C55E",
      startTime: "5:00 PM",
      endTime: "6:00 PM",
    },
  ],
  "2025-06-28": [
    {
      id: 5,
      title: "Morning Meditation",
      color: "#14B8A6",
      startTime: "7:00 AM",
      endTime: "8:00 AM",
    },
    {
      id: 6,
      title: "Beginner Class",
      color: "#3B82F6",
      startTime: "9:00 AM",
      endTime: "10:00 AM",
    },
    {
      id: 7,
      title: "Private Lesson",
      color: "#8B5CF6",
      startTime: "9:30 AM",
      endTime: "10:30 AM",
    },
  ],
  "2025-06-29": [
    {
      id: 8,
      title: "Tournament Prep",
      color: "#F97316",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
    },
    {
      id: 9,
      title: "Team Meeting",
      color: "#14B8A6",
      startTime: "10:15 AM",
      endTime: "11:15 AM",
    },
    {
      id: 10,
      title: "Sparring Practice",
      color: "#8B5CF6",
      startTime: "10:45 AM",
      endTime: "11:45 AM",
    },
    {
      id: 11,
      title: "Parent Workshop",
      color: "#22C55E",
      startTime: "2:00 PM",
      endTime: "3:00 PM",
    },
    {
      id: 12,
      title: "Advanced Training",
      color: "#3B82F6",
      startTime: "4:00 PM",
      endTime: "5:00 PM",
    },
  ],
  "2025-06-30": [
    {
      id: 13,
      title: "Kids Class",
      color: "#3B82F6",
      startTime: "9:00 AM",
      endTime: "10:00 AM",
    },
    {
      id: 14,
      title: "Teen Class",
      color: "#8B5CF6",
      startTime: "9:00 AM",
      endTime: "10:00 AM",
    },
    {
      id: 15,
      title: "Adult Class",
      color: "#22C55E",
      startTime: "9:30 AM",
      endTime: "10:30 AM",
    },
    {
      id: 16,
      title: "Competition Team",
      color: "#F97316",
      startTime: "11:00 AM",
      endTime: "12:00 PM",
    },
    {
      id: 17,
      title: "Staff Training",
      color: "#14B8A6",
      startTime: "11:30 AM",
      endTime: "12:30 PM",
    },
  ],
  "2025-07-07": [
    {
      id: 18,
      title: "Tournament",
      color: "#3B82F6",
      startTime: "8:00 AM",
      endTime: "12:00 PM",
    },
    {
      id: 19,
      title: "Judges Meeting",
      color: "#8B5CF6",
      startTime: "8:30 AM",
      endTime: "9:30 AM",
    },
    {
      id: 20,
      title: "Opening Ceremony",
      color: "#22C55E",
      startTime: "9:00 AM",
      endTime: "10:00 AM",
    },
    {
      id: 21,
      title: "Forms Competition",
      color: "#F97316",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
    },
    {
      id: 22,
      title: "Sparring Competition",
      color: "#14B8A6",
      startTime: "2:00 PM",
      endTime: "4:00 PM",
    },
    {
      id: 23,
      title: "Awards Ceremony",
      color: "#3B82F6",
      startTime: "5:00 PM",
      endTime: "6:00 PM",
    },
  ],
  "2025-06-09": [
    {
      id: 1,
      title: "Review code",
      color: "#F97316",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
    },
    {
      id: 2,
      title: "Fix bugs",
      color: "#14B8A6",
      startTime: "10:15 AM",
      endTime: "11:15 AM",
    },
  ],
  "2025-07-11": [
    {
      id: 1,
      title: "Team Meeting",
      color: "#F97316",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
    },
    {
      id: 2,
      title: "Client Collabration and Resolving issue",
      color: "#14B8A6",
      startTime: "12:15 AM",
      endTime: "01:15 AM",
    },
  ],
  "2025-07-16": [
    {
      id: 1,
      title: "Testing Day",
      color: "#3B82F6",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
    },
    {
      id: 2,
      title: "Production day",
      color: "#8B5CF6",
      startTime: "03:15 AM",
      endTime: "06:15 AM",
    },
  ],
};

export const createEventsSlice = (set, get) => ({
  events: Object.entries(sampleEvents).flatMap(([date, events]) =>
    events.map((event) => ({
      ...event,
      date,
    }))
  ),
  currentDate: dayjs(),
  selectedEventId: null,
  selectedDate: null,
  isCreateEventModalOpen: false,
  isEventDetailsSidebarOpen: false,
  isImportModalOpen: false,

  // Actions
  setSelectedEventId: (id) => set({ selectedEventId: id }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  navigateMonth: (direction) =>
    set((state) => ({
      currentDate: state.currentDate.add(direction, "month"),
    })),
  setCreateEventModalOpen: (isOpen) => set({ isCreateEventModalOpen: isOpen }),
  setEventDetailsSidebarOpen: (isOpen) =>
    set({ isEventDetailsSidebarOpen: isOpen }),
  setImportModalOpen: (isOpen) => set({ isImportModalOpen: isOpen }),

  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),

  importEvents: (eventsJson) =>
    set((state) => ({
      events: [
        ...state.events,
        ...Object.entries(eventsJson).flatMap(([date, events]) =>
          events.map((event) => ({
            id: event.id,
            title: event.title,
            color: event.color,
            startTime: event.startTime,
            endTime: event.endTime,
            date: dayjs(date).format("YYYY-MM-DD"),
          }))
        ),
      ],
    })),

  updateEvent: (updatedEvent) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      ),
    })),

  deleteEvent: (eventId) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== eventId),
      selectedEventId: null,
    })),

  // Computed values/selectors
  getEventsForDate: (date) => {
    const events = get().events;
    return events.filter(
      (event) => event.date === dayjs(date).format("YYYY-MM-DD")
    );
  },

  getEventById: (id) => {
    const events = get().events;
    return events.find((event) => event.id === id);
  },
});
