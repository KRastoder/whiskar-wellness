"use server";
import { fetchAllDoctors } from "@/actions/doctors/doctor-fetch-actions";
import DoctorCard from "@/components/doctor-components/DoctorCard";

export default async function VetsPage() {
  const doctors = await fetchAllDoctors();

  return (
    <div className="bg-sky-50 min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-center">
          🐾 All Doctors
        </h1>

        {/* Grid */}
        <div
          className="grid gap-6 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4"
        >
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <p className="col-span-full text-center font-bold">No vets found</p>
          )}
        </div>
      </div>
    </div>
  );
}
