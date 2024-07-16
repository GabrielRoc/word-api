import { generateSalt, GenericEntity, hashPassword } from '@/common';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

/**
 * @description Entity that represents a user.
 */
@Entity('user')
export class UserEntity extends GenericEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  salt: string;

  @Column()
  password: string;

  // @OneToMany(() => FavoritedWordEntity, (favoriteWord) => favoriteWord.user)
  // favoriteWords: FavoritedWordEntity[];

  // @OneToMany(
  //   () => VisualizedWordEntity,
  //   (visualizedWord) => visualizedWord.user,
  // )
  // visualizedWords: VisualizedWordEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.salt = generateSalt();
    this.password = hashPassword(this.password, this.salt);
  }
}
