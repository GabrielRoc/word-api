import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  ttl: parseInt(process.env.REDIS_TTL || '60', 10),
  user: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
}));
