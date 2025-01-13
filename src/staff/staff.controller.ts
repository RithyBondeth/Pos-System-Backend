import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dtos/create-staff.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadfileService } from '@app/common/uploadfile/uploadfile.service';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get('all')
  async findAll() {
    return this.staffService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') staffId: number) {
    return this.staffService.findOneById(staffId);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('profile', { storage: UploadfileService.storageOptions('profiles') }))
  async createStaff(@Body() body: CreateStaffDto, @UploadedFile() profile: Express.Multer.File) { 
    return this.staffService.createStaff(body, profile);
  }
}
