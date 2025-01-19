import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from '@app/common/database/entities/staff/staff.entity';
import { UploadfileService } from '@app/common/uploadfile/uploadfile.service';
import { Role } from '@app/common/database/entities/staff/role.entity';
import { JwtModule } from '@app/common/jwt/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([ Staff, Role ]), JwtModule],
  controllers: [StaffController],
  providers: [StaffService, UploadfileService],
})
export class StaffModule {}
