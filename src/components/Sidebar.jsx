import {
  Home,
  Tv,
  CalendarIcon,
  IdCard,
  FileText,
  CreditCard,
  Users,
  MessageSquare,
  Bell,
  Search,
  ChevronDown,
  Settings,
  Sun,
  Moon
} from "lucide-react"
import { useTheme } from "./ThemeProvider"

const menuSections = [
  {
    items: [{ icon: Home, label: "Home" }],
  },
  {
    title: "Manage",
    items: [
      { icon: CalendarIcon, label: "Events", active: true },

    ],
  },
]

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground text-muted-foreground relative"
    >
      <Sun className="w-4 h-4 transition-all dark:translate-x-2 dark:opacity-0" />
      <Moon className="absolute w-4 h-4 transition-all top-2 left-2 -translate-x-2 opacity-0 dark:translate-x-0 dark:opacity-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

export default function Sidebar() {
  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="font-bold text-sm text-primary-foreground">C</span>
            </div>
            <span className="font-bold text-lg text-foreground">Calendar</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-4">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.title && <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{section.title}</h3>}
            <div className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <a
                  key={itemIndex}
                  href="#"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${item.active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {item.badge && <span className="ml-auto bg-destructive text-destructive-foreground text-xs font-bold px-2 py-0.5 rounded-full">{item.badge}</span>}
                  {item.shortcut && <span className="ml-auto text-xs text-muted-foreground">{item.shortcut}</span>}
                </a>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="https://i.pravatar.cc/40?img=12" alt="Elijah Scott" className="w-8 h-8 rounded-full" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Sridharan</p>
            <p className="text-xs text-muted-foreground">sridharan@gmail.com</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground text-muted-foreground">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
