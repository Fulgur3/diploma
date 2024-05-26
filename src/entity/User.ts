import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Expose, Exclude } from 'class-transformer';
import * as bcrypt from "bcryptjs";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ length: 50, unique: true })
    username: string;

    @Expose()
    @Column({ length: 100, unique: true })
    email: string;
    
    @Exclude()
    @Column()
    password: string;

    @Expose()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Expose()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // Hash password before inserting a new user record
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10); // Hash password with bcrypt, using salt rounds = 10
        }
    }

    async comparePassword(plainPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, this.password);
    }
}