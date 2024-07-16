import {
  IPaginated,
  LanguagesEnum,
  PaginatedDto,
  PaginationQueryDto,
  VinculatedWordDto,
} from '@/common';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { ListWordsQueryDto } from './dtos/list-words-query.dto';
import { FavoritedWordRepository } from './repositories/favorited-word.repository';
import { VisualizedWordRepository } from './repositories/visualized-word.repository';
import { WordRepository } from './repositories/word.repository';
import { WordProvider } from './word.provider';

@Injectable()
export class WordService {
  constructor(
    @Inject(WordRepository) private readonly wordRepository: WordRepository,
    @Inject(VisualizedWordRepository)
    private readonly visualizedWordRepository: VisualizedWordRepository,
    @Inject(FavoritedWordRepository)
    private readonly favoritedWordRepository: FavoritedWordRepository,
    @Inject(WordProvider) private readonly wordProvider: WordProvider,
  ) {}

  async getHistory(
    userId: UUID,
    paginationQueryDto: PaginationQueryDto,
  ): Promise<IPaginated<VinculatedWordDto>> {
    const visualizedWords = await this.visualizedWordRepository.getHistory(
      userId,
      paginationQueryDto,
    );

    const result = new PaginatedDto<VinculatedWordDto>(
      visualizedWords[0].map(
        (visualizedWord) =>
          new VinculatedWordDto(visualizedWord.word.word, visualizedWord.added),
      ),
      visualizedWords[1],
      paginationQueryDto.page,
      paginationQueryDto.limit,
    );

    return result;
  }

  async getFavorites(
    userId: UUID,
    paginationQueryDto: PaginationQueryDto,
  ): Promise<IPaginated<VinculatedWordDto>> {
    const favoritedWords = await this.favoritedWordRepository.getFavorites(
      userId,
      paginationQueryDto,
    );

    const result = new PaginatedDto<VinculatedWordDto>(
      favoritedWords[0].map(
        (favoritedWord) =>
          new VinculatedWordDto(favoritedWord.word.word, favoritedWord.added),
      ),
      favoritedWords[1],
      paginationQueryDto.page,
      paginationQueryDto.limit,
    );

    return result;
  }

  async listWords(
    listWordsQueryDto: ListWordsQueryDto,
    language: LanguagesEnum,
  ): Promise<IPaginated<string>> {
    const words = await this.wordRepository.list(listWordsQueryDto, language);
    const result = new PaginatedDto<string>(
      words[0],
      words[1],
      listWordsQueryDto.page,
      listWordsQueryDto.limit,
    );

    return result;
  }

  async getWordInfo(
    word: string,
    language: LanguagesEnum,
    userId: UUID,
  ): Promise<unknown> {
    const wordEntity = await this.wordRepository.findOne({
      where: { word, language },
    });
    if (!wordEntity) {
      throw new BadRequestException('Word not found');
    }
    const wordData = await this.wordProvider.getWord(word, language);

    const visualizedEntity = this.visualizedWordRepository.create({
      word: wordEntity,
      user: { id: userId },
    });
    await this.visualizedWordRepository.save(visualizedEntity);

    return wordData;
  }

  async favoriteWord(
    word: string,
    language: LanguagesEnum,
    userId: UUID,
  ): Promise<void> {
    const existingFavoritedEntity = await this.favoritedWordRepository.findOne({
      where: { word: { word, language }, user: { id: userId } },
      relations: ['word', 'user'],
    });
    if (existingFavoritedEntity) {
      throw new BadRequestException('Word already favorited');
    }

    const wordEntity = await this.wordRepository.findOne({
      where: { word, language },
    });
    if (!wordEntity) {
      throw new BadRequestException('Word not found');
    }

    const favoritedEntity = this.favoritedWordRepository.create({
      word: wordEntity,
      user: { id: userId },
    });
    await this.favoritedWordRepository.save(favoritedEntity);
  }

  async unfavoriteWord(
    word: string,
    language: LanguagesEnum,
    userId: UUID,
  ): Promise<void> {
    const favoritedEntity = await this.favoritedWordRepository.findOne({
      where: { word: { word, language }, user: { id: userId } },
      relations: ['word', 'user'],
    });

    if (!favoritedEntity) {
      throw new BadRequestException('Word not favorited');
    }

    await this.favoritedWordRepository.removeFavorite(favoritedEntity);
  }

  async loadEnDataset(): Promise<void> {
    const data = await this.wordProvider.downloadEnDataset();
    const words = Object.keys(data);

    const newEntities = words.map((word) =>
      this.wordRepository.create({
        word,
        language: LanguagesEnum.ENGLISH,
      }),
    );

    for (let i = 0; i < newEntities.length; i += 500) {
      await this.wordRepository.save(newEntities.slice(i, i + 500));
    }
  }
}
