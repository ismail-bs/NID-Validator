import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  ForgotPasswordRequestDto,
  LoginRequestDto,
  ResetPasswordRequestDto,
  ResetPasswordRequestParamsDto,
  CreateNewAdminRequestDto,
} from './dto';
import { RegisterRequestDto } from './dto/register';
import { AuthService } from './auth.service';
import { Role } from 'src/entity';
import { RolesGuard } from 'src/authentication/guards/auth.guard';

@ApiTags('Authentication API (Admin/User)')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/user-auth/register')
  @ApiOperation({ summary: 'Register as a user.' })
  async userRegister(@Body() data: RegisterRequestDto) {
    return await this.authService.register(data);
  }

  @Post('/user-auth/login')
  @ApiOperation({ summary: 'Login as a user.' })
  async userLogin(@Body() data: LoginRequestDto) {
    return await this.authService.login(data, Role.USER);
  }

  @Post('/user-auth/forgot-password')
  @ApiOperation({ summary: 'Forgot password' })
  async userForgotPassword(
    @Body() data: ForgotPasswordRequestDto,
    @Req() req: Request,
  ) {
    const url = req.protocol + '://' + req.headers.host;
    return await this.authService.forgotPassword(data.email, url, Role.USER);
  }

  @Post('/admin-auth/create')
  @ApiOperation({ summary: 'Create a new admin by admin.' })
  @ApiBearerAuth()
  @UseGuards(new RolesGuard([Role.ADMIN]))
  async createAdmin(@Body() data: CreateNewAdminRequestDto) {
    return await this.authService.createAdmin(data);
  }

  @Post('/admin-auth/login')
  @ApiOperation({ summary: 'Login as an admin.' })
  async adminLogin(@Body() data: LoginRequestDto) {
    return await this.authService.login(data, Role.ADMIN);
  }

  @Post('/admin-auth/forgot-password')
  @ApiOperation({ summary: 'Forgot password' })
  async adminForgotPassword(
    @Body() data: ForgotPasswordRequestDto,
    @Req() req: Request,
  ) {
    const url = req.protocol + '://' + req.headers.host;
    return await this.authService.forgotPassword(data.email, url, Role.ADMIN);
  }

  @Post('/auth/reset-password/:token')
  @ApiOperation({ summary: 'Reset password (User/Admin)' })
  async resetPassword(
    @Param() param: ResetPasswordRequestParamsDto,
    @Body() data: ResetPasswordRequestDto,
  ) {
    return await this.authService.resetPassword(param.token, data.password);
  }
}
