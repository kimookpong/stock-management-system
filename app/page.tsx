"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Package, Warehouse, TrendingUp, AlertTriangle } from "lucide-react";
import { StockChart } from "@/components/stock-chart";
import { RecentMovements } from "@/components/recent-movements";
import { LowStockAlert } from "@/components/low-stock-alert";

// Force dynamic rendering to avoid prerender issues with sidebar
export const dynamic = "force-dynamic";

interface DashboardStats {
  totalSkus: number;
  totalWarehouses: number;
  totalStock: number;
  lowStockItems: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSkus: 0,
    totalWarehouses: 0,
    totalStock: 0,
    lowStockItems: 0,
  });

  const [currentTime, setCurrentTime] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch by only rendering time on client
  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date().toLocaleTimeString("en-US"));

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-US"));
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    const updateStats = () => {
      setStats({
        totalSkus: 5,
        totalWarehouses: 3,
        totalStock: 2845,
        lowStockItems: 2,
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="flex items-center gap-4 border-b bg-white/80 backdrop-blur-sm px-4 py-4 md:px-6 shadow-sm">
        <SidebarTrigger />
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold gradient-text">Dashboard</h1>
        </div>
        <Badge
          variant="outline"
          className="ml-auto bg-white/60 backdrop-blur-sm border-blue-200"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          {isClient ? `Live • ${currentTime}` : "Live"}
        </Badge>
      </header>

      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="hover-lift glass-effect border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Products
              </CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Package className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {stats.totalSkus}
              </div>
              <p className="text-xs text-muted-foreground">Total SKUs</p>
            </CardContent>
          </Card>

          <Card className="hover-lift glass-effect border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Warehouses
              </CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Warehouse className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                {stats.totalWarehouses}
              </div>
              <p className="text-xs text-muted-foreground">Total warehouses</p>
            </CardContent>
          </Card>

          <Card className="hover-lift glass-effect border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Stock
              </CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                {stats.totalStock.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Total units</p>
            </CardContent>
          </Card>

          <Card className="hover-lift glass-effect border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Low Stock
              </CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                {stats.lowStockItems}
              </div>
              <p className="text-xs text-muted-foreground">Items to restock</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="hover-lift">
            <StockChart />
          </div>
          <div className="hover-lift">
            <RecentMovements />
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="hover-lift">
          <LowStockAlert />
        </div>
      </main>
    </div>
  );
}
