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

interface LoginFormProps {
  onLogin: () => void
  onNavigateToSignup: () => void
  onNavigateToReset: () => void
}

// Validation helper functions
const validateEmail = (email: string): { valid: boolean; message: string } => {
  if (!email) return { valid: false, message: "Email is required" }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email))
    return { valid: false, message: "Invalid email format" }
  return { valid: true, message: "Email is valid" }
}

const validatePassword = (
  password: string
): { valid: boolean; message: string; details: Record<string, boolean> } => {
  const details = {
    length: password.length > 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  }

  if (!password)
    return { valid: false, message: "Password is required", details }
  if (!details.length)
    return {
      valid: false,
      message: "Password must be more than 8 characters",
      details,
    }
  if (!details.lowercase)
    return {
      valid: false,
      message: "Password must contain a lowercase letter",
      details,
    }
  if (!details.uppercase)
    return {
      valid: false,
      message: "Password must contain an uppercase letter",
      details,
    }
  if (!details.special)
    return {
      valid: false,
      message: "Password must contain a special character",
      details,
    }
  return { valid: true, message: "Password is strong", details }
}

export function LoginForm({
  onLogin,
  onNavigateToSignup,
  onNavigateToReset,
}: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false)
  const [validationMessages, setValidationMessages] = useState({
    email: "",
    password: {
      message: "",
      details: {
        length: false,
        lowercase: false,
        uppercase: false,
        special: false,
      },
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    // Validate email format
    const emailValidation = validateEmail(email)
    if (!emailValidation.valid) {
      setError(emailValidation.message)
      return
    }

    // Validate password requirements
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      setError(passwordValidation.message)
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // For demo: accept any valid email/password
      onLogin()
    }, 800)
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    const validation = validateEmail(value)
    setValidationMessages((prev) => ({
      ...prev,
      email: validation.message,
    }))
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    const validation = validatePassword(value)
    setValidationMessages((prev) => ({
      ...prev,
      password: { message: validation.message, details: validation.details },
    }))
  }

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="space-y-2 text-center">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center">
            <Package className="w-9 h-9 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl">Welcome to Inventory Manager</CardTitle>
        <CardDescription>
          Sign in to manage your inventory operations
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              disabled={isLoading}
            />
            {email && (
              <div
                className={`flex items-center gap-2 text-xs ${
                  validationMessages.email.includes("valid")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {validationMessages.email.includes("valid") ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                <span>{validationMessages.email}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                onClick={onNavigateToReset}
                className="text-sm text-indigo-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              onFocus={() => setShowPasswordRequirements(true)}
              onBlur={() => setShowPasswordRequirements(false)}
              disabled={isLoading}
            />
            {password && (
              <div className={`space-y-1 text-xs`}>
                <div
                  className={`flex items-center gap-2 ${
                    validationMessages.password.details.length
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {validationMessages.password.details.length ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  <span>More than 8 characters</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    validationMessages.password.details.lowercase
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {validationMessages.password.details.lowercase ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  <span>Lowercase letter</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    validationMessages.password.details.uppercase
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {validationMessages.password.details.uppercase ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  <span>Uppercase letter</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    validationMessages.password.details.special
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {validationMessages.password.details.special ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  <span>Special character (!@#$%^&*)</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onNavigateToSignup}
              className="text-indigo-600 hover:underline"
            >
              Sign up
            </button>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
