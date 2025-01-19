import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsStrongPassword, Matches } from "class-validator";
import { GenderE, ShiftE } from "@app/common/database/entities/staff/staff.type";

export class CreateStaffDto {
    @ApiProperty({
        description: "Staff firstname",
        example: "Hem"
    })
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @ApiProperty({
        description: "Staff lastname",
        example: "RithyBondeth"
    })
    @IsString()
    @IsNotEmpty()
    lastname: string;
    
    @ApiProperty({
        description: "Staff gender",
        enum: GenderE,
        example: GenderE.FEMALE
    })
    @IsEnum(GenderE)
    @IsNotEmpty()
    gender: GenderE;

    @ApiProperty({
        description: "Staff date of birth",
        example: "2002-05-07"
    })
    @IsDateString({ strict: true }) //2002-05-07
    @IsNotEmpty()
    dob: string;

    @ApiProperty({
        description: "Staff address",
        example: "123 Main St, Phnom Penh"
    })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({
        description: "Staff work shift",
        enum: ShiftE,
        example: ShiftE.FULLTIME
    })
    @IsEnum(ShiftE)
    @IsNotEmpty()
    shift: ShiftE;

    @ApiProperty({
        description: "Staff role",
        example: "Cashier"
    })
    @IsString()
    @IsNotEmpty()
    role: string;

    @ApiProperty({
        description: "Staff Cambodian phone number",
        pattern: "/^(?:\+855|0)([1-9]{1}[0-9]{7,8})$/",
        example: "+855 979 123 456"
    })
    @Matches(/^(?:\+855|0)([1-9]{1}[0-9]{7,8})$/, { message: "Invalid Cambodian Phone Number Format" })
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty({
        description: "Staff salary",
        example: 500
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    salary: number;

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
    @IsString()
    @IsStrongPassword({ minLength: 8, minNumbers: 1, minUppercase: 1, minSymbols: 1 })
    @IsNotEmpty()
    password: string;

    @ApiPropertyOptional({
        description: "Staff profile",
        type: 'string',
        format: "binary",
        example: "profiles/staff1_profile.jpg"
    })
    @IsString()
    @IsOptional()
    profile: string;
}