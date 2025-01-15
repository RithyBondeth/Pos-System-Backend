import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { API_TAG_RESOURCE_NAME, LOGIN_RESOURCES, REGISTER_RESOURCES, RESOURCE_NAME } from './auth.constant';
import { ApiBadRequestResponse, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginRequestDto } from './dtos/login-request.dto';
import { LoginResponseDto } from './dtos/login-response.dto';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { UploadFileInterceptor } from '@app/common/uploadfile/uploadfile.interceptor';
import { RegisterResponseDto } from './dtos/register-response.dto';

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
}
