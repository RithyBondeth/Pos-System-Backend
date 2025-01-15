import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { jwtConfig } from './jwt.config';
import { JwtService } from './jwt.service';

@Module({ 
    imports: [
        NestJwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: jwtConfig
        })
    ],
    providers: [JwtService],
    exports: [JwtService]
})
export class JwtModule {}
