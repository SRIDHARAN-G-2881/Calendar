"use client"

import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import CalendarGrid from "./CalendarGrid"
import dayjs from "dayjs"

export default function Calendar({ currentDate, setCurrentDate }) {
  const navigateMonth = (direction) => {
    const newDate = dayjs(currentDate).add(direction, 'month').toDate()
    setCurrentDate(newDate)
  }

  return (
    <div className="bg-card text-card-foreground rounded-lg border border-border h-full transition-all">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Full Event Schedule</h2>
            <p className="text-sm text-muted-foreground">
              {dayjs(currentDate).format('MMMM YYYY')}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => navigateMonth(-1)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium h-8 w-8 hover:bg-accent text-muted-foreground hover:text-accent-foreground"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigateMonth(1)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium h-8 w-8 hover:bg-accent text-muted-foreground hover:text-accent-foreground"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <button className="flex items-center space-x-2 px-3 py-1.5 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
              <MapPin className="w-4 h-4" />
              <span>34 West 15th Street, NY</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-2">
        <CalendarGrid currentDate={currentDate} />
      </div>
    </div>
  )
}
