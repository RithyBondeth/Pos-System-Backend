import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsEnum, IsNumber, IsOptional, IsPositive, IsString, Matches } from "class-validator";
import { GenderE, ShiftE } from "src/entities/staff/staff.type";

export class UpdateStaffDto {
    @ApiPropertyOptional({
        description: "Staff firstname",
        example: "Hem"
    })
    @IsString()
    @IsOptional()
    firstname: string;

    @ApiPropertyOptional({
        description: "Staff lastname",
        example: "RithyBondeth"
    })
    @IsString()
    @IsOptional()
    lastname: string;
    
    @ApiPropertyOptional({
        description: "Staff gender",
        enum: GenderE,
        example: GenderE.FEMALE
    })
    @IsEnum(GenderE)
    @IsOptional()
    gender: GenderE;

    @ApiPropertyOptional({
        description: "Staff date of birth",
        example: "2002-05-07"
    })
    @IsDateString({ strict: true }) //2002-05-07
    @IsOptional()
    dob: string;

    @ApiPropertyOptional({
        description: "Staff address",
        example: "123 Main St, Phnom Penh"
    })    
    @IsString()
    @IsOptional()
    address: string;

    @ApiPropertyOptional({
        description: "Staff work shift",
        enum: ShiftE,
        example: ShiftE.FULLTIME
    })    
    @IsEnum(ShiftE)
    @IsOptional()
    shift: ShiftE;

    @ApiPropertyOptional({
        description: "Staff role",
        example: "Cashier"
    })
    @IsString()
    @IsOptional()
    role: string;

    @ApiPropertyOptional({
        description: "Staff Cambodian phone number",
        pattern: "/^(?:\+855|0)([1-9]{1}[0-9]{7,8})$/",
        example: "+855 979 123 456"
    })
    @Matches(/^(?:\+855|0)([1-9]{1}[0-9]{7,8})$/, { message: "Invalid Cambodian Phone Number Format" })
    @IsOptional()
    phoneNumber: string;

    @ApiPropertyOptional({
        description: "Staff salary",
        example: 500
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    salary: number;

    @ApiPropertyOptional({
        description: "Email of the staff",
        example: "rithybondeth999@gmail.com"
    })
    @IsEmail()
    @IsOptional()
    email: string;
}