import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { Separator } from "../ui/separator"
import { toast } from "sonner@2.0.3"
import { User, Building2, Bell, Lock, Database } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

export function Settings() {
  const [companyName, setCompanyName] = useState("Acme Corporation")
  const [userEmail, setUserEmail] = useState("admin@acme.com")
  const [userName, setUserName] = useState("John Smith")
  const [notifications, setNotifications] = useState({
    lowStock: true,
    newReceipts: true,
    pendingApprovals: true,
    dailyReports: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveProfile = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Profile updated successfully")
    }, 1000)
  }

  const handleSaveNotifications = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Notification preferences updated")
    }, 800)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Settings</h1>
        <p className="text-gray-600">
          Manage your account and application preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-600" />
                <CardTitle>Personal Information</CardTitle>
              </div>
              <CardDescription>
                Update your personal details and account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userName">Full Name</Label>
                <Input
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userEmail">Email Address</Label>
                <Input
                  id="userEmail"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userRole">Role</Label>
                <Input
                  id="userRole"
                  value="Administrator"
                  disabled
                  className="bg-gray-50"
                />
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button
                  onClick={handleSaveProfile}
                  className="bg-indigo-600 hover:bg-indigo-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company Settings */}
        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-gray-600" />
                <CardTitle>Company Information</CardTitle>
              </div>
              <CardDescription>
                Manage your company details and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyAddress">Company Address</Label>
                <Input
                  id="companyAddress"
                  placeholder="123 Business Street, City, State 12345"
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyPhone">Phone Number</Label>
                  <Input
                    id="companyPhone"
                    placeholder="+1 (555) 000-0000"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyWebsite">Website</Label>
                  <Input
                    id="companyWebsite"
                    placeholder="www.company.com"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button
                  onClick={handleSaveProfile}
                  className="bg-indigo-600 hover:bg-indigo-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-gray-600" />
                <CardTitle>Notification Preferences</CardTitle>
              </div>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-900">Low Stock Alerts</p>
                  <p className="text-sm text-gray-500">
                    Get notified when products are running low
                  </p>
                </div>
                <Switch
                  checked={notifications.lowStock}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, lowStock: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-900">New Receipts</p>
                  <p className="text-sm text-gray-500">
                    Notify when new receipts are created
                  </p>
                </div>
                <Switch
                  checked={notifications.newReceipts}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, newReceipts: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-900">Pending Approvals</p>
                  <p className="text-sm text-gray-500">
                    Alert for transactions requiring approval
                  </p>
                </div>
                <Switch
                  checked={notifications.pendingApprovals}
                  onCheckedChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      pendingApprovals: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-900">Daily Reports</p>
                  <p className="text-sm text-gray-500">
                    Receive daily inventory summary reports
                  </p>
                </div>
                <Switch
                  checked={notifications.dailyReports}
                  onCheckedChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      dailyReports: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button
                  onClick={handleSaveNotifications}
                  className="bg-indigo-600 hover:bg-indigo-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Preferences"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-gray-600" />
                <CardTitle>Security Settings</CardTitle>
              </div>
              <CardDescription>
                Manage your password and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-900">
                    Two-Factor Authentication
                  </p>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button
                  onClick={() => toast.success("Password updated successfully")}
                  className="bg-indigo-600 hover:bg-indigo-700"
                  disabled={isLoading}
                >
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-gray-600" />
                <CardTitle>System Information</CardTitle>
              </div>
              <CardDescription>
                View system details and data management options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Version</p>
                  <p className="text-gray-900">Inventory Manager v2.1.0</p>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Database</p>
                  <p className="text-gray-900">Connected</p>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Total Products</p>
                  <p className="text-gray-900">2,847</p>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Total Warehouses</p>
                  <p className="text-gray-900">4</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <p className="text-sm text-gray-900">Data Management</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Database className="w-4 h-4 mr-2" />
                    Export All Data
                  </Button>
                  <Button variant="outline" size="sm">
                    Backup Database
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
