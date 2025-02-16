import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { FastifyRequest, FastifyReply } from 'fastify';
import { LoggerService } from './logger/logger.service';

type Response = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new LoggerService(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const response: Response = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    if (exception instanceof HttpException) {
      response.statusCode = exception.getStatus();
      response.response = exception.getResponse();
    } else {
      response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      response.response = 'Internal Server Error';
    }
    // if (
    //   response.statusCode === HttpStatus.NOT_FOUND &&
    //   !request.url.startsWith('/api')
    // ) {
    //   reply.status(302).header('Location', '/').send();
    //   return;
    // }

    reply.status(response.statusCode).send(response);

    const errorMessage =
      exception instanceof Error ? exception.message : 'Unknown error';

    this.logger.error(
      { type: response.response, error: errorMessage },
      AllExceptionsFilter.name,
    );

    super.catch(exception, host);
  }
}
