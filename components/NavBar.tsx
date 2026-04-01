import { Cat } from "lucide-react";
import Link from "next/link";
import { Button } from "./retroui/Button";

export default function NavBar() {
  return (
    <nav className="p-5  shadow-2xl shadow-5xs flex justify-around items-center">
      <div className="flex gap-2 items-center">
        <Link href={"/"}>
          <Cat
            size={"50"}
            className="hover:cursor-pointer hover:text-sky-500"
          ></Cat>
        </Link>
        <h1 className="text-2xl">Whisker & Wellness</h1>
      </div>
      <div className="flex gap-5 items-center">
        <ul className="flex gap-5">
          <li>
            <Link
              href={"/toys"}
              className="text-xl relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-500 after:transition-all after:duration-300 hover:after:w-full hover:text-sky-500"
            >
              Toys
            </Link>
          </li>
          <li>
            <Link
              href={"/vets"}
              className=" text-xl relative inline-block  after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-500 after:transition-all after:duration-300 hover:after:w-full hover:text-sky-500"
            >
              Vets
            </Link>
          </li>
          <li>
            <Link
              href={"/rewards"}
              className="text-xl relative inline-block  after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-500 after:transition-all after:duration-300 hover:after:w-full hover:text-sky-500"
            >
              Rewards
            </Link>
          </li>
          <li>
            <Link
              href={"/contact"}
              className="text-xl relative inline-block  after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-500 after:transition-all after:duration-300 hover:after:w-full hover:text-sky-500"
            >
              Contact
            </Link>
          </li>
        </ul>
        <Link
          href="/sign-up"
          className="bg-black text-white px-6 py-2 rounded-lg border border-black hover:bg-white hover:text-black transition duration-300"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
}
