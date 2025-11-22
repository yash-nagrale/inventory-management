// Mock Data for Inventory Management System
// This file contains all mock data for products, warehouses, transactions, etc.

export interface Product {
  id: string
  name: string
  sku: string
  category: string
  description: string
  unit: string
  minStock: number
  maxStock: number
  currentStock: number
  supplierId: string
  supplier: string
  lastReceivedDate: string
  status: "in-stock" | "low-stock" | "out-of-stock"
  price?: number
  reorderPoint?: number
}

export interface Warehouse {
  id: string
  name: string
  location: string
  capacity: number
  manager: string
  currentOccupancy?: number
}

export interface TransactionItem {
  productId: string
  productName: string
  sku: string
  quantity: number
  unit: string
  notes?: string
}

export interface Receipt {
  id: string
  number: string
  supplier: string
  supplierId: string
  expectedDate: string
  receivedDate?: string
  items: TransactionItem[]
  notes: string
  status: "draft" | "pending" | "completed" | "cancelled"
  warehouse: string
  createdDate: string
}

export interface Delivery {
  id: string
  number: string
  customer: string
  address: string
  expectedDate: string
  actualDate?: string
  items: TransactionItem[]
  notes: string
  status: "draft" | "pending" | "completed" | "cancelled"
  warehouse: string
  createdDate: string
}

export interface Transfer {
  id: string
  number: string
  fromWarehouse: string
  toWarehouse: string
  transferDate: string
  completedDate?: string
  items: TransactionItem[]
  reason: string
  status: "draft" | "pending" | "completed" | "cancelled"
  createdDate: string
}

export interface Adjustment {
  id: string
  number: string
  type: string
  adjustmentDate: string
  items: TransactionItem[]
  notes: string
  status: "draft" | "pending" | "completed" | "cancelled"
  warehouse: string
  createdDate: string
}

// WAREHOUSES
export const warehouses: Warehouse[] = [
  {
    id: "warehouse-1",
    name: "Main Warehouse",
    location: "New York, NY",
    capacity: 50000,
    manager: "John Smith",
    currentOccupancy: 38000,
  },
  {
    id: "warehouse-2",
    name: "Secondary Warehouse",
    location: "Chicago, IL",
    capacity: 30000,
    manager: "Sarah Johnson",
    currentOccupancy: 22500,
  },
  {
    id: "warehouse-3",
    name: "LA Distribution Center",
    location: "Los Angeles, CA",
    capacity: 40000,
    manager: "Mike Davis",
    currentOccupancy: 32000,
  },
]

// PRODUCTS
export const products: Product[] = [
  {
    id: "1",
    name: "Industrial Drill Bits Set",
    sku: "SKU-1234",
    category: "Tools",
    description: "Complete set of industrial-grade drill bits (1mm-13mm)",
    unit: "sets",
    minStock: 50,
    maxStock: 200,
    currentStock: 150,
    supplierId: "supplier-1",
    supplier: "Global Tools Inc.",
    lastReceivedDate: "2025-11-15",
    status: "in-stock",
    price: 45.99,
  },
  {
    id: "2",
    name: "Safety Helmets",
    sku: "SKU-5678",
    category: "Safety Equipment",
    description: "Hard hats with chin strap - OSHA approved",
    unit: "pcs",
    minStock: 25,
    maxStock: 150,
    currentStock: 8,
    supplierId: "supplier-2",
    supplier: "SafeGuard Corp.",
    lastReceivedDate: "2025-10-20",
    status: "low-stock",
    price: 25.5,
  },
  {
    id: "3",
    name: "Cable Rolls (100m)",
    sku: "SKU-9012",
    category: "Electrical",
    description: "Copper electrical cable, 2.5mm² cross-section",
    unit: "rolls",
    minStock: 10,
    maxStock: 50,
    currentStock: 3,
    supplierId: "supplier-3",
    supplier: "ElectroSupply Ltd.",
    lastReceivedDate: "2025-11-01",
    status: "low-stock",
    price: 85.0,
  },
  {
    id: "4",
    name: "Paint Cans (5L)",
    sku: "SKU-3456",
    category: "Supplies",
    description: "Premium interior/exterior paint - various colors",
    unit: "cans",
    minStock: 20,
    maxStock: 100,
    currentStock: 0,
    supplierId: "supplier-4",
    supplier: "ColorTech Paints",
    lastReceivedDate: "2025-10-30",
    status: "out-of-stock",
    price: 35.75,
  },
  {
    id: "5",
    name: "Work Gloves",
    sku: "SKU-7890",
    category: "Safety Equipment",
    description: "Nitrile coated work gloves - high grip",
    unit: "pairs",
    minStock: 100,
    maxStock: 400,
    currentStock: 200,
    supplierId: "supplier-2",
    supplier: "SafeGuard Corp.",
    lastReceivedDate: "2025-11-10",
    status: "in-stock",
    price: 8.99,
  },
  {
    id: "6",
    name: "LED Bulbs Pack",
    sku: "SKU-2345",
    category: "Electrical",
    description: "10-pack of 10W LED bulbs - 6500K daylight",
    unit: "packs",
    minStock: 30,
    maxStock: 150,
    currentStock: 85,
    supplierId: "supplier-3",
    supplier: "ElectroSupply Ltd.",
    lastReceivedDate: "2025-11-12",
    status: "in-stock",
    price: 42.5,
  },
  {
    id: "7",
    name: "Measuring Tape",
    sku: "SKU-6789",
    category: "Tools",
    description: "25m measuring tape with auto-lock feature",
    unit: "pcs",
    minStock: 20,
    maxStock: 100,
    currentStock: 45,
    supplierId: "supplier-1",
    supplier: "Global Tools Inc.",
    lastReceivedDate: "2025-11-08",
    status: "in-stock",
    price: 15.99,
  },
  {
    id: "8",
    name: "Steel Pipes (2m)",
    sku: "SKU-0123",
    category: "Materials",
    description: 'Galvanized steel pipes, 3/4" diameter',
    unit: "pcs",
    minStock: 15,
    maxStock: 80,
    currentStock: 12,
    supplierId: "supplier-5",
    supplier: "Steel Industries Co.",
    lastReceivedDate: "2025-11-05",
    status: "low-stock",
    price: 22.75,
  },
  {
    id: "9",
    name: "Screwdriver Set",
    sku: "SKU-4567",
    category: "Tools",
    description: "12-piece precision screwdriver set",
    unit: "sets",
    minStock: 25,
    maxStock: 120,
    currentStock: 67,
    supplierId: "supplier-1",
    supplier: "Global Tools Inc.",
    lastReceivedDate: "2025-11-14",
    status: "in-stock",
    price: 32.99,
  },
  {
    id: "10",
    name: "Safety Goggles",
    sku: "SKU-8901",
    category: "Safety Equipment",
    description: "Anti-scratch protective eyewear",
    unit: "pcs",
    minStock: 40,
    maxStock: 200,
    currentStock: 120,
    supplierId: "supplier-2",
    supplier: "SafeGuard Corp.",
    lastReceivedDate: "2025-11-13",
    status: "in-stock",
    price: 18.5,
  },
]

// RECEIPTS (Stock In)
export const receipts: Receipt[] = [
  {
    id: "r-1",
    number: "RCP-001",
    supplier: "Global Tools Inc.",
    supplierId: "supplier-1",
    expectedDate: "2025-11-15",
    receivedDate: "2025-11-15",
    items: [
      {
        productId: "1",
        productName: "Industrial Drill Bits Set",
        sku: "SKU-1234",
        quantity: 50,
        unit: "sets",
      },
      {
        productId: "7",
        productName: "Measuring Tape",
        sku: "SKU-6789",
        quantity: 20,
        unit: "pcs",
      },
    ],
    notes: "Urgent order for rush project",
    status: "completed",
    warehouse: "warehouse-1",
    createdDate: "2025-11-15",
  },
  {
    id: "r-2",
    number: "RCP-002",
    supplier: "SafeGuard Corp.",
    supplierId: "supplier-2",
    expectedDate: "2025-11-18",
    items: [
      {
        productId: "2",
        productName: "Safety Helmets",
        sku: "SKU-5678",
        quantity: 30,
        unit: "pcs",
      },
      {
        productId: "5",
        productName: "Work Gloves",
        sku: "SKU-7890",
        quantity: 100,
        unit: "pairs",
      },
    ],
    notes: "Regular monthly order",
    status: "pending",
    warehouse: "warehouse-1",
    createdDate: "2025-11-16",
  },
]

// DELIVERIES (Stock Out)
export const deliveries: Delivery[] = [
  {
    id: "d-1",
    number: "DEL-001",
    customer: "ABC Construction Inc.",
    address: "123 Main Street, New York, NY",
    expectedDate: "2025-11-20",
    actualDate: "2025-11-19",
    items: [
      {
        productId: "1",
        productName: "Industrial Drill Bits Set",
        sku: "SKU-1234",
        quantity: 15,
        unit: "sets",
      },
      {
        productId: "5",
        productName: "Work Gloves",
        sku: "SKU-7890",
        quantity: 50,
        unit: "pairs",
      },
    ],
    notes: "Delivery completed on time",
    status: "completed",
    warehouse: "warehouse-1",
    createdDate: "2025-11-19",
  },
  {
    id: "d-2",
    number: "DEL-002",
    customer: "XYZ Electrical Ltd.",
    address: "456 Industrial Avenue, Chicago, IL",
    expectedDate: "2025-11-22",
    items: [
      {
        productId: "3",
        productName: "Cable Rolls (100m)",
        sku: "SKU-9012",
        quantity: 10,
        unit: "rolls",
      },
      {
        productId: "6",
        productName: "LED Bulbs Pack",
        sku: "SKU-2345",
        quantity: 20,
        unit: "packs",
      },
    ],
    notes: "Awaiting customer signature",
    status: "pending",
    warehouse: "warehouse-2",
    createdDate: "2025-11-21",
  },
]

// TRANSFERS (Warehouse to Warehouse)
export const transfers: Transfer[] = [
  {
    id: "t-1",
    number: "TRF-001",
    fromWarehouse: "warehouse-1",
    toWarehouse: "warehouse-2",
    transferDate: "2025-11-16",
    completedDate: "2025-11-17",
    items: [
      {
        productId: "5",
        productName: "Work Gloves",
        sku: "SKU-7890",
        quantity: 50,
        unit: "pairs",
      },
    ],
    reason: "Stock rebalancing between warehouses",
    status: "completed",
    createdDate: "2025-11-16",
  },
  {
    id: "t-2",
    number: "TRF-002",
    fromWarehouse: "warehouse-2",
    toWarehouse: "warehouse-3",
    transferDate: "2025-11-18",
    items: [
      {
        productId: "1",
        productName: "Industrial Drill Bits Set",
        sku: "SKU-1234",
        quantity: 25,
        unit: "sets",
      },
    ],
    reason: "Customer order fulfillment from LA center",
    status: "pending",
    createdDate: "2025-11-18",
  },
]

// ADJUSTMENTS (Stock Corrections)
export const adjustments: Adjustment[] = [
  {
    id: "a-1",
    number: "ADJ-001",
    type: "Damage",
    adjustmentDate: "2025-11-14",
    items: [
      {
        productId: "2",
        productName: "Safety Helmets",
        sku: "SKU-5678",
        quantity: -5,
        unit: "pcs",
        notes: "Damaged in storage",
      },
    ],
    notes: "Physical inventory count revealed damaged items",
    status: "completed",
    warehouse: "warehouse-1",
    createdDate: "2025-11-14",
  },
  {
    id: "a-2",
    number: "ADJ-002",
    type: "Correction",
    adjustmentDate: "2025-11-15",
    items: [
      {
        productId: "4",
        productName: "Paint Cans (5L)",
        sku: "SKU-3456",
        quantity: 10,
        unit: "cans",
        notes: "Count discrepancy corrected",
      },
    ],
    notes: "System count was off by 10 units",
    status: "draft",
    warehouse: "warehouse-1",
    createdDate: "2025-11-15",
  },
]

// SUPPLIERS
export const suppliers = [
  {
    id: "supplier-1",
    name: "Global Tools Inc.",
    email: "sales@globaltools.com",
    phone: "+1-555-1001",
  },
  {
    id: "supplier-2",
    name: "SafeGuard Corp.",
    email: "contact@safeguard.com",
    phone: "+1-555-1002",
  },
  {
    id: "supplier-3",
    name: "ElectroSupply Ltd.",
    email: "orders@electrosupply.com",
    phone: "+1-555-1003",
  },
  {
    id: "supplier-4",
    name: "ColorTech Paints",
    email: "sales@colortech.com",
    phone: "+1-555-1004",
  },
  {
    id: "supplier-5",
    name: "Steel Industries Co.",
    email: "contact@steelindustries.com",
    phone: "+1-555-1005",
  },
]

// CATEGORIES
export const categories = [
  "All Categories",
  "Tools",
  "Safety Equipment",
  "Electrical",
  "Supplies",
  "Materials",
]

// UTILITY FUNCTIONS

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id)
}

export const getWarehouseById = (id: string): Warehouse | undefined => {
  return warehouses.find((w) => w.id === id)
}

export const getSupplierById = (id: string) => {
  return suppliers.find((s) => s.id === id)
}

export const calculateKPIs = () => {
  const totalProducts = products.length
  const lowStockItems = products.filter((p) => p.status === "low-stock").length
  const outOfStockItems = products.filter(
    (p) => p.status === "out-of-stock"
  ).length

  const pendingReceipts = receipts.filter((r) => r.status === "pending").length
  const pendingDeliveries = deliveries.filter(
    (d) => d.status === "pending"
  ).length
  const pendingTransfers = transfers.filter(
    (t) => t.status === "pending"
  ).length
  const pendingAdjustments = adjustments.filter(
    (a) => a.status === "pending"
  ).length
  const pendingOperations =
    pendingReceipts + pendingDeliveries + pendingTransfers + pendingAdjustments

  const totalStockValue = products.reduce(
    (sum, p) => sum + p.currentStock * (p.price || 0),
    0
  )

  return {
    totalProducts,
    lowStockItems,
    outOfStockItems,
    pendingOperations,
    totalStockValue,
  }
}

export const getRecentActivities = () => {
  const activities: any[] = []

  // Add recent receipts
  receipts.forEach((r) => {
    activities.push({
      id: r.id,
      type: "receipt",
      description: `Received ${r.items.reduce(
        (s, i) => s + i.quantity,
        0
      )} units from ${r.supplier}`,
      time: r.createdDate,
      status: r.status,
    })
  })

  // Add recent deliveries
  deliveries.forEach((d) => {
    activities.push({
      id: d.id,
      type: "delivery",
      description: `Delivered ${d.items.reduce(
        (s, i) => s + i.quantity,
        0
      )} units to ${d.customer}`,
      time: d.createdDate,
      status: d.status,
    })
  })

  // Add recent transfers
  transfers.forEach((t) => {
    activities.push({
      id: t.id,
      type: "transfer",
      description: `Transferred ${t.items.reduce(
        (s, i) => s + i.quantity,
        0
      )} units`,
      time: t.createdDate,
      status: t.status,
    })
  })

  // Add recent adjustments
  adjustments.forEach((a) => {
    activities.push({
      id: a.id,
      type: "adjustment",
      description: `Stock adjustment: ${a.type}`,
      time: a.createdDate,
      status: a.status,
    })
  })

  // Sort by date and return last 5
  return activities
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 5)
}

export const getLowStockProducts = () => {
  return products
    .filter((p) => p.status === "low-stock" || p.status === "out-of-stock")
    .slice(0, 10)
}
