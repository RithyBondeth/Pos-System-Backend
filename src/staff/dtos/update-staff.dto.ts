import { IsDateString, IsEmail, IsEnum, IsNumber, IsOptional, IsPositive, IsString, Matches } from "class-validator";
import { GenderE, ShiftE } from "src/entities/staff/staff.type";

export class UpdateStaffDto {
    @IsString() @IsOptional()
    @IsOptional()
    firstname: string;

    @IsString()
    @IsOptional()
    lastname: string;
    
    @IsEnum(GenderE)
    @IsOptional()
    gender: GenderE;

    @IsDateString({ strict: true }) //2002-05-07
    @IsOptional()
    dob: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsEnum(ShiftE)
    @IsOptional()
    shift: ShiftE;

    @IsString()
    @IsOptional()
    role: string;

    @Matches(/^(?:\+855|0)([1-9]{1}[0-9]{7,8})$/, { message: "Invalid Cambodian Phone Number Format" })
    @IsOptional()
    phoneNumber: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    salary: number;

    @IsEmail()
    @IsOptional()
    email: string;
}