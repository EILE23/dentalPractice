// components/files/FileUploadForm.tsx
"use client";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/router"; // Pages Router니까 이거
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import instance from "@/lib/axios";

export default function FileUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleUpload = async () => {
    if (!title || !file) {
      toast.error("제목과 PDF 파일을 입력해주세요.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description);

      const res = await instance.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("업로드 완료!");
      router.push("/files");
    } catch (err) {
      toast.error("업로드 실패");
      console.error(err);
    }
  };

  return (
    <Card className="space-y-4 p-6 mb-10">
      <div className="space-y-2">
        <Label>제목</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label>설명</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-[150px] resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label>PDF 파일</Label>
        <Input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <Button className="w-full" onClick={handleUpload}>
        업로드
      </Button>
    </Card>
  );
}
