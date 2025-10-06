import { ObjectId } from 'mongodb'

export interface Product {
  _id?: ObjectId
  storeId: ObjectId
  name: string
  description?: string
  sku: string
  barcode?: string
  category: string
  brand?: string
  price: {
    cost: number
    selling: number
    msrp?: number
  }
  stock: {
    quantity: number
    minQuantity: number
    maxQuantity?: number
    unit: string
    location?: string
  }
  images?: string[]
  attributes?: Record<string, any>
  status: 'active' | 'inactive' | 'discontinued'
  tags?: string[]
  supplier?: {
    name: string
    contact: string
    email?: string
  }
  createdAt: Date
  updatedAt: Date
  createdBy: ObjectId
}

export interface Category {
  _id?: ObjectId
  storeId: ObjectId
  name: string
  description?: string
  parentId?: ObjectId
  slug: string
  image?: string
  status: 'active' | 'inactive'
  sortOrder: number
  createdAt: Date
  updatedAt: Date
}

export interface Transaction {
  _id?: ObjectId
  storeId: ObjectId
  productId: ObjectId
  type: 'sale' | 'purchase' | 'adjustment' | 'return'
  quantity: number
  unitPrice: number
  totalPrice: number
  reference?: string
  notes?: string
  customerId?: ObjectId
  supplierId?: ObjectId
  createdAt: Date
  createdBy: ObjectId
}

export interface DashboardStats {
  totalProducts: number
  lowStockCount: number
  outOfStockCount: number
  todaySales: number
  thisMonthSales: number
  totalInventoryValue: number
  topSellingProducts: Array<{
    productId: ObjectId
    name: string
    salesCount: number
    revenue: number
  }>
  recentTransactions: Transaction[]
}

export interface InventoryAlert {
  _id?: ObjectId
  storeId: ObjectId
  productId: ObjectId
  type: 'low_stock' | 'out_of_stock' | 'overstock' | 'expiring'
  message: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  isRead: boolean
  createdAt: Date
  resolvedAt?: Date
}
