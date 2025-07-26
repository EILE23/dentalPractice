import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, Row, Col, Typography, Button, Descriptions, Space, Result } from 'antd';
import { DownloadOutlined, FileTextOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Text } = Typography;

interface SharedFile {
  id: number;
  title: string;
  description: string;
  originalName: string;
  size: number;
  createdAt: string;
  url: string;
}

export default function SharePage() {
  const router = useRouter();
  const { id } = router.query;
  const [file, setFile] = useState<SharedFile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // 실제로는 API에서 파일 정보를 가져옴
      setFile({
        id: Number(id),
        title: '치과 진료소 관리 가이드',
        description: '치과 진료소 운영을 위한 종합 가이드입니다. 이 문서는 치과 진료소의 효율적인 운영을 위한 다양한 방법론과 실무 지침을 포함하고 있습니다.',
        originalName: 'dental_management_guide.pdf',
        size: 2048576,
        createdAt: '2024-01-15T10:00:00',
        url: '/files/download/1',
      });
      setLoading(false);
    }
  }, [id]);

  const handleDownload = () => {
    // 실제로는 다운로드 API 호출
    window.open(`http://localhost:3001/files/download/${id}`, '_blank');
  };

  if (loading) {
    return (
      <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Card>
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <Text>파일 정보를 불러오는 중...</Text>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!file) {
    return (
      <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Result
            status="404"
            title="파일을 찾을 수 없습니다"
            subTitle="요청하신 파일이 존재하지 않거나 삭제되었습니다."
            extra={
              <Link href="/">
                <Button type="primary" icon={<ArrowLeftOutlined />}>
                  홈으로 돌아가기
                </Button>
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Card>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <FileTextOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
            <Title level={2}>공유된 파일</Title>
            <Text type="secondary">덴탈마스터컨설팅에서 공유한 파일입니다</Text>
          </div>

          <Descriptions bordered column={1}>
            <Descriptions.Item label="파일명">
              <Space>
                <FileTextOutlined style={{ color: '#1890ff' }} />
                {file.title}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="원본 파일명">
              {file.originalName}
            </Descriptions.Item>
            <Descriptions.Item label="파일 크기">
              {(file.size / 1024 / 1024).toFixed(1)} MB
            </Descriptions.Item>
            <Descriptions.Item label="업로드일">
              {new Date(file.createdAt).toLocaleDateString()}
            </Descriptions.Item>
            <Descriptions.Item label="설명">
              {file.description}
            </Descriptions.Item>
          </Descriptions>

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Space>
              <Button 
                type="primary" 
                size="large" 
                icon={<DownloadOutlined />}
                onClick={handleDownload}
              >
                파일 다운로드
              </Button>
              <Link href="/">
                <Button size="large" icon={<ArrowLeftOutlined />}>
                  홈으로 돌아가기
                </Button>
              </Link>
            </Space>
          </div>
        </Card>
      </div>
    </div>
  );
} 