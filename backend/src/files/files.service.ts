import { Injectable } from '@nestjs/common';
import { FileMeta, mockFiles } from 'src/data/mockFiles';

@Injectable()
export class FilesService {
  private files: FileMeta[] = [...mockFiles];
  private nextId = mockFiles.length + 1;

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
