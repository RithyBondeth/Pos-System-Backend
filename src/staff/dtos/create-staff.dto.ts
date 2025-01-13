import { Type } from "class-transformer";
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, IsStrongPassword, Matches } from "class-validator";
import { GenderE, ShiftE } from "src/entities/staff/staff.type";

export class CreateStaffDto {
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;
    
    @IsEnum(GenderE)
    @IsNotEmpty()
    gender: GenderE;
    
    @IsDateString({ strict: true }) //2002-05-07
    @IsNotEmpty()
    dob: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsEnum(ShiftE)
    @IsNotEmpty()
    shift: ShiftE;

    @Matches(/^(?:\+855|0)([1-9]{1}[0-9]{7,8})$/, { message: "Invalid Cambodian Phone Number Format" })
    @IsNotEmpty()
    phoneNumber: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    salary: number;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsStrongPassword({ minLength: 8, minNumbers: 1, minUppercase: 1, minSymbols: 1 })
    @IsNotEmpty()
    password: string;
}