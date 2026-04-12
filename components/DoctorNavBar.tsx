import logOutAction from "@/actions/auth-actions";
import { Cat } from "lucide-react";
import Link from "next/link";

export default function DoctorNavBar() {
  return (
    <nav className="p-5 shadow-2xl flex justify-around items-center">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Cat size={50} className="hover:text-sky-500" />
        </Link>
        <h1 className="text-2xl">Whisker & Wellness</h1>
      </div>

      <div className="flex gap-10 items-center">
        <ul className="flex gap-10">
          <li>
            <Link href="/my-doctor-profile">Profile</Link>
          </li>
          <li>
            <Link href="/my-patients">Patients</Link>
          </li>
          <li>
            <Link href="/my-doctor-bookings">Bookings</Link>
          </li>
          <li>
            <Link href="/my-avalability">Availability</Link>
          </li>
        </ul>

        <form action={logOutAction}>
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-lg border border-black hover:bg-white hover:text-black transition"
          >
            Log out
          </button>
        </form>
      </div>
    </nav>
  );
}
