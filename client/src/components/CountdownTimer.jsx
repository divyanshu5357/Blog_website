import { useEffect, useState } from "react";

export default function CountdownTimer({
  targetDate,
  duration,
}) {
  const calculateTimeLeft = () => {
    const now = new Date();

    const start = new Date(targetDate);

    const end = new Date(
      start.getTime() + duration * 60 * 1000
    );

    // Session Completed
    if (now >= end) {
      return "completed";
    }

    // Session Live
    if (now >= start) {
      return "live";
    }

    // Upcoming
    const difference = start - now;

    return {
      days: Math.floor(
        difference / (1000 * 60 * 60 * 24)
      ),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),
      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),
      seconds: Math.floor(
        (difference / 1000) % 60
      ),
    };
  };

  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, duration]);

  if (timeLeft === "completed") {
    return (
      <div className="mt-4 rounded-xl bg-gray-100 p-4 text-center text-gray-700 font-semibold">
        ✅ Session Completed
      </div>
    );
  }

  if (timeLeft === "live") {
    return (
      <div className="mt-4 rounded-xl bg-red-100 p-4 text-center text-red-700 font-semibold animate-pulse">
        🔴 Live Now
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl p-4 text-white">
      <p className="text-sm font-medium mb-3">
        ⏳ Starts In
      </p>

      <div className="grid grid-cols-4 gap-3">
        {[
          {
            value: timeLeft.days,
            label: "Days",
          },
          {
            value: timeLeft.hours,
            label: "Hours",
          },
          {
            value: timeLeft.minutes,
            label: "Minutes",
          },
          {
            value: timeLeft.seconds,
            label: "Seconds",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white/15 rounded-lg p-3 text-center"
          >
            <p className="text-2xl font-bold">
              {String(item.value).padStart(
                2,
                "0"
              )}
            </p>

            <p className="text-xs uppercase tracking-wide">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}