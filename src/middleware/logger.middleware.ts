import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/entity';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
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

      const data = {
        url: `${origin}${originalUrl}`,
        method,
        userAgent,
        ip: IP6to4(ip),
        email: user.email,
        requestBody: JSON.stringify(req.body),
        statusCode,
        response: responseBody,
        userEmail: user.email,
      };
      console.log({ data });

      // add into db if the env value is true
      // TODO

      // Getting the request log
      this.logger.log(
        `${method} ${origin}${originalUrl} ${
          req.statusCode || 0
        } - ${userAgent} ${ip} - ${user.email}`,
      );

      // Getting the response log
      if ((res as any).header?.error) {
        this.logger.error(
          `${method} ${origin}${originalUrl} ${statusCode} - ${userAgent} ${ip} - ${user.email}`,
        );
      } else {
        this.logger.log(
          `${method} ${origin}${originalUrl} ${statusCode} - ${userAgent} ${ip} - ${user.email}`,
        );
      }
    });

    next();
  }
}

/* Convert IPv6 address to IPv4 address */
function IP6to4(ip6: string) {
  function parseIp6(ip6str: { toString: () => any }) {
    const str = ip6str.toString();

    // Initialize
    const ar = [];
    for (let i = 0; i < 8; i++) ar[i] = 0;

    // Check for trivial IPs
    if (str == '::') return ar;

    // Parse
    const sar = str.split(':');
    let slen = sar.length;
    if (slen > 8) slen = 8;
    let j = 0;
    let i = 0;
    for (i = 0; i < slen; i++) {
      // This is a "::", switch to end-run mode
      if (i && sar[i] == '') {
        j = 9 - slen + i;
        continue;
      }
      ar[j] = parseInt(`0x0${sar[i]}`);
      j++;
    }

    return ar;
  }

  const ip6parsed = parseIp6(ip6);
  const ip4 = `${ip6parsed[6] >> 8}.${ip6parsed[6] & 0xff}.${
    ip6parsed[7] >> 8
  }.${ip6parsed[7] & 0xff}`;
  return ip4;
}
