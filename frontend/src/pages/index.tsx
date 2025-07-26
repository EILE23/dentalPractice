import React from 'react';
import { Calendar, Card, Row, Col, Typography, Button } from 'antd';
import { PlusOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function Home() {
  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 헤더 */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={1} style={{ color: '#1890ff', marginBottom: '8px' }}>
            덴탈마스터컨설팅
          </Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>
            전문적인 치과 진료소 관리 시스템
          </Text>
        </div>

        {/* 메인 카드들 */}
        <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
          <Col xs={24} md={12}>
            <Card 
              title={
                <span>
                  <CalendarOutlined style={{ marginRight: '8px' }} />
                  강의 캘린더
                </span>
              }
              extra={
                <Link href="/calendar">
                  <Button type="primary" icon={<PlusOutlined />}>
                    캘린더 보기
                  </Button>
                </Link>
              }
              style={{ height: '300px' }}
            >
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CalendarOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
                <Title level={4}>주간/월간/일간 캘린더</Title>
                <Text type="secondary">강의 일정을 한눈에 확인하세요</Text>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card 
              title={
                <span>
                  <FileTextOutlined style={{ marginRight: '8px' }} />
                  자료실
                </span>
              }
              extra={
                <Link href="/files">
                  <Button type="primary" icon={<PlusOutlined />}>
                    자료실 보기
                  </Button>
                </Link>
              }
              style={{ height: '300px' }}
            >
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <FileTextOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '16px' }} />
                <Title level={4}>PDF 파일 업로드 & 공유</Title>
                <Text type="secondary">강의 자료를 업로드하고 공유하세요</Text>
              </div>
            </Card>
          </Col>
        </Row>

        {/* 빠른 액션 */}
        <Card title="빠른 액션">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Link href="/calendar">
                <Button size="large" block icon={<CalendarOutlined />}>
                  캘린더 보기
                </Button>
              </Link>
            </Col>
            <Col xs={24} sm={8}>
              <Link href="/files">
                <Button size="large" block icon={<FileTextOutlined />}>
                  자료실 보기
                </Button>
              </Link>
            </Col>
            <Col xs={24} sm={8}>
              <Link href="/lectures">
                <Button size="large" block icon={<UserOutlined />}>
                  강의 목록
                </Button>
              </Link>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}

// 임시 아이콘 컴포넌트 (실제로는 antd에서 import)
const CalendarOutlined = ({ style, ...props }: any) => (
  <span style={style} {...props}>📅</span>
);
