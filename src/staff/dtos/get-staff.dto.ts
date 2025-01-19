import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsDateString, IsEmail, IsEnum, IsNumber, IsString, Matches } from "class-validator";
import { GenderE, ShiftE } from "@app/common/database/entities/staff/staff.type";

export class GetRoleDto {
    @ApiHideProperty()
    @Exclude()
    id: number;

    @ApiProperty({ 
        description: "Staff role name", 
        example: 'Manager' 
    })
    @IsString()
    name: string;

    @ApiHideProperty()
    @Exclude()
    createdAt: Date;

    @ApiHideProperty()
    @Exclude()
    updatedAt: Date;
}

export class GetStaffDto {
    @ApiProperty({ 
        description: "Staff ID", 
        example: 1 
    })
    @IsNumber()
    id: number;

    @ApiProperty({ 
        description: "Staff Firstname", 
        example: 'Hem'
    })
    @IsString()
    firstname: string;

    @ApiProperty({ 
        description: "Staff Lastname", 
        example: "RithyBondeth"
    })
    @IsString()
    lastname: string;

    @ApiProperty({ 
        description: "Staff full name (auto-generated)", 
        example: "Hem RithyBondeth", 
        readOnly: true ,
        name: "fullname"
    })
    @Expose({ name: "fullname" })
    transformFullName() {
        return `${this.firstname} ${this.lastname}`;
    } 

    @ApiProperty({ 
        description: "Staff profile image file", 
        example: 'profiles/staff1.jpg' 
    })
    @IsString()
    profile: string;

    @ApiProperty({ 
        description: "Staff gender",  
        enum: GenderE, 
        example: GenderE.MALE 
    })
    @IsEnum(GenderE)
    gender: GenderE;

    @ApiProperty({ 
        description: "Staff Date of Birth", 
        example: "2002-05-07", 
        format: "date" 
    })
    @IsDateString({ strict: true })
    dob: string;

    @ApiProperty({ 
        description: "Staff address", 
        example: "123 Main St, Phnom Penh" 
    })
    @IsString()
    address: string;

    @ApiProperty({
        description: "Staff phone number (cambodian)",
        example: "+855 85872582",
        pattern: '^(?:\\+855|0)([1-9]{1}[0-9]{7,8})$'
    })
    @Matches(/^(?:\+855|0)([1-9]{1}[0-9]{7,8})$/, { message: "Invalid Cambodian Phone Number Format" })
    phoneNumber: string;

    @ApiProperty({ 
        description: "Staff work shift", 
        enum: ShiftE, 
        example: ShiftE.FULLTIME 
    })
    @IsEnum(ShiftE)
    shift: ShiftE;

    @ApiHideProperty()
    @Exclude()
    salary: number;

    @ApiProperty({ 
        description: "Staff salary with currency symbol", 
        example: '$500', 
        readOnly: true,
        name: "salary", 
    })
    @Expose({ name: "salary" })
    transformSalary() {
        return  `$${this.salary}`
    }

    @ApiHideProperty()
    @Exclude()
    role: GetRoleDto;

    @ApiProperty({ 
        description: 'Staff role', 
        example: 'Manager', 
        readOnly: true, 
        name: "role" 
    })
    @Expose({ name: "role" })
    transformRole() {
        return this.role.name;
    }
    
    @ApiProperty({ 
        description: 'Staff example address', 
        example: 'rithybondeth999@gmail.com'
    })
    @IsEmail()
    email: string;
    
    @ApiHideProperty()
    @Exclude()
    password: string;
    
    @ApiHideProperty()
    @Exclude()
    resetPasswordToken: string;
    
    @ApiHideProperty()
    @Exclude()
    resetPasswordExpires: Date;
    
    @ApiHideProperty()
    @Exclude()
    updatedAt: Date;

    @ApiHideProperty()
    @Exclude()
    createdAt: Date;
    
    constructor(partial: Partial<GetStaffDto>) {
        return Object.assign(this, partial);
    }
}