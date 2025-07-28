export interface FileItem {
  id: number;
  title: string;
  description: string;
  filename: string;
  originalName: string;
  size: number;
  url: string;
  createdAt: string; // string으로 저장된 ISO datetime
  lecture?: {
    id: number;
    title: string;
  }; // lecture는 일부 정보만 포함하거나 전체 Lecture 인터페이스 참조 가능
}
