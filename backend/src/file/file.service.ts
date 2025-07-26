import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './file.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  findAll() {
    return this.fileRepository.find({ relations: ['lecture'] });
  }

  findOne(id: number) {
    return this.fileRepository.findOne({ where: { id }, relations: ['lecture'] });
  }

  async uploadFile(file: any, data: { title: string; description: string; lectureId?: number }) {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = `${Date.now()}-${file.originalname}`;
    const filepath = path.join(uploadDir, filename);

    fs.writeFileSync(filepath, file.buffer);

    const fileEntity = this.fileRepository.create({
      title: data.title,
      description: data.description,
      filename: filename,
      originalName: file.originalname,
      size: file.size,
      url: `/files/download/${filename}`,
    });

    return this.fileRepository.save(fileEntity);
  }

  remove(id: number) {
    return this.fileRepository.delete(id);
  }
} 