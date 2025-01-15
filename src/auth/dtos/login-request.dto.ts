import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginRequestDto {
    @ApiProperty({
        description: "Email of the staff",
        example: "rithybondeth999@gmail.com"
    })
    @IsEmail()
    @IsNotEmpty()
    email: string; 

    @ApiProperty({
        description: "Password of the staff",
        example: "Bondeth@12345",
        pattern: "At least 1 number, 1 uppercase, 1 symbol",
    })
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;
}