import CacheService from '../services/CacheService';
import AppStore from './AppStore';
import ServicesStore from './ServicesStore';
import TypesStore from './TypesStore';

const appStore = new AppStore();
const cacheService = new CacheService(appStore);
const servicesStore = new ServicesStore(cacheService);
appStore.services = servicesStore;
const typesStore = new TypesStore();

const stores = {
  appStore,
  typesStore,
};

export default stores;
