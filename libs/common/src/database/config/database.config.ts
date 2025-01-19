import { ConfigService } from "@nestjs/config";
import { Customer } from "@app/common/database/entities/customer/customer.entity";
import { Inventory } from "@app/common/database/entities/inventory/inventory.entity";
import { Category } from "@app/common/database/entities/product/category.entity";
import { Product } from "@app/common/database/entities/product/product.entity";
import { Role } from "@app/common/database/entities/staff/role.entity";
import { Staff } from "@app/common/database/entities/staff/staff.entity";
import { Transaction } from "@app/common/database/entities/transaction/transaction.entity";
import { TransactionItem } from "@app/common/database/entities/transaction/transactionItem.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const databaseConfig = async (configService: ConfigService): Promise<PostgresConnectionOptions>=> ({
    type: 'postgres',
    url: configService.get<string>("DATABASE_URL"),
    port: configService.get<number>("DATABASE_PORT"),
    entities: [Staff, Role, Customer, Product, Category, Inventory, Transaction, TransactionItem],
    synchronize: configService.get<boolean>("SYNCHRONIZE"),
});