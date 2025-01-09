import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { GenderE, RoleE, ShiftE } from "./staff.type";
import * as bcrypt from "bcrypt";

@Entity()
export class Staff {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;
    
    @Column({ nullable: true })
    profile: string;

    @Column({ type: 'enum', enum: GenderE, default: GenderE.MALE })
    gender: GenderE;

    @Column()
    dob: string;

    @Column()
    address: string;

    @Column({ unique: true })
    phone: string;

    @Column({ type: 'enum', enum: ShiftE, default: ShiftE.FULLTIME })
    shift: ShiftE;

    @Column()
    salary: number;

    @Column({ type: 'enum', enum: RoleE, default: RoleE.CASHIER })
    role: RoleE;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    resetPasswordToken: string

    @Column({ nullable: true })
    resetPasswordExpires: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @BeforeInsert()
    async hashPassword() {
        if(this.password)
            this.password = await bcrypt.hash(this.password, 10); 
    }
}