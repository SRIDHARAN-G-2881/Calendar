import CalendarDay from "./CalendarDay"
import { useStore } from "../store/useStore"
import { useMemo } from "react"
import dayjs from "dayjs"

export default function CalendarGrid({ currentDate }) {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const events = useStore(state => state.events)
    const getEventsForDate = useStore(state => state.getEventsForDate)

    const calendarDays = useMemo(() => {
        const start = currentDate.startOf('month').startOf('week')
        const end = currentDate.endOf('month').endOf('week')
        const days = []
        let day = start

        while (day.isBefore(end) || day.isSame(end, 'day')) {
            days.push({
                date: day.format('YYYY-M-D'),
                day: day.date(),
                isCurrentMonth: day.month() === currentDate.month()
            })
            day = day.add(1, 'day')
        }

        return days
    }, [currentDate])

    // Memoize events for each day to prevent unnecessary re-renders
    const dayEvents = useMemo(() => {
        return calendarDays.reduce((acc, dayData) => {
            acc[dayData.date] = getEventsForDate(dayData.date)
            return acc
        }, {})
    }, [calendarDays, events]) // Re-compute when events change

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
                    className={`border-r border-b border-border ${(index + 1) % 7 === 0 ? "border-r-0" : ""} transition-colors duration-150 hover:bg-accent cursor-pointer`}
                >
                    <CalendarDay
                        day={dayData.day}
                        date={dayData.date}
                        isCurrentMonth={dayData.isCurrentMonth}
                        events={dayEvents[dayData.date]}
                    />
                </div>
            ))}
        </div>
    )
}
