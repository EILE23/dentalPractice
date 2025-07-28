"use client";
import { useEffect, useState } from "react";
import instance from "@/lib/axios"; // 형이 만든 axios 인스턴스
import FileCard from "./FileCard";

interface FileItem {
    id:number;
  filename: string;
  originalname: string;
  title: string;
  description: string;
  url: string;
}

export default function FileList() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance
      .get<FileItem[]>("/files")
      .then((res) => {
        setFiles(res.data);
      })
      .catch((err) => {
        console.error("파일 목록 가져오기 실패:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>📂 파일 목록 불러오는 중...</p>;
  if (files.length === 0) return <p>📭 등록된 파일이 없습니다.</p>;

  return (
    <div className="space-y-4">
      {files.map((file) => (
        <FileCard key={file.filename} file={file} />
      ))}
    </div>
  );
}
