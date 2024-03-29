import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Role, User } from 'src/entity';
import { User as UserInfo } from 'src/decorators/auth.decorator';
import { UserService } from './user.service';
import {
  ChangePasswordRequestDto,
  GetAllUsersQueryDto,
  UpdateUserRequestDto,
} from './dto';
import { RolesGuard } from 'src/authentication/guards/auth.guard';

@ApiTags('Personal Profile API(Admin/User)')
@Controller()
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/profile')
  @UseGuards(new RolesGuard([Role.ADMIN, Role.USER]))
  @ApiOperation({
    summary: 'Obtain a logged-in user/admin profile information.',
  })
  async getUser(@UserInfo() user: User) {
    return await this.userService.getUser(user._id);
  }

  @Patch('/profile')
  @UseGuards(new RolesGuard([Role.ADMIN, Role.USER]))
  @ApiOperation({ summary: 'Authenticate user/admin profile update.' })
  async updateUserProfile(
    @Body(new ValidationPipe({ whitelist: true })) data: UpdateUserRequestDto,
    @UserInfo() user: User,
  ) {
    return await this.userService.updateUser(user._id, data);
  }

  @Post('/change-password')
  @UseGuards(new RolesGuard([Role.ADMIN, Role.USER]))
  @ApiOperation({ summary: 'Change password of the authenticate user/admin.' })
  async changePassword(
    @Body() data: ChangePasswordRequestDto,
    @UserInfo() user: User,
  ) {
    return await this.userService.changePassword(user._id, data);
  }

  @Get('/users')
  @ApiOperation({ summary: 'Obtain all users profile information by admin.' })
  @UseGuards(new RolesGuard([Role.ADMIN]))
  async getAllUsers(@Query() query: GetAllUsersQueryDto) {
    const { offset, limit } = query;
    return await this.userService.getAllUsers(offset, limit);
  }

  @Get('/admins')
  @ApiOperation({ summary: 'Obtain all admins profile information by admin.' })
  @UseGuards(new RolesGuard([Role.ADMIN]))
  async getAllAdmins(
    @Query() query: GetAllUsersQueryDto,
    @UserInfo() admin: User,
  ) {
    const { offset, limit } = query;
    return await this.userService.getAllAdmins(admin._id, offset, limit);
  }

  @Delete('/users/:userId')
  @ApiOperation({ summary: 'Delete a single user by admin.' })
  @UseGuards(new RolesGuard([Role.ADMIN]))
  async deleteUser(@Param('userId') userId: string) {
    return await this.userService.deleteUser(userId);
  }
}
