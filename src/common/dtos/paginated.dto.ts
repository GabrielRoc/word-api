import { ApiProperty } from '@nestjs/swagger';
import { IPaginated } from '../interfaces';

export class PaginatedDto<T> implements IPaginated<T> {
  @ApiProperty({
    example: [],
    description: 'Results objects',
  })
  results: T[];

  @ApiProperty({
    example: 100,
    description: 'Total documents',
  })
  totalDocs: number;

  @ApiProperty({
    example: 1,
    description: 'Current page',
  })
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Total pages',
  })
  totalPages: number;

  @ApiProperty({
    example: true,
    description: 'Has next page',
  })
  hasNext: boolean;

  @ApiProperty({
    example: true,
    description: 'Has previous page',
  })
  hasPrev: boolean;

  constructor(data: any[], totalDocs: number, page: number, limit: number) {
    this.results = data;
    this.totalDocs = totalDocs;
    this.page = page;
    this.totalPages = Math.ceil(totalDocs / limit);
    this.hasNext = page < this.totalPages;
    this.hasPrev = page > 1;
  }
}
