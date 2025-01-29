import { InventoryOperationReasonE } from "@app/common/database/entities/inventory/inventory.type";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, Min } from "class-validator";

export class StockInInventoryDto {
    @ApiProperty({
        description: "Product ID",
        example: 1,
        type: Number,
    })
    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @ApiProperty({
        description: "Stock Quantity",
        example: 10,
        type: Number,
    })
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({
        description: "Operation Reason",
        example: InventoryOperationReasonE.RESTOCK,
        type: String,
    })
    @IsEnum(InventoryOperationReasonE)
    @IsNotEmpty()
    operationReason: InventoryOperationReasonE;
}