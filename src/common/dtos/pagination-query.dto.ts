import { ApiProperty } from '@nestjs/swagger';
import { PaginationQuerySchema } from '../schemas';

export class PaginationQueryDto implements Readonly<PaginationQuerySchema> {
  @ApiProperty({
    example: 1,
    description: 'Current page',
  })
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Limit of items',
  })
  limit: number;
}
