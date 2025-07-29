// lib/api/lectures.ts
import instance from "@/lib/axios";
import { toast } from "sonner";

export interface LectureData {
  title: string;
  instructor: string;
  startTime: string;
  endTime: string;
  date: string;
  materialUrl?: string;
}

// 시간 형식 유효성 검사 (HH:mm)
function isValidTimeFormat(time: string): boolean {
  return /^\d{2}:\d{2}$/.test(time);
}

// HH:mm → 분 단위로 변환
function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export async function createLecture(data: LectureData) {
  const { title, instructor, startTime, endTime } = data;

  if (!title || !instructor || !startTime || !endTime) {
    toast.error("모든 항목을 입력해주세요.");
    return null;
  }

  if (!isValidTimeFormat(startTime) || !isValidTimeFormat(endTime)) {
    toast.error("시간 형식이 올바르지 않습니다. (예: 14:00)");
    return null;
  }

  if (toMinutes(startTime) >= toMinutes(endTime)) {
    toast.error("시작 시간은 종료 시간보다 빨라야 합니다.");
    return null;
  }

  try {
    const res = await instance.post("/lectures", data);
    toast.success("강의가 등록되었습니다.");
    return res.data;
  } catch (err) {
    console.error("강의 등록 실패:", err);
    toast.error("강의 등록에 실패했습니다.");
    return null;
  }
}
