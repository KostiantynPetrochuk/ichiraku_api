import { randomBytes } from 'node:crypto';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { LoggerService } from './logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new LoggerService(LoggerMiddleware.name);
  use(req: FastifyRequest['raw'], rep: FastifyReply['raw'], next: () => void) {
    const requestId = randomBytes(8).toString('hex');
    const startTime = new Date();

    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      if (body) {
        this.logger.req(
          {
            reqId: requestId,
            method: req.method,
            url: req.url,
            headers: { ...req.headers, authorization: '[Redacted]' },
            msg: 'incoming request',
            body: JSON.parse(body),
          },
          LoggerMiddleware.name,
        );
      }
    });

    rep.on('finish', () => {
      const endTime = new Date();
      const responseTime = endTime.getTime() - startTime.getTime();
      this.logger.res(
        {
          reqId: requestId,
          statusCode: rep.statusCode,
          responseTime,
          msg: 'request completed',
        },
        LoggerMiddleware.name,
      );
    });

    next();
  }
}
