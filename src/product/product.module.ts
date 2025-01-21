import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@app/common/database/entities/product/product.entity';
import { Category } from '@app/common/database/entities/product/category.entity';
import { UploadfileService } from '@app/common/uploadfile/uploadfile.service';

@Module({
  imports: [TypeOrmModule.forFeature([ Product, Category ])],
  controllers: [ProductController],
  providers: [ProductService, UploadfileService],
})
export class ProductModule {}
