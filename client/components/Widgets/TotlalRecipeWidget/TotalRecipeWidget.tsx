import React from "react";
import WidgetCard from "@/components/UI/cards/WidgetCard";
import { TotalRecipeWidgetProps } from "@/types";
export default function TotalRecipeWidget({ stat }: TotalRecipeWidgetProps) {
  return (
    <WidgetCard
      title="Total Recipes"
      stat={stat}
      subtitle="In your catalog"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chef-hat h-4 w-4"
        >
          <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"></path>
          <path d="M6 17h12"></path>
        </svg>
      }
    />
  );
}
