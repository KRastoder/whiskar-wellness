import { searchDoctors } from "@/actions/doctors/doctor-search-actions";

export default async function VetSearchPage({
  params,
}: {
  params: Promise<{ search: string }>;
}) {
  const { search } = await params;
  const result = await searchDoctors({ search });

  const hasResults = Array.isArray(result) && result.length > 0;

  return (
    <div>
      <h1>{search}</h1>
      <div>
        {hasResults ? (
          result.map((doctor) => (
            <div key={doctor.id}>
              <p>{doctor.name}</p>
              <p>{doctor.specialty}</p>
            </div>
          ))
        ) : (
          <p>Vet not found</p>
        )}
      </div>
    </div>
  );
}
