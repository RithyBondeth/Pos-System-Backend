import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

export type PayloadT = {
    id: number;
    firstname: string;  
    lastname: string;
    role: string;
    exp?: number;
    iat?: number;
}

@Injectable()
export class JwtService {
    constructor(private jwtService: NestJwtService) {}

    async generateToken(payload: PayloadT): Promise<string> {
        const token = this.jwtService.signAsync(payload);
        return token;
    }

    async verifyToken(token: string): Promise<any> {
       try {
            return this.jwtService.verifyAsync(token);
       } catch (error) {
            console.error("Invalid token");
            throw new Error(error.message);
       } 
    }

    decodeToken(token: string): PayloadT {
        const decode = this.jwtService.decode(token);
        if(!decode) throw new Error("Failed to decode token");
        
        return decode as PayloadT;
    }
}
