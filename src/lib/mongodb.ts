import { MongoClient } from 'mongodb';

// --- SERVER-SIDE DEBUGGING ---
// This will print the database URL to your terminal when the server starts.
// If it prints "undefined", your .env.local file is not being read correctly.
console.log('--- Connecting to MongoDB with URL:', process.env.DATABASE_URL, '---');
// --- END SERVER-SIDE DEBUGGING ---

if (!process.env.DATABASE_URL) {
    throw new Error('Invalid/Missing environment variable: "DATABASE_URL"');
}

const uri = process.env.DATABASE_URL;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// In development mode, use a global variable so that the value
// is preserved across module reloads caused by HMR (Hot Module Replacement).
declare global {
    var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

