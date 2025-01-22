import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { ApiBadRequestResponse, ApiConsumes, ApiExtraModels, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CREATE_CATEGORY_RESOURCE, DELETE_CATEGORY_RESOURCE, FINDALL_CATEGORY_RESOURCE, FINDONE_CATEGORY_RESOURCE, SORT_CATEGORY_RESOURCE, UPDATE_CATEGORY_RESOURCE } from './category.constant';
import { UploadFileInterceptor } from '@app/common/uploadfile/uploadfile.interceptor';
import { GetCategoryDto } from './dtos/get-category.dto';
import { PaginationCategoryDto } from './dtos/pagination-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { DeleteCategoryRepsonseDto } from './dtos/delete-category-response.dto';
import { SortCategoryDto } from './dtos/sort-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
 
  @Get('all')
  @ApiOperation({
    summary: FINDALL_CATEGORY_RESOURCE.API_OPERATION.SUMMARY,
    description: FINDALL_CATEGORY_RESOURCE.API_OPERATION.DESCRIPTION,
  })
  @ApiExtraModels(PaginationCategoryDto)
  @ApiOkResponse({
    type: GetCategoryDto,
    isArray: true,
    description: FINDALL_CATEGORY_RESOURCE.API_OKRES.DESCRIPTION
  })
  @ApiBadRequestResponse({ description: FINDALL_CATEGORY_RESOURCE.API_BAD_REQRES.DESCRIPTION })
  async findAll(@Query() pagination: PaginationCategoryDto): Promise<GetCategoryDto[]> {
    return this.categoryService.findAll(pagination);
  }

  @Get('sort')
  @ApiOperation({
    summary: SORT_CATEGORY_RESOURCE.API_OPERATION.SUMMARY,
    description: SORT_CATEGORY_RESOURCE.API_OPERATION.DESCRIPTION,
  })
  @ApiExtraModels(SortCategoryDto)
  @ApiOkResponse({
    type: GetCategoryDto,
    isArray: true,
    description: SORT_CATEGORY_RESOURCE.API_OKRES.DESCRIPTION
  })
  @ApiBadRequestResponse({ description: SORT_CATEGORY_RESOURCE.API_BAD_REQRES.DESCRIPTION })
  async sortCategory(@Query() query: SortCategoryDto): Promise<GetCategoryDto[]> {
    return this.categoryService.sortCategory(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: FINDONE_CATEGORY_RESOURCE.API_OPERATION.SUMMARY,
    description: FINDONE_CATEGORY_RESOURCE.API_OPERATION.DESCRIPTION,
  })
  @ApiOkResponse({
    type: GetCategoryDto,
    description: FINDONE_CATEGORY_RESOURCE.API_OKRES.DESCRIPTION
  })
  @ApiBadRequestResponse({ description: FINDONE_CATEGORY_RESOURCE.API_BAD_REQRES.DESCRIPTION })
  async findOneById(@Param('id', ParseIntPipe) categoryId: number): Promise<GetCategoryDto> {
    return this.categoryService.findOneById(categoryId);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: CREATE_CATEGORY_RESOURCE.API_OPERATION.SUMMARY,
    description: CREATE_CATEGORY_RESOURCE.API_OPERATION.DESCRIPTION,
  })
  @ApiOkResponse({
    type: GetCategoryDto,
    description: CREATE_CATEGORY_RESOURCE.API_OKRES.DESCRIPTION  
  })
  @ApiBadRequestResponse({ description: CREATE_CATEGORY_RESOURCE.API_BAD_REQRES.DESCRIPTION })
  @UseInterceptors(new UploadFileInterceptor('image', 'categories'))
  async createCategory(
    @Body() body: CreateCategoryDto, 
    @UploadedFile() image: Express.Multer.File,
  ): Promise<GetCategoryDto> {
    return this.categoryService.createCategory(body, image);
  }

  @Put('update/:id')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: UPDATE_CATEGORY_RESOURCE.API_OPERATION.SUMMARY,
    description: UPDATE_CATEGORY_RESOURCE.API_OPERATION.DESCRIPTION,
  })
  @ApiOkResponse({
    type: GetCategoryDto,
    description: UPDATE_CATEGORY_RESOURCE.API_OKRES.DESCRIPTION
  })
  @ApiBadRequestResponse({ description: UPDATE_CATEGORY_RESOURCE.API_BAD_REQRES.DESCRIPTION })
  @UseInterceptors(new UploadFileInterceptor('image', 'categories'))
  async updateCategory(
    @Param('id', ParseIntPipe) categoryId: number,
    @Body() body: UpdateCategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<GetCategoryDto> {
    return this.categoryService.updateCategory(categoryId, body, image);
  }

  @Delete('delete/:id')
  @ApiOperation({
    summary: DELETE_CATEGORY_RESOURCE.API_OPERATION.SUMMARY,
    description: DELETE_CATEGORY_RESOURCE.API_OPERATION.DESCRIPTION,
  })
  @ApiOkResponse({
    type: DeleteCategoryRepsonseDto,
    description: DELETE_CATEGORY_RESOURCE.API_OKRES.DESCRIPTION
  })
  @ApiBadRequestResponse({ description: DELETE_CATEGORY_RESOURCE.API_BAD_REQRES.DESCRIPTION })
  async deleteCategory(@Param('id', ParseIntPipe) categoryId: number): Promise<DeleteCategoryRepsonseDto> {
    return this.categoryService.deleteCategory(categoryId)
  }
}
