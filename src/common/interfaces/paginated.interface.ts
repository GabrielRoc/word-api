/**
 * @description Interface for paginated data
 */
export interface IPaginated<T> {
  results: T[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
