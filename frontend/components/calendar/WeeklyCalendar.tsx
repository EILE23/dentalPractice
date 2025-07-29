"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { format, startOfWeek, addDays, isToday } from "date-fns";
import { ko } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

interface Lecture {
  id: number;
  date: string; // yyyy-MM-dd
  title: string;
  instructor: string;
  startTime: string;
  endTime: string;
}

interface Props {
  events: Lecture[];
  onDateClick: (date: string) => void;
}

export default function WeeklyCalendar({ events, onDateClick }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const router = useRouter();

  const weekStart = startOfWeek(currentDate, { locale: ko });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="max-w-xl mx-auto p-4 mb-10 rounded-lg shadow-md bg-white">
      <div className="flex justify-between mb-4">
        <button onClick={() => setCurrentDate(addDays(currentDate, -7))}>
          ←
        </button>
        <h2 className="text-xl font-bold">
          {format(weekStart, "yyyy.MM.dd", { locale: ko })} ~{" "}
          {format(addDays(weekStart, 6), "MM.dd", { locale: ko })}
        </h2>
        <button onClick={() => setCurrentDate(addDays(currentDate, 7))}>
          →
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-gray-600 font-medium pb-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((day, i) => (
          <div key={i}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const hasEvent = events.some((e) => e.date === dateStr);
          const isHovering = hoveredDate === dateStr;

          return (
            <div
              key={dateStr}
              className={twMerge(
                "relative h-24 flex flex-col items-center justify-center text-sm cursor-pointer",
                format(day, "eee", { locale: ko }) === "일" && "text-red-500",
                isToday(day) && "font-bold underline"
              )}
              onMouseEnter={() => setHoveredDate(dateStr)}
              onMouseLeave={() => setHoveredDate(null)}
              onClick={() => onDateClick(dateStr)}
            >
              {format(day, "d")}
              {hasEvent && (
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full absolute bottom-2" />
              )}
              {hasEvent && isHovering && (
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 z-20 w-52 bg-white border shadow-md rounded-lg p-2 text-left"
                  onMouseEnter={() => setHoveredDate(dateStr)}
                  onMouseLeave={() => setHoveredDate(null)}
                >
                  {events
                    .filter((e) => e.date === dateStr)
                    .map((lecture) => (
                      <div
                        key={lecture.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/lectures/${lecture.id}`);
                        }}
                        className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                      >
                        <div className="font-semibold">{lecture.title}</div>
                        <div className="text-xs text-gray-500">
                          {lecture.instructor}
                        </div>
                        <div className="text-xs text-gray-400">
                          {lecture.startTime} ~ {lecture.endTime}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
