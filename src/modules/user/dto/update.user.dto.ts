import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { UpdateUserRequest } from 'src/entity';

export class UpdateUserRequestDto implements UpdateUserRequest {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;
}
