import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Role } from 'src/entity';
import { MiddlewareResponseService } from './response.service';
import { RolesGuard } from 'src/authentication/guards/auth.guard';

@ApiTags('Middleware Response API')
@Controller('responses')
@ApiBearerAuth()
@UseGuards(new RolesGuard([Role.SUPER_ADMIN, Role.ADMIN]))
export class MiddlewareResponseController {
  constructor(private middlewareResponseService: MiddlewareResponseService) {}

  @Get()
  @ApiOperation({ summary: 'Get all middleware responses.' })
  async getAllMiddlewareResponses() {
    return await this.middlewareResponseService.getAllMiddlewareResponses();
  }
}
