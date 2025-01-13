import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from 'src/entities/staff/staff.entity';
import { UploadfileService } from '@app/common/uploadfile/uploadfile.service';

@Module({
  imports: [TypeOrmModule.forFeature([ Staff ])],
  controllers: [StaffController],
  providers: [StaffService, UploadfileService],
})
export class StaffModule {}
