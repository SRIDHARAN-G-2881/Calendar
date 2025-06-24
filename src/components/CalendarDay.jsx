import dayjs from "dayjs"
import * as Popover from '@radix-ui/react-popover';
import { useStore } from "../store/useStore"

// A simple check for a valid hex color
const isValidHex = (color) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)

export default function CalendarDay({ day, date, isCurrentMonth, events }) {
  const isToday = dayjs(date).isSame(dayjs(), 'day')
  const visibleEvents = events.slice(0, 2)
  const remainingEvents = events.length - 2

  const setSelectedDate = useStore(state => state.setSelectedDate)
  const setEventDetailsSidebarOpen = useStore(state => state.setEventDetailsSidebarOpen)
  const setSelectedEventId = useStore(state => state.setSelectedEventId)

  const handleDayClick = () => {
    setSelectedDate(date)
    setEventDetailsSidebarOpen(true)
  }

  const handleEventClick = (e, eventId) => {
    e.stopPropagation()
    setSelectedEventId(eventId)
    setSelectedDate(date)
    setEventDetailsSidebarOpen(true)
  }

  return (
    <div
      className={`relative min-h-[110px] p-2.5`}
      onClick={handleDayClick}
    >
      <div className={`absolute top-2 right-2 text-sm ${isToday
        ? 'w-7 h-7 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold'
        : isCurrentMonth
          ? 'text-foreground'
          : 'text-muted-foreground/50'
        }`}>
        {day}
      </div>
      <div className="mt-8 space-y-1.5">
        {visibleEvents.map(event => {
          const color = isValidHex(event.color) ? event.color : '#3B82F6' // Fallback color
          return (
            <Popover.Root key={event.id}>
              <Popover.Trigger asChild>
                <div
                  className={`event-pill bg-opacity-10 hover:bg-opacity-20`}
                  style={{
                    backgroundColor: `${color}1A`, // hex with opacity
                    color: color
                  }}
                  onClick={(e) => handleEventClick(e, event.id)}
                >
                  <div
                    className={`w-2 h-2 rounded-full`}
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="font-medium truncate">{event.title}</span>
                </div>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content sideOffset={5} className="bg-card p-3 rounded-lg shadow-lg border border-border w-60 z-50 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.startTime} - {event.endTime}</p>
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          )
        })}
        {remainingEvents > 0 && (
          <div
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
            onClick={(e) => {
              e.stopPropagation()
              handleDayClick()
            }}
          >
            +{remainingEvents} more
          </div>
        )}
      </div>
    </div>
  )
}
