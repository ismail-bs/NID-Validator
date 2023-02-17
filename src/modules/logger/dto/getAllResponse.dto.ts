import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsString, IsEmail } from 'class-validator';
import { LoggerResponsesQueryExtendData, PaginationQuery } from 'src/entity';

export class ResponsesQueryExtendDataDto
  implements LoggerResponsesQueryExtendData
{
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  url?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;
}

export class GetAllResponsesQueryDto
  extends ResponsesQueryExtendDataDto
  implements PaginationQuery
{
  @ApiProperty({ required: false, type: Number })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  offset?: number;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}
