import CacheService from '../services/CacheService';
import AppStore from './AppStore';
import ServicesStore from './ServicesStore';
import TypesStore from './TypesStore';
import IconsStore from './IconsStore';
import CashStore from './CashStore';
import PropertiesStore from './PropertiesStore';
import TranslatesStore from './TranslatesStore';
import FormatsStore from './FormatsStore';

const appStore = new AppStore();
const cacheService = new CacheService(appStore);
const servicesStore = new ServicesStore(cacheService);
appStore.services = servicesStore;
const cashStore = new CashStore(cacheService);
const typesStore = new TypesStore(cacheService);
const iconsStore = new IconsStore(cacheService);
const formatsStore = new FormatsStore();
const propertiesStore = new PropertiesStore(cacheService, formatsStore);
const translatesStore = new TranslatesStore(cacheService);

const stores = {
  appStore,
  cashStore,
  typesStore,
  iconsStore,
  propertiesStore,
  translatesStore,
  formatsStore,
};

export default stores;
