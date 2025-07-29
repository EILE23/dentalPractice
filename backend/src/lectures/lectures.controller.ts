import { Controller, Get, Post, Param, Body, Query, Delete } from '@nestjs/common';
import { LecturesService } from './lectures.service';
interface CreateLectureDto {
  date: string;
  title: string;
  instructor: string;
  startTime: string;
  endTime: string;
}

@Controller('lectures')
export class LecturesController {
  constructor(private readonly lectureService: LecturesService) {}

  @Post()
  create(@Body() dto: CreateLectureDto) {
    return this.lectureService.addLecture(dto);
  }

  @Get()
  getAll(@Query('date') date?: string) {
    return date
      ? this.lectureService.getLecturesByDate(date)
      : this.lectureService.getAllLectures();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.lectureService.getLectureById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.lectureService.deleteLecture(+id);
    return { message: '삭제 완료' };
  }

  
}
