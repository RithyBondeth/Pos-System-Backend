import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Staff } from "./staff.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true })
    name: string;

    @OneToMany(() => Staff, (staff) => staff.role, { cascade: true })
    staff: Staff[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}