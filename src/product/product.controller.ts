import { Body, Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { API_TAG_RESOURCE_NAME, CREATE_PRODUCT_RESOURCE, FINDALL_PRODUCT_RESOURCES, FINDONE_PRODUCT_RESOURCES, RESOURCE_NAME } from './product.constant';
import { ApiBadRequestResponse, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadFileInterceptor } from '@app/common/uploadfile/uploadfile.interceptor';
import { CreateProductDto } from './dtos/create-product.dto';
import { GetProductDto } from './dtos/get-product.dto';

@ApiTags(API_TAG_RESOURCE_NAME)
@Controller(RESOURCE_NAME)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all') 
  @ApiOperation({
    summary: FINDALL_PRODUCT_RESOURCES.API_OPERATION.SUMMARY,
    description: FINDALL_PRODUCT_RESOURCES.API_OPERATION.DESCRIPTION,
  })
  @ApiOkResponse({
    type: GetProductDto,
    isArray: true,
    description: FINDALL_PRODUCT_RESOURCES.API_OKRES.DESCRIPTION,
  })
  @ApiBadRequestResponse({ description: FINDALL_PRODUCT_RESOURCES.API_BAD_REQRES.DESCRIPTION })
  async findAll(): Promise<GetProductDto[]> {
    return this.productService.findAll();
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
}
