// files.controller.ts
import {
  Controller,
  Post,
  Get,
  Delete,
  UploadedFile,
  UseInterceptors,
  Param,
  Res,
  Body,NotFoundException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  private uploadDir = path.join(__dirname, '..', '..', 'uploads');

  constructor(private readonly fileService: FilesService) {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir);
    }
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          cb(null, path.join(__dirname, '..', '..', 'uploads'));
        },
        filename: (_req, file, cb) => {
  const ext = path.extname(file.originalname);

  // 한글 깨짐 방지 처리
  const rawName = path.basename(file.originalname, ext);
  const decodedName = Buffer.from(rawName, "latin1").toString("utf8");

  cb(null, `${Date.now()}-${decodedName}${ext}`);
}

      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    const meta = {
      filename: file.filename,
      originalname: file.originalname,
      title,
      description,
    };
    this.fileService.addFile(meta);

    return {
      ...meta,
      url: `/files/static/${file.filename}`,
    };
  }

@Get()
getFiles() {
  const metas = this.fileService.getAllFiles();
  return metas.map((m) => ({
    ...m,
    url: `http://localhost:5001/files/static/${m.filename}`, // 절대 경로 지정
  }));
}

  @Delete(':filename')
  deleteFile(@Param('filename') filename: string) {
    const filePath = path.join(this.uploadDir, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    this.fileService.deleteFile(filename);
    return { message: 'Deleted' };
  }

@Get('static/*filename')
serveFile(@Param('filename') filename: string, @Res() res: Response) {
  const decoded = decodeURIComponent(filename);
  const filePath = path.join(process.cwd(), 'uploads', decoded);

  if (fs.existsSync(filePath)) {
    return res.download(filePath);
  }

  return res.status(404).send('Not Found');
}
@Get('id/:id')
getFileById(@Param('id') id: string) {
  const file = this.fileService.getFileById(Number(id));
  if (!file) throw new NotFoundException('File not found');
  return {
    ...file,
    url: `/files/static/${file.filename}`,
  };
}


}
