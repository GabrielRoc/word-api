import { ZodValidationPipe } from '@/common';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserLoggedDto } from './dtos/user-logged.dto';
import { UserSigninDto } from './dtos/user-signin.dto';
import { UserSignupDto } from './dtos/user-signup.dto';
import { userSigninSchema } from './schemas/user-signin.schema';
import { userSignupSchema } from './schemas/user-signup.schema';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign up' })
  @ApiBody({ type: UserSignupDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return user and token',
    type: UserLoggedDto,
  })
  async signup(
    @Body(new ZodValidationPipe(userSignupSchema)) userSignupDto: UserSignupDto,
  ) {
    const user = await this.authService.signup(
      userSignupDto.name,
      userSignupDto.email,
      userSignupDto.password,
    );
    const token = await this.authService.signin(user);
    return new UserLoggedDto(user, token.token);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in' })
  @ApiBody({ type: UserSigninDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return user and token',
    type: UserLoggedDto,
  })
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body(new ZodValidationPipe(userSigninSchema)) userSigninDto: UserSigninDto,
  ) {
    const user = await this.authService.validatePassword(
      userSigninDto.email,
      userSigninDto.password,
    );
    const token = await this.authService.signin(user);
    return new UserLoggedDto(user, token.token);
  }
}
