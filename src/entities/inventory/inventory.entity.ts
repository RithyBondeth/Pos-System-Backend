import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "../product/product.entity";
import { Staff } from "../staff/staff.entity";
import { InventoryOpeartionE, InventoryOperationReasonE } from "./inventory.type";

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.inventory)
    product: Product;

    @ManyToOne(() => Staff, (staff) => staff.inventories)
    staff: Staff;

    @Column('int')
    quantity: number;

    @Column({ type: 'enum', enum: InventoryOpeartionE, nullable: false })
    operationType: InventoryOpeartionE;

    @Column({ type: 'enum', enum: InventoryOperationReasonE, nullable: true })
    operationReason: InventoryOperationReasonE;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}