"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { Plus, Save } from "lucide-react";

export default function ReceivePage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    sku: "",
    warehouse: "",
    quantity: "",
    reference: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate API call
    toast({
      title: "Stock Received Successfully",
      description: `Received ${formData.quantity} units into ${formData.warehouse} warehouse`,
    });

    // Reset form
    setFormData({
      sku: "",
      warehouse: "",
      quantity: "",
      reference: "",
      notes: "",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center gap-4 border-b px-4 py-3 md:px-6">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold">Receive Stock</h1>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-green-600" />
              Receive Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">Product (SKU)</Label>
                  <Select
                    value={formData.sku}
                    onValueChange={(value) =>
                      setFormData({ ...formData, sku: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PARA-500">
                        Paracetamol 500mg
                      </SelectItem>
                      <SelectItem value="IBUP-400">Ibuprofen 400mg</SelectItem>
                      <SelectItem value="COUGH-SYR">Cough Syrup</SelectItem>
                      <SelectItem value="VIT-C">Vitamin C 1000mg</SelectItem>
                      <SelectItem value="BETAD-SOL">Betadine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="warehouse">Warehouse</Label>
                  <Select
                    value={formData.warehouse}
                    onValueChange={(value) =>
                      setFormData({ ...formData, warehouse: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main Warehouse</SelectItem>
                      <SelectItem value="backup">Backup Warehouse</SelectItem>
                      <SelectItem value="retail">Retail Point</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Quantity to receive"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reference">Reference Number</Label>
                  <Input
                    id="reference"
                    placeholder="PO-001, INV-123"
                    value={formData.reference}
                    onChange={(e) =>
                      setFormData({ ...formData, reference: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes (optional)"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Save className="h-4 w-4 mr-2" />
                Save Stock Receipt
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
