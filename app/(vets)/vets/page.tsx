"use server";
import {
  fetchAllDoctors,
  fetchDoctorsBySpecialty,
} from "../../../actions/doctors/doctor-fetch-actions";

export default async function VetsPage() {
  const doctors = await fetchAllDoctors();
  const detarmotlogyDoctors = await fetchDoctorsBySpecialty("dermatology");

  return (
    <div>
      <h1>TEST</h1>
      <div>
        <h1>ALL DOCTORS</h1>
        {doctors.map((doctor) => (
          <div key={doctor.id}>
            <h1>{doctor.name}</h1>
            <p>{doctor.specialty}</p>
            <p>{doctor.city}</p>
            <p>{doctor.price}€</p>
          </div>
        ))}
        <h1>DETERMATOLOGY </h1>
        <div>
          {detarmotlogyDoctors.map((doctor) => (
            <div key={doctor.id}>
              <h1>{doctor.name}</h1>
              <p>{doctor.specialty}</p>
              <p>{doctor.city}</p>
              <p>{doctor.price}€</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
