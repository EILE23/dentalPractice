import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import instance from "@/lib/axios"; 
import { copyShareLink } from "@/lib/shareLink";

export default function FileDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    instance.get(`/files/id/${id}`)
      .then(res => setFile(res.data))
      .catch((e) => {toast.error("파일 정보를 불러올 수 없습니다.")
    console.log(e)})
      .finally(() => setLoading(false));
  }, [id]);



  if (loading) return <p>🔄 불러오는 중...</p>;
  if (!file) return <p>❌ 파일을 찾을 수 없습니다.</p>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{file.title}</h1>
      <p className="text-gray-600 mb-2">{file.description}</p>
      <p className="text-sm text-gray-400 mb-6">업로드일: {new Date(Number(file.filename.split("-")[0])).toLocaleDateString("ko-KR")}</p>

      <div className="flex gap-3">
        <Button asChild variant="outline">
          <a href={`http://localhost:5001/files/static/${file.filename}`} download>
            다운로드
          </a>
        </Button>
        <Button variant="secondary" onClick={() => copyShareLink(file.id)}>
  공유 링크 복사
</Button>
      </div>
    </main>
  );
}
