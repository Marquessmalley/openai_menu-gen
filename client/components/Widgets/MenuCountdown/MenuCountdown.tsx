"use client";

import { useEffect, useState } from "react";

export default function MenuCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Get first day of next month
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const difference = nextMonth.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial calculation

    return () => clearInterval(timer);
  }, []);

  const formatTimeUnit = (value: number, unit: string) => (
    <div className="flex flex-col items-center px-2">
      <span className="text-2xl font-bold text-gray-900">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-xs text-gray-500">{unit}</span>
    </div>
  );

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm col-span-full mb-4 sm:mb-5 md:mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Next Menu Generation
          </h2>
          <p className="text-sm text-gray-500">
            Time until next month's menu is automatically generated
          </p>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          {timeLeft.days > 0 && formatTimeUnit(timeLeft.days, "Days")}
          {formatTimeUnit(timeLeft.hours, "Hours")}
          {formatTimeUnit(timeLeft.minutes, "Mins")}
          {formatTimeUnit(timeLeft.seconds, "Secs")}
        </div>
      </div>
    </div>
  );
}
