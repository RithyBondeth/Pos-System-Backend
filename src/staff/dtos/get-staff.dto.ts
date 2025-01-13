import { Exclude, Expose } from "class-transformer";
import { GenderE, ShiftE } from "src/entities/staff/staff.type";

export class GetStaffDto {
    id: number;
    firstname: string;
    lastname: string;
    @Expose({ name: "fullname" })
    transformFullName() {
        return `${this.firstname} ${this.lastname}`;
    } 
    profile: string;
    gender: GenderE;
    dob: string;
    address: string;
    phoneNumber: string;
    shift: ShiftE;
    @Exclude()
    salary: number;
    @Expose({ name: "salary" })
    transformSalary() {
        return  `$${this.salary}`
    }
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