"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SafeSidebarTrigger } from "@/components/safe-sidebar-trigger";
import { Search, Plus, Package, Edit, Eye } from "lucide-react";
import Link from "next/link";

// Force dynamic rendering to avoid prerender issues with sidebar
export const dynamic = "force-dynamic";

const skus = [
  {
    id: 1,
    code: "PARA-500",
    name: "พาราเซตามอล 500mg",
    group: "ยาแก้ปวด",
    groupColor: "#EF4444",
    unit: "เม็ด",
    totalStock: 775,
    minStock: 100,
    status: "active",
  },
  {
    id: 2,
    code: "IBUP-400",
    name: "ไอบูโปรเฟน 400mg",
    group: "ยาแก้ปวด",
    groupColor: "#EF4444",
    unit: "เม็ด",
    totalStock: 425,
    minStock: 50,
    status: "active",
  },
  {
    id: 3,
    code: "COUGH-SYR",
    name: "น้ำยาแก้ไอ",
    group: "ยาแก้ไอ",
    groupColor: "#10B981",
    unit: "ขวด",
    totalStock: 15,
    minStock: 20,
    status: "low_stock",
  },
  {
    id: 4,
    code: "VIT-C",
    name: "วิตามินซี 1000mg",
    group: "วิตามิน",
    groupColor: "#F59E0B",
    unit: "เม็ด",
    totalStock: 1600,
    minStock: 200,
    status: "active",
  },
  {
    id: 5,
    code: "BETAD-SOL",
    name: "เบตาดีน",
    group: "ยาภายนอก",
    groupColor: "#8B5CF6",
    unit: "ขวด",
    totalStock: 25,
    minStock: 30,
    status: "low_stock",
  },
];

export default function SKUsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSKUs = skus.filter(
    (sku) =>
      sku.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sku.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string, stock: number, minStock: number) => {
    if (status === "low_stock" || stock <= minStock) {
      return <Badge variant="destructive">สต็อกต่ำ</Badge>;
    }
    return <Badge variant="default">ปกติ</Badge>;
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 flex items-center gap-4 border-b bg-white/80 backdrop-blur-sm px-4 py-3 md:px-6 shadow-sm">
        <SafeSidebarTrigger />
        <h1 className="text-xl font-semibold gradient-text">
          Product Management (SKU)
        </h1>
      </header>

      <main className="p-4 md:p-6 space-y-6">
        {/* Search and Add */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </Button>
        </div>

        {/* SKU Cards */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <Package className="h-5 w-5" />
            <h2 className="text-lg font-semibold">
              All Products ({filteredSKUs.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSKUs.map((sku) => (
              <Card
                key={sku.id}
                className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-slate-50"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-bold text-slate-800">
                        {sku.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <code className="px-2 py-1 bg-slate-100 text-slate-700 text-sm rounded font-mono">
                          {sku.code}
                        </code>
                        <Badge
                          variant="outline"
                          className="text-xs"
                          style={{
                            borderColor: sku.groupColor,
                            color: sku.groupColor,
                            backgroundColor: `${sku.groupColor}10`,
                          }}
                        >
                          {sku.group}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(sku.status, sku.totalStock, sku.minStock)}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {/* Stock Information */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-slate-500 uppercase tracking-wide">
                          Current Stock
                        </p>
                        <p className="text-2xl font-bold text-slate-800">
                          {sku.totalStock.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-600">{sku.unit}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-slate-500 uppercase tracking-wide">
                          Min Stock
                        </p>
                        <p className="text-lg font-semibold text-slate-600">
                          {sku.minStock.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-600">{sku.unit}</p>
                      </div>
                    </div>

                    {/* Stock Level Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Stock Level</span>
                        <span>
                          {Math.round(
                            (sku.totalStock / (sku.minStock * 3)) * 100
                          )}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            sku.totalStock <= sku.minStock
                              ? "bg-gradient-to-r from-red-400 to-red-500"
                              : sku.totalStock <= sku.minStock * 2
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                              : "bg-gradient-to-r from-green-400 to-green-500"
                          }`}
                          style={{
                            width: `${Math.min(
                              100,
                              (sku.totalStock / (sku.minStock * 3)) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 hover:bg-blue-50 hover:text-blue-700"
                        asChild
                      >
                        <Link href={`/skus/${sku.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 hover:bg-emerald-50 hover:text-emerald-700"
                        asChild
                      >
                        <Link href={`/skus/${sku.id}?edit=true`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredSKUs.length === 0 && (
            <Card className="p-12 text-center border-dashed border-2 border-slate-200">
              <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-600 mb-2">
                No products found
              </h3>
              <p className="text-slate-500 mb-4">
                Try adjusting your search terms or add a new product.
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add First Product
              </Button>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
