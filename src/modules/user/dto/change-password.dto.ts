import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ChangePasswordRequest } from 'src/entity';

export class ChangePasswordRequestDto implements ChangePasswordRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  currentPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  newPassword: string;
}
