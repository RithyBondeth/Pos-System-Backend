import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dtos/create-staff.dto';

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
  async createStaff(@Body() staff: CreateStaffDto) {
     
  }
}
