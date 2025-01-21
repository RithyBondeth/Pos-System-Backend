import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DeleteStaffResponseDto {
    @ApiProperty({
        description: "A response message for deleting a staff",
        example: "Staff has been deleted successfully"
    })
    @IsString()
    message: string;
}