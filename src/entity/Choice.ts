import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Expose, Exclude } from 'class-transformer';
import { Question } from './Question'; // Assuming you already have a Question entity defined

@Entity()
export class Choice {
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ nullable: true })
    label: string;

    @Exclude()
    @Column({ default: 0 })
    value: number;

    @Exclude()
    @Column({ name: 'question_id' })
    questionId: number;

    @ManyToOne(() => Question)
    @JoinColumn({ name: 'question_id' })
    question: Question;
}
