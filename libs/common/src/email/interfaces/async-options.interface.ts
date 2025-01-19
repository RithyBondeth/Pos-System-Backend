import { ModuleMetadata, Type } from '@nestjs/common';
import { EmailModuleOptionsI } from './email-config.interface';

export interface EmailModuleAsyncOptionsI extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<EmailModuleOptionsFactoryI>;
  useClass?: Type<EmailModuleOptionsFactoryI>;
  useFactory?: (...args: any[]) => Promise<EmailModuleOptionsI> | EmailModuleOptionsI;
  inject?: any[];
}

export interface EmailModuleOptionsFactoryI {
  createEmailModuleOptions(): Promise<EmailModuleOptionsI> | EmailModuleOptionsI;
}