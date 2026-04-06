"use client";

import ToySalesChart from "./Toysaleschart";
import ToysTable from "./Toystable";

export default function ToyDashboard() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Toy Products Dashboard</h1>
        <p className="text-gray-600">
          Manage your toy inventory and track sales performance
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Sales Analytics</h2>
        <ToySalesChart />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">All Products</h2>
        <ToysTable />
      </div>
    </div>
  );
}
