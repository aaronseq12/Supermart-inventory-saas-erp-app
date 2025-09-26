import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getDashboardStats } from "@/app/api/dashboard/stats/route";
import { ObjectId } from "mongodb";

// Icons for the stat cards
const DollarSignIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>;
const PackageIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4a4.5 4.5 0 1 1-9 0" /><path d="M12 14.2V22" /><path d="m7.5 12.5-3.5 4" /><path d="m16.5 16.5 3.5-4" /><path d="M12 2v7.5" /></svg>;
const ActivityIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>;


export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.storeId) {
        redirect('/login');
    }

    // Call the data-fetching logic directly from the API file
    const storeId = new ObjectId(session.user.storeId);
    const stats = await getDashboardStats(storeId);

    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                {/* Total Products */}
                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Total Products</h3>
                        <PackageIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">{stats.totalProducts}</div>
                        <p className="text-xs text-muted-foreground">items in your inventory</p>
                    </div>
                </div>
                {/* Low Stock Items */}
                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Low Stock Items</h3>
                        <ActivityIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">{stats.lowStockCount}</div>
                        <p className="text-xs text-muted-foreground">items needing attention</p>
                    </div>
                </div>
                {/* Today's Sales */}
                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Today's Sales</h3>
                        <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">${stats.todaySales.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">based on recent transactions</p>
                    </div>
                </div>
            </div>
        </div>
    );
}