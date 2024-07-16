import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FavoritedWordEntity,
  VisualizedWordEntity,
  WordEntity,
} from '../../domain';
import { UserEntity } from '../user';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      logging: false,
      entities: [
        FavoritedWordEntity,
        VisualizedWordEntity,
        WordEntity,
        UserEntity,
      ],
      synchronize: true,
    }),
  ],
})
export class DatabaseTestModule {}
