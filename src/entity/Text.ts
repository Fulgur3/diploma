import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Expose, Exclude } from 'class-transformer';
import { Question } from './Question'; // Assuming you already have a Question entity defined

@Entity()
export class Text {
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Exclude()
    @Column({ default: 1 })
    value: number;

    @Exclude()
    @Column()
    answer: string;

    @Exclude()
    @Column({ name: 'question_id' })
    questionId: number;

    @ManyToOne(() => Question)
    @JoinColumn({ name: 'question_id' })
    question: Question;
}
