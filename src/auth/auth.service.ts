import { JwtService, PayloadT } from '@app/common/jwt/jwt.service';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from '@app/common/database/entities/staff/staff.entity';
import { MoreThan, Repository } from 'typeorm';
import { LoginRequestDto } from './dtos/login-request.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { AUTH_MESSAGE } from './auth.constant';
import { LoginResponseDto } from './dtos/login-response.dto';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { StaffService } from 'src/staff/staff.service';
import { RegisterResponseDto } from './dtos/register-response.dto';
import { ForgotPasswordRequestDto } from './dtos/forgot-password-request.dto';
import { EmailService } from '@app/common/email/email.service';
import { ForgotPasswordResponseDto } from './dtos/forgot-password-response.dto';
import { ResetPasswordRequestDto } from './dtos/reset-password-request.dto';
import { ResetPasswordResponseDto } from './dtos/reset-password-response.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Staff) private staffRepo: Repository<Staff>,
        private readonly staffService: StaffService,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService
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

    async forgotPassword(body: ForgotPasswordRequestDto): Promise<ForgotPasswordResponseDto> {
        try {  
            //Find the staff by their email
            const staff = await this.staffRepo.findOne({ where: { email: body.email }});
            if(!staff) throw new NotFoundException(AUTH_MESSAGE.INVALID_CREDENTIALS);

            //Generate a reset password token and expiry date
            const resetToken = crypto.randomBytes(20).toString('hex');
            const expireDateToken = new Date(Date.now() + 10 * 60 * 1000);
            
            //Set a reset password token and expiry date
            staff.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
            staff.resetPasswordExpires = expireDateToken;
            await this.staffRepo.save(staff);

            //Send reset password token to the staff's email address
            const mailSend =  await this.emailService.sendEmail({
                from: 'noreply@example.com',
                to: staff.email,
                subject: 'Reset Password',
                text: `Hello, ${staff.firstname} ${staff.lastname}. Here is your reset password token: ${resetToken}`
            });
            if(!mailSend) throw new BadRequestException('Failed to send reset reset password token');

            return { message: 'Reset Token has send to your email' };
        } catch (error) {
            console.error('Forgot Password Error: ', error.message);
            throw new BadRequestException(error.message);
        }
    }

    async resetPassword(resetToken: string, body: ResetPasswordRequestDto): Promise<ResetPasswordResponseDto> {
        try{
            //Hashed the reset token
            const hasedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

            //Find staff by resetToken and check if expireToken is still valid
            const staff = await this.staffRepo.findOne({
                where: {
                    resetPasswordToken: hasedToken,
                    resetPasswordExpires: MoreThan(new Date()), //Token not expired
                }
            });
            if(!staff) throw new BadRequestException(`${AUTH_MESSAGE.INVALID_TOKEN} or ${AUTH_MESSAGE.TOKEN_EXPIRED}`);        

            //Update staff's password
            staff.password = await bcrypt.hash(body.newPassword, 10);
            staff.resetPasswordToken = null;
            staff.resetPasswordExpires = null;
            await this.staffRepo.save(staff);            

            return { message: 'Reset password successfully' };
        } catch (error) {
            console.error('Reset Password Error: ', error.message);
            throw new BadRequestException(error.message);
        }
    }
}