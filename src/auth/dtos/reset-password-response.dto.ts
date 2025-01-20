import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordResponseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "A response message for the reset password",
        example: "Reset password successfully"
    })
    message: string;
}