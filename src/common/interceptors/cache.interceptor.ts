import { CacheInterceptor as NestCacheInterceptor } from '@nestjs/cache-manager';
import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class CacheInterceptor extends NestCacheInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse();

    return (await super.intercept(context, next)).pipe(
      tap((cachedValue) => {
        if (cachedValue !== undefined) {
          response.setHeader('x-cache', 'HIT');
        } else {
          response.setHeader('x-cache', 'MISS');
        }
      }),
    );
  }
}
