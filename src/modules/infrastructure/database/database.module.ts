import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        logging: configService.get<boolean>('database.logging'),
        uuidExtension: 'pgcrypto',
        autoLoadEntities: true,
        synchronize: configService.get<boolean>('database.synchronize'),
        namingStrategy: new SnakeNamingStrategy(),
        ssl: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
