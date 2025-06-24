import { Clock, Calendar } from "lucide-react"
import { useStore } from "../store/useStore"
import { useMemo } from "react"
import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export default function EventDetails() {
    const events = useStore(state => state.events)

    const upcomingEvent = useMemo(() => {
        const now = dayjs()

        const futureEvents = events
            .map(event => ({
                ...event,
                // Create a full datetime object for sorting
                startDateTime: dayjs(`${event.date} ${event.startTime}`, 'YYYY-MM-DD h:mm A'),
            }))
            .filter(event => event.startDateTime.isAfter(now)) // Filter out past events
            .sort((a, b) => {
                if (a.startDateTime.isAfter(b.startDateTime)) return 1
                if (a.startDateTime.isBefore(b.startDateTime)) return -1
                return 0
            })

        return futureEvents[0]
    }, [events])

    const getEventDayDisplay = (date) => {
        const eventDate = dayjs(date)
        const today = dayjs().startOf('day')
        const tomorrow = dayjs().add(1, 'day').startOf('day')

        if (eventDate.isSame(today, 'day')) {
            return "Today"
        }
        if (eventDate.isSame(tomorrow, 'day')) {
            return "Tomorrow"
        }
        return eventDate.format("dddd, MMMM D")
    }

    if (!upcomingEvent) {
        return (
            <div className="bg-card rounded-lg border border-border p-6 mb-6 text-center">
                <h1 className="text-xl font-bold text-foreground">No upcoming events</h1>
                <p className="text-muted-foreground mt-2">Check back later or add a new event to the calendar.</p>
            </div>
        )
    }

    return (
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
            <p className="text-sm font-semibold text-primary mb-2">NEXT UPCOMING EVENT</p>
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-1 h-8 rounded-full" style={{ backgroundColor: upcomingEvent.color }}></div>
                        <div>
                            <p className="text-sm text-muted-foreground">{getEventDayDisplay(upcomingEvent.date)}</p>
                            <h1 className="text-2xl font-bold text-foreground">{upcomingEvent.title}</h1>
                        </div>
                    </div>
                    <div className="flex space-x-6 text-sm text-muted-foreground mt-4 ml-1">
                        <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{upcomingEvent.startTime} - {upcomingEvent.endTime}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm font-medium text-foreground">{dayjs(upcomingEvent.date).format("dddd, MMMM D, YYYY")}</p>
                    </div>
                </div>
            </div>
        </div>
    )
} 