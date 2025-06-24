import dayjs from "dayjs";

const sampleEvents = {
  "2025-6-12": [
    {
      id: 1,
      title: "Little Tigers Karate",
      type: "Class",
      color: "blue",
      time: "10:00 AM",
      avatar: "https://i.pravatar.cc/32?img=1",
    },
    {
      id: 2,
      title: "Advanced Karate",
      type: "Training",
      color: "purple",
      time: "10:30 AM",
      avatar: "https://i.pravatar.cc/32?img=2",
    },
    {
      id: 3,
      title: "Belt Testing",
      type: "Exam",
      color: "orange",
      time: "2:00 PM",
      avatar: "https://i.pravatar.cc/32?img=3",
    },
    {
      id: 4,
      title: "Evening Class",
      type: "Class",
      color: "green",
      time: "5:00 PM",
      avatar: "https://i.pravatar.cc/32?img=4",
    },
  ],
  "2025-6-13": [
    {
      id: 5,
      title: "Morning Meditation",
      type: "Wellness",
      color: "teal",
      time: "7:00 AM",
      avatar: "https://i.pravatar.cc/32?img=5",
    },
    {
      id: 6,
      title: "Beginner Class",
      type: "Class",
      color: "blue",
      time: "9:00 AM",
      avatar: "https://i.pravatar.cc/32?img=6",
    },
    {
      id: 7,
      title: "Private Lesson",
      type: "Training",
      color: "purple",
      time: "9:30 AM",
      avatar: "https://i.pravatar.cc/32?img=7",
    },
  ],
  "2025-6-14": [
    {
      id: 8,
      title: "Tournament Prep",
      type: "Training",
      color: "orange",
      time: "10:00 AM",
      avatar: "https://i.pravatar.cc/32?img=8",
    },
    {
      id: 9,
      title: "Team Meeting",
      type: "Meeting",
      color: "teal",
      time: "10:15 AM",
      avatar: "https://i.pravatar.cc/32?img=9",
    },
    {
      id: 10,
      title: "Sparring Practice",
      type: "Training",
      color: "purple",
      time: "10:45 AM",
      avatar: "https://i.pravatar.cc/32?img=10",
    },
    {
      id: 11,
      title: "Parent Workshop",
      type: "Workshop",
      color: "green",
      time: "2:00 PM",
      avatar: "https://i.pravatar.cc/32?img=11",
    },
    {
      id: 12,
      title: "Advanced Training",
      type: "Training",
      color: "blue",
      time: "4:00 PM",
      avatar: "https://i.pravatar.cc/32?img=12",
    },
  ],
  "2025-6-15": [
    {
      id: 13,
      title: "Kids Class",
      type: "Class",
      color: "blue",
      time: "9:00 AM",
      avatar: "https://i.pravatar.cc/32?img=13",
    },
    {
      id: 14,
      title: "Teen Class",
      type: "Class",
      color: "purple",
      time: "9:00 AM",
      avatar: "https://i.pravatar.cc/32?img=14",
    },
    {
      id: 15,
      title: "Adult Class",
      type: "Class",
      color: "green",
      time: "9:30 AM",
      avatar: "https://i.pravatar.cc/32?img=15",
    },
    {
      id: 16,
      title: "Competition Team",
      type: "Training",
      color: "orange",
      time: "11:00 AM",
      avatar: "https://i.pravatar.cc/32?img=16",
    },
    {
      id: 17,
      title: "Staff Training",
      type: "Meeting",
      color: "teal",
      time: "11:30 AM",
      avatar: "https://i.pravatar.cc/32?img=17",
    },
  ],
  "2025-6-20": [
    {
      id: 18,
      title: "Tournament",
      type: "Event",
      color: "blue",
      time: "8:00 AM",
      avatar: "https://i.pravatar.cc/32?img=18",
    },
    {
      id: 19,
      title: "Judges Meeting",
      type: "Meeting",
      color: "purple",
      time: "8:30 AM",
      avatar: "https://i.pravatar.cc/32?img=19",
    },
    {
      id: 20,
      title: "Opening Ceremony",
      type: "Event",
      color: "green",
      time: "9:00 AM",
      avatar: "https://i.pravatar.cc/32?img=20",
    },
    {
      id: 21,
      title: "Forms Competition",
      type: "Competition",
      color: "orange",
      time: "10:00 AM",
      avatar: "https://i.pravatar.cc/32?img=21",
    },
    {
      id: 22,
      title: "Sparring Competition",
      type: "Competition",
      color: "teal",
      time: "2:00 PM",
      avatar: "https://i.pravatar.cc/32?img=22",
    },
    {
      id: 23,
      title: "Awards Ceremony",
      type: "Event",
      color: "blue",
      time: "5:00 PM",
      avatar: "https://i.pravatar.cc/32?img=23",
    },
  ],
};

export const createEventsSlice = (set, get) => ({
  events: Object.entries(sampleEvents).flatMap(([date, events]) =>
    events.map((event) => ({
      ...event,
      date,
      startTime: event.time,
      endTime: dayjs(event.time, "h:mm A").add(1, "hour").format("h:mm A"),
    }))
  ),
  currentDate: dayjs(),
  selectedEventId: null,
  selectedDate: null,
  isCreateEventModalOpen: false,
  isEventDetailsSidebarOpen: false,

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

  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
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
    return events.filter((event) => event.date === date);
  },

  getEventById: (id) => {
    const events = get().events;
    return events.find((event) => event.id === id);
  },
});
