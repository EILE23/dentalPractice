"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  date: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (lecture: {
    title: string;
    instructor: string;
    startTime: string;
    endTime: string;
    materialUrl?: string; 
  }) => void;
}

export default function FormModal({ date, isOpen, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [materialUrl, setMaterialUrl] = useState(""); 

  const handleSubmit = () => {
    if (!title || !instructor || !startTime || !endTime) {
      toast.error("모든 항목을 입력해주세요.");
      return;
    }

    onSubmit({
      title,
      instructor,
      startTime,
      endTime,
      materialUrl: materialUrl || undefined, 
    });
    
    setTitle("");
    setInstructor("");
    setStartTime("");
    setEndTime("");
    setMaterialUrl("");

    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="bg-white p-6 rounded shadow max-w-md w-full">
          <Dialog.Title className="text-xl font-bold mb-4">{date} 강의 등록</Dialog.Title>

          <input className="input mb-2" placeholder="제목" value={title} onChange={e => setTitle(e.target.value)} />
          <input className="input mb-2" placeholder="강사명" value={instructor} onChange={e => setInstructor(e.target.value)} />
          <input className="input mb-2" placeholder="시작 시간 (예: 14:00)" value={startTime} onChange={e => setStartTime(e.target.value)} />
          <input className="input mb-2" placeholder="종료 시간 (예: 16:00)" value={endTime} onChange={e => setEndTime(e.target.value)} />
          <input className="input mb-4" placeholder="첨부자료 링크 (선택)" value={materialUrl} onChange={e => setMaterialUrl(e.target.value)} />

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>취소</Button>
            <Button onClick={handleSubmit}>등록</Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
