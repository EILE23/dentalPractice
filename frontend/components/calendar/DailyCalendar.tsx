"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { format, addDays } from "date-fns";
import { ko } from "date-fns/locale";

interface Lecture {
  id: number;
  date: string; // yyyy-MM-dd
  title: string;
  instructor: string;
    startTime: string;     // HH:mm
  endTime: string;  
}

interface Props {
  events: Lecture[];
}

export default function DailyCalendar({ events }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const router = useRouter();

  const dateStr = format(currentDate, "yyyy-MM-dd");
  const todayEvents = events.filter((e) => e.date === dateStr);

  return (
    <div className="max-w-xl mx-auto p-4 mb-10 rounded-lg shadow-md bg-white">
      <div className="flex justify-between mb-4">
        <button onClick={() => setCurrentDate(addDays(currentDate, -1))}>←</button>
        <h2 className="text-xl font-bold">
          {format(currentDate, "yyyy.MM.dd (eee)", { locale: ko })}
        </h2>
        <button onClick={() => setCurrentDate(addDays(currentDate, 1))}>→</button>
      </div>

      {todayEvents.length === 0 ? (
        <p className="text-gray-500 text-center">오늘은 강의가 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {todayEvents.map((lecture) => (
            <div
              key={lecture.id}
              onClick={() => router.push(`/lectures/${lecture.id}`)}
              className="cursor-pointer p-4 border rounded hover:bg-gray-100"
            >
              <div className="font-bold text-lg">{lecture.title}</div>
<div className="text-sm text-gray-600">{lecture.instructor}</div>
<div className="text-xs text-gray-500">
  {lecture.startTime} ~ {lecture.endTime}
</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
