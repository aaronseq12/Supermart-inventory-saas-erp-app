export interface UserProfile {
  id: string
  email: string
  name: string
  storeId?: string
  role: 'admin' | 'manager' | 'user'
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
  lastLoginAt?: Date
}

export interface StoreProfile {
  _id: string
  name: string
  description?: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  phone?: string
  website?: string
  logo?: string
  settings: {
    currency: string
    timezone: string
    lowStockThreshold: number
    enableNotifications: boolean
  }
  subscriptionPlan: 'free' | 'basic' | 'premium' | 'enterprise'
  subscriptionStatus: 'active' | 'inactive' | 'trial' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

declare module 'next-auth' {
  interface User {
    storeId?: string
    role: string
    emailVerified: boolean
  }
  
  interface Session {
    user: {
      id: string
      email: string
      name: string
      storeId?: string
      role: string
      emailVerified: boolean
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    storeId?: string
    role: string
    emailVerified: boolean
  }
}
