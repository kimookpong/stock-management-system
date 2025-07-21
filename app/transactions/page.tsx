"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SafeSidebarTrigger } from "@/components/safe-sidebar-trigger";
import { Label } from "@/components/ui/label";

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
  Search,
  History,
  TrendingUp,
  TrendingDown,
  ArrowRightLeft,
  Edit3,
  Calendar,
  User,
  Building,
  Filter,
  Download,
  Eye,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

// Mock transaction data
const transactions = [
  {
    id: 1,
    type: "receive",
    skuCode: "PARA-500",
    skuName: "Paracetamol 500mg",
    quantity: 500,
    unitCost: 2.4,
    totalValue: 1200,
    warehouse: "Main Warehouse",
    referenceNo: "PO-2024-001",
    notes: "Regular monthly stock replenishment",
    createdBy: "John Doe",
    createdAt: "2024-12-20T10:30:00",
    status: "completed",
  },
  {
    id: 2,
    type: "issue",
    skuCode: "PARA-500",
    skuName: "Paracetamol 500mg",
    quantity: -150,
    unitCost: 2.5,
    totalValue: -375,
    warehouse: "Main Warehouse",
    referenceNo: "SALE-2024-045",
    notes: "Pharmacy sale to customer",
    createdBy: "Jane Smith",
    createdAt: "2024-12-19T15:45:00",
    status: "completed",
  },
  {
    id: 3,
    type: "transfer",
    skuCode: "IBUP-400",
    skuName: "Ibuprofen 400mg",
    quantity: -100,
    unitCost: 3.2,
    totalValue: -320,
    warehouse: "Main Warehouse → Branch A",
    referenceNo: "TF-2024-012",
    notes: "Transfer to branch for emergency stock",
    createdBy: "Mike Johnson",
    createdAt: "2024-12-18T09:15:00",
    status: "completed",
  },
  {
    id: 4,
    type: "adjust",
    skuCode: "COUGH-SYR",
    skuName: "Cough Syrup",
    quantity: -25,
    unitCost: 8.5,
    totalValue: -212.5,
    warehouse: "Main Warehouse",
    referenceNo: "ADJ-2024-003",
    notes: "Stock adjustment due to damaged items",
    createdBy: "Sarah Wilson",
    createdAt: "2024-12-17T16:20:00",
    status: "completed",
  },
  {
    id: 5,
    type: "receive",
    skuCode: "VIT-C",
    skuName: "Vitamin C 1000mg",
    quantity: 300,
    unitCost: 1.8,
    totalValue: 540,
    warehouse: "Branch A",
    referenceNo: "PO-2024-002",
    notes: "Emergency restock for high demand",
    createdBy: "Alex Chen",
    createdAt: "2024-12-16T14:20:00",
    status: "completed",
  },
  {
    id: 6,
    type: "issue",
    skuCode: "BETAD-SOL",
    skuName: "Betadine Solution",
    quantity: -40,
    unitCost: 12.0,
    totalValue: -480,
    warehouse: "Branch A",
    referenceNo: "SALE-2024-046",
    notes: "Bulk sale to clinic",
    createdBy: "Emma Davis",
    createdAt: "2024-12-15T11:30:00",
    status: "completed",
  },
];

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [warehouseFilter, setWarehouseFilter] = useState("all");

  // Date filtering - default to current date
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  };

  const [startDate, setStartDate] = useState(getCurrentDate());
  const [endDate, setEndDate] = useState(getCurrentDate());

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.skuCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.skuName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.referenceNo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    const matchesWarehouse =
      warehouseFilter === "all" ||
      transaction.warehouse
        .toLowerCase()
        .includes(warehouseFilter.toLowerCase());

    // Date filtering
    const transactionDate = new Date(transaction.createdAt)
      .toISOString()
      .split("T")[0];
    const matchesDate =
      transactionDate >= startDate && transactionDate <= endDate;

    return matchesSearch && matchesType && matchesWarehouse && matchesDate;
  });

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
        return <History className="h-4 w-4" />;
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

  const getTotalValue = () => {
    return filteredTransactions.reduce(
      (sum, transaction) => sum + transaction.totalValue,
      0
    );
  };

  const getTransactionCounts = () => {
    const counts = { receive: 0, issue: 0, transfer: 0, adjust: 0 };
    filteredTransactions.forEach((transaction) => {
      counts[transaction.type as keyof typeof counts]++;
    });
    return counts;
  };

  const transactionCounts = getTransactionCounts();

  return (
    <div>
      <header className="flex items-center gap-4 border-b px-4 py-3 md:px-6">
        <SafeSidebarTrigger />
        <h1 className="text-xl font-semibold gradient-text">
          Stock Transactions
        </h1>
      </header>

      <main className="p-4 md:p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card className="glass-effect border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">
                {filteredTransactions.length}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Received
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {transactionCounts.receive}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Issued
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {transactionCounts.issue}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Transfers
              </CardTitle>
              <ArrowRightLeft className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {transactionCounts.transfer}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Adjustments
              </CardTitle>
              <Edit3 className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {transactionCounts.adjust}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Value
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  getTotalValue() >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                ${Math.abs(getTotalValue()).toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="glass-effect border-0 shadow-lg">
          <CardContent className="p-4 md:p-6">
            <div className="space-y-6">
              {/* Date Range Filter */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date Range
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-sm font-medium">
                      Start Date
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-sm font-medium">
                      End Date
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-transparent">
                      Quick
                    </Label>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const today = getCurrentDate();
                        setStartDate(today);
                        setEndDate(today);
                      }}
                      className="w-full hover:bg-slate-100"
                    >
                      Today
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-transparent">
                      Filters
                    </Label>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const today = new Date();
                          const lastWeek = new Date(
                            today.getTime() - 7 * 24 * 60 * 60 * 1000
                          );
                          setStartDate(lastWeek.toISOString().split("T")[0]);
                          setEndDate(getCurrentDate());
                        }}
                        className="flex-1 hover:bg-slate-100 text-xs"
                      >
                        7D
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const today = new Date();
                          const lastMonth = new Date(
                            today.getFullYear(),
                            today.getMonth() - 1,
                            today.getDate()
                          );
                          setStartDate(lastMonth.toISOString().split("T")[0]);
                          setEndDate(getCurrentDate());
                        }}
                        className="flex-1 hover:bg-slate-100 text-xs"
                      >
                        30D
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search and Other Filters */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search & Filters
                </h3>

                {/* Search Bar - Full Width on Mobile */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by SKU code, name, or reference..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Filter Controls - Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Transaction Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="receive">Receive</SelectItem>
                      <SelectItem value="issue">Issue</SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                      <SelectItem value="adjust">Adjust</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={warehouseFilter}
                    onValueChange={setWarehouseFilter}
                  >
                    <SelectTrigger className="w-full">
                      <Building className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Warehouses</SelectItem>
                      <SelectItem value="main">Main Warehouse</SelectItem>
                      <SelectItem value="branch">Branch A</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    className="hover:bg-slate-100 w-full"
                    onClick={() => {
                      setSearchTerm("");
                      setTypeFilter("all");
                      setWarehouseFilter("all");
                    }}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>

                  <Button
                    variant="outline"
                    className="hover:bg-slate-100 w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
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
                    <TableHead>SKU</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Unit Cost</TableHead>
                    <TableHead className="text-right">Total Value</TableHead>
                    <TableHead>Warehouse</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      className="hover:bg-slate-50/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTransactionIcon(transaction.type)}
                          {getTransactionBadge(transaction.type)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/skus/${transaction.id}`}
                          className="font-mono font-medium text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {transaction.skuCode}
                        </Link>
                      </TableCell>
                      <TableCell className="font-medium max-w-xs">
                        <div className="truncate" title={transaction.skuName}>
                          {transaction.skuName}
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
                          transaction.totalValue > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        ${Math.abs(transaction.totalValue).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-slate-500" />
                          <span className="text-sm">
                            {transaction.warehouse}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="px-2 py-1 bg-slate-100 text-slate-700 text-sm rounded font-mono">
                          {transaction.referenceNo}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-slate-500" />
                          <div className="text-sm">
                            <div className="font-medium">
                              {new Date(
                                transaction.createdAt
                              ).toLocaleDateString()}
                            </div>
                            <div className="text-slate-500">
                              {new Date(
                                transaction.createdAt
                              ).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-slate-500" />
                          <span className="text-sm">
                            {transaction.createdBy}
                          </span>
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
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Empty State */}
            {filteredTransactions.length === 0 && (
              <div className="text-center py-12">
                <History className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">
                  No transactions found
                </h3>
                <p className="text-slate-500 mb-4">
                  Try adjusting your search or filter criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setTypeFilter("all");
                    setWarehouseFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
