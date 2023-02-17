import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerHelper {
  // Parse an IPv6 address to an IPv4 address
  static parseIp6(ip6str: { toString: () => any }) {
    const str = ip6str.toString();
    const arr = [];
    for (let i = 0; i < 8; i++) arr[i] = 0;

    // Check for trivial IPs
    if (str == '::') return arr;

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
      arr[j] = parseInt(`0x0${sar[i]}`);
      j++;
    }
    return arr;
  }

  // Convert IPv6 address to IPv4 address
  static IP6to4(ip6: string) {
    const ip6parsed = this.parseIp6(ip6);
    const ip4 = `${ip6parsed[6] >> 8}.${ip6parsed[6] & 0xff}.${
      ip6parsed[7] >> 8
    }.${ip6parsed[7] & 0xff}`;
    return ip4;
  }
}
