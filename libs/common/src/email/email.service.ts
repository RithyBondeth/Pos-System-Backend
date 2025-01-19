import { Inject, Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import * as nodemailer from 'nodemailer';
import { EMAIL_MODULE_OPTIONS } from './email.constant';
import { EmailModuleOptionsI } from './interfaces/email-config.interface';
import { Logger } from 'nestjs-pino';
import { EmailOptionsI } from './interfaces/email-options.interface';

@Injectable()
export class EmailService {
    private transporter: Transporter;
    constructor(
        @Inject(EMAIL_MODULE_OPTIONS)
        private readonly options: EmailModuleOptionsI,
        private readonly logger: Logger,
    ) { 
        this.initializeTransporter();
    }

    private initializeTransporter() {
        try {
            this.transporter = nodemailer.createTransport({
                host: this.options.host,
                port: this.options.port,
                secure: this.options.secure ?? (this.options.port === 456),
                auth: this.options.auth,
                ...this.options.transportOptions,
            })
            this.logger.log('Email service initialized successfully', {
                host: this.options.host,
                port: this.options.port
            });
        } catch (error) {
            this.logger.error('Failed to initialize email transporter', error.message);
            throw new Error(error.message);
        }
    }

    async sendEmail(emailOptions: EmailOptionsI) {
        try {
            // Merge default from with provided from
            const from = emailOptions.from || this.options.defaultFrom;

            const mailOptions = {
                from, 
                ...emailOptions
            }

            //Validate email
            if(!mailOptions.to) throw new Error('Recipient email is required');

            //Send Email
            const info = await this.transporter.sendMail(mailOptions);

            this.logger.log("Email sent successfully", {
                messageId: info.messageId,
                to: mailOptions.to,
                subject: emailOptions.subject
            });

            return info;
        } catch (error) {
            this.logger.error('Error sending email', {
                error: error.message,
                to: emailOptions.to,
                subject: emailOptions.subject
            });
            throw new Error(error.message);
        }
    }
}
