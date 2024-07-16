import { BaseRepository, PaginationQuerySchema } from '@/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { FavoritedWordEntity } from '..';
import { UserEntity } from '../../../infrastructure';

@Injectable()
export class FavoritedWordRepository extends BaseRepository<FavoritedWordEntity> {
  constructor(@InjectDataSource() datasource: DataSource) {
    super(FavoritedWordEntity, datasource);
  }

  getFavorites(userId: string, options: PaginationQuerySchema) {
    return this.repository.findAndCount({
      where: { user: { id: userId } as UserEntity },
      order: { added: 'DESC' },
      take: options.limit,
      skip: (options.page - 1) * options.limit,
    });
  }

  async removeFavorite(favoritedWordEntity: FavoritedWordEntity) {
    return this.repository.remove(favoritedWordEntity);
  }
}
