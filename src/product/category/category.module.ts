import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@app/common/database/entities/product/category.entity';
import { UploadfileService } from '@app/common/uploadfile/uploadfile.service';
import { Product } from '@app/common/database/entities/product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Category, Product ])],
  controllers: [CategoryController],
  providers: [CategoryService, UploadfileService],
})
export class CategoryModule {}
