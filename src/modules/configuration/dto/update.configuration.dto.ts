import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { ConfigurationThreshold } from 'src/entity';

export class UpdateConfigurationThresholdRequestDto
  implements ConfigurationThreshold
{
  @ApiProperty({ required: false, type: Number })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  name_bangla: number;

  @ApiProperty({ required: false, type: Number })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  name_english: number;

  @ApiProperty({ required: false, type: Number })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  image: number;

  @ApiProperty({ required: false, type: Number })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  signature: number;

  @ApiProperty({ required: false, type: Number })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  fathers_name: number;

  @ApiProperty({ required: false, type: Number })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  mothers_name: number;

  @ApiProperty({ required: false, type: Number })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  DOB: number;

  @ApiProperty({ required: false, type: Number })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  NID_NO: number;

  @ApiProperty({ required: false, type: Number })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  address: number;
}
