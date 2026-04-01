import { Button } from "@/components/retroui/Button";
export default function TopSection() {
  return (
    <section className="flex flex-col items-center bg-sky-100 gap-20 py-30">
      <div className="flex flex-col gap-10 items-center">
        <h1 className="text-6xl font-extrabold ">
          Your Cat&apos;s Complete Care Hub
        </h1>
        <p className="text-xl font-bold">
          Premium toys to entertain. Specialist vets to care. Smart discounts on
          both.
        </p>
      </div>
      <div className="flex gap-4">
        <Button size={"lg"}>Shop Toys</Button>
        <Button size={"lg"} variant={"secondary"}>
          Book Vet
        </Button>
      </div>
    </section>
  );
}
