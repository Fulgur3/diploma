import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, AfterLoad } from 'typeorm';
import { Session } from './Session'; // Assuming you already have a Session entity defined
import { User } from './User'; // Assuming you already have a User entity defined
import { Question } from './Question'; // Assuming you already have a Question entity defined


// TODO fix 
@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    answer: string;

    @Column({ name: 'session_id' })
    sessionId: number;

    @ManyToOne(() => Session)
    @JoinColumn({ name: 'session_id' })
    session: Session;

    @Column({ name: 'user_id' })
    userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'question_id' })
    questionId: number;

    @ManyToOne(() => Question, { eager: true })
    @JoinColumn({ name: 'question_id' })
    question: Question;
}
