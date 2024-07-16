import { ApiProperty } from '@nestjs/swagger';
import { UserSignupSchema } from '../schemas/user-signup.schema';

export class UserSignupDto implements Readonly<UserSignupSchema> {
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
    example: 'password',
    description: 'User password',
  })
  password: string;
}
