import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#1c2a52] text-white py-4 px-8 flex justify-between items-center">
      <div className="flex items-center gap-2">
        {/* <Image src="/logo.png" alt="DentalMaster Logo" width={40} height={40} /> */}
        <Link href="/" className="text-xl font-bold">
          DentalMaster
        </Link>
      </div>
      <nav className="space-x-6">
        <Link href="/calendar">캘린더</Link>
        <Link href="/files">자료실</Link>
      </nav>
    </header>
  );
}
