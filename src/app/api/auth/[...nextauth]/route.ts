import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from 'bcrypt'
import clientPromise from '@/lib/mongodb';

// 1. Export your authOptions
export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log('--- Authorize function started ---');
                if (!credentials?.email || !credentials.password) {
                    console.log('Missing credentials');
                    return null;
                }

                try {
                    const client = await clientPromise;
                    // --- FIX: Specify the database name here ---
                    const db = client.db("inventory-saas");

                    console.log('Searching for user:', credentials.email);
                    const user = await db.collection("users").findOne({ email: credentials.email });
                    console.log('User found in DB:', user);

                    if (!user) {
                        console.log('User not found');
                        return null;
                    }

                    if (!user.password) {
                        console.log('User found, but no password in DB');
                        return null;
                    }

                    console.log('Comparing passwords...');
                    const isValid = await compare(credentials.password, user.password as string);
                    console.log('Password validation result:', isValid);

                    if (!isValid) {
                        console.log('Password does not match');
                        return null;
                    }

                    console.log('--- Authorization successful! ---');
                    return {
                        id: user._id.toString(),
                        email: user.email as string,
                        name: user.name as string,
                        role: user.role as string,
                        storeId: user.storeId.toString()
                    };
                } catch (error) {
                    console.error('CRITICAL ERROR during authorization:', error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.storeId = user.storeId;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.storeId = token.storeId as string;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    }
};

// 2. Define the handler separately
const handler = NextAuth(authOptions);

// 3. Export the handler for GET and POST requests
export { handler as GET, handler as POST }

