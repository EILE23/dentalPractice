"use client";

import { useEffect, useState } from "react";
import instance from "@/lib/axios";
import FileCard from "./FileCard";
import { Input } from "@/components/ui/input"; // 🔍 검색 입력용

interface FileItem {
  id: number;
  filename: string;
  originalname: string;
  title: string;
  description: string;
  url: string;
}

export default function FileList() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // 🔍 검색어 상태

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

  const filteredFiles = files.filter((file) =>
    (file.title + file.description).toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>📂 파일 목록 불러오는 중...</p>;
  if (files.length === 0) return <p>📭 등록된 파일이 없습니다.</p>;

  return (
    <div className="space-y-4">
      <Input
        placeholder="제목 또는 설명으로 검색"
        className="mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredFiles.length === 0 ? (
        <p>🔍 검색 결과가 없습니다.</p>
      ) : (
        filteredFiles.map((file) => <FileCard key={file.id} file={file} />)
      )}
    </div>
  );
}
