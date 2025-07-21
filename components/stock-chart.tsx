"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Pain Relief", stock: 775 },
  { name: "Cough Medicine", stock: 120 },
  { name: "Vitamins", stock: 1600 },
  { name: "Topical", stock: 220 },
  { name: "Supplies", stock: 130 },
];

export function StockChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock by Product Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis fontSize={12} />
            <Tooltip />
            <Bar dataKey="stock" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
