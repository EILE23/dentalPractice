import React from "react";
import { Table, Space, Tooltip, Button, Typography } from "antd";
import {
  DownloadOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { FileItem } from "../features/files/FilesPage";

interface FileTableProps {
  files: FileItem[];
  onDownload: (file: FileItem) => void;
  onDelete: (id: number) => void;
  onShare?: (file: FileItem) => void;
}

const FileTable: React.FC<FileTableProps> = ({
  files,
  onDownload,
  onDelete,
  onShare,
}) => {
  const columns = [
    {
      title: "파일명",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: FileItem) => (
        <Space>
          <FileTextOutlined className="text-blue-500" />
          <div>
            <div>{text}</div>
            <Typography.Text type="secondary" className="text-xs">
              {record.originalName}
            </Typography.Text>
          </div>
        </Space>
      ),
    },
    {
      title: "설명",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "크기",
      dataIndex: "size",
      key: "size",
      render: (size: number) => `${(size / 1024 / 1024).toFixed(1)} MB`,
    },
    {
      title: "업로드일",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "액션",
      key: "action",
      render: (_: any, record: FileItem) => (
        <Space>
          <Tooltip title="다운로드">
            <Button
              type="text"
              icon={<DownloadOutlined />}
              onClick={() => onDownload(record)}
            />
          </Tooltip>
          <Tooltip title="공유">
            <Button
              type="text"
              icon={<ShareAltOutlined />}
              onClick={() => onShare && onShare(record)}
            />
          </Tooltip>
          <Tooltip title="삭제">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={files}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      className="w-full"
    />
  );
};

export default FileTable;
