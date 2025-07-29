export interface FileMeta {
  id: number;
  filename: string;        // "timestamp-originalname"
  originalname: string;
  title: string;
  description: string;
}

export const mockFiles: FileMeta[] = [
  {
    id: 1,
    filename: "1722105600000-implant.pdf", // 2025-07-28
    originalname: "임플란트자료.pdf",
    title: "임플란트 강의 자료",
    description: "임플란트 관련 이론 자료입니다.",
  },
  {
    id: 2,
    filename: "1722192000000-orthodontics.pdf", // 2025-07-29
    originalname: "교정치료자료.pdf",
    title: "교정 치료 자료",
    description: "최신 교정 치료에 대한 설명과 이미지 포함.",
  },
];
