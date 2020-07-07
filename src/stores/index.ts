import CacheService from '../services/CacheService';
import AppStore from './AppStore';
import ServicesStore from './ServicesStore';
import TypesStore from './TypesStore';
import IconsStore from './IconsStore';

const appStore = new AppStore();
const cacheService = new CacheService(appStore);
const servicesStore = new ServicesStore(cacheService);
appStore.services = servicesStore;
const typesStore = new TypesStore(cacheService);
const iconsStore = new IconsStore(cacheService);

const stores = {
  appStore,
  typesStore,
  iconsStore,
};

export default stores;
