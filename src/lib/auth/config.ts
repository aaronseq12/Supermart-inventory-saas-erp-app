import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        try {
          const client = await clientPromise
          const db = client.db('inventory_saas')
          
          const user = await db.collection('users').findOne({
            email: credentials.email.toLowerCase()
          })

          if (!user) {
            throw new Error('Invalid email or password')
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password, 
            user.password
          )

          if (!isValidPassword) {
            throw new Error('Invalid email or password')
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            storeId: user.storeId?.toString(),
            role: user.role || 'user',
            emailVerified: user.emailVerified || false
          }
        } catch (error) {
          console.error('Authentication error:', error)
          throw new Error('Authentication failed')
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.storeId = user.storeId
        token.role = user.role
        token.emailVerified = user.emailVerified
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.storeId = token.storeId as string
        session.user.role = token.role as string
        session.user.emailVerified = token.emailVerified as boolean
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    signUp: '/signup',
    error: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET,
}
