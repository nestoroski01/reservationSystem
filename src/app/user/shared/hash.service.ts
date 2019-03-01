import { Injectable } from '@angular/core';
import * as shajs from 'sha.js';

@Injectable()

export class HashService {

  constructor() { }

  hashTheString(plainText: string): String {
    return shajs('sha256').update(plainText).digest('hex');
  }
}
