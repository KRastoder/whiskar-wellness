"use client";

import { useTransition } from "react";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";
import { signUpAction } from "@/actions/auth-actions";

export default function SignUpComponent() {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="min-h-[90vh] bg-gray-50 flex items-start justify-center pt-10 px-4 mb-10">
      <Card className="outline-black outline-6">
        {/* Header */}
        <div className="bg-sky-300 p-8">
          <h1 className="text-3xl font-black text-black tracking-tight ">
            SIGN UP
          </h1>
          <p> Join us today! Enter your details to create your account.</p>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          <form
            action={(formData) => {
              startTransition(async () => {
                const res = await signUpAction(formData);
                if (res?.error) {
                  alert(res.error);
                } else {
                  alert("Account created!");
                }
              });
            }}
            className="space-y-5"
          >
            <div>
              <Label>FULL NAME</Label>
              <Input name="name" placeholder="John Doe" className="h-12" />
            </div>

            <div>
              <Label>USERNAME</Label>
              <Input
                name="username"
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

            <Button
              type="submit"
              disabled={isPending}
              className="w-full py-4 text-lg"
            >
              {isPending ? "LOADING..." : "CREATE ACCOUNT"}
            </Button>
          </form>

          <div className="text-center pt-4 border-t-2">
            <a href="/sign-in" className="text-sky-500 font-bold underline">
              Already have an account? Login
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
