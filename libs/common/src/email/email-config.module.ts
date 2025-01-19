import { Module } from "@nestjs/common";
import { EmailModule } from "./email.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { emailConfig } from "./config/email.config";

@Module({
    imports: [
        EmailModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: emailConfig,
        })
    ],
    exports: [EmailModule],
})
export class EmailConfigModule {}