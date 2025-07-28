import React from "react";
import { Modal, Form, Input, Upload, Button, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface FileUploadModalProps {
  visible: boolean;
  uploading: boolean;
  onCancel: () => void;
  onUpload: (values: {
    title: string;
    description: string;
    file: { file: File };
  }) => void;
}

const { TextArea } = Input;

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  visible,
  uploading,
  onCancel,
  onUpload,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: {
    title: string;
    description: string;
    file: { file: File };
  }) => {
    onUpload(values);
    form.resetFields();
  };

  return (
    <Modal
      title="파일 업로드"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
      className=""
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item
          name="title"
          label="파일 제목"
          rules={[{ required: true, message: "파일 제목을 입력하세요" }]}
        >
          <Input className="" />
        </Form.Item>
        <Form.Item
          name="description"
          label="파일 설명"
          rules={[{ required: true, message: "파일 설명을 입력하세요" }]}
        >
          <TextArea rows={3} className="" />
        </Form.Item>
        <Form.Item
          name="file"
          label="파일 선택"
          rules={[{ required: true, message: "파일을 선택하세요" }]}
        >
          <Upload beforeUpload={() => false} maxCount={1} accept=".pdf">
            <Button icon={<UploadOutlined />}>PDF 파일 선택</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={uploading}
              className="bg-blue-500 hover:bg-blue-600"
            >
              업로드
            </Button>
            <Button onClick={onCancel}>취소</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FileUploadModal;
