import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entities';

export class MeDto implements Pick<UserEntity, 'name' | 'email'> {
  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
  })
  name: string;

  @ApiProperty({
    example: 'john.doe@email.com',
    description: 'User email',
  })
  email: string;

  constructor(user: UserEntity) {
    this.name = user.name;
    this.email = user.email;
  }
}
