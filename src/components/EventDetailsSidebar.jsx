import { X, Users, Clock, MapPin, ChevronRight, Plus, Filter, LayoutList, SortAsc, ChevronLeft, Edit2, Save, Trash2 } from "lucide-react"
import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import dayjs from "dayjs"
import { useStore } from "../store/useStore"
import { useState } from "react"

export default function EventDetailsSidebar() {
    const selectedDate = useStore(state => state.selectedDate)
    const isOpen = useStore(state => state.isEventDetailsSidebarOpen)
    const setEventDetailsSidebarOpen = useStore(state => state.setEventDetailsSidebarOpen)
    const getEventsForDate = useStore(state => state.getEventsForDate)
    const selectedEventId = useStore(state => state.selectedEventId)
    const setSelectedEventId = useStore(state => state.setSelectedEventId)
    const updateEvent = useStore(state => state.updateEvent)
    const deleteEvent = useStore(state => state.deleteEvent)
    const setCreateEventModalOpen = useStore(state => state.setCreateEventModalOpen)

    const events = selectedDate ? getEventsForDate(selectedDate) : []
    const [isEditing, setIsEditing] = useState(false)

    const selectedEvent = events.find(event => event.id === selectedEventId)
    const [editedEvent, setEditedEvent] = useState(null)

    const handleEditClick = () => {
        setEditedEvent(selectedEvent)
        setIsEditing(true)
    }

    const handleSaveClick = () => {
        updateEvent(editedEvent)
        setIsEditing(false)
    }

    const handleBackClick = () => {
        setSelectedEventId(null)
        setIsEditing(false)
        setEditedEvent(null)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditedEvent(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDeleteClick = () => {
        if (confirm('Are you sure you want to delete this event?')) {
            deleteEvent(selectedEventId)
            handleBackClick()
        }
    }

    return (
        <Dialog.Root open={isOpen} onOpenChange={() => setEventDetailsSidebarOpen(false)}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
                <Dialog.Content className="fixed inset-y-0 right-0 w-[400px] bg-card border-l border-border shadow-lg z-50 animate-in slide-in-from-right flex flex-col">
                    <div className="p-6 border-b border-border">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                {selectedEventId && (
                                    <button
                                        onClick={handleBackClick}
                                        className="mr-2 p-2 hover:bg-accent rounded-lg text-muted-foreground hover:text-accent-foreground"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                )}
                                <div>
                                    <h2 className="text-lg font-semibold text-foreground">
                                        {selectedDate ? dayjs(selectedDate).format('MMMM D, YYYY') : ''}
                                    </h2>
                                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        34 West 15th Street, NY
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setEventDetailsSidebarOpen(false)}
                                className="rounded-full p-2 hover:bg-accent text-muted-foreground hover:text-accent-foreground"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {!selectedEventId && (
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => setCreateEventModalOpen(true)}
                                    className="flex items-center px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Event
                                </button>

                                <div className="flex items-center space-x-2">
                                    <DropdownMenu.Root>
                                        <DropdownMenu.Trigger asChild>
                                            <button className="p-2 hover:bg-accent rounded-lg text-muted-foreground hover:text-accent-foreground">
                                                <Filter className="w-4 h-4" />
                                            </button>
                                        </DropdownMenu.Trigger>
                                        <DropdownMenu.Portal>
                                            <DropdownMenu.Content className="bg-popover text-popover-foreground p-2 rounded-lg shadow-lg border border-border min-w-[180px]">
                                                <DropdownMenu.Label className="text-xs font-semibold text-muted-foreground px-2 mb-1">
                                                    Event Type
                                                </DropdownMenu.Label>
                                                <DropdownMenu.CheckboxItem className="px-2 py-1.5 text-sm hover:bg-accent rounded-md cursor-pointer">
                                                    Class
                                                </DropdownMenu.CheckboxItem>
                                                <DropdownMenu.CheckboxItem className="px-2 py-1.5 text-sm hover:bg-accent rounded-md cursor-pointer">
                                                    Training
                                                </DropdownMenu.CheckboxItem>
                                                <DropdownMenu.CheckboxItem className="px-2 py-1.5 text-sm hover:bg-accent rounded-md cursor-pointer">
                                                    Event
                                                </DropdownMenu.CheckboxItem>
                                                <DropdownMenu.CheckboxItem className="px-2 py-1.5 text-sm hover:bg-accent rounded-md cursor-pointer">
                                                    Competition
                                                </DropdownMenu.CheckboxItem>
                                            </DropdownMenu.Content>
                                        </DropdownMenu.Portal>
                                    </DropdownMenu.Root>

                                    <DropdownMenu.Root>
                                        <DropdownMenu.Trigger asChild>
                                            <button className="p-2 hover:bg-accent rounded-lg text-muted-foreground hover:text-accent-foreground">
                                                <LayoutList className="w-4 h-4" />
                                            </button>
                                        </DropdownMenu.Trigger>
                                        <DropdownMenu.Portal>
                                            <DropdownMenu.Content className="bg-popover text-popover-foreground p-2 rounded-lg shadow-lg border border-border min-w-[180px]">
                                                <DropdownMenu.RadioGroup>
                                                    <DropdownMenu.RadioItem className="px-2 py-1.5 text-sm hover:bg-accent rounded-md cursor-pointer">
                                                        List View
                                                    </DropdownMenu.RadioItem>
                                                    <DropdownMenu.RadioItem className="px-2 py-1.5 text-sm hover:bg-accent rounded-md cursor-pointer">
                                                        Timeline View
                                                    </DropdownMenu.RadioItem>
                                                </DropdownMenu.RadioGroup>
                                            </DropdownMenu.Content>
                                        </DropdownMenu.Portal>
                                    </DropdownMenu.Root>

                                    <DropdownMenu.Root>
                                        <DropdownMenu.Trigger asChild>
                                            <button className="p-2 hover:bg-accent rounded-lg text-muted-foreground hover:text-accent-foreground">
                                                <SortAsc className="w-4 h-4" />
                                            </button>
                                        </DropdownMenu.Trigger>
                                        <DropdownMenu.Portal>
                                            <DropdownMenu.Content className="bg-popover text-popover-foreground p-2 rounded-lg shadow-lg border border-border min-w-[180px]">
                                                <DropdownMenu.RadioGroup>
                                                    <DropdownMenu.RadioItem className="px-2 py-1.5 text-sm hover:bg-accent rounded-md cursor-pointer">
                                                        Time (Ascending)
                                                    </DropdownMenu.RadioItem>
                                                    <DropdownMenu.RadioItem className="px-2 py-1.5 text-sm hover:bg-accent rounded-md cursor-pointer">
                                                        Time (Descending)
                                                    </DropdownMenu.RadioItem>
                                                    <DropdownMenu.RadioItem className="px-2 py-1.5 text-sm hover:bg-accent rounded-md cursor-pointer">
                                                        Type
                                                    </DropdownMenu.RadioItem>
                                                </DropdownMenu.RadioGroup>
                                            </DropdownMenu.Content>
                                        </DropdownMenu.Portal>
                                    </DropdownMenu.Root>
                                </div>
                            </div>
                        )}

                        {selectedEventId && !isEditing && (
                            <div className="flex justify-end">
                                <button
                                    onClick={handleEditClick}
                                    className="flex items-center px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                                >
                                    <Edit2 className="w-4 h-4 mr-2" />
                                    Edit Event
                                </button>
                            </div>
                        )}

                        {selectedEventId && isEditing && (
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => {
                                        setIsEditing(false)
                                        setEditedEvent(null)
                                    }}
                                    className="flex items-center px-3 py-1.5 border border-border rounded-lg text-sm font-medium hover:bg-accent"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveClick}
                                    className="flex items-center px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {!selectedEventId && (
                            <div className="space-y-4">
                                {events.map(event => (
                                    <div
                                        key={event.id}
                                        className="group bg-accent/50 rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer"
                                        onClick={() => setSelectedEventId(event.id)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-1 h-8 bg-${event.color}-500 rounded-full`}></div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">{event.type}</p>
                                                    <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
                                        </div>

                                        <div className="flex space-x-6 text-sm text-muted-foreground mt-4 ml-4">
                                            <div className="flex items-center space-x-2">
                                                <Users className="w-4 h-4" />
                                                <span>25 out of 30</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Clock className="w-4 h-4" />
                                                <span>{event.startTime} - {event.endTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {selectedEventId && selectedEvent && (
                            <div className="space-y-6">
                                {isEditing ? (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-muted-foreground mb-1">
                                                Event Title
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={editedEvent.title}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-muted-foreground mb-1">
                                                Event Type
                                            </label>
                                            <select
                                                name="type"
                                                value={editedEvent.type}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                                            >
                                                <option value="Class">Class</option>
                                                <option value="Training">Training</option>
                                                <option value="Event">Event</option>
                                                <option value="Competition">Competition</option>
                                                <option value="Meeting">Meeting</option>
                                                <option value="Workshop">Workshop</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-muted-foreground mb-1">
                                                Color
                                            </label>
                                            <select
                                                name="color"
                                                value={editedEvent.color}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                                            >
                                                <option value="blue">Blue</option>
                                                <option value="purple">Purple</option>
                                                <option value="green">Green</option>
                                                <option value="orange">Orange</option>
                                                <option value="teal">Teal</option>
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-muted-foreground mb-1">
                                                    Start Time
                                                </label>
                                                <input
                                                    type="time"
                                                    name="startTime"
                                                    value={editedEvent.startTime}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-muted-foreground mb-1">
                                                    End Time
                                                </label>
                                                <input
                                                    type="time"
                                                    name="endTime"
                                                    value={editedEvent.endTime}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                                                />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-2 h-12 bg-${selectedEvent.color}-500 rounded-full`}></div>
                                            <div>
                                                <h3 className="text-2xl font-semibold text-foreground">{selectedEvent.title}</h3>
                                                <p className="text-lg text-muted-foreground">{selectedEvent.type}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-3 text-lg">
                                                <Clock className="w-5 h-5 text-muted-foreground" />
                                                <span>{selectedEvent.startTime} - {selectedEvent.endTime}</span>
                                            </div>
                                            <div className="flex items-center space-x-3 text-lg">
                                                <Users className="w-5 h-5 text-muted-foreground" />
                                                <span>25 out of 30</span>
                                            </div>
                                            <div className="flex items-center space-x-3 text-lg">
                                                <MapPin className="w-5 h-5 text-muted-foreground" />
                                                <span>34 West 15th Street, NY</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleDeleteClick}
                                            className="flex items-center px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete Event
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
} 