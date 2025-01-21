import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DeleteProductResponseDto {
    @ApiProperty({
        description: "A response message for deleting a product",
        example: "Product has been deleted successfully"
    })
    @IsString()
    message: string;
}