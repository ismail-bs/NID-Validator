import { Controller, Post, Req, UploadedFile, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Role } from 'src/entity';
import { NIDService } from './nid.service';
import { RolesGuard } from 'src/authentication/guards/auth.guard';
import { ApiFile } from 'src/decorators/file.decorator';
import { multerOptions } from 'config/multer';

@ApiTags('NID Validator API')
@Controller('nid')
@UseGuards(new RolesGuard([Role.USER]))
@ApiBearerAuth()
export class NIDController {
  constructor(private nidService: NIDService) {}

  @Post('/verify')
  @ApiFile('file', true, multerOptions)
  @ApiOperation({ summary: 'Verify NID' })
  async uploadAndVerifyNID(
    @UploadedFile('file') file: Express.Multer.File,
    @Req() req: Request,
  ) {
    return await this.nidService.uploadAndVerifyNID(file, req);
  }
}