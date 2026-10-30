import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity.js";

@Entity("tags")
export class Tag{

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 150})
    name: string;

    @Column({type: 'varchar', length: 200})
    descricao: string;

    @ManyToMany(() => Task, (task) => task.tags)
    tasks: Task[];
    
}