import WidgetCard from "@/components/UI/cards/WidgetCard";

export default function CurrentMealWidget() {
  return (
    <div>
      <WidgetCard
        title="Meals This Month"
        stat={20}
        subtitle="January 2026"
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
            className="lucide lucide-calendar h-4 w-4"
          >
            <path d="M8 2v4"></path>
            <path d="M16 2v4"></path>
            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
            <path d="M3 10h18"></path>
          </svg>
        }
      />
    </div>
  );
}
