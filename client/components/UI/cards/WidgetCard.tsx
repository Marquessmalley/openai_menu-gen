import React, { ReactNode } from "react";

interface WidgetCardProps {
  title?: string;
  stat?: string | number;
  subtitle?: string;
  icon?: ReactNode;
  iconBgColor?: string;
  className?: string;
  bgColor?: string;
  borderColor?: string;
}

const WidgetCard: React.FC<WidgetCardProps> = ({
  title,
  stat,
  subtitle,
  icon,
  iconBgColor = "bg-teal-400",
  className = "",
  bgColor = "bg-green-50 dark:bg-gray-800",
  borderColor = "border-green-200 dark:border-gray-700",
}) => {
  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 md:p-6 w-full border hover:shadow-lg transition-all duration-200 ${bgColor} ${borderColor} ${className}`}
    >
      <div className="flex justify-between items-start w-full">
        <div className="grow">
          {title && (
            <h3 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium sm:font-bold mb-2 sm:mb-3 md:mb-4">
              {title}
            </h3>
          )}
          {stat && (
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                {stat}
              </span>
              {subtitle && (
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-light">
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div
            className={`${iconBgColor} rounded-xl p-2 sm:p-1 text-white w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center ml-4 shrink-0`}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetCard;
