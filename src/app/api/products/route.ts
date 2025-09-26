import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET: Fetch all products for the logged-in user's store
export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.storeId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const client = await clientPromise;
        const db = client.db("inventory-saas");
        const storeId = new ObjectId(session.user.storeId);

        const products = await db.collection('products').find({ storeId: storeId }).toArray();

        return NextResponse.json(products);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

// POST: Create a new product for the logged-in user's store
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.storeId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const productData = await request.json();
        const client = await clientPromise;
        const db = client.db("inventory-saas");
        const storeId = new ObjectId(session.user.storeId);

        const newProduct = {
            ...productData,
            storeId: storeId, // Ensure the product is linked to the user's store
            createdAt: new Date(),
        };

        const result = await db.collection('products').insertOne(newProduct);

        // --- FIX ---
        // Fetch the newly created document using the insertedId from the result
        const createdProduct = await db.collection('products').findOne({ _id: result.insertedId });

        return NextResponse.json(createdProduct, { status: 201 });

    } catch (error) {
        console.error('Failed to create product:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

