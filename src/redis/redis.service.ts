import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async save<T>(key: string, value: T) {
    await this.cacheManager.set(key, value, { ttl: 60 * 60 });
  }
}
