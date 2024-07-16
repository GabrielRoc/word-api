import {
  PaginatedDto,
  PaginationQueryDto,
  paginationQuerySchema,
  UserId,
  VinculatedWordDto,
  ZodValidationPipe,
} from '@/common';
import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UUID } from 'crypto';
import { WordService } from '../../domain/word/word.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MeDto } from './dtos/me.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(WordService) private readonly wordService: WordService,
  ) {}

  @Get('user/me')
  @ApiOperation({ summary: 'Get me' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return user',
    type: MeDto,
  })
  async getMe(@UserId() userId: UUID) {
    return await this.userService.getUser(userId);
  }

  @Get('user/me/history')
  @ApiOperation({ summary: 'Get history' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return history',
    type: PaginatedDto<VinculatedWordDto>,
  })
  async getHistory(
    @UserId() userId: UUID,
    @Query(new ZodValidationPipe(paginationQuerySchema))
    paginationQueryDto: PaginationQueryDto,
  ) {
    return await this.wordService.getHistory(userId, paginationQueryDto);
  }

  @Get('user/me/favorites')
  @ApiOperation({ summary: 'Get favorites' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return favorites',
    type: PaginatedDto<VinculatedWordDto>,
  })
  async getFavorites(
    @UserId() userId: UUID,
    @Query(new ZodValidationPipe(paginationQuerySchema))
    paginationQueryDto: PaginationQueryDto,
  ) {
    return await this.wordService.getFavorites(userId, paginationQueryDto);
  }
}
