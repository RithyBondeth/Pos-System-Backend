import { Module } from '@nestjs/common';
import { UploadfileService } from './uploadfile.service';

@Module({
  providers: [UploadfileService]
})
export class UploadfileModule {}
