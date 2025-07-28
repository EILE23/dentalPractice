// pages/calendar/index.tsx
import { useState } from "react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import MonthlyCalendar from "@/components/calendar/MonthlyCalendar";
import WeeklyCalendar from "@/components/calendar/WeeklyCalendar";
import DailyCalendar from "@/components/calendar/DailyCalendar";
import { GetServerSideProps } from "next";

interface Lecture {
  id: number;
  date: string;
  title: string;
  instructor: string;
  startTime: string;     // HH:mm
  endTime: string;       // HH:mm
}

interface Props {
  events: Lecture[];
}

type ViewMode = "month" | "week" | "day";

export default function CalendarPage({ events }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>("month");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-20 flex-1 text-center">
        <h1 className="text-3xl font-bold mb-6">📅 강의 일정</h1>

        {/* 보기 모드 전환 버튼 */}
        <div className="mb-6 space-x-2">
          <button
            onClick={() => setViewMode("month")}
            className={viewMode === "month" ? "font-bold underline" : ""}
          >
            월간
          </button>
          <button
            onClick={() => setViewMode("week")}
            className={viewMode === "week" ? "font-bold underline" : ""}
          >
            주간
          </button>
          <button
            onClick={() => setViewMode("day")}
            className={viewMode === "day" ? "font-bold underline" : ""}
          >
            일간
          </button>
        </div>

        {/* 모드에 따라 렌더링 다르게 */}
        {viewMode === "month" && <MonthlyCalendar events={events} />}
        {viewMode === "week" && <WeeklyCalendar events={events} />}
        {viewMode === "day" && <DailyCalendar events={events} />}
      </main>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const events = [
    {
      id: 1,
      date: "2025-07-28",
      title: "임플란트 강의",
      instructor: "김치과",
      startTime: "14:00",
      endTime: "16:00",
    },
    {
      id: 2,
      date: "2025-07-30",
      title: "교정 세미나",
      instructor: "이임플",
      startTime: "10:00",
      endTime: "12:00",
    },
  ];

  return {
    props: {
      events,
    },
  };
};
