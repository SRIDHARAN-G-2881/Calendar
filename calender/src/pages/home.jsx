import { useState } from "react"
import Sidebar from "../components/sidebar"
import Header from "../components/header"
import Calendar from "../components/calendar"

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 1, 26)) // February 26, 2023
  const [view, setView] = useState("Monthly")

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header view={view} setView={setView} />
        <main className="flex-1 p-6">
          <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} />
        </main>
      </div>
    </div>
  )
}