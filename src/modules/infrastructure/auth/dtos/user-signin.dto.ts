import { ApiProperty } from '@nestjs/swagger';
import { UserSigninSchema } from '../schemas/user-signin.schema';

export class UserSigninDto implements Readonly<UserSigninSchema> {
  @ApiProperty({
    example: 'john.doe@email.com',
    description: 'User email',
  })
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'User password',
  })
  password: string;
}
