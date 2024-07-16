import { ApiProperty } from '@nestjs/swagger';

export class VinculatedWordDto {
  @ApiProperty({
    example: 'word',
    description: 'Word',
  })
  word: string;

  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
    description: 'Date the word was added',
  })
  added: Date;

  constructor(word: string, added: Date) {
    this.word = word;
    this.added = added;
  }
}
