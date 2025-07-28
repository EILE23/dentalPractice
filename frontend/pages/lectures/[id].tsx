// pages/lectures/[id].tsx
import { GetServerSideProps } from "next";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

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
<br/>
        <div className="text-gray-800 mb-6 whitespace-pre-wrap">{content}</div>

        {/* {materialUrl && (
          <a
            href={materialUrl}
            className="inline-block mt-4 text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            📁 첨부자료 다운로드
          </a>
        )} */}
      </main>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  // 🟡 여기서 실제 DB 조회/API 호출로 대체하면 됨
  const mockData = [
  {
    id: 1,
    title: "임플란트 강의",
    instructor: "김치과",
    content: "임플란트 수술 기초 이론 및 실습 강의입니다.",
    startTime: "14:00",
    endTime: "16:00",
    materialUrl: "https://example.com/files/implant.pdf",
  },
  {
    id: 2,
    title: "교정 세미나",
    instructor: "이임플",
    content: "최신 교정 장치와 치료 사례 중심 세미나입니다.",
    startTime: "10:00",
    endTime: "12:00",
    materialUrl: "https://example.com/files/ortho.pdf",
  },
];


  const lecture = mockData.find((l) => l.id === Number(id));

  if (!lecture) {
    return {
      notFound: true,
    };
  }

  return {
    props: lecture,
  };
};
