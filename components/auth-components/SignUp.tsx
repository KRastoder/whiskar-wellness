"use client";

import { useState } from "react";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/retroui/Select";
import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";

export default function SignUpComponent() {
  const [userType, setUserType] = useState<"user" | "doctor">("user");
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-[90vh] bg-gray-50 flex items-start justify-center pt-10 px-4 mb-10">
      <Card className="w-full max-w-2xl border-4 border-black bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        {/* Header */}
        <div className="bg-sky-300 p-8">
          <h1 className="text-5xl font-black text-white tracking-tight mb-6">
            SIGN UP
          </h1>

          <div className="flex gap-4">
            <button
              onClick={() => setUserType("user")}
              className={`flex-1 py-4 font-black border-2 border-white transition-all ${
                userType === "user"
                  ? "bg-sky-500 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              👤 USER
            </button>

            <button
              onClick={() => setUserType("doctor")}
              className={`flex-1 py-4 font-black border-2 border-white transition-all ${
                userType === "doctor"
                  ? "bg-sky-500 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              🏥 DOCTOR
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {userType === "user" && (
            <form className="space-y-5">
              <div>
                <Label>FULL NAME</Label>
                <Input name="name" placeholder="John Doe" className="h-12" />
              </div>

              <div>
                <Label>USERNAME</Label>
                <Input
                  name="userName"
                  placeholder="johndoe123"
                  className="h-12"
                />
              </div>

              <div>
                <Label>EMAIL</Label>
                <Input name="email" type="email" className="h-12" />
              </div>

              <div>
                <Label>PASSWORD</Label>
                <Input name="password" type="password" className="h-12" />
              </div>

              <Button className="w-full py-4 text-lg">
                {loading ? "LOADING..." : "CREATE ACCOUNT"}
              </Button>
            </form>
          )}

          {userType === "doctor" && (
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>FULL NAME</Label>
                  <Input className="h-12" />
                </div>
                <div>
                  <Label>USERNAME</Label>
                  <Input className="h-12" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>EMAIL</Label>
                  <Input type="email" className="h-12" />
                </div>
                <div>
                  <Label>PASSWORD</Label>
                  <Input type="password" className="h-12" />
                </div>
              </div>

              <div>
                <Label>SPECIALTY</Label>
                <Select>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="cardio">Cardiology</SelectItem>
                    <SelectItem value="derma">Dermatology</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Input placeholder="License #" className="h-12" />
                <Input placeholder="Years" className="h-12" />
                <Input placeholder="Price" className="h-12" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Country" className="h-12" />
                <Input placeholder="City" className="h-12" />
              </div>

              <Input placeholder="Address" className="h-12" />

              <Button className="w-full py-4 text-lg">
                {loading ? "LOADING..." : "CREATE ACCOUNT"}
              </Button>
            </form>
          )}

          <div className="text-center pt-4 border-t-2">
            <a href="/login" className="text-sky-500 font-bold">
              Already have an account? Login
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
