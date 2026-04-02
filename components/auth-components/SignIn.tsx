"use client";

import { signInAction } from "@/actions/auth-actions";
import { Button } from "../retroui/Button";
import { Card } from "../retroui/Card";
import { Input } from "../retroui/Input";
import { Label } from "../retroui/Label";
import { useTransition } from "react";

//TODO REFACTOR LATER
export default function SignInComponent() {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="min-h-[90vh] bg-gray-50 flex items-start justify-center pt-10 px-4 mb-10">
      <Card className="w-full max-w-2xl border-4 border-black bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        {/* Header */}
        <div className="bg-sky-300 p-8">
          <h1 className="text-5xl font-black text-white tracking-tight mb-6">
            SIGN IN
          </h1>

          <div className="py-4 text-center font-black border-2 border-white bg-sky-500 text-white">
            👤 USER
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          <form
            action={(formData) => {
              startTransition(async () => {
                const res = await signInAction(formData);

                if (res?.error) {
                  alert(res.error);
                } else {
                  alert("Signed in");
                }
              });
            }}
            className="space-y-5"
          >
            <div>
              <Label>EMAIL</Label>
              <Input name="email" type="email" className="h-12" />
            </div>

            <div>
              <Label>PASSWORD</Label>
              <Input name="password" type="password" className="h-12" />
            </div>

            <Button type="submit" className="w-full py-4 text-lg">
              Login
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
