import { CacheModule, CacheOptions } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import type { RedisClientOptions } from 'redis';
import { ResponseTimeInterceptor } from '../common';
import authConfig from '../config/auth.config';
import databaseConfig from '../config/database.config';
import redisConfig from '../config/redis.config';
import wordProviderConfig from '../config/word-provider.config';
import { DomainModule } from '../modules/domain/domain.module';
import { InfrastructureModule } from '../modules/infrastructure/infrastructure.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, redisConfig, wordProviderConfig, authConfig],
      isGlobal: true,
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<CacheOptions<RedisClientOptions>> => ({
        socket: {
          host: configService.get<string>('redis.host'),
          port: configService.get<number>('redis.port'),
          passphrase: configService.get<string>('redis.passphrase'),
        },
        ttl: configService.get<number>('redis.ttl'),
      }),
      isGlobal: true,
    }),
    InfrastructureModule,
    DomainModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTimeInterceptor,
    },
  ],
})
export class AppModule {}
