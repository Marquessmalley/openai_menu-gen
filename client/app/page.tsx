import {
  TotalRecipeWidget,
  CurrentMealWidget,
  SideDishesWidget,
} from "@/components/Widgets";

export default async function Dashboard() {
  return (
    <div className="min-h-screen bg-zinc-100 font-sans">
      <main className="w-full max-w-[2000px] mx-auto min-h-screen p-4 sm:p-5 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          <div>
            <TotalRecipeWidget />
          </div>
          <div>
            <CurrentMealWidget />
          </div>
          <div>
            <SideDishesWidget />
          </div>
          <div>
            <CurrentMealWidget />
          </div>
        </div>
      </main>
    </div>
  );
}
