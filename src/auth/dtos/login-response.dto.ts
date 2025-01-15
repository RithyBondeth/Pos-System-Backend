import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

class Credential {
    @ApiProperty({
        description: "Staff ID",
        example: 1
    })
    @IsNotEmpty()
    @Type(() => Number)
    id: number;

    @ApiProperty({
        description: "Staff Firstname",
        example: "Hem"
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
        description: "Staff Role",
        example: "Cashier"
    })
    @IsString()
    role: string;
}

export class LoginResponseDto {
    @ApiProperty({
        description: "Access token",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpvaG4iOnsicmVjdCBjb2RlZSI6IkJBcHBpbnVzIjoxMjM0In0="
    })
    @IsString()
    token: string;
    
    @ApiProperty({
        description: "Staff credentials",
        example: {
            id: 1,
            firstname: "Hem",
            lastname: "Rithybondeth",
            role: "Cashier"
        }
    })
    @Type(() => Credential)
    credential: Credential
}