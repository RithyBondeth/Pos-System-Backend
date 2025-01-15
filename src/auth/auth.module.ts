import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from 'src/entities/staff/staff.entity';
import { JwtModule } from '@app/common/jwt/jwt.module';
import { StaffService } from 'src/staff/staff.service';
import { Role } from 'src/entities/staff/role.entity';
import { UploadfileService } from '@app/common/uploadfile/uploadfile.service';
import { CurrentStaffInterceptor } from './interceptors/current-staff.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([ Staff, Role ]), JwtModule],
  controllers: [AuthController],
  providers: [AuthService, StaffService, UploadfileService, CurrentStaffInterceptor],
})
export class AuthModule {}
