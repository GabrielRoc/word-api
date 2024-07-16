import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from '../../../infrastructure';
import { WordEntity } from './word.entity';

/**
 * @description Entity that represents a word that has been favorited by a user.
 */
@Entity('favorited_word')
@Unique(['word', 'user'])
export class FavoritedWordEntity extends BaseEntity {
  @PrimaryColumn()
  wordId: string;

  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => WordEntity, (word) => word.favoritedBy)
  @JoinColumn({ name: 'wordId' })
  word: WordEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @CreateDateColumn()
  added: Date;
}
