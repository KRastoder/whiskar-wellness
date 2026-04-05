import { fetchAllDoctors } from "@/actions/doctors/doctor-fetch-actions";
import DoctorTable from "@/components/admin/DoctorTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    notFound();
  }
  if (session.user.role !== "admin") {
    notFound();
  }
  const doctors = await fetchAllDoctors();

  return (
    <div>
      <h1>Hello {session.user.username}</h1>
      <h2>Admin sigma</h2>
      <div>
        <DoctorTable doctors={doctors} />
      </div>
    </div>
  );
}
