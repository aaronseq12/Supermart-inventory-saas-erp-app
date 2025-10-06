import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { FeatureGrid } from '@/components/marketing/FeatureGrid'
import { HeroSection } from '@/components/marketing/HeroSection'

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  
  // Redirect authenticated users to dashboard
  if (session?.user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <nav className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">IM</span>
            </div>
            <span className="text-xl font-bold gradient-text">
              InventoryMart
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="btn btn-secondary px-4 py-2"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="btn btn-primary px-4 py-2"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <HeroSection />
        <FeatureGrid />
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Inventory Management?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of businesses already using InventoryMart
            </p>
            <Link 
              href="/signup" 
              className="btn bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg"
            >
              Start Free Trial
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 InventoryMart. Built with ❤️ by Aaron Sequeira</p>
        </div>
      </footer>
    </div>
  )
}
