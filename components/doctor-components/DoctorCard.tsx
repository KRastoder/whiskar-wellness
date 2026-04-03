import Image from "next/image";
import Link from "next/link";
import { Card } from "../retroui/Card";

export type DoctorCardData = {
  id: string;
  name: string;
  image: string | null;
  specialty: string;
  price: number;
  city: string;
  country: string;
};
type DoctorCardProps = {
  doctor: DoctorCardData;
  linkBase?: string;
  fallbackImage?: string;
};

export default function DoctorCard({
  doctor,
  linkBase = "/vets/search",
  fallbackImage = "/dentist-svgrepo-com.svg",
}: DoctorCardProps) {
  return (
    <Card className="w-full h-full flex flex-col justify-between border-4 border-black rounded-none">
      {/* Header */}
      <div className="bg-yellow-300 border-b-4 border-black px-4 py-3">
        <h1 className="text-xl font-black uppercase tracking-tight text-center">
          {doctor.name}
        </h1>
      </div>

      {/* Image */}
      <div className="relative w-full h-48 bg-yellow-100 border-b-4 border-black overflow-hidden">
        <Image
          src={doctor.image || fallbackImage}
          alt={doctor.name}
          fill
          className="object-contain p-3"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-5 grow">
        <p className="text-sm font-bold text-gray-700">
          {doctor.specialty.replace("_", " ")}
        </p>

        <p className="text-xs font-bold text-gray-500">
          📍 {doctor.city}, {doctor.country}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase bg-pink-300 border-2 border-black px-3 py-1">
            Price
          </span>
          <span className="text-2xl font-black">${doctor.price}</span>
        </div>

        {/* Promo */}
        <div className="bg-pink-200 border-3 border-black p-3 font-bold text-sm">
          🧸 Free checkup for first visit
        </div>
      </div>

      {/* Button */}
      <Link
        href={`${linkBase}/${doctor.id}`}
        className="block w-full bg-sky-300 border-t-4 border-black px-4 py-3 text-center font-black uppercase hover:bg-sky-400 active:translate-y-1 transition-all text-sm"
      >
        📅 Book Appointment
      </Link>
    </Card>
  );
}
