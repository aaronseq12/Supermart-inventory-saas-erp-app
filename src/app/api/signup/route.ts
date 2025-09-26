import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { hash } from 'bcrypt';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: 'Name, email, and password are required.' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("inventory-saas");

        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User with this email already exists.' }, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);

        const newStore = await db.collection('stores').insertOne({
            storeName: `${name}'s Store`,
            createdAt: new Date(),
        });

        const newUser = {
            name,
            email,
            password: hashedPassword,
            role: 'admin',
            storeId: newStore.insertedId,
            createdAt: new Date(),
        };

        await db.collection('users').insertOne(newUser);

        return NextResponse.json({ message: 'User created successfully.' }, { status: 201 });

    } catch (error) {
        console.error('Sign-up error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}