import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Quiz } from './Quiz'; // Assuming you already have a Quiz entity defined

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'is_open' })
    isOpen: boolean;

    @Column({ length: 45 })
    code: string;

    @Column({ name: 'quiz_id' })
    quizId: number;

    @ManyToOne(() => Quiz, { eager: true })
    @JoinColumn({ name: 'quiz_id' })
    quiz: Quiz;
}
