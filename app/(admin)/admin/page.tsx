import { fetchAllDoctors } from "@/actions/doctors/doctor-fetch-actions";
import { fetchAllUsers } from "@/actions/users/fetchUsersActions";
import AdminTabs from "@/components/admin/AdminTabs";

export default async function AdminPage() {
  const doctors = await fetchAllDoctors();
  const users = await fetchAllUsers();

  return (
    <div>
      <AdminTabs users={users} doctors={doctors} />
    </div>
  );
}
