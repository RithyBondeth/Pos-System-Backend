import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StaffModule } from './staff/staff.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import { DatabaseModule, UploadfileModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule,
    DatabaseModule,
    StaffModule,  
    UploadfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
