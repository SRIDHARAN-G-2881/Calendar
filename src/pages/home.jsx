import { useState } from "react"
import Sidebar from "../components/sidebar"
import Header from "../components/header"
import Calendar from "../components/Calendar"
import EventDetails from "../components/EventDetails"

export default function Home() {
    const [currentDate, setCurrentDate] = useState(new Date())

    return (
        <div className="flex h-screen bg-background font-sans">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-y-auto">
                <div className="p-8">
                    <Header />
                    <EventDetails />
                    <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} />
                </div>
            </main>
        </div>
    )
}