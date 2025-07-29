import Link from "next/link";
import FileList from "@/components/files/FileList";
import { Button } from "@/components/ui/button";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export default function FilesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto p-6 w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">자료실</h1>
          <Link href="/files/upload">
            <Button>업로드</Button>
          </Link>
        </div>

        <FileList />
      </main>

      <Footer />
    </div>
  );
}
