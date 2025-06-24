import { Users, Clock, Edit2 } from "lucide-react"

export default function EventDetails() {
    return (
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-1 h-8 bg-green-500 rounded-full"></div>
                        <div>
                            <p className="text-sm text-muted-foreground">Weekly</p>
                            <h1 className="text-2xl font-bold text-foreground">Little Tigers Karate</h1>
                        </div>
                    </div>
                    <div className="flex space-x-6 text-sm text-muted-foreground mt-4 ml-1">
                        <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>Members - 25 out of 30</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>Time - 3:00 PM - 4:00 PM</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex items-center space-x-2 mb-4">
                        <p className="text-sm font-medium text-muted-foreground">Event Days</p>
                        <span className="px-3 py-1 bg-secondary rounded-md text-sm font-medium text-secondary-foreground">Mon</span>
                        <span className="px-3 py-1 bg-secondary rounded-md text-sm font-medium text-secondary-foreground">Thu</span>
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-accent">
                        <Edit2 className="w-4 h-4" />
                        <span>Edit Master Event</span>
                    </button>
                </div>
            </div>
        </div>
    )
} 