import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { MeDto } from './dtos/me.dto';
import { UserEntity } from './entities';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneByEmail(email);
  }

  async create(
    name: string,
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const entity = this.userRepository.create({ name, email, password });
    return (await this.userRepository.save(entity)) as UserEntity;
  }

  async getUser(id: UUID): Promise<MeDto> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new Error('User not found');
    }

    return new MeDto(user);
  }
}
