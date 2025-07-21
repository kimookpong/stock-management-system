"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SafeSidebarTrigger } from "@/components/safe-sidebar-trigger";
import { Plus, Package } from "lucide-react";

// Force dynamic rendering to avoid prerender issues with sidebar
export const dynamic = "force-dynamic";

const skuGroups = [
  {
    id: 1,
    name: "ยาแก้ปวด",
    description: "ยาแก้ปวดและลดไข้",
    color: "#EF4444",
    itemCount: 2,
    totalStock: 1200,
  },
  {
    id: 2,
    name: "ยาแก้ไอ",
    description: "ยาแก้ไอและขับเสมหะ",
    color: "#10B981",
    itemCount: 1,
    totalStock: 120,
  },
  {
    id: 3,
    name: "วิตามิน",
    description: "วิตามินและอาหารเสริม",
    color: "#F59E0B",
    itemCount: 1,
    totalStock: 1600,
  },
  {
    id: 4,
    name: "ยาภายนอก",
    description: "ยาทาและครีม",
    color: "#8B5CF6",
    itemCount: 1,
    totalStock: 220,
  },
  {
    id: 5,
    name: "อุปกรณ์การแพทย์",
    description: "เครื่องมือและอุปกรณ์",
    color: "#6B7280",
    itemCount: 0,
    totalStock: 0,
  },
];

export default function SKUGroupsPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 flex items-center gap-4 border-b bg-white/80 backdrop-blur-sm px-4 py-3 md:px-6 shadow-sm">
        <SafeSidebarTrigger />
        <h1 className="text-xl font-semibold gradient-text">
          SKU Group Management
        </h1>
      </header>

      <main className="p-4 md:p-6 space-y-6">
        {/* Add Group Button */}
        <div className="flex justify-end">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Group
          </Button>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skuGroups.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: group.color }}
                  />
                  {group.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {group.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{group.itemCount} items</span>
                  </div>
                  <Badge variant="outline">
                    {group.totalStock.toLocaleString()} units
                  </Badge>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                  >
                    View Products
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
