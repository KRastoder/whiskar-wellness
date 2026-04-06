import { createToy } from "@/actions/toys/create-toys";
import CreateToyForm from "@/components/admin/CreateToyForm";
import ToyDashboard from "@/components/admin/toys/Toydashboard";

export default function ToySalesPage() {
  return (
    <div>
      <h1>Toy Sales Page</h1>
      <CreateToyForm action={createToy} />
      <ToyDashboard />
    </div>
  );
}
