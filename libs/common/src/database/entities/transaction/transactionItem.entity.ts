import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../product/product.entity";
import { Transaction } from "./transaction.entity";

@Entity()
export class TransactionItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.transactionItems)
    product: Product;
    
    @ManyToOne(() => Transaction, (transaction) => transaction.transactionItems)
    transaction: Transaction;

    @Column('int')
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    totalPrice: number;
}