import Image from "next/image";
import { Card } from "../retroui/Card";
import Link from "next/link";

export default function SpecialistDoctorCard({
  header,
  imagePath,
  description,
  price,
  linkURL,
}: {
  header: string;
  imagePath: string;
  description: string;
  price: number;
  linkURL: string;
}) {
  return (
    <Card className="w-full h-full flex flex-col justify-between gap-0 border-4 border-black rounded-none ">
      {/* Header Banner */}
      <div className="bg-yellow-300 border-b-4 border-black px-4 py-3">
        <h1 className="text-xl font-black uppercase tracking-tight text-center">
          {header}
        </h1>
      </div>

      {/* Image Section */}
      <div className="relative w-full h-48 bg-yellow-100 border-b-4 border-black overflow-hidden">
        <Image
          src={imagePath}
          alt={header}
          fill
          className="object-contain p-3"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-4 p-5 flex-grow">
        <p className="text-sm font-bold leading-snug text-gray-700">
          {description}
        </p>

        {/* Price Badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase bg-pink-300 border-2 border-black px-3 py-1">
            Price
          </span>
          <span className="text-2xl font-black">${price}</span>
        </div>

        {/* Promo Box */}
        <div className="bg-pink-200 border-3 border-black p-3 font-bold text-sm">
          🧸 Get 20% off toys after booking
        </div>
      </div>

      {/* Button */}
      <Link
        href={linkURL}
        className="block w-full bg-sky-300 border-t-4 border-black px-4 py-3 text-center font-black uppercase hover:bg-sky-400 active:translate-y-1 transition-all text-sm"
      >
        📅 Book Appointment
      </Link>
    </Card>
  );
}
