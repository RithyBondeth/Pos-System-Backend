import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dtos/create-staff.dto';
import { UpdateStaffDto } from './dtos/update-staff.dto';
import { UploadFileInterceptor } from '@app/common/uploadfile/uploadfile.interceptor';
import { GetStaffDto } from './dtos/get-staff.dto';
import { UpdateStaffT } from './types/update-staff.type';
import { DeleteStaffT } from './types/delete-staff.type';
import { CountStaffQueryParamDTO } from './dtos/count-staff.dto';
import { FilterStaffDto } from './dtos/filter-staff.dto';
import { SortStaffDto } from './dtos/sort-staff.dto';
import { RESOURCE_NAME, API_TAG_RESOURCE_NAME } from './staff.constant';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags(API_TAG_RESOURCE_NAME)
@Controller(RESOURCE_NAME)
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get('all')
  @ApiOperation({ 
    summary: 'Get all staff with pagination',
    description: 'Retrieves a list of all staff members with optional filtering and paginating',
  })
  @ApiOkResponse({
    type: [GetStaffDto],
    description: 'List all staff retrieved successfully',
  })
  @ApiBadRequestResponse({ description: 'Invalid filter paramters' })
  async findAll(@Query() filter: FilterStaffDto): Promise<GetStaffDto[]> {
    return this.staffService.findAll(filter);
  }

  @Get('count')
  async countStaff(@Query() query: CountStaffQueryParamDTO): Promise<{ total: number }> {
    return this.staffService.countStaff(query);
  }

  @Get('sort')
  async findSorted(@Query() query: SortStaffDto) {
      return this.staffService.findSorted(query);
  }

  @Get(':id')
  async findOneById(@Param('id') staffId: number): Promise<GetStaffDto> {
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
  ): Promise<UpdateStaffT> {
    return this.staffService.updateStaff(staffId, body, profile);
  }

  @Delete('delete/:id') 
  deleteStaff(@Param('id', ParseIntPipe) staffId: number): Promise<DeleteStaffT> {
    return this.staffService.deleteStaff(staffId);
  }
}
