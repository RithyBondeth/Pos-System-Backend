import { ConfigService } from "@nestjs/config";
import { Customer } from "src/entities/customer/customer.entity";
import { Inventory } from "src/entities/inventory/inventory.entity";
import { Category } from "src/entities/product/category.entity";
import { Product } from "src/entities/product/product.entity";
import { Role } from "src/entities/staff/role.entity";
import { Staff } from "src/entities/staff/staff.entity";
import { Transaction } from "src/entities/transaction/transaction.entity";
import { TransactionItem } from "src/entities/transaction/transactionItem.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const dbConfig = async (configService: ConfigService): Promise<PostgresConnectionOptions>=> ({
    type: 'postgres',
    url: configService.get<string>("DATABASE_URL"),
    port: configService.get<number>("DATABASE_PORT"),
    entities: [Staff, Role, Customer, Product, Category, Inventory, Transaction, TransactionItem],
    synchronize: configService.get<boolean>("SYNCHRONIZE"),
});