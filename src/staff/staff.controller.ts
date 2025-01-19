import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dtos/create-staff.dto';
import { UpdateStaffDto } from './dtos/update-staff.dto';
import { UploadFileInterceptor } from '@app/common/uploadfile/uploadfile.interceptor';
import { GetStaffDto } from './dtos/get-staff.dto';
import { CountStaffDto, CountStaffQueryParamDTO } from './dtos/count-staff.dto';
import { FilterStaffDto } from './dtos/filter-staff.dto';
import { SortStaffDto } from './dtos/sort-staff.dto';
import { RESOURCE_NAME, API_TAG_RESOURCE_NAME, GET_ALL_STAFF_RESOURCES, COUNT_STAFF_RESOURCES, SORT_STAFF_RESOURCES, GET_ONESTAFF_BYID_RESOURCES, CREATE_STAFF_RESOURCES, UPDATE_STAFF_RESOURCES, DELETE_STAFF_RESOURCES, CHANGE_ROLE_STAFF_RESOURCES } from './staff.constant';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConsumes, ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StaffRole } from 'src/auth/decorators/role-staff.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ChangeStaffRoleDto } from './dtos/change-role-staff.dto';

@ApiTags(API_TAG_RESOURCE_NAME)
@Controller(RESOURCE_NAME)
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get('all')
  @ApiOperation({ 
    summary: GET_ALL_STAFF_RESOURCES.API_OPERATION.SUMMARY,
    description: GET_ALL_STAFF_RESOURCES.API_OPERATION.DESCRIPTION,
  })
  @ApiOkResponse({
    type: GetStaffDto,
    isArray: true,
    description: GET_ALL_STAFF_RESOURCES.API_OKRES.DESCRIPTION
  })
  @ApiExtraModels(FilterStaffDto)
  @ApiBadRequestResponse({ description: GET_ALL_STAFF_RESOURCES.API_BAD_REQRES.DESCRIPTION })
  async findAll(@Query() filter: FilterStaffDto): Promise<GetStaffDto[]> {
    return this.staffService.findAll(filter);
  }

  @Get('count')
  @ApiOperation({
    summary: COUNT_STAFF_RESOURCES.API_OPERATION.SUMMARY,
    description: COUNT_STAFF_RESOURCES.API_OPERATION.DESCRIPTION
  })
  @ApiOkResponse({ 
    type: CountStaffDto,
    description: COUNT_STAFF_RESOURCES.API_OKRES.DESCRIPTION
  })
  @ApiExtraModels(CountStaffQueryParamDTO)
  @ApiBadRequestResponse({ description: COUNT_STAFF_RESOURCES.API_BAD_REQRES.DESCRIPTION })
  async countStaff(@Query() query: CountStaffQueryParamDTO): Promise<CountStaffDto> {
    return this.staffService.countStaff(query);
  }

  @Get('sort')
  @ApiOperation({
    summary: SORT_STAFF_RESOURCES.API_OPERATION.SUMMARY,
    description: SORT_STAFF_RESOURCES.API_OPERATION.DESCRIPTION,
  })
  @ApiOkResponse({ 
    type: GetStaffDto,
    isArray: true,
    description: SORT_STAFF_RESOURCES.API_OKRES.DESCRIPTION 
  })
  @ApiExtraModels(SortStaffDto)
  @ApiBadRequestResponse({ description: SORT_STAFF_RESOURCES.API_BAD_REQRES.DESCRIPTION})
  async findSorted(@Query() query: SortStaffDto): Promise<GetStaffDto[]> {
      return this.staffService.findSorted(query);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: GET_ONESTAFF_BYID_RESOURCES.API_OPERATION.SUMMARY,
    description: GET_ONESTAFF_BYID_RESOURCES.API_OPERATION.DESCRIPTION,
  })
  @ApiOkResponse({ 
    type: GetStaffDto,
    description: GET_ONESTAFF_BYID_RESOURCES.API_OKRES.DESCRIPTION 
  })
  @ApiBadRequestResponse({ description: GET_ONESTAFF_BYID_RESOURCES.API_BAD_REQRES.DESCRIPTION })
  async findOneById(@Param('id') staffId: number): Promise<GetStaffDto> {
    return this.staffService.findOneById(staffId);
  }

  @StaffRole('Admin')
  @UseGuards(AuthGuard)
  @Post('create')
  @ApiBearerAuth()
  @ApiOperation({
    summary: CREATE_STAFF_RESOURCES.API_OPERATION.SUMMARY,
    description: CREATE_STAFF_RESOURCES.API_OPERATION.DESCRIPTION,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    type: GetStaffDto,
    description: CREATE_STAFF_RESOURCES.API_OKRES.DESCRIPTION,
  })
  @ApiBadRequestResponse({ description: CREATE_STAFF_RESOURCES.API_BAD_REQRES.DESCRIPTION })
  @UseInterceptors(new UploadFileInterceptor('profile', 'profiles'))
  async createStaff(@Body() body: CreateStaffDto, @UploadedFile() profile: Express.Multer.File): Promise<GetStaffDto> { 
    return this.staffService.createStaff(body, profile);
  }

  @StaffRole('Admin')
  @UseGuards(AuthGuard)
  @Put('change-role')
  @ApiBearerAuth()
  @ApiOperation({
    summary: CHANGE_ROLE_STAFF_RESOURCES.API_OPERATION.SUMMARY,
    description: CHANGE_ROLE_STAFF_RESOURCES.API_OPERATION.DESCRIPTION,
  })
  @ApiOkResponse({
    type: GetStaffDto,
    description: CHANGE_ROLE_STAFF_RESOURCES.API_OKRES.DESCRIPTION
  })
  @ApiBadRequestResponse({ description: CHANGE_ROLE_STAFF_RESOURCES.API_BAD_REQRES.DESCRIPTION })
  async changeRole(@Body() body: ChangeStaffRoleDto) {
    return this.staffService.changeRole(body);
  }

  @StaffRole('Admin')
  @UseGuards(AuthGuard)
  @Put('update/:id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: UPDATE_STAFF_RESOURCES.API_OPERATION.SUMMARY,
    description: UPDATE_STAFF_RESOURCES.API_OPERATION.DESCRIPTION,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    type: GetStaffDto,
    description: UPDATE_STAFF_RESOURCES.API_OKRES.DESCRIPTION
  })
  @ApiBadRequestResponse({ description: UPDATE_STAFF_RESOURCES.API_BAD_REQRES.DESCRIPTION })
  @UseInterceptors(new UploadFileInterceptor('profile', 'profiles'))
  async updateStaff(
    @Param('id', ParseIntPipe) staffId: number,
    @Body() body: UpdateStaffDto, 
    @UploadedFile() profile: Express.Multer.File,
  ): Promise<GetStaffDto> {
    return this.staffService.updateStaff(staffId, body, profile);
  }

  @StaffRole('Admin')
  @UseGuards(AuthGuard)
  @Delete('delete/:id') 
  @ApiBearerAuth()
  @ApiOperation({
    summary: DELETE_STAFF_RESOURCES.API_OPERATION.SUMMARY,
    description: DELETE_STAFF_RESOURCES.API_OPERATION.DESCRIPTION,
  })
  @ApiOkResponse({
    type: GetStaffDto,
    description: DELETE_STAFF_RESOURCES.API_OKRES.DESCRIPTION
  })
  @ApiBadRequestResponse({ description: DELETE_STAFF_RESOURCES.API_BAD_REQRES.DESCRIPTION })
  async deleteStaff(@Param('id', ParseIntPipe) staffId: number): Promise<GetStaffDto> {
    return this.staffService.deleteStaff(staffId);
  }
}
