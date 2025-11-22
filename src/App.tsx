import { useState, useEffect } from "react"
import { LoginForm } from "./components/auth/LoginForm"
import { SignupForm } from "./components/auth/SignupForm"
import { OTPResetForm } from "./components/auth/OTPResetForm"
import { Sidebar } from "./components/layout/Sidebar"
import { Header } from "./components/layout/Header"
import { Dashboard } from "./components/dashboard/Dashboard"
import { ProductList } from "./components/products/ProductList"
import { ProductDetails } from "./components/products/ProductDetails"
import { ReceiptForm } from "./components/stock/ReceiptForm"
import { DeliveryForm } from "./components/stock/DeliveryForm"
import { TransferForm } from "./components/stock/TransferForm"
import { AdjustmentForm } from "./components/stock/AdjustmentForm"
import { MoveHistory } from "./components/history/MoveHistory"
import { Settings } from "./components/settings/Settings"
import { Toaster } from "./components/ui/sonner"

export type Screen =
  | "login"
  | "signup"
  | "otp-reset"
  | "dashboard"
  | "products"
  | "product-details"
  | "receipts"
  | "deliveries"
  | "transfers"
  | "adjustments"
  | "history"
  | "settings"

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  )
  const [currentWarehouse, setCurrentWarehouse] = useState("warehouse-1")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Check if user is already authenticated (in real app, check session/token)
    const authStatus = localStorage.getItem("auth_token")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      setCurrentScreen("dashboard")
    }
  }, [])

  const handleLogin = () => {
    localStorage.setItem("auth_token", "true")
    setIsAuthenticated(true)
    setCurrentScreen("dashboard")
  }

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    setIsAuthenticated(false)
    setCurrentScreen("login")
  }

  const navigateTo = (screen: Screen, productId?: string) => {
    setCurrentScreen(screen)
    if (productId) {
      setSelectedProductId(productId)
    }
  }

  // Authentication screens
  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          {currentScreen === "login" && (
            <LoginForm
              onLogin={handleLogin}
              onNavigateToSignup={() => setCurrentScreen("signup")}
              onNavigateToReset={() => setCurrentScreen("otp-reset")}
            />
          )}
          {currentScreen === "signup" && (
            <SignupForm
              onSignup={handleLogin}
              onNavigateToLogin={() => setCurrentScreen("login")}
            />
          )}
          {currentScreen === "otp-reset" && (
            <OTPResetForm
              onResetComplete={() => setCurrentScreen("login")}
              onNavigateToLogin={() => setCurrentScreen("login")}
            />
          )}
        </div>
        <Toaster />
      </>
    )
  }

  // Main application
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          currentWarehouse={currentWarehouse}
          onWarehouseChange={setCurrentWarehouse}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {currentScreen === "dashboard" && (
            <Dashboard
              currentWarehouse={currentWarehouse}
              onNavigate={navigateTo}
            />
          )}

          {currentScreen === "products" && (
            <ProductList
              searchQuery={searchQuery}
              currentWarehouse={currentWarehouse}
              onViewProduct={(id) => navigateTo("product-details", id)}
            />
          )}

          {currentScreen === "product-details" && selectedProductId && (
            <ProductDetails
              productId={selectedProductId}
              onBack={() => navigateTo("products")}
            />
          )}

          {currentScreen === "receipts" && (
            <ReceiptForm currentWarehouse={currentWarehouse} />
          )}

          {currentScreen === "deliveries" && (
            <DeliveryForm currentWarehouse={currentWarehouse} />
          )}

          {currentScreen === "transfers" && (
            <TransferForm currentWarehouse={currentWarehouse} />
          )}

          {currentScreen === "adjustments" && (
            <AdjustmentForm currentWarehouse={currentWarehouse} />
          )}

          {currentScreen === "history" && (
            <MoveHistory
              currentWarehouse={currentWarehouse}
              searchQuery={searchQuery}
            />
          )}

          {currentScreen === "settings" && <Settings />}
        </main>
      </div>

      <Toaster />
    </div>
  )
}
