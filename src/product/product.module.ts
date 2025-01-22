import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@app/common/database/entities/product/product.entity';
import { Category } from '@app/common/database/entities/product/category.entity';
import { UploadfileService } from '@app/common/uploadfile/uploadfile.service';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([ Product, Category ]), CategoryModule],
  controllers: [ProductController],
  providers: [ProductService, UploadfileService],
})
export class ProductModule {}
