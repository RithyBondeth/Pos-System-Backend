import { Controller, Get, Param } from '@nestjs/common';
import { StaffService } from './staff.service';

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
}
