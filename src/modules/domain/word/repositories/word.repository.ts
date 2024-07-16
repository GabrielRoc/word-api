import { GenericRepository, LanguagesEnum } from '@/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, ILike } from 'typeorm';
import { WordEntity } from '..';
import { ListWordsQueryDto } from '../dtos/list-words-query.dto';

@Injectable()
export class WordRepository extends GenericRepository<WordEntity> {
  constructor(@InjectDataSource() datasource: DataSource) {
    super(WordEntity, datasource);
  }

  async list(
    listWordsQueryDto: ListWordsQueryDto,
    language: LanguagesEnum,
  ): Promise<[string[], number]> {
    const where = {
      word: ILike(`%${listWordsQueryDto.search}%`),
      language,
    };

    const results = await this.repository.find({
      where,
      skip: (listWordsQueryDto.page - 1) * listWordsQueryDto.limit,
      take: listWordsQueryDto.limit,
    });
    const count = await this.repository.count({
      where,
    });

    return [results.map((word: WordEntity) => word.word), count];
  }
}
