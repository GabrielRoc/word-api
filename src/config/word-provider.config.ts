import { registerAs } from '@nestjs/config';

export default registerAs('wordProvider', () => ({
  url: process.env.WORD_PROVIDER_URL,
}));
