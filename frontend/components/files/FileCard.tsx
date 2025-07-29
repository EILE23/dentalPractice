"use client";

import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { copyShareLink } from "@/lib/shareLink";
import instance from "@/lib/axios";

interface FileCardProps {
  file: {
    id: number;
    filename: string;
    originalname: string;
    title: string;
    description: string;
    url: string;
  };
}

export default function FileCard({ file }: FileCardProps) {
  const router = useRouter();

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(file.url, "_blank");
  };

  const handleClick = () => {
    router.push(`/files/${file.id}`);
  };

  const extractUploadDate = (filename: string) => {
    const timestamp = Number(filename.split("-")[0]);
    return isNaN(timestamp)
      ? "날짜 정보 없음"
      : new Date(timestamp).toLocaleDateString("ko-KR");
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    copyShareLink(file.id);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await instance.delete(`/files/${file.filename}`);
      toast.success("파일이 삭제되었습니다.");
      router.reload();
    } catch (error) {
      console.error("파일 삭제 실패:", error);
      toast.error("파일 삭제에 실패했습니다.");
    }
  };

  return (
    <div
      className="border rounded-lg p-4 shadow-sm cursor-pointer hover:bg-gray-50 transition"
      onClick={handleClick}
    >
      <h2 className="font-bold text-lg">{file.title}</h2>
      <p className="text-gray-500">
        {file.description ? file.description : "설명 없음"}
      </p>
      <p className="text-sm text-gray-400">
        업로드일: {extractUploadDate(file.filename)}
      </p>
      <div className="mt-3 flex justify-between items-center">
        <div className="space-x-2">
          <Button variant="outline" onClick={handleDownload}>
            다운로드
          </Button>
          <Button variant="secondary" onClick={handleCopyLink}>
            공유 링크 복사
          </Button>
        </div>

        <Button onClick={handleDelete}>삭제</Button>
      </div>
    </div>
  );
}
