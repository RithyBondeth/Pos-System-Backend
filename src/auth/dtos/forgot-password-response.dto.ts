import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ForgotPasswordResponseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "A response message for the forgot password",
        example: "Reset Token has send to your email"
    })
    message: string;
}