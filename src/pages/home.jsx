import Calendar from "../components/Calendar"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import EventDetails from "../components/EventDetails"
import EventDetailsSidebar from "../components/EventDetailsSidebar"
import CreateEventModal from '../components/CreateEventModal'

export default function Home() {
    return (
        <div className="flex h-screen bg-background font-sans">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-y-auto">
                <div className="p-8">
                    <Header />
                    <EventDetails />
                    <Calendar />
                </div>
            </main>
            <EventDetailsSidebar />
            <CreateEventModal />
        </div>
    )
}