import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StaffModule } from './staff/staff.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import { DatabaseModule, UploadfileModule } from '@app/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@app/common/jwt/jwt.module';

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
    AuthModule,
    JwtModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    }
  ],
})
export class AppModule {}
