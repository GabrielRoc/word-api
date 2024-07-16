import { verifyPassword } from '@/common';
import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UUID } from 'crypto';
import { UserEntity } from '../user';
import { UserService } from '../user/user.service';
import { IToken } from './interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async validateUser(id: UUID, email: string): Promise<boolean> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user.id === id;
  }

  async validatePassword(email: string, password: string): Promise<UserEntity> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = verifyPassword(password, user.password, user.salt);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  async signin(user: UserEntity): Promise<IToken> {
    const payload = { email: user.email, name: user.name, sub: user.id };
    const token = this.jwtService.sign(payload);

    return { token, user };
  }

  async signup(
    name: string,
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      throw new ConflictException('User already exists');
    }

    const entity = await this.userService.create(name, email, password);

    return entity;
  }
}
