"use client";

import { Card } from "@/components/ui/card";

export function SalesChart() {
  // Mock data for now - sẽ implement chart library sau
  const mockData = [
    { date: '1/6', revenue: 12000000 },
    { date: '2/6', revenue: 15000000 },
    { date: '3/6', revenue: 18000000 },
    { date: '4/6', revenue: 14000000 },
    { date: '5/6', revenue: 22000000 },
    { date: '6/6', revenue: 25000000 },
    { date: '7/6', revenue: 20000000 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        📊 Chart library sẽ được implement sau. Hiển thị data dạng table tạm thời:
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
        {mockData.map((item, index) => (
          <Card key={index} className="p-3 text-center">
            <div className="text-xs text-muted-foreground">{item.date}</div>
            <div className="text-sm font-semibold">
              {formatCurrency(item.revenue)}
            </div>
          </Card>
        ))}
      </div>

      <div className="text-xs text-muted-foreground text-center">
        💡 TODO: Integrate chart library (Recharts/Chart.js) cho visualization đẹp hơn
      </div>
    </div>
  );
}