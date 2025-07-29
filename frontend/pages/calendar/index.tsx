import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import CalendarMain, { Lecture } from "@/features/CalendarMain";
import { GetServerSideProps } from "next";
import instance from "@/lib/axios";

interface Props {
  events: Lecture[];
}

export default function CalendarPage({ events }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CalendarMain events={events} />
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await instance.get("/lectures");
    const events = res.data;

    return {
      props: { events },
    };
  } catch (error) {
    console.error("강의 불러오기 실패:", error);
    return {
      props: { events: [] },
    };
  }
};
