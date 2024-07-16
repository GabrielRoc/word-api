import { BaseEntity, DeepPartial } from 'typeorm';

export interface IBaseRepository<T extends BaseEntity> {
  create(item: DeepPartial<T>): T;
  find(options: {
    relations?: string[];
    where?: any;
    order?: { [P in keyof T]?: 'ASC' | 'DESC' };
    skip?: number;
    take?: number;
  }): Promise<T[]>;
  findOne(options: { relations?: string[]; where?: any }): Promise<T | null>;
  count(options: { where?: any }): Promise<number>;
  save(item: T | T[]): Promise<T | T[]>;
  saveWithTransactions(
    item: T | T[],
    transactionManager: any,
  ): Promise<T | T[]>;
}
