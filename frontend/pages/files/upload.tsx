import FileUploadForm from "@/components/files/FileUploadForm";

export default function FileUploadPage() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">업로드</h1>
      <FileUploadForm />
    </main>
  );
}
