"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { CardDescription } from "@/components/ui/card"; // 🔧 REMOVE: Unused import
// import { Badge } from "@/components/ui/badge"; // 🔧 REMOVE: Unused import
import { TrendingUp, TrendingDown, ShoppingCart, Users, Package, AlertTriangle } from "lucide-react";

export function StatsCards() {
  // 🔧 REMOVE: Unused variable
  // const testData = {
  //   revenue: 0,
  //   orders: 0,
  //   customers: 2,
  //   lowStock: 0
  // };

  // Mock data for now - replace with real Supabase queries
  const stats = [
    {
      title: "Tổng doanh thu",
      value: "0 đ",
      change: "+5% so với tháng trước",
      trend: "up" as const,
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Tổng đơn hàng",
      value: "0",
      change: "-3% so với tháng trước",
      trend: "down" as const,
      icon: ShoppingCart,
      color: "text-blue-600"
    },
    {
      title: "Tổng khách hàng",
      value: "2",
      change: "+15% so với tháng trước",
      trend: "up" as const,
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Cảnh báo tồn kho",
      value: "0",
      change: "sản phẩm sắp hết hàng",
      trend: "neutral" as const,
      icon: AlertTriangle,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.trend === "up";
        
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className={`text-xs flex items-center gap-1 ${
                stat.trend === "up" 
                  ? "text-green-600" 
                  : stat.trend === "down" 
                    ? "text-red-600" 
                    : "text-muted-foreground"
              }`}>
                {stat.trend === "up" && <TrendingUp className="h-3 w-3" />}
                {stat.trend === "down" && <TrendingDown className="h-3 w-3" />}
                {stat.trend === "neutral" && <Package className="h-3 w-3" />}
                {stat.change}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}