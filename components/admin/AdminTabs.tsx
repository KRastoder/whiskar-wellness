"use client";

import { useState } from "react";
import DoctorTable from "@/components/admin/DoctorTable";
import UserTable from "@/components/admin/UserTable";

type Props = {
  //TODO MAKE THIS TYPE SAFE LATER
  doctors: any[];
  users: any[];
};

export default function AdminTabs({ doctors, users }: Props) {
  const [active, setActive] = useState<"doctors" | "users">("doctors");

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActive("doctors")}
          className={`px-4 py-2 rounded-lg border ${
            active === "doctors" ? "bg-black text-white" : "bg-white"
          }`}
        >
          Doctors
        </button>

        <button
          onClick={() => setActive("users")}
          className={`px-4 py-2 rounded-lg border ${
            active === "users" ? "bg-black text-white" : "bg-white"
          }`}
        >
          Users
        </button>
      </div>

      <div>
        {active === "doctors" && <DoctorTable doctors={doctors} />}
        {active === "users" && <UserTable users={users} />}
      </div>
    </div>
  );
}
