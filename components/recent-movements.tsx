"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Minus, ArrowRightLeft, Settings } from "lucide-react";

const movements = [
  {
    id: 1,
    type: "receive",
    sku: "Paracetamol 500mg",
    quantity: 100,
    warehouse: "Main Warehouse",
    time: "10:30",
    reference: "PO-001",
  },
  {
    id: 2,
    type: "issue",
    sku: "Vitamin C 1000mg",
    quantity: -50,
    warehouse: "Point of Sale",
    time: "09:15",
    reference: "SO-045",
  },
  {
    id: 3,
    type: "transfer",
    sku: "Betadine",
    quantity: 20,
    warehouse: "Main Warehouse → Point of Sale",
    time: "08:45",
    reference: "TF-012",
  },
  {
    id: 4,
    type: "adjust",
    sku: "Ibuprofen 400mg",
    quantity: -5,
    warehouse: "Reserve Warehouse",
    time: "08:00",
    reference: "ADJ-003",
  },
];

const getMovementIcon = (type: string) => {
  switch (type) {
    case "receive":
      return <Plus className="h-4 w-4 text-green-600" />;
    case "issue":
      return <Minus className="h-4 w-4 text-red-600" />;
    case "transfer":
      return <ArrowRightLeft className="h-4 w-4 text-blue-600" />;
    case "adjust":
      return <Settings className="h-4 w-4 text-orange-600" />;
    default:
      return null;
  }
};

const getMovementType = (type: string) => {
  switch (type) {
    case "receive":
      return "Receive";
    case "issue":
      return "Issue";
    case "transfer":
      return "Transfer";
    case "adjust":
      return "Adjust";
    default:
      return type;
  }
};

export function RecentMovements() {
  return (
    <Card className="glass-effect border-0 shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100">
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <ArrowRightLeft className="h-4 w-4 text-white" />
          </div>
          Recent Movements
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="h-[300px]">
          <div className="space-y-3">
            {movements.map((movement) => (
              <div
                key={movement.id}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-200 hover:shadow-md"
              >
                {getMovementIcon(movement.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {getMovementType(movement.type)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {movement.time}
                    </span>
                  </div>
                  <p className="font-medium text-sm truncate">{movement.sku}</p>
                  <p className="text-xs text-muted-foreground">
                    {movement.warehouse}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold text-sm ${
                      movement.quantity > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {movement.quantity > 0 ? "+" : ""}
                    {movement.quantity}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {movement.reference}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
