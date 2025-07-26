import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Lecture } from '../lecture/lecture.entity';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column('text')
  description: string;

  @Column()
  filename: string;

  @Column()
  originalName: string;

  @Column('int')
  size: number;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Lecture, (lecture) => lecture.files, { nullable: true, onDelete: 'SET NULL' })
  lecture: Lecture;
} 