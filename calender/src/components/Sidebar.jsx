import { LayoutDashboard, Building2, Users, TrendingUp, CalendarIcon, FileText, Activity, User } from "lucide-react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: false },
  { icon: Building2, label: "Accounts", active: false },
  { icon: Users, label: "Contacts", active: false },
  { icon: TrendingUp, label: "Leads", active: false },
  { icon: CalendarIcon, label: "Calendar", active: true },
  { icon: FileText, label: "Cases", active: false },
  { icon: Activity, label: "Activities", active: false },
  { icon: User, label: "Users", active: false },
]

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="font-bold text-xl">CRMHUB</span>
        </div>
      </div>

      <nav className="flex-1 px-4">
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  )
}
