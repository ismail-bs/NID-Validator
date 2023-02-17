import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { loggerConfig } from 'config/logger';
import { Request, Response, NextFunction } from 'express';
import { LoggerLevel, LoggerResponse, User } from 'src/entity';
import { LoggerHelper } from 'src/modules/logger/helper/logger.helper';
import { LoggerRepository } from 'src/modules/logger/repository/logger.repository';
const excludePaths = [
  '/api/admin-auth/',
  '/api/auth/reset-password/',
  '/api/logger/',
  '/api/change-password',
];

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl, connection } = req;
    const { remoteAddress } = connection;
    const userAgent = req.get('user-agent') || '';
    const origin = req.get('origin') || '';
    // If any error occurs, then add true to res.header in the exception filter file.
    // Path -> '/src/internal/exception/all-exception-filter.ts'
    (res as any).header.error = false;
    let responseBody = null;

    // Obtain the body of the response.
    const send = res.send;
    res.send = (body) => {
      responseBody = body;
      res.send = send;
      return res.send(body);
    };

    res.on('finish', () => {
      const { statusCode } = res;
      const user: User = req.user as any;
      let pathExcludeError = false;

      // Verify that the exclusion paths are present in the original URL.
      for (let i = 0, len = excludePaths.length; i < len; i++) {
        if (excludePaths[i] !== '' && originalUrl.startsWith(excludePaths[i])) {
          pathExcludeError = true;
          break;
        }
      }

      // If the env value is true and pathExcludeError is false, then insert it into the database.
      if (loggerConfig.insertDB && !pathExcludeError) {
        const data: LoggerResponse = {
          url: `${origin}${originalUrl}`,
          method,
          userAgent,
          // ip: LoggerHelper.IP6to4(ip || remoteAddress), //? need to uncomment later.
          ip: ip || remoteAddress,
          email: user ? user.email : null,
          requestBody: JSON.stringify(req.body),
          statusCode,
          response: responseBody,
          isError: (res as any).header?.error ? true : false,
          level:
            originalUrl?.startsWith('/api/nid') && method === 'POST'
              ? LoggerLevel.NID_VERIFY
              : null,
        };

        // Add data to the database.
        LoggerRepository.addResponse(data);
      }

      // Getting the request log
      this.logger.log(
        `${method} ${origin}${originalUrl} ${
          req.statusCode || 0
        } - ${userAgent} ${ip} - ${user ? user.email : null}`,
      );

      // Getting the response log
      const loggerResponseMessage = `${method} ${origin}${originalUrl} ${statusCode} - ${userAgent} ${ip} - ${
        user ? user.email : null
      }`;
      (res as any).header?.error
        ? this.logger.error(loggerResponseMessage)
        : this.logger.log(loggerResponseMessage);
    });

    next();
  }
}
