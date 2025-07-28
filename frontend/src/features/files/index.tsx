import React, { useState, useEffect } from "react";
import FileTable from "../../components/FileTable";
import FileUploadModal from "../../components/FileUploadModal";
import { apiClient } from "../../lib/api";
import { FileTextOutlined, UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";

export interface FileItem {
  id: number;
  title: string;
  description: string;
  originalName: string;
  size: number;
  createdAt: string;
  url: string;
}

export default function Files() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    apiClient.get<FileItem[]>("/files").then((res) => {
      setFiles(res.data);
    });
  }, []);

  const handleDownload = async (file: FileItem) => {
    try {
      const response = await apiClient.get(`/files/download/${file.id}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.originalName);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (e) {
      // 에러 핸들링
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/files/${id}`);
      setFiles(files.filter((file) => file.id !== id));
    } catch {
      // 에러 핸들링
    }
  };

  const handleUpload = async (values: {
    title: string;
    description: string;
    file: { file: File };
  }) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      if (values.file && values.file.file) {
        formData.append("file", values.file.file);
      }
      const res = await apiClient.post<FileItem>("/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFiles([res.data, ...files]);
      setIsModalVisible(false);
    } catch (error) {
      // 에러 핸들링
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center text-2xl font-bold">
            <FileTextOutlined className="mr-2 text-blue-500" /> 자료실
          </div>
          <Button
            type="primary"
            icon={<UploadOutlined />}
            className="bg-blue-500 hover:bg-blue-600"
            onClick={() => setIsModalVisible(true)}
          >
            파일 업로드
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <FileTable
            files={files}
            onDownload={handleDownload}
            onDelete={handleDelete}
          />
        </div>
        <FileUploadModal
          visible={isModalVisible}
          uploading={uploading}
          onCancel={() => setIsModalVisible(false)}
          onUpload={handleUpload}
        />
      </div>
    </div>
  );
}
