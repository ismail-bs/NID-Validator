import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Role, User } from 'src/entity';
import { NIDService } from './nid.service';
import { RolesGuard } from 'src/authentication/guards/auth.guard';
import { ApiFileFields } from 'src/decorators/file.decorator';
import { User as UserInfo } from 'src/decorators/auth.decorator';
import { GetAllResultsQueryDto } from './dto';
import { ParseFile } from './helper/parse-file.pipe';

@ApiTags('NID Validator API (User)')
@Controller('nid')
@UseGuards(new RolesGuard([Role.USER]))
@ApiBearerAuth()
export class NIDController {
  constructor(private nidService: NIDService) {}

  @Post('/verify')
  @ApiFileFields([
    {
      name: 'front',
      maxCount: 1,
      required: true,
    },
    {
      name: 'back',
      maxCount: 1,
      required: true,
    },
  ])
  @ApiOperation({
    summary: 'Verify NID.',
    description: `Please provide your NID's font and backside.`,
  })
  async uploadAndVerifyNID(
    @UploadedFiles(ParseFile) files: Array<Express.Multer.File>,
  ) {
    return await this.nidService.uploadAndVerifyNID(files);
  }

  @Get('/results')
  @ApiOperation({ summary: 'Get all past verify-NID responses.' })
  async getAllResults(
    @UserInfo() user: User,
    @Query() query: GetAllResultsQueryDto,
  ) {
    return await this.nidService.getAllResults(user.email, query);
  }
}
