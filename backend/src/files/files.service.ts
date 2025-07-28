// file.service.ts
import { Injectable } from '@nestjs/common';

interface FileMeta {
id:number;
  filename: string;
  originalname: string;
  title: string;
  description: string;
}

@Injectable()
export class FilesService {
  private files: FileMeta[] = [];
  private nextId = 1; // ✅ ID 자동 증가용

  addFile(meta: Omit<FileMeta, 'id'>) {
    const fileWithId: FileMeta = { id: this.nextId++, ...meta };
    this.files.push(fileWithId);
  }

  getAllFiles() {
    return this.files;
  }

  deleteFile(filename: string) {
    this.files = this.files.filter((f) => f.filename !== filename);
  }

  getFileById(id: number) {
    return this.files.find((file) => file.id === id);
  }
}

