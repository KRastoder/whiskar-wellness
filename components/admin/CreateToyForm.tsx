"use client";

import { useState } from "react";
import { Input } from "../retroui/Input";

export default function CreateToyForm({
  action,
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  const [files, setFiles] = useState<FileList | null>(null);

  return (
    <form action={action} className="space-y-4 max-w-md">
      <Input name="name" placeholder="Toy name (e.g. Teddy)" required />

      <Input name="price" type="number" placeholder="Price" required />

      <Input name="discount" type="number" placeholder="Discount %" />

      <textarea
        name="description"
        placeholder="Description"
        className="w-full border rounded-md p-2"
      />

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => setFiles(e.target.files)}
        name="images"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded-md"
      >
        Create Toy
      </button>
    </form>
  );
}
