"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Warehouse, Plus, MapPin, Package, TrendingUp } from "lucide-react";

// Force dynamic rendering to avoid prerender issues with sidebar
export const dynamic = "force-dynamic";

const warehouses = [
  {
    id: 1,
    name: "Main Warehouse",
    location: "Floor 1",
    description: "Main storage facility of the store",
    totalItems: 5,
    totalStock: 2030,
    status: "active",
  },
  {
    id: 2,
    name: "Backup Warehouse",
    location: "Floor 2",
    description: "Backup storage for excess inventory",
    totalItems: 5,
    totalStock: 680,
    status: "active",
  },
  {
    id: 3,
    name: "Point of Sale",
    location: "Counter",
    description: "Products displayed for front store sales",
    totalItems: 5,
    totalStock: 135,
    status: "active",
  },
];

export default function WarehousesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center gap-4 border-b px-4 py-3 md:px-6">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold">Warehouse Management</h1>
      </header>

      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* Add Warehouse Button */}
        <div className="flex justify-end">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Warehouse
          </Button>
        </div>

        {/* Warehouses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {warehouses.map((warehouse) => (
            <Card
              key={warehouse.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Warehouse className="h-5 w-5 text-blue-600" />
                  {warehouse.name}
                </CardTitle>
                <Badge variant="outline" className="w-fit">
                  {warehouse.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {warehouse.location}
                </div>

                <p className="text-sm">{warehouse.description}</p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">
                      {warehouse.totalItems}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Products
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">
                      {warehouse.totalStock.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Total Stock
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                  >
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
