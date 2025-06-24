import dayjs from "dayjs"

export default function CalendarDay({ day, date, isCurrentMonth, events }) {
  const isToday = dayjs(date).isSame(dayjs(), 'day')

  return (
    <div className={`relative min-h-[110px] p-2.5`}>
      <div className={`absolute top-2 right-2 text-sm ${isToday
        ? 'w-7 h-7 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold'
        : isCurrentMonth
          ? 'text-foreground'
          : 'text-muted-foreground/50'
        }`}>
        {day}
      </div>
      <div className="mt-8 space-y-1.5">
        {events.map(event => (
          <div key={event.id} className="event-pill bg-green-50 text-green-700 hover:bg-green-100 transition-colors">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-xs font-medium truncate">{event.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
