import { UserEntity } from '../../user';

export interface IToken {
  token: string;
  user: UserEntity;
}
