import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lecture } from './lecture.entity';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>,
  ) {}

  findAll() {
    return this.lectureRepository.find({ relations: ['files'] });
  }

  findOne(id: number) {
    return this.lectureRepository.findOne({ where: { id }, relations: ['files'] });
  }

  create(data: Partial<Lecture>) {
    const lecture = this.lectureRepository.create(data);
    return this.lectureRepository.save(lecture);
  }

  update(id: number, data: Partial<Lecture>) {
    return this.lectureRepository.update(id, data);
  }

  remove(id: number) {
    return this.lectureRepository.delete(id);
  }
} 