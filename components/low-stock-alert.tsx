"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Plus } from "lucide-react";
import Link from "next/link";

const lowStockItems = [
  {
    id: 1,
    sku: "Cough Syrup",
    currentStock: 15,
    minStock: 20,
    warehouse: "Main Warehouse",
    group: "Cough Medicine",
  },
  {
    id: 2,
    sku: "Betadine",
    currentStock: 25,
    minStock: 30,
    warehouse: "Point of Sale",
    group: "External Medicine",
  },
];

export function LowStockAlert() {
  return (
    <Card className="glass-effect border-0 shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100">
        <CardTitle className="flex items-center gap-2 text-red-700">
          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-white" />
          </div>
          Low Stock Alert
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {lowStockItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{item.sku}</h4>
                  <Badge variant="outline" className="text-xs">
                    {item.group}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {item.warehouse} • {item.currentStock} units left (below{" "}
                  {item.minStock})
                </p>
              </div>
              <Button size="sm" asChild>
                <Link href="/movements/receive">
                  <Plus className="h-4 w-4 mr-1" />
                  Restock
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
