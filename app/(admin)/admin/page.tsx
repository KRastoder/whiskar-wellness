import { fetchAllDoctors } from "@/actions/doctors/doctor-fetch-actions";
import { fetchAllUsers } from "@/actions/users/fetchUsersActions";
import AdminTabs from "@/components/admin/AdminTabs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    notFound();
  }
  const doctors = await fetchAllDoctors();
  const users = await fetchAllUsers();

  return (
    <div>
      <AdminTabs users={users} doctors={doctors} />
    </div>
  );
}
