import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from 'src/entities/staff/staff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Staff ])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
