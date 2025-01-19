import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Transaction } from "../transaction/transaction.entity";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    @Column({ nullable: true, unique: true })
    email: string;

    @Column({ type: 'int', default: 0 })
    points: number;

    @OneToMany(() => Transaction, (transaction) => transaction.customer)
    transactions: Transaction[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}