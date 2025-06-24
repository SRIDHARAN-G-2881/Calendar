import CalendarDay from "./CalendarDay"

const sampleEvents = {
  "2023-2-27": [
    {
      id: 1,
      title: "Onboarding Marketing",
      type: "marketing",
      time: "10:00 AM",
      avatar: "https://i.pravatar.cc/32?img=1",
    },
  ],
  "2023-2-6": [
    {
      id: 2,
      title: "Onboarding Marketing",
      type: "meeting",
      time: "2:00 PM",
      avatar: "https://i.pravatar.cc/32?img=2",
    },
  ],
  "2023-3-1": [
    {
      id: 3,
      title: "Onboarding Marketing",
      type: "marketing",
      time: "9:00 AM",
      avatar: "https://i.pravatar.cc/32?img=3",
    },
  ],
  "2023-3-3": [
    {
      id: 4,
      title: "Onboarding Marketing",
      type: "marketing",
      time: "11:00 AM",
      avatar: "https://i.pravatar.cc/32?img=4",
    },
  ],
  "2023-2-12": [
    {
      id: 5,
      title: "Onboarding Marketing",
      type: "warning",
      time: "3:00 PM",
      avatar: "https://i.pravatar.cc/32?img=5",
    },
  ],
  "2023-2-15": [
    {
      id: 6,
      title: "Onboarding Marketing",
      type: "success",
      time: "1:00 PM",
      avatar: "https://i.pravatar.cc/32?img=6",
    },
  ],
  "2023-2-18": [
    {
      id: 7,
      title: "Onboarding Marketing",
      type: "warning",
      time: "4:00 PM",
      avatar: "https://i.pravatar.cc/32?img=7",
    },
  ],
  "2023-2-29": [
    { id: 8, title: "Onboarding Marketing", type: "info", time: "10:30 AM", avatar: "https://i.pravatar.cc/32?img=8" },
  ],
  "2023-3-2": [
    {
      id: 9,
      title: "Onboarding Marketing",
      type: "marketing",
      time: "2:30 PM",
      avatar: "https://i.pravatar.cc/32?img=9",
    },
  ],
}

export default function CalendarGrid({ currentDate }) {
  const daysOfWeek = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  // Get previous month's last days
  const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0)
  const prevMonthDays = prevMonth.getDate()

  const calendarDays = []

  // Previous month's days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthDays - i
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, day)
    calendarDays.push({
      day,
      date,
      isCurrentMonth: false,
      events: sampleEvents[`${date.getFullYear()}-${date.getMonth() + 1}-${day}`] || [],
    })
  }

  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    calendarDays.push({
      day,
      date,
      isCurrentMonth: true,
      events: sampleEvents[`${date.getFullYear()}-${date.getMonth() + 1}-${day}`] || [],
    })
  }

  // Next month's days
  const remainingDays = 42 - calendarDays.length
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day)
    calendarDays.push({
      day,
      date,
      isCurrentMonth: false,
      events: sampleEvents[`${date.getFullYear()}-${date.getMonth() + 1}-${day}`] || [],
    })
  }

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
      {/* Days of week header */}
      {daysOfWeek.map((day) => (
        <div key={day} className="bg-gray-50 p-3 text-center">
          <span className="text-sm font-medium text-gray-600">{day}</span>
        </div>
      ))}

      {/* Calendar days */}
      {calendarDays.map((dayData, index) => (
        <CalendarDay
          key={index}
          day={dayData.day}
          date={dayData.date}
          isCurrentMonth={dayData.isCurrentMonth}
          events={dayData.events}
        />
      ))}
    </div>
  )
}
