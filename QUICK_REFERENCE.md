# Quick Reference Guide - Inventory Management System

## 🚀 Quick Start

```bash
# Clone/Install
npm install

# Run Development Server
npm run dev

# Production Build
npm build
```

Access at: `http://localhost:3000`

---

## 🔐 Authentication

### Test Credentials

```
Email: any@email.com (accepts all)
Password: MyPassword@123 (or any meeting requirements)
  - 9+ characters
  - 1 uppercase letter
  - 1 lowercase letter
  - 1 special character
```

### Login ID Uniqueness (Sign-up)

❌ Cannot use: `admin123`, `user001`

### Email Uniqueness (Sign-up)

❌ Cannot use: `admin@company.com`, `user@company.com`

---

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/              # Authentication screens
│   ├── dashboard/         # Dashboard & KPIs
│   ├── products/          # Product management
│   ├── stock/             # Stock operations
│   ├── history/           # Transaction history
│   ├── settings/          # User settings
│   ├── layout/            # Header & Sidebar
│   ├── figma/             # Image components
│   └── ui/                # 30+ Radix UI components
├── data/
│   └── mockData.ts        # All mock data
├── styles/
│   └── globals.css        # Global styles
├── App.tsx                # Main routing
└── main.tsx               # Entry point
```

---

## 🗂️ Main Navigation

### Sidebar Menu

1. **Dashboard** - Overview with KPIs
2. **Products** - Product catalog management
3. **Receipts** - Stock incoming transactions
4. **Deliveries** - Stock outgoing transactions
5. **Internal Transfers** - Warehouse to warehouse
6. **Adjustments** - Stock corrections
7. **Move History** - Transaction tracking
8. **Settings** - Configuration

---

## 📊 Using the Dashboard

### KPI Cards

- **Total Products:** `10` products in system
- **Low Stock Items:** `3` products below minimum
- **Out of Stock:** `1` product with zero stock
- **Pending Operations:** Auto-calculated from all transactions

### Quick Actions

- Click buttons to navigate to forms
- New Receipt, Delivery, Transfer, Add Product

### Widgets

- **Recent Activities:** Last 5 transactions
- **Low Stock Alert:** Items needing reorder

---

## 📦 Product Management

### View Products

- Navigate: Sidebar → Products
- Features:
  - Filter by category
  - Filter by status
  - Search by name/SKU
  - View product details

### Add Product

- Click "Add" button
- Fill in modal:
  - Name, SKU (unique)
  - Category, Unit
  - Min/Max stock levels
  - Supplier
- Click "Save"

### Product Status

- **In Stock:** Stock > Minimum
- **Low Stock:** Stock > 0 but < Minimum
- **Out of Stock:** Stock = 0

---

## 📥 Stock Operations

### Receipt (Incoming Stock)

1. Navigate: Sidebar → Receipts
2. Fill form:
   - Select supplier
   - Set expected date
   - Add items (product, qty, unit)
   - Add notes
3. Click "Submit Receipt"
4. Stock levels auto-update

### Delivery (Outgoing Stock)

1. Navigate: Sidebar → Deliveries
2. Fill form:
   - Customer name & address
   - Set delivery date
   - Add items
   - Add notes
3. Click "Submit Delivery"
4. Stock levels auto-decrease

### Internal Transfer

1. Navigate: Sidebar → Internal Transfers
2. Fill form:
   - Select from warehouse
   - Select to warehouse
   - Add items
   - Add reason
3. Click "Submit Transfer"
4. Stock moves between warehouses

### Stock Adjustment

1. Navigate: Sidebar → Adjustments
2. Fill form:
   - Select type (Damage/Loss/Shrinkage/Correction)
   - Add items with adjustment qty
   - Add reason
   - Add notes
3. Click "Submit Adjustment"
4. Stock corrected

---

## 🏢 Warehouse Management

### Warehouses in System

1. **Main Warehouse** - New York, NY

   - Capacity: 50,000 units
   - Manager: John Smith

2. **Secondary Warehouse** - Chicago, IL

   - Capacity: 30,000 units
   - Manager: Sarah Johnson

3. **LA Distribution Center** - Los Angeles, CA
   - Capacity: 40,000 units
   - Manager: Mike Davis

### Switch Warehouse

- Use dropdown in header (top left)
- Filters all operations to selected warehouse

---

## 📊 Mock Data Overview

### Products (10 Total)

| Name                  | SKU      | Category   | Stock | Min | Status       |
| --------------------- | -------- | ---------- | ----- | --- | ------------ |
| Industrial Drill Bits | SKU-1234 | Tools      | 150   | 50  | In Stock     |
| Safety Helmets        | SKU-5678 | Safety     | 8     | 25  | Low Stock    |
| Cable Rolls           | SKU-9012 | Electrical | 3     | 10  | Low Stock    |
| Paint Cans            | SKU-3456 | Supplies   | 0     | 20  | Out of Stock |
| Work Gloves           | SKU-7890 | Safety     | 200   | 100 | In Stock     |
| LED Bulbs             | SKU-2345 | Electrical | 85    | 30  | In Stock     |
| Measuring Tape        | SKU-6789 | Tools      | 45    | 20  | In Stock     |
| Steel Pipes           | SKU-0123 | Materials  | 12    | 15  | Low Stock    |
| Screwdriver Set       | SKU-4567 | Tools      | 67    | 25  | In Stock     |
| Safety Goggles        | SKU-8901 | Safety     | 120   | 40  | In Stock     |

### Categories

- Tools
- Safety Equipment
- Electrical
- Supplies
- Materials

### Suppliers

- Global Tools Inc.
- SafeGuard Corp.
- ElectroSupply Ltd.
- ColorTech Paints
- Steel Industries Co.

---

## 🔍 Filtering & Searching

### Products Page

- **Category Filter:** Dropdown to filter by category
- **Status Filter:** In Stock / Low Stock / Out of Stock
- **Search:** By product name or SKU

### History Page

- **Date Range:** From date to date
- **Type:** Receipt / Delivery / Transfer / Adjustment
- **Status:** Pending / Completed / Cancelled
- **Warehouse:** Filter by warehouse
- **Search:** By transaction number

---

## 📋 Transaction Numbers

Auto-generated format:

- **Receipt:** RCP-001, RCP-002, ...
- **Delivery:** DEL-001, DEL-002, ...
- **Transfer:** TRF-001, TRF-002, ...
- **Adjustment:** ADJ-001, ADJ-002, ...

---

## 💾 Validation Rules

### Login Form

- Email: Valid format (xxx@domain.com)
- Password: 8+ chars, uppercase, lowercase, special

### Sign-Up Form

- Company Name: Required
- Full Name: Required
- **Login ID:** 6-12 chars, alphanumeric + underscore, unique
- **Email:** Valid format, unique
- **Password:** 8+ chars, uppercase, lowercase, special
- Confirm Password: Must match password

### Product Form

- Name: Required, max 100 chars
- SKU: Required, unique, max 20 chars
- Category: Required, from dropdown
- Min Stock: Number ≥ 0
- Max Stock: Number > Min Stock

### Stock Forms

- Supplier/Customer: Required
- Items: At least 1 item required
- Quantity: Must be > 0
- Unit: Must be selected

---

## 🎯 Common Tasks

### Check Inventory Status

1. Open Dashboard
2. View KPI cards for overview
3. Check "Low Stock Alert" widget
4. Click "View All" to see products page

### Create Incoming Stock

1. Dashboard → New Receipt (Quick Action)
2. Select supplier
3. Add items with quantities
4. Submit

### Create Outgoing Stock

1. Dashboard → New Delivery (Quick Action)
2. Enter customer details
3. Add items with quantities
4. Submit

### Transfer Between Warehouses

1. Dashboard → Transfer Stock (Quick Action)
2. Select from/to warehouse
3. Add items
4. Submit

### View All Transactions

1. Sidebar → Move History
2. Apply filters as needed
3. Click transaction to view details

---

## 🛠️ Troubleshooting

### Page Not Loading

- Check server is running: `npm run dev`
- Check console for errors (F12)
- Refresh page (Ctrl+R)

### Sign-up Errors

- **"Login ID already taken"** - Try different ID
- **"Email already registered"** - Use new email
- **"Password not strong"** - Add uppercase/special char

### Stock Not Updating

- Check transaction status is "completed"
- Verify correct warehouse selected
- Check product SKU is correct

### Search Not Finding Items

- Check spelling of search term
- Try searching by SKU instead of name
- Clear filters and try again

---

## 📚 Documentation Files

- **WORKFLOW_REQUIREMENTS.md** - Complete feature specifications
- **AUTH_VALIDATION_COMPLETE.md** - Auth validation details
- **PASSWORD_RULES_APPLIED.md** - Password requirements
- **SIGNUP_VALIDATION_RULES.md** - Sign-up validation
- **IMPLEMENTATION_STATUS.md** - Project status & progress

---

## 🔗 API Endpoints (Future)

Currently using mock data. When API integration is added:

- `GET /api/products` - List all products
- `POST /api/products` - Create product
- `GET /api/receipts` - List receipts
- `POST /api/receipts` - Create receipt
- `GET /api/warehouses` - List warehouses
- `GET /api/analytics` - Get analytics data

---

## 💡 Tips & Tricks

1. Use "View Details" on products to see full information
2. Set realistic minimum stock levels for reorder alerts
3. Use warehouse transfers to balance stock
4. Keep notes in transactions for audit trail
5. Use adjustments to correct physical inventory counts
6. Export reports for analysis (feature coming soon)

---

## ❓ FAQs

**Q: Can I delete a product?**  
A: Not in UI yet. Feature in Phase 2.

**Q: Can I edit a transaction?**  
A: Only draft transactions can be edited.

**Q: How do I add a new warehouse?**  
A: In Settings (Phase 2 feature).

**Q: How do I export reports?**  
A: Export feature coming in Phase 3.

**Q: Can I undo a transaction?**  
A: Cancelled transactions in Phase 2.

---

## 📞 Support

For issues or questions:

1. Check this quick reference
2. Review IMPLEMENTATION_STATUS.md
3. Check mock data in src/data/mockData.ts
4. Review component code inline documentation

---

**Last Updated:** November 22, 2025
**Version:** 1.0.0
