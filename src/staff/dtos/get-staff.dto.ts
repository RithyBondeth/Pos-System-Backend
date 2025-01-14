import { Exclude, Expose } from "class-transformer";
import { IsDateString, IsEmail, IsEnum, IsNumber, IsString, Matches } from "class-validator";
import { GenderE, ShiftE } from "src/entities/staff/staff.type";

export class GetRoleDto {
    @Exclude()
    id: number;

    @IsString()
    name: string;
    
    @Exclude()
    createdAt: Date;
    
    @Exclude()
    updatedAt: Date;
}

export class GetStaffDto {
    @IsNumber()
    id: number;

    @IsString()
    firstname: string;

    @IsString()
    lastname: string;

    @Expose({ name: "fullname" })
    transformFullName() {
        return `${this.firstname} ${this.lastname}`;
    } 

    @IsString()
    profile: string;

    @IsEnum(GenderE)
    gender: GenderE;

    @IsDateString({ strict: true })
    dob: string;

    @IsString()
    address: string;

    @Matches(/^(?:\+855|0)([1-9]{1}[0-9]{7,8})$/, { message: "Invalid Cambodian Phone Number Format" })
    phoneNumber: string;

    @IsEnum(ShiftE)
    shift: ShiftE;

    @Exclude()
    salary: number;

    @Expose({ name: "salary" })
    transformSalary() {
        return  `$${this.salary}`
    }
    @Exclude()
    role: GetRoleDto;

    @Expose({ name: "role" })
    transformRole() {
        return this.role.name;
    }
    
    @IsEmail()
    email: string;
    
    @Exclude()
    password: string;
    
    @Exclude()
    resetPasswordToken: string;
    
    @Exclude()
    resetPasswordExpires: Date;
    
    @Exclude()
    updatedAt: Date;

    @Exclude()
    createdAt: Date;
    
    constructor(partial: Partial<GetStaffDto>) {
        return Object.assign(this, partial);
    }
}