import { Inventory } from '@app/common/database/entities/inventory/inventory.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { StockInInventoryDto } from './dtos/stockin-inventory.dto';
import { PayloadT } from '@app/common/jwt/jwt.service';
import { InventoryOpeartionE, InventoryOperationReasonE } from '@app/common/database/entities/inventory/inventory.type';
import { Product } from '@app/common/database/entities/product/product.entity';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory) private readonly inventoryRepo: Repository<Inventory>,
        @InjectRepository(Product) private readonly productRepo: Repository<Product>,
        private readonly dataSource: DataSource,

    ) {}    

   async stockIn(body: StockInInventoryDto, staff: PayloadT) {
        try {
            // Start the database transaction
            return await this.dataSource.transaction(async (transactionalEntityManager) => {
                // Find the product
                const product = await transactionalEntityManager.findOne(Product, {
                    relations: ['inventory'],
                    where: { id: body.productId }
                });
                if(!product) throw new NotFoundException(`There is no product with id ${body.productId}`);

                // Create Inventory for the product
                const inventory = this.inventoryRepo.create({
                    product: product,
                    staff: { id: staff.id },
                    quantity: body.quantity,
                    operationType: InventoryOpeartionE.ADD,
                    operationReason: body.operationReason || InventoryOperationReasonE.RESTOCK,
                });

                // Update product stock quantity
                product.stockQuantity += body.quantity;

                // Save the changes for both inventory and product
                await transactionalEntityManager.save(product);
                const savedInventory = await transactionalEntityManager.save(inventory);
                product.inventory = [...product.inventory, savedInventory];
                await this.productRepo.save(product);
                    
                // Fetch completed inventory record with relations                
                const completedInventory = await this.inventoryRepo.findOne({
                    relations: ['product', 'staff'],
                    where: { id: savedInventory.id },
                });

                // Return the completed inventory
                return completedInventory;
            });
        } catch (error) {
            console.error('Failed to stock in Inventory: ', error.message);
            throw new BadRequestException(error.message);
        }
   }
}
