import { 
  PackageIcon, 
  BarChart3Icon, 
  BellIcon, 
  ShieldCheckIcon,
  ZapIcon,
  UsersIcon
} from 'lucide-react'

const features = [
  {
    icon: PackageIcon,
    title: 'Real-time Inventory Tracking',
    description: 'Monitor stock levels across multiple locations with instant updates and accurate reporting.'
  },
  {
    icon: BarChart3Icon,
    title: 'Advanced Analytics',
    description: 'Get insights into sales trends, inventory turnover, and performance metrics.'
  },
  {
    icon: BellIcon,
    title: 'Smart Alerts',
    description: 'Automated notifications for low stock, expiring items, and critical inventory events.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with regular backups and 99.9% uptime guarantee.'
  },
  {
    icon: ZapIcon,
    title: 'Lightning Fast',
    description: 'Optimized performance with instant search and rapid data processing.'
  },
  {
    icon: UsersIcon,
    title: 'Team Collaboration',
    description: 'Multi-user access with role-based permissions and activity tracking.'
  }
]

export function FeatureGrid() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Manage Inventory
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to streamline your inventory operations 
            and boost your business efficiency.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
