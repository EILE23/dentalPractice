import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Upload, Table, Modal, Form, Input, message, Tag, Space, Tooltip } from 'antd';
import { UploadOutlined, DownloadOutlined, ShareAltOutlined, DeleteOutlined, FileTextOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface FileItem {
  id: number;
  title: string;
  description: string;
  originalName: string;
  size: number;
  createdAt: string;
  url: string;
}

export default function FilesPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);

  // 임시 데이터
  useEffect(() => {
    setFiles([
      {
        id: 1,
        title: '치과 진료소 관리 가이드',
        description: '치과 진료소 운영을 위한 종합 가이드',
        originalName: 'dental_management_guide.pdf',
        size: 2048576, // 2MB
        createdAt: '2024-01-15T10:00:00',
        url: '/files/download/1',
      },
      {
        id: 2,
        title: '환자 관리 시스템 매뉴얼',
        description: '환자 관리 시스템 사용법',
        originalName: 'patient_management_manual.pdf',
        size: 3145728, // 3MB
        createdAt: '2024-01-16T14:30:00',
        url: '/files/download/2',
      },
    ]);
  }, []);

  const columns = [
    {
      title: '파일명',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: FileItem) => (
        <Space>
          <FileTextOutlined style={{ color: '#1890ff' }} />
          <div>
            <div>{text}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.originalName}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: '설명',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '크기',
      dataIndex: 'size',
      key: 'size',
      render: (size: number) => `${(size / 1024 / 1024).toFixed(1)} MB`,
    },
    {
      title: '업로드일',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: '액션',
      key: 'action',
      render: (text: string, record: FileItem) => (
        <Space>
          <Tooltip title="다운로드">
            <Button 
              type="text" 
              icon={<DownloadOutlined />} 
              onClick={() => handleDownload(record)}
            />
          </Tooltip>
          <Tooltip title="공유">
            <Button 
              type="text" 
              icon={<ShareAltOutlined />} 
              onClick={() => handleShare(record)}
            />
          </Tooltip>
          <Tooltip title="삭제">
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleDownload = (file: FileItem) => {
    // 실제로는 API 호출
    message.success(`${file.title} 다운로드를 시작합니다.`);
  };

  const handleShare = (file: FileItem) => {
    const shareUrl = `http://localhost:3000/share/${file.id}`;
    Modal.info({
      title: '공유 링크',
      content: (
        <div>
          <p>다음 링크를 복사하여 공유하세요:</p>
          <Input.TextArea 
            value={shareUrl} 
            rows={2} 
            style={{ marginTop: '8px' }}
            readOnly
          />
        </div>
      ),
    });
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '파일 삭제',
      content: '정말로 이 파일을 삭제하시겠습니까?',
      onOk: () => {
        setFiles(files.filter(file => file.id !== id));
        message.success('파일이 삭제되었습니다.');
      },
    });
  };

  const handleUpload = async (values: any) => {
    setUploading(true);
    try {
      // 실제로는 API 호출
      const newFile: FileItem = {
        id: Date.now(),
        title: values.title,
        description: values.description,
        originalName: 'uploaded_file.pdf',
        size: 1024000, // 1MB
        createdAt: new Date().toISOString(),
        url: '/files/download/new',
      };
      
      setFiles([newFile, ...files]);
      message.success('파일이 업로드되었습니다.');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('업로드에 실패했습니다.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card 
              title={
                <span>
                  <FileTextOutlined style={{ marginRight: '8px' }} />
                  자료실
                </span>
              }
              extra={
                <Button 
                  type="primary" 
                  icon={<UploadOutlined />} 
                  onClick={() => setIsModalVisible(true)}
                >
                  파일 업로드
                </Button>
              }
            >
              <Table 
                columns={columns} 
                dataSource={files} 
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </Card>
          </Col>
        </Row>

        <Modal
          title="파일 업로드"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form form={form} onFinish={handleUpload} layout="vertical">
            <Form.Item
              name="title"
              label="파일 제목"
              rules={[{ required: true, message: '파일 제목을 입력하세요' }]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item
              name="description"
              label="파일 설명"
              rules={[{ required: true, message: '파일 설명을 입력하세요' }]}
            >
              <TextArea rows={3} />
            </Form.Item>
            
            <Form.Item
              name="file"
              label="파일 선택"
              rules={[{ required: true, message: '파일을 선택하세요' }]}
            >
              <Upload
                beforeUpload={() => false}
                maxCount={1}
                accept=".pdf"
              >
                <Button icon={<UploadOutlined />}>PDF 파일 선택</Button>
              </Upload>
            </Form.Item>
            
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" loading={uploading}>
                  업로드
                </Button>
                <Button onClick={() => setIsModalVisible(false)}>
                  취소
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
} 