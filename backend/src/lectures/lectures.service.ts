// src/lectures/lectures.service.ts
import { Injectable } from '@nestjs/common';
import { Lecture, mockLectures } from 'src/data/mockLectures';

@Injectable()
export class LecturesService {
  private lectures: Lecture[] = [...mockLectures];
  private nextId = mockLectures.length + 1;

  addLecture(data: Omit<Lecture, 'id'>): Lecture {
    const newLecture: Lecture = { id: this.nextId++, ...data };
    this.lectures.push(newLecture);
    return newLecture;
  }

  getAllLectures(): Lecture[] {
    return this.lectures;
  }

  getLecturesByDate(date: string): Lecture[] {
    return this.lectures.filter((l) => l.date === date);
  }

  getLectureById(id: number): Lecture | undefined {
    return this.lectures.find((l) => l.id === id);
  }

  deleteLecture(id: number) {
    this.lectures = this.lectures.filter((l) => l.id !== id);
  }
}
