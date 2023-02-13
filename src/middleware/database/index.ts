import { MiddlewareResponse } from 'src/entity';
import { MiddlewareResponseModel } from './model';

export class MiddlewareResponseDatabaseHelper {
  static async addResponse(
    response: MiddlewareResponse,
  ): Promise<MiddlewareResponse | null> {
    try {
      return await MiddlewareResponseModel.create(response);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  /* Parse IPv6 address to IPv4 address */
  static parseIp6(ip6str: { toString: () => any }) {
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

  /* Convert IPv6 address to IPv4 address */
  static IP6to4(ip6: string) {
    const ip6parsed = this.parseIp6(ip6);
    const ip4 = `${ip6parsed[6] >> 8}.${ip6parsed[6] & 0xff}.${
      ip6parsed[7] >> 8
    }.${ip6parsed[7] & 0xff}`;
    return ip4;
  }
}
