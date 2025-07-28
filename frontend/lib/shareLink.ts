// lib/share.ts
import { toast } from "sonner";

export const copyShareLink = (id: number | string) => {
  const url = `${window.location.origin}/files/${id}`;
  navigator.clipboard.writeText(url);
  toast.success("공유 링크가 복사되었습니다!");
};
