import { DynamicModule, Module, Provider } from '@nestjs/common';
import { EmailService } from './email.service';
import { LoggerModule } from '../logger/logger.module';
import { EmailModuleOptionsI } from './interfaces/email-config.interface';
import { EMAIL_MODULE_OPTIONS } from './email.constant';
import { EmailModuleAsyncOptionsI, EmailModuleOptionsFactoryI } from './interfaces/async-options.interface';

@Module({
  imports: [LoggerModule],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {
  static register(options: EmailModuleOptionsI): DynamicModule {
    return {
      module: EmailModule,
      providers: [
        {
          provide: EMAIL_MODULE_OPTIONS,
          useValue: options
        },
        EmailService
      ],
      exports: [EmailService]
    };
  }

  static registerAsync(options: EmailModuleAsyncOptionsI): DynamicModule {
    return {
      module: EmailModule,
      imports: options.imports || [],
      providers: [
        this.createAsyncOptionsProvider(options),
        EmailService
      ],
      exports: [EmailService]
    };
  }

  private static createAsyncOptionsProvider(
    options: EmailModuleAsyncOptionsI
  ): Provider {
    if (options.useFactory) {
      return {
        provide: EMAIL_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
  
    if (options.useClass) {
      return {
        provide: EMAIL_MODULE_OPTIONS,
        useFactory: async (optionsFactory: EmailModuleOptionsFactoryI) =>
          await optionsFactory.createEmailModuleOptions(),
        inject: [options.useClass]
      };
    }
  
    if (options.useExisting) {
      return {
        provide: EMAIL_MODULE_OPTIONS,
        useExisting: options.useExisting
      };
    }
    
    throw new Error('Invalid async configuration');
  }
}
