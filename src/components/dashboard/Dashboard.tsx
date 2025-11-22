import { KPICard } from "./KPICard"
import {
  Box,
  AlertTriangle,
  XCircle,
  TruckIcon,
  Send,
  ArrowLeftRight,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Screen } from "../../App"
import {
  calculateKPIs,
  getRecentActivities,
  getLowStockProducts,
} from "../../data/mockData"

interface DashboardProps {
  currentWarehouse: string
  onNavigate: (screen: Screen) => void
}

export function Dashboard({ currentWarehouse, onNavigate }: DashboardProps) {
  const kpis = calculateKPIs()
  const recentActivities = getRecentActivities()
  const lowStockProducts = getLowStockProducts()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Dashboard</h1>
        <p className="text-gray-600">Overview of your inventory operations</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Products"
          value={kpis.totalProducts.toString()}
          change={`+${Math.floor(Math.random() * 20) + 5}%`}
          trend="up"
          icon={Box}
          color="blue"
        />
        <KPICard
          title="Low Stock Items"
          value={kpis.lowStockItems.toString()}
          change={`+${Math.floor(Math.random() * 5) + 1}`}
          trend="up"
          icon={AlertTriangle}
          color="yellow"
        />
        <KPICard
          title="Out of Stock"
          value={kpis.outOfStockItems.toString()}
          change={`-${Math.floor(Math.random() * 3) + 1}`}
          trend="down"
          icon={XCircle}
          color="red"
        />
        <KPICard
          title="Pending Operations"
          value={kpis.pendingOperations.toString()}
          change={`-${Math.floor(Math.random() * 5) + 1}`}
          trend="down"
          icon={TruckIcon}
          color="purple"
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => onNavigate("receipts")}
            >
              <TruckIcon className="w-6 h-6 text-blue-600" />
              <span className="text-sm">New Receipt</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => onNavigate("deliveries")}
            >
              <Send className="w-6 h-6 text-green-600" />
              <span className="text-sm">New Delivery</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => onNavigate("transfers")}
            >
              <ArrowLeftRight className="w-6 h-6 text-purple-600" />
              <span className="text-sm">Transfer Stock</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => onNavigate("products")}
            >
              <Box className="w-6 h-6 text-indigo-600" />
              <span className="text-sm">Add Product</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activities</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("history")}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {activity.type === "receipt" && (
                      <TruckIcon className="w-5 h-5 text-blue-600" />
                    )}
                    {activity.type === "delivery" && (
                      <Send className="w-5 h-5 text-green-600" />
                    )}
                    {activity.type === "transfer" && (
                      <ArrowLeftRight className="w-5 h-5 text-purple-600" />
                    )}
                    {activity.type === "adjustment" && (
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                  <Badge
                    variant={
                      activity.status === "completed" ? "default" : "secondary"
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Low Stock Alert
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("products")}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sku}</p>
                    </div>
                    <Badge
                      variant="destructive"
                      className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    >
                      Low Stock
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500 rounded-full"
                        style={{
                          width: `${
                            (product.current / product.minimum) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 whitespace-nowrap">
                      {product.current}/{product.minimum} {product.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
