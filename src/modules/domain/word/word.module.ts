import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FavoritedWordEntity,
  VisualizedWordEntity,
  WordEntity,
} from './entities';
import { FavoritedWordRepository } from './repositories/favorited-word.repository';
import { VisualizedWordRepository } from './repositories/visualized-word.repository';
import { WordRepository } from './repositories/word.repository';
import { WordController } from './word.controller';
import { WordProvider } from './word.provider';
import { WordService } from './word.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WordEntity,
      FavoritedWordEntity,
      VisualizedWordEntity,
    ]),
    HttpModule,
    ConfigModule,
  ],
  controllers: [WordController],
  providers: [
    WordService,
    WordRepository,
    WordProvider,
    VisualizedWordRepository,
    FavoritedWordRepository,
  ],
  exports: [WordService],
})
export class WordModule {}
