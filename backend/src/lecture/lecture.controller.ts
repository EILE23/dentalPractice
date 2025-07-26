import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LectureService } from './lecture.service';

@Controller('lectures')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Get()
  findAll() {
    return this.lectureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lectureService.findOne(Number(id));
  }

  @Post()
  create(@Body() data: any) {
    return this.lectureService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.lectureService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lectureService.remove(Number(id));
  }
} 