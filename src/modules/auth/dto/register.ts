import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { RegisterRequest } from 'src/entity';

export class RegisterRequestDto implements RegisterRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'Weak Password. Needs to be more than $constraint1 characters',
  })
  password: string;
}
