"use client"

import { ArrowLeft } from "lucide-react"

export default function Header() {
  return (
    <div className="flex items-center space-x-4 text-lg text-muted-foreground mb-6">
      <button className="hover:text-foreground transition-colors">
        <ArrowLeft className="w-5 h-5" />
      </button>
      <span className="cursor-pointer hover:text-foreground transition-colors">Events / </span>
      <span className="text-foreground font-medium">Day Planner</span>
    </div>
  )
}
