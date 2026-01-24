import WidgetCard from "@/components/UI/cards/WidgetCard";
import { SideDishesWidgetProps } from "@/types";
export default function SideDishesWidget({ stat }: SideDishesWidgetProps) {
  return (
    <div>
      <WidgetCard
        title="Side Dishes"
        stat={stat}
        subtitle="32 unique options"
        bgColor="bg-orange-100"
        iconBgColor="bg-[#f59f0a]"
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
            className="lucide lucide-utensils h-4 w-4"
          >
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
            <path d="M7 2v20"></path>
            <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
          </svg>
        }
      />
    </div>
  );
}
