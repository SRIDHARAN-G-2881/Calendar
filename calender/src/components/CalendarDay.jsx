export default function CalendarDay({ day, date, isCurrentMonth, events }) {
  const getEventColor = (type) => {
    switch (type) {
      case "marketing":
        return "bg-orange-100 border-l-4 border-orange-400 text-orange-800"
      case "meeting":
        return "bg-blue-100 border-l-4 border-blue-400 text-blue-800"
      case "success":
        return "bg-green-100 border-l-4 border-green-400 text-green-800"
      case "warning":
        return "bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800"
      case "info":
        return "bg-cyan-100 border-l-4 border-cyan-400 text-cyan-800"
      default:
        return "bg-gray-100 border-l-4 border-gray-400 text-gray-800"
    }
  }

  return (
    <div className="bg-white min-h-[120px] p-2 relative">
      <div className={`text-sm font-medium mb-2 ${isCurrentMonth ? "text-gray-900" : "text-gray-400"}`}>{day}</div>

      <div className="space-y-1">
        {events.map((event) => (
          <div key={event.id} className={`p-2 rounded-md text-xs ${getEventColor(event.type)}`}>
            <div className="flex items-center space-x-2">
              <img src={event.avatar || "/placeholder.svg"} alt="Avatar" className="w-4 h-4 rounded-full" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{event.title}</p>
                <p className="text-xs opacity-75">{event.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
