import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StaffModule } from './staff/staff.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import { DatabaseModule, UploadfileModule } from '@app/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { CurrentStaffInterceptor } from './auth/interceptors/current-staff.interceptor';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@app/common/jwt/jwt.service';

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
    JwtModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentStaffInterceptor,
    },
    JwtService
  ],
})
export class AppModule {}
