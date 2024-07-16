import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from '../../../infrastructure';
import { WordEntity } from './word.entity';

/**
 * @description Entity that represents a word that has been visualized by a user.
 */
@Entity('visualized_word')
export class VisualizedWordEntity extends BaseEntity {
  @PrimaryColumn()
  wordId: string;

  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => WordEntity, (word) => word.visualizedBy)
  @JoinColumn({ name: 'wordId' })
  word: WordEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @CreateDateColumn()
  @PrimaryColumn()
  added: Date;
}
