import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, Res, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(Number(id));
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB
    },
  }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: { title: string; description: string; lectureId?: number }
  ) {
    return this.fileService.uploadFile(file, data);
  }

  @Get('download/:id')
  async downloadFile(@Param('id') id: string, @Res() res: Response) {
    const file = await this.fileService.findOne(Number(id));
    if (!file) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'File not found' });
    }
    
    res.download(`./uploads/${file.filename}`, file.originalName);
  }

  @Get('share/:id')
  async getShareLink(@Param('id') id: string) {
    const file = await this.fileService.findOne(Number(id));
    if (!file) {
      return { message: 'File not found' };
    }
    
    return {
      shareUrl: `http://localhost:3000/share/${id}`,
      file: file
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(Number(id));
  }
} 