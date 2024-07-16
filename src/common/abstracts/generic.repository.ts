import { DataSource, EntityTarget } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { GenericEntity } from '../abstracts';
import { IGenericRepository } from '../interfaces';
import { BaseRepository } from './base.repository';

export abstract class GenericRepository<T extends GenericEntity>
  extends BaseRepository<T>
  implements IGenericRepository<T>
{
  constructor(entity: EntityTarget<T>, datasource: DataSource) {
    super(entity, datasource);
  }

  async findOneById(
    id: T['id'],
    options?: { relations?: string[] },
  ): Promise<T | null> {
    return this.repository.findOne({
      where: { id: id as any },
      relations: options?.relations,
    });
  }

  async update(id: T['id'], item: QueryDeepPartialEntity<T>): Promise<void> {
    this.repository.update(id, item);
  }

  async updateWithTransactions(
    id: T['id'],
    item: QueryDeepPartialEntity<T>,
    transactionManager: any,
  ): Promise<void> {
    await transactionManager.update(id, item);
  }

  async delete(id: T['id']): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteWithTransactions(
    id: T['id'],
    transactionManager: any,
  ): Promise<void> {
    await transactionManager.delete(id);
  }

  async softDelete(id: T['id']): Promise<void> {
    await this.repository.softDelete(id);
  }

  async softDeleteWithTransactions(
    id: T['id'],
    transactionManager: any,
  ): Promise<void> {
    await transactionManager.softDelete(id);
  }
}
