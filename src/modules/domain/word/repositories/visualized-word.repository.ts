import { BaseRepository, PaginationQuerySchema } from '@/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { VisualizedWordEntity } from '..';
import { UserEntity } from '../../../infrastructure';

@Injectable()
export class VisualizedWordRepository extends BaseRepository<VisualizedWordEntity> {
  constructor(@InjectDataSource() datasource: DataSource) {
    super(VisualizedWordEntity, datasource);
  }

  getHistory(userId: string, options: PaginationQuerySchema) {
    return this.repository.findAndCount({
      where: { user: { id: userId } as UserEntity },
      order: { added: 'DESC' },
      take: options.limit,
      skip: (options.page - 1) * options.limit,
    });
  }
}
