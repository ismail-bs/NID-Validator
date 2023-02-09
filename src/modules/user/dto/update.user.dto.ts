import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateUserRequest } from 'src/entity';

export class UpdateUserRequestDto implements UpdateUserRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
