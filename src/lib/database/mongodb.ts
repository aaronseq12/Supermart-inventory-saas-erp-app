import { MongoClient, Db } from 'mongodb'

if (!process.env.DATABASE_URL) {
  throw new Error('Invalid/Missing environment variable: "DATABASE_URL"')
}

const uri = process.env.DATABASE_URL
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise
  return client.db('inventory_saas')
}

// Database utility functions
export async function createIndexes() {
  const db = await getDatabase()
  
  // User indexes
  await db.collection('users').createIndex({ email: 1 }, { unique: true })
  await db.collection('users').createIndex({ storeId: 1 })
  
  // Product indexes
  await db.collection('products').createIndex({ storeId: 1 })
  await db.collection('products').createIndex({ storeId: 1, sku: 1 }, { unique: true })
  await db.collection('products').createIndex({ storeId: 1, name: 'text', description: 'text' })
  await db.collection('products').createIndex({ 'stock.quantity': 1 })
  
  // Transaction indexes
  await db.collection('transactions').createIndex({ storeId: 1, createdAt: -1 })
  await db.collection('transactions').createIndex({ productId: 1, createdAt: -1 })
  
  // Category indexes
  await db.collection('categories').createIndex({ storeId: 1, slug: 1 }, { unique: true })
  
  console.log('Database indexes created successfully')
}
