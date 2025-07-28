import { FileItem } from '../file/file.entity'; // FileEntity도 interface로 바꿔줘야 함

export interface Lecture {
  id: number;
  title: string;
  description: string;
  instructor: string;
  startDate: string; // string으로 통일
  endDate: string;
  files: FileItem[];
}
