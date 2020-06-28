import CacheService from '../services/CacheService';

class ServicesStore {
  cache: CacheService;

  constructor(cache: CacheService) {
    this.cache = cache;
  }
}

export default ServicesStore;
