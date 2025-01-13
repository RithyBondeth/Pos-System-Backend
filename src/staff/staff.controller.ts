import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dtos/create-staff.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadfileService } from '@app/common/uploadfile/uploadfile.service';
import { UpdateStaffDto } from './dtos/update-staff.dto';
import { UploadFileInterceptor } from '@app/common/uploadfile/uploadfile.interceptor';

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
  @UseInterceptors(new UploadFileInterceptor('profile', 'profiles'))
  async createStaff(@Body() body: CreateStaffDto, @UploadedFile() profile: Express.Multer.File) { 
    return this.staffService.createStaff(body, profile);
  }

  @Put('update/:id')
  @UseInterceptors(new UploadFileInterceptor('profile', 'profiles'))
  async updateStaff(
    @Param('id', ParseIntPipe) staffId: number,
    @Body() body: UpdateStaffDto, 
    @UploadedFile() profile: Express.Multer.File,
  ) {
    return this.staffService.updateStaff(staffId, body, profile);
  }
}
