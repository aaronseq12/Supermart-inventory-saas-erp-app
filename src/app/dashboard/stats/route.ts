import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Exportable function containing the core data-fetching logic
export async function getDashboardStats(storeId: ObjectId) {
    const client = await clientPromise;
    const db = client.db("inventory-saas");

    // Get total number of products
    const totalProducts = await db.collection('products').countDocuments({ storeId });

    // Get number of low-stock items (e.g., quantity < 10)
    const lowStockCount = await db.collection('products').countDocuments({
        storeId,
        stockQuantity: { $lt: 10 }
    });

    // Placeholder for today's sales
    const todaySales = 0;

    return {
        totalProducts,
        lowStockCount,
        todaySales
    };
}


// The API route now uses the exported function
export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.storeId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const storeId = new ObjectId(session.user.storeId);
        const stats = await getDashboardStats(storeId);
        return NextResponse.json(stats);

    } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}