import { Body, Controller, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_TAG_RESOURCE_NAME, CREATE_INVENTORY_RESOURCE, RESOURCE_NAME } from './inventory.constant';
import { StockInInventoryDto } from './dtos/stockin-inventory.dto';
import { CurrentStaff } from 'src/auth/decorators/current-staff.decorator';
import { PayloadT } from '@app/common/jwt/jwt.service';

@ApiTags(API_TAG_RESOURCE_NAME)
@Controller(RESOURCE_NAME)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('stock-in')
  @ApiBearerAuth()
  @ApiOperation({
    summary: CREATE_INVENTORY_RESOURCE.API_OPERATION.SUMMARY,
    description: CREATE_INVENTORY_RESOURCE.API_OPERATION.DESCRIPTION,
  })
  @ApiOkResponse({
    description: CREATE_INVENTORY_RESOURCE.API_OKRES.DESCRIPTION,
  })
  @ApiBadRequestResponse({ description: CREATE_INVENTORY_RESOURCE.API_BAD_REQRES.DESCRIPTION })
  async stockIn(@Body() body: StockInInventoryDto, @CurrentStaff() staff: PayloadT) {
    return this.inventoryService.stockIn(body, staff);
  } 
}
