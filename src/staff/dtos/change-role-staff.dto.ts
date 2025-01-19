import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class ChangeStaffRoleDto {
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({
        description: "Staff ID to change role",
        example: 1,
    })
    staffId: number;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: "Staff email to change role",
        example: "rithybondeth999@gmail.com",
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "New staff role",
        example: "Admin",
    })
    newRole: string;   
}