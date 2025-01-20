import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { API_TAG_RESOURCE_NAME, CURRENT_STAFF_RESOURCES, FORGOT_PASSWORD_RESOURCES, LOGIN_RESOURCES, REGISTER_RESOURCES, RESET_PASSWORD_RESOURCES, RESOURCE_NAME } from './auth.constant';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginRequestDto } from './dtos/login-request.dto';
import { LoginResponseDto } from './dtos/login-response.dto';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { UploadFileInterceptor } from '@app/common/uploadfile/uploadfile.interceptor';
import { RegisterResponseDto } from './dtos/register-response.dto';
import { CurrentStaff } from './decorators/current-staff.decorator';
import { PayloadT } from '@app/common/jwt/jwt.service';
import { CurrentStaffResponseDto } from './dtos/currentstaff-response.dto';
import { ForgotPasswordRequestDto } from './dtos/forgot-password-request.dto';
import { ForgotPasswordResponseDto } from './dtos/forgot-password-response.dto';
import { ResetPasswordResponseDto } from './dtos/reset-password-response.dto';
import { ResetPasswordRequestDto } from './dtos/reset-password-request.dto';

@ApiTags(API_TAG_RESOURCE_NAME)
@Controller(RESOURCE_NAME)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: LOGIN_RESOURCES.API_OPERATION.SUMMARY,
    description: LOGIN_RESOURCES.API_OPERATION.DESCRIPTION,
  })
  @ApiOkResponse({ 
    type: LoginResponseDto,
    description: LOGIN_RESOURCES.API_OKRES.DESCRIPTION,
  })
  @ApiBadRequestResponse({ description: LOGIN_RESOURCES.API_BAD_REQRES.DESCRIPTION })
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
   return this.authService.login(body);
  }

  @Post('register')
  @ApiOperation({ 
    summary: REGISTER_RESOURCES.API_OPERATION.SUMMARY,
    description: REGISTER_RESOURCES.API_OPERATION.DESCRIPTION,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    type: RegisterResponseDto,
    description: REGISTER_RESOURCES.API_OKRES.DESCRIPTION,
  })
  @ApiBadRequestResponse({ description: REGISTER_RESOURCES.API_BAD_REQRES.DESCRIPTION })
  @UseInterceptors(new UploadFileInterceptor('profile', 'profiles'))
  async register(
    @Body() body: RegisterRequestDto, 
    @UploadedFile() profile: Express.Multer.File,
  ): Promise<RegisterResponseDto> {
    return this.authService.register(body, profile);
  }

  @Post('forgot-password')
  @ApiOperation({ 
    summary: FORGOT_PASSWORD_RESOURCES.API_OPERATION.SUMMARY,
    description: FORGOT_PASSWORD_RESOURCES.API_OPERATION.DESCRIPTION,
  })
  @ApiOkResponse({
      type: ForgotPasswordResponseDto,
      description: FORGOT_PASSWORD_RESOURCES.API_OKRES.DESCRIPTION,
  })
  @ApiBadRequestResponse({ description: FORGOT_PASSWORD_RESOURCES.API_BAD_REQRES.DESCRIPTION })
  async forgotPassword(@Body() body: ForgotPasswordRequestDto): Promise<ForgotPasswordResponseDto> {
    return this.authService.forgotPassword(body);
  }
  
  @Post('reset-password/:resetToken')
  @ApiOperation({
    summary: RESET_PASSWORD_RESOURCES.API_OPERATION.SUMMARY,
    description: RESET_PASSWORD_RESOURCES.API_OPERATION.DESCRIPTION,
  })
  @ApiOkResponse({
    type: ResetPasswordResponseDto,
    description: RESET_PASSWORD_RESOURCES.API_OKRES.DESCRIPTION,
  })
  @ApiBadRequestResponse({ description: RESET_PASSWORD_RESOURCES.API_BAD_REQRES.DESCRIPTION })
  async resetPassword(
    @Param('resetToken') resetToken: string,
    @Body() body: ResetPasswordRequestDto,
  ): Promise<ResetPasswordResponseDto> {
    return this.authService.resetPassword(resetToken, body);
  }

  @Get('current-staff') 
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: CURRENT_STAFF_RESOURCES.API_OPERATION.SUMMARY,
    description: CURRENT_STAFF_RESOURCES.API_OPERATION.DESCRIPTION,
  })
  @ApiOkResponse({ 
    type: CurrentStaffResponseDto,
    description: CURRENT_STAFF_RESOURCES.API_OKRES.DESCRIPTION,
  })
  @ApiBadRequestResponse({ description: CURRENT_STAFF_RESOURCES.API_BAD_REQRES.DESCRIPTION })
  async currentStaff(@CurrentStaff() staff: PayloadT): Promise<CurrentStaffResponseDto>  {
      return new CurrentStaffResponseDto(staff);
  }
}
