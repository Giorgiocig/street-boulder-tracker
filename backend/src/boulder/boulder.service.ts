import { Injectable } from '@nestjs/common';

@Injectable()
export class BoulderService {
  constructor() {}
  async insertBoulder(data: any) {
    return data;
  }
}
