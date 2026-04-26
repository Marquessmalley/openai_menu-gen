import {
  fetchMenuList,
  fetchCurrentMonthMenu,
  fetchMonthMenu,
  fetchMonthsMenu,
} from "@/lib/data";
import {
  TotalRecipeWidget,
  MealsThisMonth,
  SideDishesWidget,
  CurrentMealWidget,
  RecipeCatalogWidget,
  WeeklyScheduleWidget,
  MenuCountdown,
} from "@/components/Widgets";

import { countSideDishes } from "@/lib/menu-utils";

// export const dynamic = "force-dynamic";
export const revalidate = 86400; // Revalidate every day (24 hours in seconds)

export default async function Dashboard() {
  const [menuList, currentMonthMenu, monthMenu, monthsMenu] = await Promise.all(
    [
      fetchMenuList(),
      fetchCurrentMonthMenu(),
      fetchMonthMenu(),
      fetchMonthsMenu(),
    ],
  );

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-gray-950 font-sans">
      <main className="w-full max-w-[2000px] mx-auto min-h-screen p-4 sm:p-5 md:p-6 flex flex-col">
        <MenuCountdown />
        {/* Top widgets row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          <TotalRecipeWidget stat={menuList.length} />

          <MealsThisMonth currentMonthMenu={currentMonthMenu} />
          <SideDishesWidget stat={countSideDishes(menuList)} />
          <MealsThisMonth currentMonthMenu={currentMonthMenu} />
        </div>
        {/* Main content area with flexible height */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-6">
          {/* Left column - 2/3 width */}
          <div className="flex flex-col min-h-0 lg:col-span-2">
            <div className="mb-4 sm:mb-5 md:mb-6">
              <CurrentMealWidget monthMenu={monthMenu} />
            </div>
            <div className="flex-1 min-h-0">
              <WeeklyScheduleWidget monthMenu={monthMenu} />
            </div>
          </div>

          {/* Right column - 1/3 width */}
          <div className="lg:col-span-1 h-full">
            <RecipeCatalogWidget menuItems={menuList} />
          </div>
        </div>
      </main>
    </div>
  );
}
