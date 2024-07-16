import {
  BaseEntity,
  DataSource,
  DeepPartial,
  EntityTarget,
  FindManyOptions,
  Repository,
} from 'typeorm';
import { IBaseRepository } from '../interfaces/base.repository.interface';

export abstract class BaseRepository<T extends BaseEntity>
  implements IBaseRepository<T>
{
  protected repository: Repository<T>;

  constructor(entity: EntityTarget<T>, datasource: DataSource) {
    this.repository = datasource.getRepository(entity);
  }

  create(item: DeepPartial<T>): T {
    return this.repository.create(item);
  }

  async find(options: {
    relations?: string[];
    where?: any;
    order?: { [P in keyof T]?: 'ASC' | 'DESC' };
    skip?: number;
    take?: number;
  }): Promise<T[]> {
    const items = await this.repository.find(options as FindManyOptions<T>);
    return items;
  }

  async findOne(options: {
    relations?: string[];
    where?: any;
  }): Promise<T | null> {
    return await this.repository.findOne(options);
  }

  async count(options: { where?: any }): Promise<number> {
    return await this.repository.count(options);
  }

  async save(item: T | T[]): Promise<T | T[]> {
    if (Array.isArray(item)) {
      return await this.repository.save(item);
    }
    return await this.repository.save(item);
  }

  async saveWithTransactions(
    item: T | T[],
    transactionManager: any,
  ): Promise<T | T[]> {
    if (Array.isArray(item)) {
      return await transactionManager.save(item);
    }
    return await transactionManager.save(item);
  }
}
