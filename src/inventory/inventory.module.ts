import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from '@app/common/database/entities/inventory/inventory.entity';
import { Product } from '@app/common/database/entities/product/product.entity';
import { JwtModule } from '@app/common/jwt/jwt.module';
import { Staff } from '@app/common/database/entities/staff/staff.entity';
import { StaffService } from 'src/staff/staff.service';
import { Role } from '@app/common/database/entities/staff/role.entity';
import { UploadfileService } from '@app/common/uploadfile/uploadfile.service';

@Module({
  imports: [TypeOrmModule.forFeature([ Inventory, Product, Staff, Role ]), JwtModule],
  controllers: [InventoryController],
  providers: [InventoryService, StaffService, UploadfileService],
})
export class InventoryModule {}
