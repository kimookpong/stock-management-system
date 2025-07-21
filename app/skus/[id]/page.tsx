"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SafeSidebarTrigger } from "@/components/safe-sidebar-trigger";
import { Textarea } from "@/components/ui/textarea";

// Force dynamic rendering to avoid prerender issues with sidebar
export const dynamic = "force-dynamic";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Package,
  Edit3,
  Save,
  X,
  History,
  TrendingUp,
  TrendingDown,
  ArrowRightLeft,
  Calendar,
  User,
  Building,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data - replace with actual API calls
const skuData = {
  id: 1,
  code: "PARA-500",
  name: "Paracetamol 500mg",
  description: "Pain relief medication for adults and children over 12 years",
  group: "Pain Relief",
  groupColor: "#EF4444",
  unit: "Tablets",
  totalStock: 775,
  minStock: 100,
  maxStock: 1000,
  unitCost: 2.5,
  sellingPrice: 5.0,
  supplier: "PharmaCorp Ltd.",
  barcode: "1234567890123",
  status: "active",
  createdAt: "2024-01-15",
  updatedAt: "2024-12-20",
};

const transactions = [
  {
    id: 1,
    type: "receive",
    quantity: 500,
    unitCost: 2.4,
    totalCost: 1200,
    warehouse: "Main Warehouse",
    referenceNo: "PO-2024-001",
    notes: "Regular monthly stock replenishment",
    createdBy: "John Doe",
    createdAt: "2024-12-20T10:30:00",
  },
  {
    id: 2,
    type: "issue",
    quantity: -150,
    unitCost: 2.5,
    totalCost: -375,
    warehouse: "Main Warehouse",
    referenceNo: "SALE-2024-045",
    notes: "Pharmacy sale to customer",
    createdBy: "Jane Smith",
    createdAt: "2024-12-19T15:45:00",
  },
  {
    id: 3,
    type: "transfer",
    quantity: -100,
    unitCost: 2.5,
    totalCost: -250,
    warehouse: "Main Warehouse → Branch A",
    referenceNo: "TF-2024-012",
    notes: "Transfer to branch for emergency stock",
    createdBy: "Mike Johnson",
    createdAt: "2024-12-18T09:15:00",
  },
  {
    id: 4,
    type: "adjust",
    quantity: -25,
    unitCost: 2.5,
    totalCost: -62.5,
    warehouse: "Main Warehouse",
    referenceNo: "ADJ-2024-003",
    notes: "Stock adjustment due to damaged items",
    createdBy: "Sarah Wilson",
    createdAt: "2024-12-17T16:20:00",
  },
];

export default function SKUDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(skuData);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    // Check if edit mode is requested via URL parameter
    if (searchParams.get("edit") === "true") {
      setIsEditing(true);
    }
  }, [searchParams]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // API call to save data would go here
    console.log("Saving:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(skuData);
    setIsEditing(false);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "receive":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "issue":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case "transfer":
        return <ArrowRightLeft className="h-4 w-4 text-blue-600" />;
      case "adjust":
        return <Edit3 className="h-4 w-4 text-orange-600" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getTransactionBadge = (type: string) => {
    const styles = {
      receive: "bg-green-100 text-green-800 border-green-200",
      issue: "bg-red-100 text-red-800 border-red-200",
      transfer: "bg-blue-100 text-blue-800 border-blue-200",
      adjust: "bg-orange-100 text-orange-800 border-orange-200",
    };

    return (
      <Badge className={`${styles[type as keyof typeof styles]} capitalize`}>
        {type}
      </Badge>
    );
  };

  return (
    <div>
      <header className="flex items-center gap-4 border-b px-4 py-3 md:px-6">
        <SafeSidebarTrigger />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="hover:bg-slate-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-xl font-semibold gradient-text">{formData.name}</h1>
      </header>

      <main className="p-4 md:p-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Product Details
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Transaction History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Details */}
              <div className="lg:col-span-2">
                <Card className="glass-effect border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Product Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="code">Product Code</Label>
                        <Input
                          id="code"
                          value={formData.code}
                          onChange={(e) =>
                            handleInputChange("code", e.target.value)
                          }
                          disabled={!isEditing}
                          className="font-mono"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="barcode">Barcode</Label>
                        <Input
                          id="barcode"
                          value={formData.barcode}
                          onChange={(e) =>
                            handleInputChange("barcode", e.target.value)
                          }
                          disabled={!isEditing}
                          className="font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        disabled={!isEditing}
                        className="text-lg font-semibold"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="group">Product Group</Label>
                        <Select
                          value={formData.group}
                          onValueChange={(value) =>
                            handleInputChange("group", value)
                          }
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pain Relief">
                              Pain Relief
                            </SelectItem>
                            <SelectItem value="Antibiotics">
                              Antibiotics
                            </SelectItem>
                            <SelectItem value="Vitamins">Vitamins</SelectItem>
                            <SelectItem value="External Medicine">
                              External Medicine
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unit">Unit</Label>
                        <Input
                          id="unit"
                          value={formData.unit}
                          onChange={(e) =>
                            handleInputChange("unit", e.target.value)
                          }
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="supplier">Supplier</Label>
                      <Input
                        id="supplier"
                        value={formData.supplier}
                        onChange={(e) =>
                          handleInputChange("supplier", e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Stock & Pricing */}
              <div className="space-y-6">
                <Card className="glass-effect border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Stock Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="totalStock">Current Stock</Label>
                      <Input
                        id="totalStock"
                        type="number"
                        value={formData.totalStock}
                        onChange={(e) =>
                          handleInputChange(
                            "totalStock",
                            parseInt(e.target.value)
                          )
                        }
                        disabled={!isEditing}
                        className="text-2xl font-bold text-center"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="minStock">Min Stock</Label>
                        <Input
                          id="minStock"
                          type="number"
                          value={formData.minStock}
                          onChange={(e) =>
                            handleInputChange(
                              "minStock",
                              parseInt(e.target.value)
                            )
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxStock">Max Stock</Label>
                        <Input
                          id="maxStock"
                          type="number"
                          value={formData.maxStock}
                          onChange={(e) =>
                            handleInputChange(
                              "maxStock",
                              parseInt(e.target.value)
                            )
                          }
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Pricing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="unitCost">Unit Cost</Label>
                      <Input
                        id="unitCost"
                        type="number"
                        step="0.01"
                        value={formData.unitCost}
                        onChange={(e) =>
                          handleInputChange(
                            "unitCost",
                            parseFloat(e.target.value)
                          )
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sellingPrice">Selling Price</Label>
                      <Input
                        id="sellingPrice"
                        type="number"
                        step="0.01"
                        value={formData.sellingPrice}
                        onChange={(e) =>
                          handleInputChange(
                            "sellingPrice",
                            parseFloat(e.target.value)
                          )
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="glass-effect border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Transaction History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Unit Cost</TableHead>
                        <TableHead className="text-right">
                          Total Value
                        </TableHead>
                        <TableHead>Warehouse</TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTransactionIcon(transaction.type)}
                              {getTransactionBadge(transaction.type)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-slate-500" />
                              <div>
                                <div className="font-medium">
                                  {new Date(
                                    transaction.createdAt
                                  ).toLocaleDateString()}
                                </div>
                                <div className="text-sm text-slate-500">
                                  {new Date(
                                    transaction.createdAt
                                  ).toLocaleTimeString()}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell
                            className={`text-right font-medium ${
                              transaction.quantity > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.quantity > 0 ? "+" : ""}
                            {transaction.quantity.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            ${transaction.unitCost.toFixed(2)}
                          </TableCell>
                          <TableCell
                            className={`text-right font-medium ${
                              transaction.totalCost > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            ${Math.abs(transaction.totalCost).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4 text-slate-500" />
                              {transaction.warehouse}
                            </div>
                          </TableCell>
                          <TableCell>
                            <code className="px-2 py-1 bg-slate-100 text-slate-700 text-sm rounded font-mono">
                              {transaction.referenceNo}
                            </code>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-slate-500" />
                              {transaction.createdBy}
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <p
                              className="text-sm text-slate-600 truncate"
                              title={transaction.notes}
                            >
                              {transaction.notes}
                            </p>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
