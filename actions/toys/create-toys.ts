"use server";

import db from "@/db";
import { toy, toyImages } from "@/db/schemas/toys-schema";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const createToy = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const discount = Number(formData.get("discount") || 0);
  const description = formData.get("description") as string;

  const files = formData.getAll("images") as File[];

  if (!name || !price) return;

  const safeName = name.toLowerCase().replace(/\s+/g, "-");

  const uploadDir = path.join(process.cwd(), "public", "toys", safeName);

  await mkdir(uploadDir, { recursive: true });

  const inserted = await db
    .insert(toy)
    .values({
      name,
      price,
      discount,
      description,
    })
    .returning();

  const toyId = inserted[0].id;

  for (const file of files) {
    if (!file || file.size === 0) continue;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(uploadDir, file.name);

    await writeFile(filePath, buffer);

    await db.insert(toyImages).values({
      toyId,
      url: `/toys/${safeName}/${file.name}`,
    });
  }
};
