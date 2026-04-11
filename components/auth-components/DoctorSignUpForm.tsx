"use client";

import { Select } from "@/components/retroui/Select";
import { useTransition, useState } from "react";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";
import { doctorSignUpAction } from "@/actions/auth-actions";
import Link from "next/link";

export default function DoctorSignUpComponent() {
  const [isPending, startTransition] = useTransition();
  const [specialty, setSpecialty] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-6 px-4">
      <Card className="w-full max-w-4xl shadow-lg">
        {/* HEADER */}
        <div className="bg-red-300 p-5 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-extrabold">
            Create your Doctor Profile
          </h1>
          <p className="text-sm opacity-80">
            Join the platform and start helping patients today
          </p>
        </div>

        {/* BODY */}
        <div className="p-5 sm:p-6">
          <form
            action={(formData) => {
              if (specialty) formData.append("specialty", specialty);

              startTransition(async () => {
                await doctorSignUpAction(formData);
              });
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* LEFT */}
            <div className="space-y-3">
              <div>
                <Label>Full Name</Label>
                <Input
                  name="name"
                  placeholder="e.g. Dr. John Smith"
                  className="h-10"
                  required
                />
              </div>

              <div>
                <Label>Username</Label>
                <Input
                  name="username"
                  placeholder="e.g. drjohnsmith"
                  className="h-10"
                  required
                />
              </div>

              <div>
                <Label>Email Address</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@clinic.com"
                  className="h-10"
                  required
                />
              </div>

              <div>
                <Label>Password</Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Create a secure password"
                  className="h-10"
                  required
                />
              </div>

              <div>
                <Label>Country</Label>
                <Input
                  name="country"
                  placeholder="e.g. Serbia"
                  className="h-10"
                  required
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-3">
              <div>
                <Label>Specialty</Label>
                <Select value={specialty} onValueChange={setSpecialty}>
                  <Select.Trigger className="w-full h-10">
                    <Select.Value placeholder="Choose your medical specialty" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      <Select.Item value="general_medicine">
                        General Medicine
                      </Select.Item>
                      <Select.Item value="dental">Dentistry</Select.Item>
                      <Select.Item value="cardiology">Cardiology</Select.Item>
                      <Select.Item value="dermatology">Dermatology</Select.Item>
                      <Select.Item value="surgery">Surgery</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select>
              </div>

              <div>
                <Label>Consultation Price</Label>
                <Input
                  type="number"
                  name="price"
                  placeholder="e.g. 50"
                  className="h-10"
                  required
                />
              </div>

              <div>
                <Label>License Number</Label>
                <Input
                  type="number"
                  name="vetLicenseNumber"
                  placeholder="Your official license ID"
                  className="h-10"
                  required
                />
              </div>

              <div>
                <Label>Experience (Years)</Label>
                <Input
                  type="number"
                  name="experience"
                  placeholder="e.g. 5"
                  className="h-10"
                  required
                />
              </div>

              <div>
                <Label>City</Label>
                <Input
                  name="city"
                  placeholder="e.g. Belgrade"
                  className="h-10"
                  required
                />
              </div>

              <div>
                <Label>Clinic Address</Label>
                <Input
                  name="address"
                  placeholder="Street, building, clinic name"
                  className="h-10"
                  required
                />
              </div>
            </div>

            {/* BUTTON */}
            <div className="md:col-span-2 pt-2">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full py-2 text-base"
              >
                {isPending ? "Creating account..." : "Create Doctor Profile"}
              </Button>
            </div>
          </form>

          <div className="text-center pt-4 mt-4 border-t border-black/10">
            <Link
              href="/sign-in"
              className="text-yellow-700 font-bold underline text-sm"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
