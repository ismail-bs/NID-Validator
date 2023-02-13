import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { loggerConfig } from 'config/logger';
import { Request, Response, NextFunction } from 'express';
import { MiddlewareResponse, Role, User } from 'src/entity';
import { MiddlewareResponseDatabaseHelper } from './database';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl, connection } = req;
    const { remoteAddress } = connection;
    const userAgent = req.get('user-agent') || '';
    const origin = req.get('origin') || '';
    (res as any).header.error = false; // If any error occurs, then add true to res.header in the exception filter file. path -> '/src/internal/exception/all-exception-filter.ts'
    let responseBody = null;

    // get the response body.
    const send = res.send;
    res.send = (body) => {
      responseBody = body;
      res.send = send;
      return res.send(body);
    };

    res.on('finish', () => {
      const { statusCode } = res;
      const user: User = req.user as any;

      // add into db if the env value is true
      if (loggerConfig.insertDB) {
        const data: MiddlewareResponse = {
          url: `${origin}${originalUrl}`,
          method,
          userAgent,
          // ip: MiddlewareResponseDatabaseHelper.IP6to4(ip || remoteAddress), //? need to uncomment later.
          ip: ip || remoteAddress,
          email: user ? user.email : null,
          requestBody: JSON.stringify(req.body),
          statusCode,
          response: responseBody,
          isError: (res as any).header?.error ? true : false,
        };

        // Check if the user is not a super admin. If the condition is met, add it to the database.
        !(user && user.role === Role.SUPER_ADMIN) &&
          MiddlewareResponseDatabaseHelper.addResponse(data);
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
