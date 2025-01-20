import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class ResetPasswordRequestDto {
    @ApiProperty({
        description: "New password of the staff",
        example: "Bondeth@999",
        pattern: "At least 1 number, 1 uppercase, 1 symbol",
    })
    @IsString()
    @IsStrongPassword({ minLength: 8, minNumbers: 1, minUppercase: 1, minSymbols: 1 })
    @IsNotEmpty() 
    newPassword: string;
}