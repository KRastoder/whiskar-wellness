import DoctorCard from "@/components/doctor-components/DoctorCard";
import { searchDoctorsBySpeciality } from "@/actions/doctors/doctor-search-actions";
import { isValidSpecialty } from "@/lib/validator";
import { notFound } from "next/navigation";

import { Stethoscope } from "lucide-react";

export default async function SpecialityPage({
  params,
}: {
  params: Promise<{ speciality: string }>;
}) {
  const { speciality } = await params;

  if (!isValidSpecialty(speciality)) {
    notFound();
  }

  const doctors = await searchDoctorsBySpeciality({
    specialty: speciality,
  });

  const formatted = speciality.replaceAll("_", " ");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* MAIN PANEL */}
      <div className="w-full max-w-2xl border border-border bg-card text-card-foreground rounded-lg p-4 space-y-4">
        {/* HEADER */}
        <div className="flex items-center justify-center gap-2 border-b border-border pb-2">
          <Stethoscope className="w-4 h-4 text-primary" />
          <h1 className="text-sm font-bold capitalize">{formatted}</h1>
        </div>

        {/* RESULTS */}
        <div className="space-y-2">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <p className="text-center text-xs text-muted-foreground py-6">
              No results found
            </p>
          )}
        </div>

        {/* FOOTER */}
        {doctors.length > 0 && (
          <div className="text-[10px] text-center text-muted-foreground border-t border-border pt-2">
            {doctors.length} doctor{doctors.length !== 1 && "s"} available
          </div>
        )}
      </div>
    </div>
  );
}
