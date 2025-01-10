import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';
import { StaffModule } from './staff/staff.module';

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
    StaffModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
