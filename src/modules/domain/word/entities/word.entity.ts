import { GenericEntity, LanguagesEnum } from '@/common';
import { Column, Entity, Index, OneToMany, Unique } from 'typeorm';
import { FavoritedWordEntity } from './favorited-word.entity';
import { VisualizedWordEntity } from './visualized-word.entity';

/**
 * @description Entity that represents a word.
 */
@Entity('word')
@Unique(['word', 'language'])
@Index(['word', 'language'], { unique: true })
export class WordEntity extends GenericEntity {
  @Column()
  word: string;

  @Column({
    enum: LanguagesEnum,
  })
  language: string;

  @OneToMany(() => FavoritedWordEntity, (favoriteWord) => favoriteWord.word)
  favoritedBy: FavoritedWordEntity[];

  @OneToMany(
    () => VisualizedWordEntity,
    (visualizedWord) => visualizedWord.word,
  )
  visualizedBy: VisualizedWordEntity[];
}
