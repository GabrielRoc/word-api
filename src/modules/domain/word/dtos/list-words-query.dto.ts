import { PaginationQueryDto } from '@/common';
import { ApiProperty } from '@nestjs/swagger';
import { ListWordsQuerySchema } from '../schemas/list-words-query.schema';

export class ListWordsQueryDto
  extends PaginationQueryDto
  implements Readonly<ListWordsQuerySchema>
{
  @ApiProperty({
    example: 'wor',
    description: 'Word to search',
  })
  search: string;
}
