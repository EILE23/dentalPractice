import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from './lecture.entity';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture])],
  providers: [LectureService],
  controllers: [LectureController],
  exports: [TypeOrmModule],
})
export class LectureModule {} 