import React from "react";
import { Button } from "antd";
import {
  PlusOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">
            덴탈마스터컨설팅
          </h1>
          <p className="text-gray-500 text-lg">
            전문적인 치과 진료소 관리 시스템
          </p>
        </div>
        {/* 메인 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between h-72">
            <div>
              <div className="flex items-center text-lg font-semibold mb-4">
                <CalendarOutlined className="mr-2 text-blue-500" /> 강의 캘린더
              </div>
              <div className="flex flex-col items-center justify-center h-32">
                <CalendarOutlined className="text-5xl text-blue-500 mb-2" />
                <div className="text-base font-medium">
                  주간/월간/일간 캘린더
                </div>
                <div className="text-gray-400 text-sm">
                  강의 일정을 한눈에 확인하세요
                </div>
              </div>
            </div>
            <Link href="/calendar" className="w-full">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                className="w-full bg-blue-500 hover:bg-blue-600 mt-4"
              >
                캘린더 보기
              </Button>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between h-72">
            <div>
              <div className="flex items-center text-lg font-semibold mb-4">
                <FileTextOutlined className="mr-2 text-green-500" /> 자료실
              </div>
              <div className="flex flex-col items-center justify-center h-32">
                <FileTextOutlined className="text-5xl text-green-500 mb-2" />
                <div className="text-base font-medium">
                  PDF 파일 업로드 & 공유
                </div>
                <div className="text-gray-400 text-sm">
                  강의 자료를 업로드하고 공유하세요
                </div>
              </div>
            </div>
            <Link href="/files" className="w-full">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                className="w-full bg-green-500 hover:bg-green-600 mt-4"
              >
                자료실 보기
              </Button>
            </Link>
          </div>
        </div>
        {/* 빠른 액션 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-lg font-semibold mb-4">빠른 액션</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/calendar">
              <Button
                size="large"
                block
                icon={<CalendarOutlined />}
                className="bg-blue-500 hover:bg-blue-600"
              >
                캘린더 보기
              </Button>
            </Link>
            <Link href="/files">
              <Button
                size="large"
                block
                icon={<FileTextOutlined />}
                className="bg-green-500 hover:bg-green-600"
              >
                자료실 보기
              </Button>
            </Link>
            <Link href="/lectures">
              <Button
                size="large"
                block
                icon={<UserOutlined />}
                className="bg-gray-500 hover:bg-gray-600"
              >
                강의 목록
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const CalendarOutlined: React.FC<{ className?: string }> = ({ className }) => (
  <span className={className} role="img" aria-label="calendar">
    📅
  </span>
);

export default Home;
