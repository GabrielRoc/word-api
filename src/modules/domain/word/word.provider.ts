import { LanguagesEnum } from '@/common';
import { HttpService } from '@nestjs/axios';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class WordProvider {
  baseUrl: string;

  constructor(
    @Inject(HttpService) private readonly httpService: HttpService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('wordProvider.url')!;
  }

  async getWord(word: string, language: LanguagesEnum) {
    const { data } = await firstValueFrom(
      this.httpService
        .get<any>(`${this.baseUrl}/entries/${language}/${word}`, {
          params: { language, word },
        })
        .pipe(
          catchError((error) => {
            throw new InternalServerErrorException(error);
          }),
        ),
    );

    return data;
  }

  async downloadEnDataset() {
    const { data } = await firstValueFrom(
      this.httpService
        .get<any>(
          'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json',
        )
        .pipe(
          catchError((error) => {
            throw new InternalServerErrorException(error);
          }),
        ),
    );

    return data;
  }
}
