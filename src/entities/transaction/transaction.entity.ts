import { Column, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Staff } from "../staff/staff.entity";
import { TransactionItem } from "./transactionItem.entity";
import { Customer } from "../customer/customer.entity";

export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    // The staff who processed the transaction (cashier or manager)
    @ManyToOne(() => Staff, (staff) => staff.transactions)
    staff: Staff;

    // The customer who involved in the transaction
    @ManyToOne(() => Customer, (customer) => customer.transactions, { nullable: true })
    customer: Customer;

    // The items (products) involved in the transaction (TransactionItem)
    @OneToMany(() => TransactionItem, (transactionItem) => transactionItem.transaction, { cascade: true })
    transactionItems: TransactionItem[];

    // Total amount of transactions (calcualted from transactionItems)
    @Column('decimal', { precision: 10, scale: 2 })
    totalAmount: number;

    // Payment method used for the transaction (cash, credit card, qr code)
    @Column()
    paymentMethod: string;

    // Discount applied to the transaction (if any)
    @Column('decimal', { default: 0 })
    discount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}