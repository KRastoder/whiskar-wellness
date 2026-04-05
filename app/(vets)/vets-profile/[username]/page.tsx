import { fetchDoctorByUserName } from "@/actions/doctors/doctor-fetch-actions";

export default async function VetsProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  console.log("Username:", username);
  const result = await fetchDoctorByUserName(username);
  console.log("Result:", result);

  return (
    <div>
      <h1>DOCTOR PROFILE PAGE</h1>
      <div>
        {result ? (
          <div>
            <h1>{result.name}</h1>
            <p>Specialty: {result.specialty}</p>
          </div>
        ) : (
          <p>Doctor not found</p>
        )}
      </div>
    </div>
  );
}
