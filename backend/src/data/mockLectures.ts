// mockLectures.ts

export interface Lecture {
  id: number;
  date: string;
  title: string;
  instructor: string;
  description: string; // ✅ 추가
  startTime: string;
  endTime: string;
  materialUrl?: string;
}

export const mockLectures: Lecture[] = [
  {
    id: 1,
    date: "2025-07-29",
    title: "임플란트",
    instructor: "아임플",
    description: "임플란트 시술의 기초 개념 및 실제 사례 중심 강의입니다.",
    startTime: "10:00",
    endTime: "12:00",
    materialUrl: "http://localhost:3000/files/1",
  },
  {
    id: 2,
    date: "2025-07-30",
    title: "치아 교정 강의",
    instructor: "이치아",
    description: "최신 교정 치료 트렌드와 장치별 치료 방법을 소개합니다.",
    startTime: "14:00",
    endTime: "16:00",
    materialUrl: "http://localhost:3000/files/2",
  },
];
