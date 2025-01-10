import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';
import { StaffModule } from './staff/staff.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    //Config Module
    ConfigModule.forRoot({ isGlobal: true }),
    //Databae Module
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: dbConfig,
    }),
    //Pino Logger Module
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty', // Pretty print for development logs
          options: {
            singleLine: true,
            prettyPrint: true,
            colorize: true,
          },
        }
      }
    }),
    StaffModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
