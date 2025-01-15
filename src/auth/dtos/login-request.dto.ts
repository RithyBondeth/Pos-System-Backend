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
        description: "Password of the staff (Number including at least one uppercase character and special characters)",
        example: "Bondeth@12345"
    })
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;
}