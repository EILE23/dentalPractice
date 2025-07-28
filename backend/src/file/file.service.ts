import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface FileItem {
  id: number;
  title: string;
  description: string;
  originalName: string;
  filename: string;
  size: number;
  url: string;
  createdAt: string;
}

@Injectable()
export class FileService {
  private files: FileItem[] = [];

  findAll(): FileItem[] {
    return this.files;
  }

  findOne(id: number): FileItem | undefined {
    return this.files.find((f) => f.id === id);
  }

  async uploadFile(
    file: any,
    data: { title: string; description: string },
  ): Promise<FileItem> {
    const uploadDir = './files';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = `${Date.now()}-${file.originalname}`;
    const filepath = path.join(uploadDir, filename);

    fs.writeFileSync(filepath, file.buffer);

    const fileEntity: FileItem = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      filename,
      originalName: file.originalname,
      size: file.size,
      url: `/files/download/${filename}`,
      createdAt: new Date().toISOString(),
    };

    this.files.unshift(fileEntity); // 최신 순으로 추가
    return fileEntity;
  }

  remove(id: number): boolean {
    const before = this.files.length;
    this.files = this.files.filter((f) => f.id !== id);
    return this.files.length < before;
  }
}
