"use server";

import db from "@/db";
import { user } from "@/db/schemas/auth-schema";
import { doctor } from "@/db/schemas/doctor-schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const doctorSignUpSchema = signUpSchema.extend({
  specialty: z.enum([
    "general_medicine",
    "dental",
    "cardiology",
    "dermatology",
    "surgery",
  ]),
  vetLicenseNumber: z
    .string()
    .transform(Number)
    .pipe(
      z.number().int().positive("License number must be a positive integer"),
    ),
  price: z
    .string()
    .transform(Number)
    .pipe(z.number().int().positive("Price must be a positive integer")),
  experience: z
    .string()
    .transform(Number)
    .pipe(z.number().int().nonnegative("Experience cannot be negative")),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
});

function handleValidationError(error: unknown) {
  if (error instanceof z.ZodError) {
    return {
      success: false,
      error: "Validation failed",
      issues: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    };
  }
  return null;
}

export async function signUpAction(formData: FormData) {
  try {
    const data = signUpSchema.parse(Object.fromEntries(formData));

    await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: data.name,
        username: data.username,
      },
    });

    return { success: true, message: "Account created successfully" };
  } catch (error) {
    const validationError = handleValidationError(error);
    if (validationError) return validationError;

    return {
      success: false,
      error: "Failed to create account",
    };
  }
}

export async function signInAction(formData: FormData) {
  try {
    const data = signInSchema.parse(Object.fromEntries(formData));

    await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    const validationError = handleValidationError(error);
    if (validationError) return validationError;

    return {
      success: false,
      error: "Sign in failed",
    };
  }
}

export async function doctorSignUpAction(formData: FormData) {
  try {
    const data = doctorSignUpSchema.parse(Object.fromEntries(formData));

    const signUpResult = await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: data.name,
        username: data.username,
      },
    });

    if (!signUpResult?.user?.id) {
      throw new Error("User creation failed");
    }

    const userId = signUpResult.user.id;

    await db.update(user).set({ role: "doctor" }).where(eq(user.id, userId));

    await db.transaction(async (tx) => {
      await tx.insert(doctor).values({
        id: userId,
        specialty: data.specialty,
        vetenaryLisenceNumber: data.vetLicenseNumber,
        price: data.price,
        experience: data.experience,
        country: data.country,
        city: data.city,
        adress: data.address,
      });
    });

    return {
      success: true,
      message: "Doctor account created successfully",
      doctorId: userId,
    };
  } catch (error) {
    const validationError = handleValidationError(error);
    if (validationError) return validationError;

    return {
      success: false,
      error: "Failed to create doctor account",
    };
  }
}

export default async function logOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/");
}
