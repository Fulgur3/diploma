import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, AfterLoad } from 'typeorm';
import { Expose, Exclude } from 'class-transformer';
import { User } from './User'; // Assuming you already have a User entity defined
import { Question } from './Question';

@Entity()
export class Quiz {
	@Expose()
    @PrimaryGeneratedColumn()
    id: number;

	@Expose()
    @Column({ length: 45 })
    title: string;

	@Expose()
    @CreateDateColumn({ name: 'creation_date' })
    creationDate: Date;

	@Exclude()
    @Column({ name: 'creator_id' })
    creatorId: number;

    //---
	@Expose()
    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'creator_id' })
    creator: User;

	@Expose()
    @OneToMany(() => Question, question => question.quiz, { eager: true })
	questions: Question[];
}
