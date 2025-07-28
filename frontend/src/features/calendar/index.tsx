import React, { useState, useEffect } from "react";
import {
  Calendar as AntdCalendar,
  Modal,
  Form,
  Input,
  DatePicker,
  Button,
  List,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface Lecture {
  id: number;
  title: string;
  description: string;
  instructor: string;
  startDate: string;
  endDate: string;
  files?: unknown[];
}

export default function Calendar() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setLectures([
      {
        id: 1,
        title: "치과 진료소 관리 기초",
        description: "치과 진료소 운영의 기본 원칙과 실무",
        instructor: "김치과",
        startDate: "2024-01-15T09:00:00",
        endDate: "2024-01-15T12:00:00",
      },
      {
        id: 2,
        title: "환자 관리 시스템",
        description: "효율적인 환자 관리 방법론",
        instructor: "이치과",
        startDate: "2024-01-20T14:00:00",
        endDate: "2024-01-20T17:00:00",
      },
    ]);
  }, []);

  const dateCellRender = (value: Dayjs) => {
    const dayLectures = lectures.filter((lecture) =>
      dayjs(lecture.startDate).isSame(value, "day")
    );
    return (
      <div className="h-full p-1">
        {dayLectures.map((lecture) => (
          <div
            key={lecture.id}
            className="bg-blue-500 text-white px-2 py-1 my-0.5 rounded text-xs cursor-pointer"
            onClick={() => handleLectureClick(lecture)}
          >
            {lecture.title}
          </div>
        ))}
      </div>
    );
  };

  const handleLectureClick = (lecture: Lecture) => {
    Modal.info({
      title: lecture.title,
      content: (
        <div>
          <p>
            <strong>강사:</strong> {lecture.instructor}
          </p>
          <p>
            <strong>설명:</strong> {lecture.description}
          </p>
          <p>
            <strong>시간:</strong>{" "}
            {dayjs(lecture.startDate).format("YYYY-MM-DD HH:mm")} ~{" "}
            {dayjs(lecture.endDate).format("HH:mm")}
          </p>
        </div>
      ),
    });
  };

  const handleDateSelect = (value: Dayjs) => {
    setSelectedDate(value);
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const newLecture: Lecture = {
        id: Date.now(),
        title: values.title,
        description: values.description,
        instructor: values.instructor,
        startDate: values.startDate.format("YYYY-MM-DDTHH:mm:ss"),
        endDate: values.endDate.format("YYYY-MM-DDTHH:mm:ss"),
      };
      setLectures([...lectures, newLecture]);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      // validation error
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-xl font-bold">
                  <CalendarOutlined className="mr-2 text-blue-500" /> 강의
                  캘린더
                </div>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => setIsModalVisible(true)}
                >
                  강의 추가
                </Button>
              </div>
              <AntdCalendar
                dateCellRender={dateCellRender}
                onSelect={handleDateSelect}
                className="bg-white"
              />
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-lg font-semibold mb-4">이번 주 강의</div>
              <List
                dataSource={lectures.filter((lecture) =>
                  dayjs(lecture.startDate).isSame(dayjs(), "week")
                )}
                renderItem={(lecture) => (
                  <List.Item
                    actions={[
                      <EditOutlined key="edit" />,
                      <DeleteOutlined key="delete" />,
                    ]}
                  >
                    <List.Item.Meta
                      title={lecture.title}
                      description={
                        <div>
                          <span className="text-gray-500 text-xs">
                            {lecture.instructor}
                          </span>
                          <br />
                          <span className="text-gray-400 text-xs">
                            {dayjs(lecture.startDate).format("MM-DD HH:mm")}
                          </span>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
        <Modal
          title="강의 추가"
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => setIsModalVisible(false)}
          width={600}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="title"
              label="강의 제목"
              rules={[{ required: true, message: "강의 제목을 입력하세요" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="강의 설명"
              rules={[{ required: true, message: "강의 설명을 입력하세요" }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item
              name="instructor"
              label="강사명"
              rules={[{ required: true, message: "강사명을 입력하세요" }]}
            >
              <Input />
            </Form.Item>
            <div className="flex gap-4">
              <Form.Item
                name="startDate"
                label="시작 시간"
                className="flex-1"
                rules={[{ required: true, message: "시작 시간을 선택하세요" }]}
              >
                <DatePicker showTime className="w-full" />
              </Form.Item>
              <Form.Item
                name="endDate"
                label="종료 시간"
                className="flex-1"
                rules={[{ required: true, message: "종료 시간을 선택하세요" }]}
              >
                <DatePicker showTime className="w-full" />
              </Form.Item>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

const CalendarOutlined: React.FC<{ className?: string }> = ({ className }) => (
  <span className={className} role="img" aria-label="calendar">
    📅
  </span>
);
