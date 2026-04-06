import { createToy } from "@/actions/users/toys/create-toys";
import CreateToyForm from "@/components/admin/CreateToyForm";

export default function ToySalesPage() {
  return (
    <div>
      <h1>Toy Sales Page</h1>
      <CreateToyForm action={createToy} />
    </div>
  );
}
