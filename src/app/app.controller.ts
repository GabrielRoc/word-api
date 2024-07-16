import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get Hello' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return Hello',
    content: { 'text/plain': { schema: { type: 'string' } } },
    example: 'English Dictionary',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
