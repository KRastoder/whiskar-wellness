"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
        <span className="text-lg font-semibold">Admin</span>

        <Link
          href="/admin"
          className={`px-3 py-2 rounded-md text-sm ${
            pathname === "/admin"
              ? "bg-black text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Dashboard
        </Link>

        <Link
          href="/admin/total-sales"
          className={`px-3 py-2 rounded-md text-sm ${
            pathname === "/admin/total-sales"
              ? "bg-black text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Total Sales
        </Link>

        <Link
          href="/admin/toy-sales"
          className={`px-3 py-2 rounded-md text-sm ${
            pathname === "/admin/toy-sales"
              ? "bg-black text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Toy Sales
        </Link>

        <Link
          href="/admin/doctor-sales"
          className={`px-3 py-2 rounded-md text-sm ${
            pathname === "/admin/doctor-sales"
              ? "bg-black text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Doctor Sales
        </Link>
      </div>
    </nav>
  );
}
