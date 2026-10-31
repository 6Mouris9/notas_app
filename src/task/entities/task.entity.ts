import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tag.entity.js";

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', unique: true })
    title: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'text' })
    autor: string;

    @Column({ type: 'date' })
    creationDate: Date;
    
    @ManyToMany(() => Tag, (tag) => tag.tasks, {cascade: true})
    @JoinTable()
    tags: Tag[];
}

