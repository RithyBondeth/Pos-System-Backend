import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StaffModule } from './staff/staff.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import { DatabaseModule, UploadfileModule } from '@app/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule,
    DatabaseModule,
    StaffModule, 
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'storage'),
      serveRoot: '/storage/',
    }),
    UploadfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
