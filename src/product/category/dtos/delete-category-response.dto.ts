import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DeleteCategoryRepsonseDto {
    @ApiProperty({
        description: "A response message for deleting a category",
        example: "Category has been deleted successfully",
    })
    @IsString()
    message: string; 
}