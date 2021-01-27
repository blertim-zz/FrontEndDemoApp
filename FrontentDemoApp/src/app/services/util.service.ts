import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
    public guid(): string {
      // tslint:disable-next-line: no-bitwise
      const hash = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

      return (hash + hash + '-' + hash + '-4' + hash.substr(0, 3) + '-' + hash + '-'
              + hash + hash + hash).toLowerCase();
    }
}

