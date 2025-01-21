import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { API_TAG_RESOURCE_NAME, CREATE_PRODUCT_RESOURCE, DELETE_PRODUCT_RESOURCE, FINDALL_PRODUCT_RESOURCES, FINDONE_PRODUCT_RESOURCES, RESOURCE_NAME, SORT_PRODUCT_RESOURCES, UPDATE_PRODUCT_RESOURCE } from './product.constant';
import { ApiBadRequestResponse, ApiConsumes, ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadFileInterceptor } from '@app/common/uploadfile/uploadfile.interceptor';
import { CreateProductDto } from './dtos/create-product.dto';
import { GetProductDto } from './dtos/get-product.dto';
import { PaginationProductDto } from './dtos/pagination-product.dto';
import { SortProductDto } from './dtos/sort-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { DeleteProductResponseDto } from './dtos/delete-product-response.dto';

@ApiTags(API_TAG_RESOURCE_NAME)
@Controller(RESOURCE_NAME)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all') 
  @ApiOperation({
    summary: FINDALL_PRODUCT_RESOURCES.API_OPERATION.SUMMARY,
    description: FINDALL_PRODUCT_RESOURCES.API_OPERATION.DESCRIPTION,
  })
  @ApiExtraModels(PaginationProductDto)
  @ApiOkResponse({
    type: GetProductDto,
    isArray: true,
    description: FINDALL_PRODUCT_RESOURCES.API_OKRES.DESCRIPTION,
  })
  @ApiBadRequestResponse({ description: FINDALL_PRODUCT_RESOURCES.API_BAD_REQRES.DESCRIPTION })
  async findAll(@Query() pagination: PaginationProductDto): Promise<GetProductDto[]> {
    return this.productService.findAll(pagination);
  }

  @Get('sort')
  @ApiOperation({
    summary: SORT_PRODUCT_RESOURCES.API_OPERATION.SUMMARY,
    description: SORT_PRODUCT_RESOURCES.API_OPERATION.DESCRIPTION,
  })
  @ApiExtraModels(SortProductDto)
  @ApiOkResponse({
    type: GetProductDto,
    isArray: true,
    description: SORT_PRODUCT_RESOURCES.API_OKRES.DESCRIPTION,
  })
  @ApiBadRequestResponse({ description: SORT_PRODUCT_RESOURCES.API_BAD_REQRES.DESCRIPTION })
  async sortProduct(@Query() sort: SortProductDto): Promise<GetProductDto[]> {
      return this.productService.sortProduct(sort);
  }

  @Get(':id')
  @ApiOperation({
    summary: FINDONE_PRODUCT_RESOURCES.API_OPERATION.SUMMARY,
    description: FINDONE_PRODUCT_RESOURCES.API_OPERATION.DESCRIPTION,
  })
  @ApiOkResponse({
    type: GetProductDto,
    description: FINDONE_PRODUCT_RESOURCES.API_OKRES.DESCRIPTION,
  })
  @ApiBadRequestResponse({ description: FINDONE_PRODUCT_RESOURCES.API_BAD_REQRES.DESCRIPTION })
  async findOneById(@Param('id', ParseIntPipe) productId: number): Promise<GetProductDto> {
    return this.productService.findOneById(productId);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: CREATE_PRODUCT_RESOURCE.API_OPERATION.SUMMARY,
    description: CREATE_PRODUCT_RESOURCE.API_OPERATION.DESCRIPTION,
  })
  @ApiOkResponse({
    type: GetProductDto,
    description: CREATE_PRODUCT_RESOURCE.API_OKRES.DESCRIPTION,
  })
  @ApiBadRequestResponse({ description: CREATE_PRODUCT_RESOURCE.API_BAD_REQRES.DESCRIPTION })
  @UseInterceptors(new UploadFileInterceptor('image', 'products'))
  async createProduct(@Body() body: CreateProductDto, @UploadedFile() image: Express.Multer.File): Promise<GetProductDto> {
    return this.productService.createProduct(body, image);
  }

  @Put('update/:id')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: UPDATE_PRODUCT_RESOURCE.API_OPERATION.SUMMARY,
    description: UPDATE_PRODUCT_RESOURCE.API_OPERATION.DESCRIPTION,
  })
  @ApiOkResponse({
    type: GetProductDto,
    description: UPDATE_PRODUCT_RESOURCE.API_OKRES.DESCRIPTION
  })
  @ApiBadRequestResponse({ description: UPDATE_PRODUCT_RESOURCE.API_BAD_REQRES.DESCRIPTION })
  @UseInterceptors(new UploadFileInterceptor('image', 'products'))
  async updateProduct(
    @Param('id', ParseIntPipe) productId: number,
    @Body() body: UpdateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<GetProductDto> {
    return this.productService.updateProduct(productId, body, image);
  }

  @Delete('delete/:id')
  @ApiOperation({
    summary: DELETE_PRODUCT_RESOURCE.API_OPERATION.SUMMARY,
    description: DELETE_PRODUCT_RESOURCE.API_OPERATION.DESCRIPTION,
  })
  @ApiOkResponse({
    type: DeleteProductResponseDto,
    description: DELETE_PRODUCT_RESOURCE.API_OKRES.DESCRIPTION
  })
  @ApiBadRequestResponse({ description: DELETE_PRODUCT_RESOURCE.API_BAD_REQRES.DESCRIPTION })
  async deleteProduct(@Param('id', ParseIntPipe) productId: number): Promise<DeleteProductResponseDto> {
    return this.productService.deleteProduct(productId);
  }
}
