import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { CreateNewAdminRequest, UserRegisterRequest } from 'src/entity';

export class RegisterRequestDto implements UserRegisterRequest {
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

export class CreateNewAdminRequestDto implements CreateNewAdminRequest {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
