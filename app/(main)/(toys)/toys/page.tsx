import { fetchAllToys } from "@/actions/toys/fetch-toys";

//TODO MAKE TOYS COMPONENT WITH IMAGES AS WELL
export default async function ToyPage() {
  const toys = await fetchAllToys();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-border bg-card text-card-foreground rounded-lg p-4 space-y-4">
        {/* HEADER */}
        <h1 className="text-sm font-bold border-b border-border pb-2 text-center">
          Toys
        </h1>

        {/* LIST */}
        {toys.length > 0 ? (
          <div className="space-y-2">
            {toys.map((toy) => (
              <div
                key={toy.id}
                className="border border-border px-3 py-2 text-xs flex justify-between items-center"
              >
                <span className="font-medium">{toy.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xs text-muted-foreground py-4">
            No toys available
          </p>
        )}
      </div>
    </div>
  );
}
