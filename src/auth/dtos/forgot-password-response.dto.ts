import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ForgotPasswordResponseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "A reset password token has been sent to your email",
        example: "Check your email for a reset password link."
    })
    message: string;
}