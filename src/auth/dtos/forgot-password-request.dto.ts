import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ForgotPasswordRequestDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: "Email of the staff",
        example: "rithybondeth999@gmail.com"
    })
    email: string;
}