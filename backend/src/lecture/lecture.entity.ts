import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FileEntity } from '../file/file.entity';

@Entity('lectures')
export class Lecture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column('text')
  description: string;

  @Column({ length: 50 })
  instructor: string;

  @Column({ type: 'datetime' })
  startDate: Date;

  @Column({ type: 'datetime' })
  endDate: Date;

  @OneToMany(() => FileEntity, (file) => file.lecture)
  files: FileEntity[];
} 