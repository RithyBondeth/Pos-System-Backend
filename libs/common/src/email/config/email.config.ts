import { ConfigService } from "@nestjs/config";
import { EmailModuleOptionsI } from "../interfaces/email-config.interface";

export const emailConfig = async (configService: ConfigService): Promise<EmailModuleOptionsI> => ({
    host: configService.get<string>('SMTP_HOST'),
    port: configService.get<number>('SMTP_PORT'),
    secure: configService.get<boolean>('SMTP_SECURE'),  // true for 465, false for other ports
    auth: {
        user: configService.get<string>('EMAIL_USER'),
        pass: configService.get<string>('EMAIL_PASSWORD'),
      },
    defaultFrom: configService.get<string>('EMAIL_FROM')
});