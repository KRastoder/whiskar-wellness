import { doctor } from "@/db/schemas/doctor-schema";

export type Specialty = (typeof doctor.specialty.enumValues)[number];

export function isValidSpecialty(value: string): value is Specialty {
  return (doctor.specialty.enumValues as readonly string[]).includes(value);
}
