import { JwtService, PayloadT } from '@app/common/jwt/jwt.service';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/entities/staff/staff.entity';
import { Repository } from 'typeorm';
import { LoginRequestDto } from './dtos/login-request.dto';
import * as bcrypt from 'bcrypt';
import { AUTH_MESSAGE } from './auth.constant';
import { LoginResponseDto } from './dtos/login-response.dto';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { StaffService } from 'src/staff/staff.service';
import { RegisterResponseDto } from './dtos/register-response.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Staff) private staffRepo: Repository<Staff>,
        private readonly staffService: StaffService,
        private readonly jwtService: JwtService
    ) {}

    async login(body: LoginRequestDto): Promise<LoginResponseDto> {
        try {
            //Find the staff by email
            const staff = await this.staffRepo.findOne({ 
                relations: ['role'],
                where: { email: body.email } 
            });
            if(!staff) throw new UnauthorizedException(AUTH_MESSAGE.INVALID_CREDENTIALS);

            //If found compare password
            const validPassword: boolean = await bcrypt.compare(body.password, staff.password);
            if(!validPassword) throw new NotFoundException(AUTH_MESSAGE.INVALID_CREDENTIALS);

            //Generate token with payload
            const payload: PayloadT = {
                id: staff.id,
                firstname: staff.firstname,
                lastname: staff.lastname,
                role: staff.role.name,
            }
            const token = await this.jwtService.generateToken(payload);

            //Return token with login credentials information
            const credential = {
                id: staff.id,
                firstname: staff.firstname,
                lastname: staff.lastname,
                role: staff.role.name,
            }
            return new LoginResponseDto(token, credential);
            
        } catch (error) {
            console.error('Failed to login: ', error.message);
            throw new UnauthorizedException(
                error.name === "TokenExpiredError" 
                ? AUTH_MESSAGE.TOKEN_EXPIRED 
                : AUTH_MESSAGE.INVALID_TOKEN
            );
        }
    } 

    async register(body: RegisterRequestDto, profile: Express.Multer.File): Promise<RegisterResponseDto> {
        return await this.staffService.createStaff(body, profile);
    }
}