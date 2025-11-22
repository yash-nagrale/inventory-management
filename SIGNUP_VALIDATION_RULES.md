# Sign-Up Form Validation Rules

## Overview

The sign-up form has been enhanced with comprehensive validation rules for all fields. The validations are performed in real-time as users type and at form submission.

---

## Validation Rules

### 1. **Login ID** ✅

- **Length:** Between 6-12 characters (inclusive)
- **Allowed Characters:** Letters (a-z, A-Z), numbers (0-9), and underscores (\_)
- **Uniqueness:** Must not exist in the database
- **Real-time Feedback:** ✓ Green checkmark when valid, ✗ Red error when invalid

**Example Valid Login IDs:**

- `john_doe`
- `user123`
- `admin_user`
- `Alice2024`

**Example Invalid Login IDs:**

- `ab` (too short)
- `verylongloginname123` (too long)
- `user@123` (contains invalid character)
- `admin123` (already exists in database)

---

### 2. **Email** ✅

- **Format:** Valid email format (username@domain.extension)
- **Uniqueness:** Must not exist in the database
- **Real-time Feedback:** ✓ Green checkmark when valid, ✗ Red error when invalid

**Example Valid Emails:**

- `john.doe@company.com`
- `alice@gmail.com`
- `user+tag@domain.org`

**Example Invalid Emails:**

- `invalid.email` (missing @)
- `admin@company.com` (already registered)
- `user@` (incomplete)

---

### 3. **Password** ✅

Must meet ALL of the following criteria:

| Requirement           | Rule                                                                    |
| --------------------- | ----------------------------------------------------------------------- | -------- |
| **Length**            | More than 8 characters (minimum 9)                                      |
| **Lowercase**         | Must contain at least one lowercase letter (a-z)                        |
| **Uppercase**         | Must contain at least one uppercase letter (A-Z)                        |
| **Special Character** | Must contain at least one special character (!@#$%^&\*()\_+-=[]{}';:"\\ | ,.<>\/?) |

**Real-time Feedback:** Each requirement shows:

- ✓ Green checkmark when met
- ✗ Red X when not met

**Example Valid Passwords:**

- `SecurePass@123`
- `MyPassword#456`
- `Str0ng!Password`

**Example Invalid Passwords:**

- `password123` (missing uppercase and special character)
- `Password` (missing numbers and special character)
- `Pass@` (too short)
- `UPPERCASE@123` (missing lowercase)

---

## Mock Database

The form includes mock data for uniqueness validation:

**Existing Login IDs:**

- `admin123`
- `user001`

**Existing Emails:**

- `admin@company.com`
- `user@company.com`

> Note: In production, these validations would be performed against an actual database.

---

## Form Submission

The form validates all fields in the following order:

1. All fields are filled
2. Login ID validation
3. Email validation
4. Password validation
5. Password confirmation match

If any validation fails, an error message is displayed and the form submission is prevented.

---

## User Experience

### Real-time Validation

- **Login ID:** Shows availability status as user types
- **Email:** Shows validity and availability status as user types
- **Password:** Shows checklist of all requirements with visual indicators

### Error Messages

- Clear, specific error messages guide users to fix issues
- Error alerts displayed at the top of the form
- Field-level feedback helps users understand requirements

### Visual Indicators

- ✓ **Green checkmark** - Validation passed
- ✗ **Red X** - Validation failed
- **Color coding** - Green text for valid, red text for invalid

---

## Field Layout

```
1. Company Name (required)
2. Full Name (required)
3. Login ID * (new field - 6-12 chars, unique)
4. Email * (unique, valid format)
5. Password * (8+ chars, uppercase, lowercase, special)
6. Confirm Password (required, must match password)
```

---

## Example Test Cases

### ✅ Successful Registration

```
Company Name: Acme Corp
Full Name: John Doe
Login ID: john_doe    [✓ Available]
Email: john@acme.com  [✓ Available]
Password: AcmePass@2024 [✓ All requirements met]
Confirm Password: AcmePass@2024
→ Account created successfully
```

### ❌ Failed - Login ID Too Short

```
Login ID: john [✗ Must be at least 6 characters]
```

### ❌ Failed - Email Already Registered

```
Email: admin@company.com [✗ This email is already registered]
```

### ❌ Failed - Weak Password

```
Password: password [✗ Password must be more than 8 characters]
         [✗] Missing uppercase letter
         [✗] Missing special character
```

---

## Integration Notes

- Built with React hooks (`useState`)
- Uses Radix UI components for consistent styling
- Real-time validation feedback integrated
- Compatible with existing authentication flow
- Mock database ready for backend integration
