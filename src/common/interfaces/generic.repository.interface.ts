import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { GenericEntity } from '../abstracts';
import { IBaseRepository } from './base.repository.interface';

export interface IGenericRepository<T extends GenericEntity>
  extends IBaseRepository<T> {
  findOneById(
    id: T['id'],
    options?: {
      relations?: string[];
    },
  ): Promise<T | null>;
  update(id: T['id'], item: QueryDeepPartialEntity<T>): Promise<void>;
  updateWithTransactions(
    id: T['id'],
    item: QueryDeepPartialEntity<T>,
    transactionManager: any,
  ): Promise<void>;
  delete(id: T['id']): Promise<void>;
  deleteWithTransactions(id: T['id'], transactionManager: any): Promise<void>;
  softDelete(id: T['id']): Promise<void>;
  softDeleteWithTransactions(
    id: T['id'],
    transactionManager: any,
  ): Promise<void>;
}
