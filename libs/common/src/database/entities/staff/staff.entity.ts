import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { GenderE, ShiftE } from "./staff.type";
import * as bcrypt from "bcrypt";
import { Role } from "./role.entity";
import { Transaction } from "../transaction/transaction.entity";
import { Product } from "../product/product.entity";
import { Inventory } from "../inventory/inventory.entity";

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

    @Column({ type: 'enum', enum: GenderE, nullable: false })
    gender: GenderE;

    @Column()
    dob: string;

    @Column()
    address: string;

    @Column({ unique: true })
    phoneNumber: string;

    @Column({ type: 'enum', enum: ShiftE, nullable: false })
    shift: ShiftE;

    @Column('decimal', { precision: 10, scale: 2 })
    salary: number;

    @ManyToOne(() => Role, (role) => role.staff)
    role: Role;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    resetPasswordToken: string

    @Column({ nullable: true })
    resetPasswordExpires: Date;

    @OneToMany(() => Transaction, (transaction) => transaction.staff, { cascade: true})
    transactions: Transaction[];

    @OneToMany(() => Product, (product) => product.createdBy, { cascade: true })
    createdProducts: Product[];

    @OneToMany(() => Product, (product) => product.updatedBy, { cascade: true })
    updatedProducts: Product[];

    @OneToMany(() => Inventory, (inventory) => inventory.staff, { cascade: true })
    inventories: Inventory[];

    @CreateDateColumn()
    updatedAt: Date;

    @UpdateDateColumn()
    createdAt: Date;

    @BeforeInsert()
    async hashPassword() {
        if(this.password)
            this.password = await bcrypt.hash(this.password, 10); 
    }
}