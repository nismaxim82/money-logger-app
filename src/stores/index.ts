import CacheService from '../services/CacheService';
import AppStore from './AppStore';
import ServicesStore from './ServicesStore';
import TypesStore from './TypesStore';
import IconsStore from './IconsStore';
import CashStore from './CashStore';

const appStore = new AppStore();
const cacheService = new CacheService(appStore);
const servicesStore = new ServicesStore(cacheService);
appStore.services = servicesStore;
const cashStore = new CashStore(cacheService);
const typesStore = new TypesStore(cacheService);
const iconsStore = new IconsStore(cacheService);

const stores = {
  appStore,
  cashStore,
  typesStore,
  iconsStore,
};

export default stores;
