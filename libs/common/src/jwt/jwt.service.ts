import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

export type PayloadT = {
    id: number;
    firstname: string;  
    role: string;
    exp: number;
    iat: number;
}

@Injectable()
export class JwtService {
    constructor(private jwtService: NestJwtService) {}

    async generateToken(payload: PayloadT): Promise<{ token: string }> {
        const token = this.jwtService.sign(payload);
        return { token: token };   
    }

    async verifyToken(token: string): Promise<any> {
       try {
            return this.jwtService.verify(token);
       } catch (error) {
            console.error("Invalid token");
            throw new Error(error.message);
       } 
    }

    async decodeToken(token: string): Promise<PayloadT> {
        return this.jwtService.decode(token) as PayloadT;
    }
}
