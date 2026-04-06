"use client";

import { LineChart } from "@/components/retroui/charts/LineChart";

const salesData = [
  { name: "Jan", sold: 45, earnings: 157500 },
  { name: "Feb", sold: 62, earnings: 218000 },
  { name: "Mar", sold: 58, earnings: 203000 },
  { name: "Apr", sold: 78, earnings: 273000 },
  { name: "May", sold: 92, earnings: 322000 },
  { name: "Jun", sold: 85, earnings: 297500 },
];

export default function ToySalesChart() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto mb-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Units Sold Per Month</h3>
        <LineChart
          data={salesData}
          index="name"
          categories={["sold"]}
          valueFormatter={(value) => `${value} units`}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Monthly Earnings</h3>
        <LineChart
          data={salesData}
          index="name"
          categories={["earnings"]}
          valueFormatter={(value) => `$${(value / 100).toFixed(2)}`}
        />
      </div>
    </div>
  );
}
