// components/Widgets/RecipeCatalogWidget/RecipeCatalogWidget.tsx
import { BookOpen } from "lucide-react";
import { Chip } from "@/components/UI/Chip";
import { RecipeCatalogWidgetProps } from "@/types";

export default function RecipeCatalogWidget({
  menuItems,
}: RecipeCatalogWidgetProps) {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-teal-500 rounded-lg text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recipe Catalog
            </h2>
          </div>
          <Chip className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200">
            {menuItems.length} recipes
          </Chip>
        </div>
      </div>

      {/* Scrollable Menu List */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          maxHeight: "600px",
          width: "100%",
          minWidth: "300px",
        }}
      >
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            className="flex items-start p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {item.name}
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.sides.map((side, i) => (
                  <Chip
                    key={i}
                    className="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-200"
                  >
                    {side}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-4">
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
