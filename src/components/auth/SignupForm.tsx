import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Package, AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "../ui/alert"

interface SignupFormProps {
  onSignup: () => void
  onNavigateToLogin: () => void
}

// Mock database of existing emails and login IDs
const existingEmails = new Set(["admin@company.com", "user@company.com"])
const existingLoginIds = new Set(["admin123", "user001"])

// Validation helper functions
const validateLoginId = (
  loginId: string
): { valid: boolean; message: string } => {
  if (!loginId) return { valid: false, message: "Login ID is required" }
  if (loginId.length < 6)
    return { valid: false, message: "Login ID must be at least 6 characters" }
  if (loginId.length > 12)
    return { valid: false, message: "Login ID must not exceed 12 characters" }
  if (existingLoginIds.has(loginId.toLowerCase()))
    return { valid: false, message: "This Login ID is already taken" }
  if (!/^[a-zA-Z0-9_]+$/.test(loginId))
    return {
      valid: false,
      message: "Login ID can only contain letters, numbers, and underscores",
    }
  return { valid: true, message: "Login ID is available" }
}

const validateEmail = (email: string): { valid: boolean; message: string } => {
  if (!email) return { valid: false, message: "Email is required" }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email))
    return { valid: false, message: "Invalid email format" }
  if (existingEmails.has(email.toLowerCase()))
    return { valid: false, message: "This email is already registered" }
  return { valid: true, message: "Email is available" }
}

const validatePassword = (
  password: string
): { valid: boolean; message: string } => {
  if (!password) return { valid: false, message: "Password is required" }
  if (password.length <= 8)
    return { valid: false, message: "Password must be more than 8 characters" }
  if (!/[a-z]/.test(password))
    return { valid: false, message: "Password must contain a lowercase letter" }
  if (!/[A-Z]/.test(password))
    return {
      valid: false,
      message: "Password must contain an uppercase letter",
    }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password))
    return {
      valid: false,
      message: "Password must contain a special character",
    }
  return { valid: true, message: "Password is strong" }
}

export function SignupForm({ onSignup, onNavigateToLogin }: SignupFormProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    fullName: "",
    loginId: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [validationMessages, setValidationMessages] = useState({
    loginId: "",
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate all required fields
    if (
      !formData.companyName ||
      !formData.fullName ||
      !formData.loginId ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill in all fields")
      return
    }

    // Validate Login ID
    const loginIdValidation = validateLoginId(formData.loginId)
    if (!loginIdValidation.valid) {
      setError(loginIdValidation.message)
      return
    }

    // Validate Email
    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.valid) {
      setError(emailValidation.message)
      return
    }

    // Validate Password
    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.valid) {
      setError(passwordValidation.message)
      return
    }

    // Check password confirmation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onSignup()
    }, 1000)
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Real-time validation for specific fields
    if (field === "loginId") {
      const validation = validateLoginId(value)
      setValidationMessages((prev) => ({
        ...prev,
        loginId: validation.message,
      }))
    } else if (field === "email") {
      const validation = validateEmail(value)
      setValidationMessages((prev) => ({ ...prev, email: validation.message }))
    } else if (field === "password") {
      const validation = validatePassword(value)
      setValidationMessages((prev) => ({
        ...prev,
        password: validation.message,
      }))
    }
  }

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="space-y-2 text-center">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center">
            <Package className="w-9 h-9 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl">Create Your Account</CardTitle>
        <CardDescription>
          Start managing your inventory in minutes
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              placeholder="Acme Corp"
              value={formData.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="loginId">Login ID *</Label>
            <Input
              id="loginId"
              placeholder="6-12 characters (e.g., john_doe)"
              value={formData.loginId}
              onChange={(e) => updateField("loginId", e.target.value)}
              disabled={isLoading}
            />
            {formData.loginId && (
              <div
                className={`flex items-center gap-2 text-xs ${
                  validationMessages.loginId.includes("available")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {validationMessages.loginId.includes("available") ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                <span>{validationMessages.loginId}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              disabled={isLoading}
            />
            {formData.email && (
              <div
                className={`flex items-center gap-2 text-xs ${
                  validationMessages.email.includes("available")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {validationMessages.email.includes("available") ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                <span>{validationMessages.email}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => updateField("password", e.target.value)}
              disabled={isLoading}
            />
            {formData.password && (
              <div className={`space-y-1 text-xs`}>
                <div
                  className={`flex items-center gap-2 ${
                    formData.password.length > 8
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formData.password.length > 8 ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  <span>More than 8 characters</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    /[a-z]/.test(formData.password)
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {/[a-z]/.test(formData.password) ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  <span>Lowercase letter</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    /[A-Z]/.test(formData.password)
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {/[A-Z]/.test(formData.password) ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  <span>Uppercase letter</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                      formData.password
                    )
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                    formData.password
                  ) ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  <span>Special character (!@#$%^&*)</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              disabled={isLoading}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="text-indigo-600 hover:underline"
            >
              Sign in
            </button>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
