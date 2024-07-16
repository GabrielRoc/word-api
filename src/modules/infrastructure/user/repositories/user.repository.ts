import { GenericRepository } from '@/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from '../entities';

@Injectable()
export class UserRepository extends GenericRepository<UserEntity> {
  constructor(@InjectDataSource() datasource: DataSource) {
    super(UserEntity, datasource);
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.repository.findOneBy({ email });
  }
}
