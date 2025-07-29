"use client";

import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { ko } from "date-fns/locale";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/router";

interface Lecture {
  id: number;
  date: string;
  title: string;
  instructor: string;
  startTime: string;
  endTime: string;
}

interface Props {
  events: Lecture[];
  onDateClick: (date: string) => void;
}

export default function MonthlyCalendar({ events, onDateClick }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const router = useRouter();

  const renderHeader = () => (
    <div className="flex items-center justify-between px-4 mb-4">
      <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
        ←
      </button>
      <h2 className="text-xl font-bold">
        {format(currentMonth, "yyyy.MM", { locale: ko })}
      </h2>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
        →
      </button>
    </div>
  );

  const renderDays = () => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return (
      <div className="grid grid-cols-7 text-center text-gray-600 font-medium pb-2">
        {days.map((day, i) => (
          <div key={i} className={day === "일" ? "text-red-500" : ""}>
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale: ko });
    const endDate = endOfWeek(monthEnd, { locale: ko });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formatted = format(day, "d");
        const dateStr = format(day, "yyyy-MM-dd");
        const isCurrentMonth = isSameMonth(day, currentMonth);
        const isToday = isSameDay(day, new Date());
        const hasEvent = events.some((e) => e.date === dateStr);
        const isHovering = hoveredDate === dateStr;

        days.push(
          <div
            key={day.toString()}
            className={twMerge(
              "relative h-20 flex flex-col items-center justify-center text-sm cursor-pointer group",
              !isCurrentMonth && "text-gray-300",
              format(day, "eee", { locale: ko }) === "일" && "text-red-500",
              isToday && "font-bold underline"
            )}
            onMouseEnter={() => setHoveredDate(dateStr)}
            onMouseLeave={() => setHoveredDate(null)}
            onClick={() => onDateClick(dateStr)}
          >
            {formatted}
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

        day = addDays(day, 1);
      }

      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  return (
    <div className="max-w-xl mx-auto p-4 mb-10 rounded-lg shadow-md bg-white">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
