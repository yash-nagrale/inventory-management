import {
  Package,
  LayoutDashboard,
  Box,
  TruckIcon,
  Send,
  ArrowLeftRight,
  FileText,
  History,
  Settings as SettingsIcon,
  LogOut,
} from "lucide-react"
import { Screen } from "../../App"

interface SidebarProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
  onLogout: () => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Box },
  { id: "receipts", label: "Receipts", icon: TruckIcon },
  { id: "deliveries", label: "Deliveries", icon: Send },
  { id: "transfers", label: "Internal Transfers", icon: ArrowLeftRight },
  { id: "adjustments", label: "Adjustments", icon: FileText },
  { id: "history", label: "Move History", icon: History },
  { id: "settings", label: "Settings", icon: SettingsIcon },
] as const

export function Sidebar({ currentScreen, onNavigate, onLogout }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-gray-900">Inventory Manager</div>
            <div className="text-xs text-gray-500">Inventory Management</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentScreen === item.id

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Screen)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  )
}
