import { X } from "lucide-react"
import * as Dialog from '@radix-ui/react-dialog'
import { useStore } from "../store/useStore"
import dayjs from "dayjs"

export default function CreateEventModal() {
    const isOpen = useStore(state => state.isCreateEventModalOpen)
    const setCreateEventModalOpen = useStore(state => state.setCreateEventModalOpen)
    const selectedDate = useStore(state => state.selectedDate)
    const addEvent = useStore(state => state.addEvent)

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const startTime = formData.get('startTime')
        const endTime = formData.get('endTime')

        // Validate that end time is after start time
        if (endTime <= startTime) {
            alert('End time must be after start time')
            return
        }

        const newEvent = {
            id: Date.now(), // Simple ID generation
            title: formData.get('title'),
            type: formData.get('type'),
            color: formData.get('color'),
            startTime,
            endTime,
            date: selectedDate,
            avatar: `https://i.pravatar.cc/32?img=${Math.floor(Math.random() * 70)}`,
        }
        addEvent(newEvent)
        setCreateEventModalOpen(false)
    }

    return (
        <Dialog.Root open={isOpen} onOpenChange={setCreateEventModalOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
                <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[400px] bg-card rounded-lg shadow-lg z-50 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <Dialog.Title className="text-lg font-semibold">
                            Add Event for {selectedDate ? dayjs(selectedDate).format('MMMM D, YYYY') : ''}
                        </Dialog.Title>
                        <Dialog.Close className="rounded-full p-2 hover:bg-accent text-muted-foreground hover:text-accent-foreground">
                            <X className="w-5 h-5" />
                        </Dialog.Close>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-muted-foreground mb-1">
                                Event Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                                placeholder="Enter event title"
                            />
                        </div>

                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-muted-foreground mb-1">
                                Event Type
                            </label>
                            <select
                                id="type"
                                name="type"
                                required
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
                            <label htmlFor="color" className="block text-sm font-medium text-muted-foreground mb-1">
                                Color
                            </label>
                            <select
                                id="color"
                                name="color"
                                required
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
                                <label htmlFor="startTime" className="block text-sm font-medium text-muted-foreground mb-1">
                                    Start Time
                                </label>
                                <input
                                    type="time"
                                    id="startTime"
                                    name="startTime"
                                    required
                                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                                />
                            </div>
                            <div>
                                <label htmlFor="endTime" className="block text-sm font-medium text-muted-foreground mb-1">
                                    End Time
                                </label>
                                <input
                                    type="time"
                                    id="endTime"
                                    name="endTime"
                                    required
                                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                            <button
                                type="button"
                                onClick={() => setCreateEventModalOpen(false)}
                                className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-accent"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
                            >
                                Create Event
                            </button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
} 