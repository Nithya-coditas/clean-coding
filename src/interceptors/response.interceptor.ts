import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseBodyDto } from '../utility/response.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response: ResponseBodyDto = {
          statusCode: context.switchToHttp().getResponse().statusCode,
        };
        typeof data === 'string'
          ? (response.message = data)
          : (response.data = data);
        return response;
      }),
    );
  }
}
