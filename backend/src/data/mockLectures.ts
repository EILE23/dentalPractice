export interface Lecture {
  id: number;
  date: string;
  title: string;
  instructor: string;
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
    startTime: "10:00",
    endTime: "12:00",
    materialUrl: "http://localhost:3000/files/1", 
  },
  {
    id: 2,
    date: "2025-07-30",
    title: "치아 교정 강의",
    instructor: "이치아",
    startTime: "14:00",
    endTime: "16:00",
 materialUrl: "http://localhost:3000/files/2", 
  },
];
