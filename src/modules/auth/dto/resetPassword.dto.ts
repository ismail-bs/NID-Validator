import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { AuthErrorMessages, ResetPasswordRequest, Token } from 'src/entity';

export class ResetPasswordRequestParamsDto implements Token {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(40, {
    message: AuthErrorMessages.INVALID_TOKEN,
  })
  @MaxLength(40, {
    message: AuthErrorMessages.INVALID_TOKEN,
  })
  token: string;
}

export class ResetPasswordRequestDto implements ResetPasswordRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'Weak Password. Needs to be more than $constraint1 characters',
  })
  password: string;
}
