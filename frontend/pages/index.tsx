import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center p-10">
        <h2 className="text-3xl font-bold mb-4">15년 이상의 개원 컨설팅 노하우</h2>
        <p className="text-gray-600 mb-8">덴탈마스터와 함께 성공적인 치과 개원을 시작하세요.</p>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
