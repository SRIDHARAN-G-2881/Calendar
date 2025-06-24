import dayjs from "dayjs"
import * as Popover from '@radix-ui/react-popover';
import { useStore } from "../store/useStore"

export default function CalendarDay({ day, date, isCurrentMonth, events }) {
  const isToday = dayjs(date).isSame(dayjs(), 'day')
  const visibleEvents = events.slice(0, 2)
  const remainingEvents = events.length - 2

  const setSelectedDate = useStore(state => state.setSelectedDate)
  const setEventDetailsSidebarOpen = useStore(state => state.setEventDetailsSidebarOpen)
  const setSelectedEventId = useStore(state => state.setSelectedEventId)

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/50',
      text: 'text-blue-700 dark:text-blue-300',
      dot: 'bg-blue-500',
      hover: 'hover:bg-blue-100 dark:hover:bg-blue-900',
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/50',
      text: 'text-purple-700 dark:text-purple-300',
      dot: 'bg-purple-500',
      hover: 'hover:bg-purple-100 dark:hover:bg-purple-900',
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/50',
      text: 'text-green-700 dark:text-green-300',
      dot: 'bg-green-500',
      hover: 'hover:bg-green-100 dark:hover:bg-green-900',
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-900/50',
      text: 'text-orange-700 dark:text-orange-300',
      dot: 'bg-orange-500',
      hover: 'hover:bg-orange-100 dark:hover:bg-orange-900',
    },
    teal: {
      bg: 'bg-teal-50 dark:bg-teal-900/50',
      text: 'text-teal-700 dark:text-teal-300',
      dot: 'bg-teal-500',
      hover: 'hover:bg-teal-100 dark:hover:bg-teal-900',
    }
  };

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
          const classes = colorClasses[event.color] || colorClasses.blue;
          return (
            <Popover.Root key={event.id}>
              <Popover.Trigger asChild>
                <div
                  className={`event-pill ${classes.bg} ${classes.text} ${classes.hover}`}
                  onClick={(e) => handleEventClick(e, event.id)}
                >
                  <div className={`w-2 h-2 ${classes.dot} rounded-full`}></div>
                  <span className="font-medium truncate">{event.title}</span>
                </div>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content sideOffset={5} className="bg-card p-3 rounded-lg shadow-lg border border-border w-60 z-50 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
                  <div className="flex items-center space-x-3">
                    <img src={event.avatar} alt="Avatar" className="w-9 h-9 rounded-full" />
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground truncate">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.startTime} - {event.endTime}</p>
                    </div>
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
