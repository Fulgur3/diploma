import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, AfterLoad } from 'typeorm';
import { Expose, Exclude } from 'class-transformer';
import { myDataSource } from '../database/app-data-source';
import { Quiz } from './Quiz'; // Assuming you already have a Quiz entity defined
import { Text } from './Text';
import { Choice } from './Choice';

@Entity()
export class Question {
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column()
    title: string;

    @Expose()
    @Column()
    subtitle: string;

    @Expose()
    @Column()
    type: string;

    @Exclude()
    @Column({ name: 'quiz_id' })
    quizId: number;

    @ManyToOne(() => Quiz)
    @JoinColumn({ name: 'quiz_id' })
    quiz: Quiz;

    @Expose()
    maxValue: number = 0;

    // Dynamically filled options property based on question type
    @Expose()
    options: Text[] | Choice[];

    // Method to fill the options property based on the question type
    async fillOptions() {
        if (this.type === 'text') {
            this.options = await myDataSource.getRepository(Text).find({ where: { questionId: this.id } });
        } else if (['single', 'multiple'].includes(this.type)) {
            this.options = await myDataSource.getRepository(Choice).find({ where: { questionId: this.id } });
        }
    }

    calculateMaxValue() {
        this.maxValue = 0;
        for (const option of this.options)
            this.maxValue += option.value;
    }

    // Call fillOptions method after the entity is loaded from the database
    @AfterLoad()
    async afterLoad() {
        await this.fillOptions();

        this.calculateMaxValue();
    }

    static getAvailableTypes = () => [ 'text', 'single', 'multiple' ];
}