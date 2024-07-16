import {
  CacheInterceptor,
  LanguagesEnum,
  PaginatedDto,
  UserId,
  ZodValidationPipe,
} from '@/common';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UUID } from 'crypto';
import { object } from 'zod';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { ListWordsQueryDto } from './dtos/list-words-query.dto';
import { listWordsQuerySchema } from './schemas/list-words-query.schema';
import { WordService } from './word.service';

@Controller('entries')
@ApiTags('Entries')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class WordController {
  constructor(@Inject(WordService) private readonly wordService: WordService) {}

  @Get(':language')
  @ApiOperation({ summary: 'List words' })
  @ApiParam({
    name: 'language',
    enum: LanguagesEnum,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return words',
    type: PaginatedDto<string>,
  })
  @UseInterceptors(CacheInterceptor)
  async getEntries(
    @Param('language') language: LanguagesEnum,
    @Query(new ZodValidationPipe(listWordsQuerySchema))
    listWordsQueryDto: ListWordsQueryDto,
  ) {
    return this.wordService.listWords(listWordsQueryDto, language);
  }

  @Get(':language/:word')
  @ApiOperation({ summary: 'Get word' })
  @ApiParam({
    name: 'language',
    enum: LanguagesEnum,
  })
  @ApiParam({
    name: 'word',
    description: 'Word to get',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return word informations',
    type: object,
  })
  @UseInterceptors(CacheInterceptor)
  async getEntry(
    @Param('language') language: LanguagesEnum,
    @Param('word') word: string,
    @UserId() userId: UUID,
  ) {
    return this.wordService.getWordInfo(word, language, userId);
  }

  @Post(':language/:word/favorite')
  @ApiOperation({ summary: 'Favorite word' })
  @ApiParam({
    name: 'language',
    enum: LanguagesEnum,
  })
  @ApiParam({
    name: 'word',
    description: 'Word to favorite',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async favoriteEntry(
    @Param('language') language: LanguagesEnum,
    @Param('word') word: string,
    @UserId() userId: UUID,
  ) {
    await this.wordService.favoriteWord(word, language, userId);
  }

  @Delete(':language/:word/unfavorite')
  @ApiOperation({ summary: 'Unfavorite word' })
  @ApiParam({
    name: 'language',
    enum: LanguagesEnum,
  })
  @ApiParam({
    name: 'word',
    description: 'Word to unfavorite',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async unfavoriteEntry(
    @Param('language') language: LanguagesEnum,
    @Param('word') word: string,
    @UserId() userId: UUID,
  ) {
    await this.wordService.unfavoriteWord(word, language, userId);
  }

  @Post(':language/load-dataset')
  @ApiOperation({ summary: 'Load dataset' })
  @ApiParam({
    name: 'language',
    enum: LanguagesEnum,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async downloadDataset(@Param('language') language: LanguagesEnum) {
    return await this.wordService.loadEnDataset();
  }
}
