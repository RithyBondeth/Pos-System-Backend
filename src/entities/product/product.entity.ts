import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TransactionItem } from "../transaction/transactionItem.entity";
import { Staff } from "../staff/staff.entity";
import { Category } from "./category.entity";
import { Inventory } from "../inventory/inventory.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column('text')
    description: string;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column('int')
    stockQuantity: number;

    @OneToMany(() => TransactionItem, (transactionItem) => transactionItem.product, { cascade: true })
    transactionItems: TransactionItem[];

    //Track which manager created the product
    @ManyToOne(() => Staff, (staff) => staff.createdProducts, { nullable: true })
    createdBy: Staff;

    //Track which manager updated the product
    @ManyToOne(() => Staff, (staff) => staff.updatedProducts, { nullable: true })
    updatedBy: Staff;

    //Track stock movements (add or remove)
    @ManyToOne(() => Inventory, (inventory) => inventory.product, { cascade: true })
    inventory: Inventory[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}