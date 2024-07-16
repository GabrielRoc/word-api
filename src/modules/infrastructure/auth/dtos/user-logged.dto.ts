import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user';

export class UserLoggedDto {
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

  @ApiProperty({
    example: 'Bearer JWT.token',
    description: 'Bearer token',
  })
  token: string;

  constructor(user: UserEntity, token: string) {
    this.name = user.name;
    this.email = user.email;
    this.token = `Bearer ${token}`;
  }
}
