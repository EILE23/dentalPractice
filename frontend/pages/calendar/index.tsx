// pages/calendar/index.tsx

"use client";

import { useState } from "react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import MonthlyCalendar from "@/components/calendar/MonthlyCalendar";
import WeeklyCalendar from "@/components/calendar/WeeklyCalendar";
import DailyCalendar from "@/components/calendar/DailyCalendar";
import FormModal from "@/components/lectures/FormModal";
import instance from "@/lib/axios";
import { GetServerSideProps } from "next";
import { toast } from "sonner";

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
}

type ViewMode = "month" | "week" | "day";

export default function CalendarPage({ events: initialEvents }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [events, setEvents] = useState<Lecture[]>(initialEvents);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleAddLecture = async (data: {
    title: string;
    instructor: string;
    startTime: string;
    endTime: string;
  }) => {
    if (!selectedDate) return;

    try {
      const res = await instance.post("/lectures", {
        date: selectedDate,
        ...data,
      });
      const saved = res.data;
      setEvents((prev) => [...prev, saved]);
      setModalOpen(false);
      toast.success("강의가 등록되었습니다");
    } catch (err) {
      console.error("강의 등록 실패:", err);
      toast.error("등록 실패");
    }
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-20 flex-1 text-center">
        <h1 className="text-3xl font-bold mb-6">강의 일정</h1>

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

        {viewMode === "month" && (
          <MonthlyCalendar events={events} onDateClick={handleDateClick} />
        )}
        {viewMode === "week" && (
          <WeeklyCalendar events={events} onDateClick={handleDateClick} />
        )}
        {viewMode === "day" && (
          <DailyCalendar events={events} onDateClick={handleDateClick} />
        )}
      </main>
      <Footer />

      {selectedDate && (
        <FormModal
          date={selectedDate}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddLecture}
        />
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await instance.get("/lectures");
    const events = res.data;

    return {
      props: {
        events,
      },
    };
  } catch (error) {
    console.error("강의 불러오기 실패:", error);
    return {
      props: {
        events: [],
      },
    };
  }
};
