import { Injectable } from '@nestjs/common';

export interface Lecture {
  id: number;
  title: string;
  description: string;
  instructor: string;
  startDate: string;
  endDate: string;
  files?: any[];
}

@Injectable()
export class LectureService {
  private lectures: Lecture[] = [];

  findAll(): Lecture[] {
    return this.lectures;
  }

  findOne(id: number): Lecture | undefined {
    return this.lectures.find((l) => l.id === id);
  }

  create(data: Partial<Lecture>): Lecture {
    const newLecture: Lecture = {
      id: Date.now(),
      title: data.title || '',
      description: data.description || '',
      instructor: data.instructor || '',
      startDate: data.startDate || '',
      endDate: data.endDate || '',
      files: [],
    };

    this.lectures.push(newLecture);
    return newLecture;
  }

  update(id: number, data: Partial<Lecture>): Lecture | undefined {
    const lecture = this.findOne(id);
    if (!lecture) return;
    Object.assign(lecture, data);
    return lecture;
  }

  remove(id: number): boolean {
    const before = this.lectures.length;
    this.lectures = this.lectures.filter((l) => l.id !== id);
    return this.lectures.length < before;
  }
}
