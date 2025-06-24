"use client"

import { ChevronLeft, ChevronRight, Plus, Upload } from "lucide-react"
import CalendarGrid from "./CalendarGrid"
import { useStore } from "../store/useStore"
import dayjs from "dayjs"
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export default function Calendar() {
  const currentDate = useStore(state => state.currentDate)
  const navigateMonth = useStore(state => state.navigateMonth)
  const setCreateEventModalOpen = useStore(state => state.setCreateEventModalOpen)
  const setImportModalOpen = useStore(state => state.setImportModalOpen)

  return (
    <div className="bg-card text-card-foreground rounded-lg border border-border h-full transition-all">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Full Event Schedule</h2>
            <p className="text-sm text-muted-foreground">
              {currentDate.format('MMMM YYYY')}
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

            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="flex items-center space-x-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90">
                  <Plus className="w-4 h-4" />
                  <span>Add Event</span>
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="bg-popover text-popover-foreground p-2 rounded-lg shadow-lg border border-border min-w-[200px] animate-in fade-in-0 zoom-in-95 select-none">
                  <DropdownMenu.Item
                    className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-accent rounded-md cursor-pointer"
                    onClick={() => setCreateEventModalOpen(true)}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Event</span>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-accent rounded-md cursor-pointer"
                    onClick={() => setImportModalOpen(true)}
                  >
                    <Upload className="w-4 h-4" />
                    <span>Import from JSON</span>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
      </div>

      <div className="p-2">
        <CalendarGrid currentDate={currentDate} />
      </div>
    </div>
  )
}
