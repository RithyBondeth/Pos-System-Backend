import { IsEnum, IsOptional, IsString } from "class-validator";
import { GenderE, ShiftE } from "src/entities/staff/staff.type";

export class CountStaffQueryParamDTO {
    @IsEnum(GenderE, { message: "gender must be Male or Female" })
    @IsOptional()
    gender: GenderE;

    @IsString()
    @IsOptional()
    role: string;

    @IsEnum(ShiftE, { message: "Shift must be Fulltime, Morning, Afternoon or Evening"})
    @IsOptional()
    shift: ShiftE;
}