// pages/lectures/[id].tsx
import { GetServerSideProps } from "next";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import instance from "@/lib/axios";

interface LectureDetailProps {
  id: number;
  title: string;
  instructor: string;
  content: string;
  startTime: string;
  endTime: string;
  materialUrl?: string;
}

export default function LectureDetail({
  id,
  title,
  instructor,
  startTime,
  endTime,
  content,
  materialUrl,
}: LectureDetailProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 px-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-gray-600 mb-2">시간: {startTime} ~ {endTime}</p>
        <p className="text-gray-600 mb-2">강사: {instructor}</p>
        <br />
        <div className="text-gray-800 mb-6 whitespace-pre-wrap">{content}</div>

        {materialUrl && (
          <a
            href={materialUrl}
            className="inline-block mt-4 text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            📁 첨부자료 다운로드
          </a>
        )}
      </main>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  try {
    const res = await instance.get(`/lectures/${id}`);
    const lecture = res.data;

    return {
      props: lecture,
    };
  } catch (error) {
    console.error("강의 불러오기 실패:", error);
    return {
      notFound: true,
    };
  }
};
