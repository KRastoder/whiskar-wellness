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
    <div className="min-h-[90vh] bg-gray-50 flex items-start justify-center pt-10 px-4 mb-10">
      <Card className="border-black border-6">
        {/* Header */}
        <div className="bg-red-300 p-8">
          <h1 className="text-3xl font-extrabold">Create New Account</h1>
          <p>Join us today! Enter your details to create your account.</p>
        </div>
        {/* Body */}
        <div className="p-8 space-y-6">
          <form
            action={(formData) => {
              // Add specialty to formData if using custom Select
              if (specialty) {
                formData.append("specialty", specialty);
              }
              startTransition(async () => {
                const res = await doctorSignUpAction(formData);

                // Type-safe error handling
                if ("issues" in res && res.issues) {
                  alert(
                    "Validation errors:\n" +
                      res.issues
                        .map((i) => `${i.field}: ${i.message}`)
                        .join("\n"),
                  );
                } else if ("error" in res && res.error) {
                  alert(res.error);
                } else if (res.success) {
                  alert("Account created successfully!");
                }
              });
            }}
            className="space-y-5"
          >
            <div>
              <Label>FULL NAME</Label>
              <Input
                name="name"
                placeholder="John Doe"
                className="h-12"
                required
              />
            </div>

            <div>
              <Label>USERNAME</Label>
              <Input
                name="username"
                placeholder="johndoe123"
                className="h-12"
                required
              />
            </div>

            <div>
              <Label>EMAIL</Label>
              <Input name="email" type="email" className="h-12" required />
            </div>

            <div>
              <Label>PASSWORD</Label>
              <Input
                name="password"
                type="password"
                className="h-12"
                required
              />
            </div>

            <div className="flex justify-between items-center gap-4">
              <div>
                <Label>SPECIALTY</Label>
                <Select value={specialty} onValueChange={setSpecialty}>
                  <Select.Trigger className="w-60">
                    <Select.Value placeholder="Select specialty" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      <Select.Item value="general_medicine">
                        General Medicine
                      </Select.Item>
                      <Select.Item value="dental">Dental</Select.Item>
                      <Select.Item value="cardiology">Cardiology</Select.Item>
                      <Select.Item value="dermatology">Dermatology</Select.Item>
                      <Select.Item value="surgery">Surgery</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select>
              </div>

              <div>
                <Label>PRICE</Label>
                <Input
                  type="number"
                  name="price"
                  placeholder="Price Per Session"
                  required
                />
              </div>
            </div>

            <div>
              <Label>VET LICENSE NUMBER</Label>
              <Input
                type="number"
                name="vetLicenseNumber"
                placeholder="License Number"
                required
              />
            </div>

            <div>
              <Label>YEARS OF EXPERIENCE</Label>
              <Input type="number" name="experience" placeholder="0" required />
            </div>

            <div>
              <Label>COUNTRY</Label>
              <Input
                type="text"
                name="country"
                placeholder="Serbia/USA..."
                required
              />
            </div>

            <div>
              <Label>CITY</Label>
              <Input
                type="text"
                name="city"
                placeholder="Belgrade/Washington"
                required
              />
            </div>

            <div>
              <Label>CLINIC ADDRESS</Label>
              <Input
                type="text"
                name="address "
                placeholder="Street Name"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full py-4 text-lg"
            >
              {isPending ? "LOADING..." : "CREATE ACCOUNT"}
            </Button>
          </form>

          <div className="text-center pt-4 border-t-2">
            <Link
              href="/sign-in"
              className="text-yellow-700 font-extrabold underline"
            >
              Already have an account? Login
            </Link>{" "}
            {/* Change from </a> to </Link> */}
          </div>
        </div>
      </Card>
    </div>
  );
}
