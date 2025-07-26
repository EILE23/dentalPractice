import React, { useState, useEffect } from 'react';
import { Calendar, Card, Row, Col, Typography, Button, Modal, Form, Input, DatePicker, Select, List, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, FileTextOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

interface Lecture {
  id: number;
  title: string;
  description: string;
  instructor: string;
  startDate: string;
  endDate: string;
  files?: any[];
}

export default function CalendarPage() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [form] = Form.useForm();

  // 임시 데이터 (실제로는 API에서 가져옴)
  useEffect(() => {
    setLectures([
      {
        id: 1,
        title: '치과 진료소 관리 기초',
        description: '치과 진료소 운영의 기본 원칙과 실무',
        instructor: '김치과',
        startDate: '2024-01-15T09:00:00',
        endDate: '2024-01-15T12:00:00',
      },
      {
        id: 2,
        title: '환자 관리 시스템',
        description: '효율적인 환자 관리 방법론',
        instructor: '이치과',
        startDate: '2024-01-20T14:00:00',
        endDate: '2024-01-20T17:00:00',
      },
    ]);
  }, []);

  const dateCellRender = (value: Dayjs) => {
    const dayLectures = lectures.filter(lecture => 
      dayjs(lecture.startDate).isSame(value, 'day')
    );

    return (
      <div style={{ height: '100%', padding: '4px' }}>
        {dayLectures.map(lecture => (
          <div
            key={lecture.id}
            style={{
              background: '#1890ff',
              color: 'white',
              padding: '2px 4px',
              margin: '1px 0',
              borderRadius: '2px',
              fontSize: '10px',
              cursor: 'pointer',
            }}
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
          <p><strong>강사:</strong> {lecture.instructor}</p>
          <p><strong>설명:</strong> {lecture.description}</p>
          <p><strong>시간:</strong> {dayjs(lecture.startDate).format('YYYY-MM-DD HH:mm')} ~ {dayjs(lecture.endDate).format('HH:mm')}</p>
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
      const newLecture = {
        id: Date.now(),
        title: values.title,
        description: values.description,
        instructor: values.instructor,
        startDate: values.startDate.format('YYYY-MM-DDTHH:mm:ss'),
        endDate: values.endDate.format('YYYY-MM-DDTHH:mm:ss'),
      };
      
      setLectures([...lectures, newLecture]);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Card 
              title={
                <span>
                  <CalendarOutlined style={{ marginRight: '8px' }} />
                  강의 캘린더
                </span>
              }
              extra={
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                  강의 추가
                </Button>
              }
            >
              <Calendar 
                dateCellRender={dateCellRender}
                onSelect={handleDateSelect}
                style={{ backgroundColor: 'white' }}
              />
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="이번 주 강의">
              <List
                dataSource={lectures.filter(lecture => 
                  dayjs(lecture.startDate).isSame(dayjs(), 'week')
                )}
                renderItem={lecture => (
                  <List.Item
                    actions={[
                      <EditOutlined key="edit" />,
                      <DeleteOutlined key="delete" />
                    ]}
                  >
                    <List.Item.Meta
                      title={lecture.title}
                      description={
                        <div>
                          <Text type="secondary">{lecture.instructor}</Text>
                          <br />
                          <Text type="secondary">
                            {dayjs(lecture.startDate).format('MM-DD HH:mm')}
                          </Text>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

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
              rules={[{ required: true, message: '강의 제목을 입력하세요' }]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item
              name="description"
              label="강의 설명"
              rules={[{ required: true, message: '강의 설명을 입력하세요' }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
            
            <Form.Item
              name="instructor"
              label="강사명"
              rules={[{ required: true, message: '강사명을 입력하세요' }]}
            >
              <Input />
            </Form.Item>
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="startDate"
                  label="시작 시간"
                  rules={[{ required: true, message: '시작 시간을 선택하세요' }]}
                >
                  <DatePicker showTime style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="endDate"
                  label="종료 시간"
                  rules={[{ required: true, message: '종료 시간을 선택하세요' }]}
                >
                  <DatePicker showTime style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

// 임시 아이콘 컴포넌트
const CalendarOutlined = ({ style, ...props }: any) => (
  <span style={style} {...props}>📅</span>
); 