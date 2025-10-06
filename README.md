# InventoryMart - Smart Inventory Management SaaS

A modern, full-stack inventory management system built with Next.js 15, TypeScript, MongoDB, and Tailwind CSS. Perfect for small to medium businesses looking to streamline their inventory operations.

![InventoryMart Dashboard](https://via.placeholder.com/800x400/1e40af/ffffff?text=InventoryMart+Dashboard)

## Features

### Core Functionality
- **Real-time Inventory Tracking** - Monitor stock levels across multiple locations
- **Smart Alerts** - Automated notifications for low stock and critical events
- **Advanced Analytics** - Sales trends, inventory turnover, and performance metrics
- **Multi-user Support** - Role-based access control for teams
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

### Security & Performance
- **Secure Authentication** - NextAuth.js with bcrypt password hashing
- **Type Safety** - Full TypeScript implementation
- **Database Optimization** - Indexed MongoDB queries for fast performance
- **Modern UI/UX** - Clean, accessible design with dark mode support

### Business Intelligence
- Dashboard with key metrics and KPIs
- Low stock alerts and inventory warnings
- Sales tracking and revenue analytics
- Product performance insights
- Inventory valuation reports

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Lucide Icons
- **Backend**: Next.js API Routes
- **Database**: MongoDB with connection pooling
- **Authentication**: NextAuth.js
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- npm, yarn, or pnpm
- MongoDB (local) or MongoDB Atlas account

## Quick Start

### 1. Clone the Repository
```

git clone https://github.com/aaronseq12/inventory-mart-saas-erp.git
cd inventory-mart-saas-erp

```

### 2. Install Dependencies
```

npm install

# or

yarn install

# or

pnpm install

```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```


# Database Configuration

DATABASE_URL="mongodb://localhost:27017/inventory_saas"

# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/inventory_saas

# NextAuth Configuration

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"

# Optional: Production Settings

NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="InventoryMart"

```

### 4. Database Setup

#### Option A: Local MongoDB
1. Install and start MongoDB locally
2. The application will automatically create necessary indexes

#### Option B: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string and update `DATABASE_URL`
4. Whitelist your IP address

### 5. Run Development Server
```

npm run dev

# or

yarn dev

# or

pnpm dev

```

Visit [http://localhost:3000](http://localhost:3000) to see your application running!

## Project Structure

```

src/
├── app/                    \# Next.js App Router
│   ├── api/               \# API Routes
│   │   ├── auth/          \# Authentication endpoints
│   │   ├── products/      \# Product management
│   │   └── dashboard/     \# Dashboard data
│   ├── dashboard/         \# Protected dashboard pages
│   ├── login/            \# Authentication pages
│   ├── signup/
│   ├── globals.css       \# Global styles
│   ├── layout.tsx        \# Root layout
│   └── page.tsx          \# Landing page
├── components/           \# Reusable React components
│   ├── marketing/        \# Landing page components
│   └── ui/              \# UI components
├── lib/                 \# Utility functions
│   ├── auth/            \# Authentication configuration
│   └── database/        \# Database utilities
└── types/              \# TypeScript type definitions

```

## Key Pages & Features

### Landing Page (`/`)
- Hero section with compelling value proposition
- Feature showcase grid
- Call-to-action sections
- Responsive navigation

### Dashboard (`/dashboard`)
- Real-time inventory metrics
- Low stock alerts
- Sales performance charts
- Quick action buttons

### Product Management (`/dashboard/products`)
- Add, edit, and delete products
- Bulk operations
- Advanced filtering and search
- Stock level management

### Authentication
- Secure login/signup system
- Password hashing with bcrypt
- Session management
- Role-based access control

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
```

git add .
git commit -m "Initial commit"
git push origin main

```

2. **Deploy to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

3. **Environment Variables for Production**:
```

DATABASE_URL=your-mongodb-atlas-connection-string
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-production-secret-key

```

### Alternative Deployment Options
- **Netlify**: Full-stack deployment with serverless functions
- **Railway**: Simple deployment with automatic MongoDB setup
- **DigitalOcean**: VPS deployment with Docker

## Testing

### Run Tests
```

npm run test

# or

yarn test

```

### Linting
```

npm run lint

# or

yarn lint

```

## Performance Optimizations

- **Database Indexing**: Optimized MongoDB queries
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: MongoDB connection pooling
- **Bundle Analysis**: Use `npm run analyze` to check bundle size

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Author

**Aaron Sequeira**
- GitHub: [@aaronseq12](https://github.com/aaronseq12)
- LinkedIn: [Aaron Sequeira](https://linkedin.com/in/aaron-sequeira)


## 📞 Support

If you have any questions or need help getting started, please:
- Open an issue on GitHub
- Check the documentation
- Contact me directly

---

⭐ **Star this repository if you find it helpful!**
```


## **Final Setup Commands**

Run these commands in order:

```bash
# 1. Install dependencies
npm install lucide-react clsx tailwind-merge date-fns zod react-hook-form @hookform/resolvers

# 2. Create the directories
mkdir -p src/components/marketing src/lib/auth

# 3. Remove old files
rm src/app/providers.tsx
rm types/next-auth.d.ts

# 4. Create .env.local file (copy from .env.example)
cp .env.example .env.local

# 5. Start the development server
npm run dev
```

Your application should now be running at `http://localhost:3000`! 🎉

Let me know if you encounter any issues during the setup process!

