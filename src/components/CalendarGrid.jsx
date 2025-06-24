import CalendarDay from "./CalendarDay"
import dayjs from "dayjs"

const sampleEvents = {
  "2025-6-12": [
    {
      id: 1,
      title: "Onboarding Marketing",
      type: "marketing",
      time: "10:00 AM",
      avatar: "https://i.pravatar.cc/32?img=1",
    },
  ],
  "2025-6-13": [
    {
      id: 2,
      title: "Onboarding Marketing",
      type: "meeting",
      time: "2:00 PM",
      avatar: "https://i.pravatar.cc/32?img=2",
    },
  ],
  "2025-6-20": [
    {
      id: 3,
      title: "Onboarding Marketing",
      type: "marketing",
      time: "9:00 AM",
      avatar: "https://i.pravatar.cc/32?img=3",
    },
  ],
  "2025-6-21": [
    {
      id: 4,
      title: "Onboarding Marketing",
      type: "marketing",
      time: "11:00 AM",
      avatar: "https://i.pravatar.cc/32?img=4",
    },
  ],
  "2025-6-29": [
    {
      id: 5,
      title: "Onboarding Marketing",
      type: "warning",
      time: "3:00 PM",
      avatar: "https://i.pravatar.cc/32?img=5",
    },
  ],
  "2025-6-30": [
    {
      id: 6,
      title: "Onboarding Marketing",
      type: "success",
      time: "1:00 PM",
      avatar: "https://i.pravatar.cc/32?img=6",
    },
  ],
  "2025-7-1": [
    {
      id: 7,
      title: "Onboarding Marketing",
      type: "warning",
      time: "4:00 PM",
      avatar: "https://i.pravatar.cc/32?img=7",
    },
  ],
    "2025-7-2": [
    { id: 8, title: "Onboarding Marketing", type: "info", time: "10:30 AM", avatar: "https://i.pravatar.cc/32?img=8" },
  ],
  "2025-7-3": [
    {
      id: 9,
      title: "Onboarding Marketing",
      type: "marketing",
      time: "2:30 PM",
      avatar: "https://i.pravatar.cc/32?img=9",
    },
  ],
  "2025-7-4": [
    {
      id: 1,
      title: "Little Tigers...",
      type: "marketing",
      time: "10:00 AM",
      avatar: "https://i.pravatar.cc/32?img=1",
    },
  ],
  "2025-7-5": [
    {
      id: 2,
      title: "Little Tigers...",
      type: "marketing",
      time: "10:00 AM",
      avatar: "https://i.pravatar.cc/32?img=1",
    },
  ],
  "2025-7-6": [
    {
      id: 3,
      title: "Little Tigers...",
      type: "marketing",
      time: "10:00 AM",
      avatar: "https://i.pravatar.cc/32?img=1",
    },
  ],
}

export default function CalendarGrid({ currentDate }) {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  const d = dayjs(currentDate)
  const firstDayOfMonth = d.startOf('month')
  const lastDayOfMonth = d.endOf('month')

  const startOfMonthDay = firstDayOfMonth.day() // 0 = Sun, 1 = Mon
  const daysInMonth = d.daysInMonth()

  const calendarDays = []

  // Previous month's days
  const daysFromPrevMonth = startOfMonthDay === 0 ? 6 : startOfMonthDay - 1
  for (let i = daysFromPrevMonth; i > 0; i--) {
    const date = firstDayOfMonth.subtract(i, 'day')
    calendarDays.push({
      day: date.date(),
      date: date.toDate(),
      isCurrentMonth: false,
      events: sampleEvents[date.format('YYYY-M-D')] || [],
    })
  }

  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = firstDayOfMonth.date(day)
    calendarDays.push({
      day,
      date: date.toDate(),
      isCurrentMonth: true,
      events: sampleEvents[date.format('YYYY-M-D')] || [],
    })
  }

  // Next month's days
  const remainingDays = 42 - calendarDays.length
  for (let i = 1; i <= remainingDays; i++) {
    const date = lastDayOfMonth.add(i, 'day')
    calendarDays.push({
      day: date.date(),
      date: date.toDate(),
      isCurrentMonth: false,
      events: sampleEvents[date.format('YYYY-M-D')] || [],
    })
  }

  return (
    <div className="grid grid-cols-7">
      {/* Days of week header */}
      {daysOfWeek.map((day) => (
        <div key={day} className="p-3 text-center border-b border-border">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer">{day}</span>
        </div>
      ))}

      {/* Calendar days */}
      {calendarDays.map((dayData, index) => (
        <div
          key={index}
          className={`border-r border-b border-border ${(index + 1) % 7 === 0 ? "border-r-0" : ""} transition-colors duration-150 hover:bg-accent`}
        >
          <CalendarDay
            day={dayData.day}
            date={dayData.date}
            isCurrentMonth={dayData.isCurrentMonth}
            events={dayData.events}
          />
        </div>
      ))}
    </div>
  )
}
