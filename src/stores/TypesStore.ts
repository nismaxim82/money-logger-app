import { Theme } from '@material-ui/core';
import { action, observable } from 'mobx';
import TypeEntry from '../models/entries/TypeEntry';
import CacheService from '../services/CacheService';
import Helpers from '../utility/Helpers';

class TypesStore {
  @observable types!: TypeEntry[];
  @observable typesLoaded = false;
  @observable typeToSave?: TypeEntry;

  private cacheService: CacheService;

  constructor(cacheService: CacheService) {
    this.cacheService = cacheService;
    const loadTypes = async () => {
      await this.loadTypes();
    };
    loadTypes();
  }

  @action getTypeToSaveByName = (name: string) => {
    this.typeToSave = {
      ...(this.getTypeByName(name) || new TypeEntry()),
    };
  };

  getTypeByName = (name: string) => {
    return this.types.find((t) => t.name === name);
  };

  @action updateTypeToSaveByProp = (prop: string, newValue: any) => {
    Helpers.setObjectValueByProp(this.typeToSave, prop, newValue);
  };

  validateTypeToSave = () => {
    let valid = true;
    if (!this.typeToSave?.name) {
      valid = false;
    } else if (!this.typeToSave.label) {
      valid = false;
    } else if (!this.typeToSave.position) {
      valid = false;
    }
    return valid;
  };

  private getSortedTypes = () => {
    return this.types.sort((a, b) => {
      if (a.position > b.position) {
        return 1;
      }
      if (a.position < b.position) {
        return -1;
      }
      return 0;
    });
  };

  @action saveType = async (typeId: string) => {
    const editType = this.types.find((t) => t.name === typeId);
    if (editType) {
      if (editType.system && editType.label !== this.typeToSave!.label) {
        this.typeToSave!.system = false;
      }
      Object.keys(editType).forEach((k) => {
        const v = Helpers.getObjectValueByProp(this.typeToSave, k);
        Helpers.setObjectValueByProp(editType, k, v);
      });
    } else {
      this.types.push(this.typeToSave!);
    }
    this.types = this.getSortedTypes();
    await this.cacheService.add('allTypes', this.types);
  };

  @action deleteType = async (typeId: string) => {
    const type = this.types.find((t) => t.name === typeId);
    if (type) {
      const typeIndex = this.types.indexOf(type);
      if (typeIndex > -1) {
        this.types.splice(typeIndex, 1);
        await this.cacheService.add('allTypes', this.types);
      }
    }
  };

  getColorInHex = (theme: Theme, color?: string) => {
    if (color) {
      if (color.indexOf('#') === 0) {
        return color;
      }
      return Helpers.getObjectValueByProp(theme, color);
    }
    return '';
  };

  @action loadTypes = async () => {
    this.types = [];

    const language = await this.cacheService.get<String>('language', String);
    const translate: any = Helpers.getTranslateByLanguage(language);

    this.typesLoaded = false;
    const types = await this.cacheService.get<TypeEntry>(
      'allTypes',
      TypeEntry,
      true
    );
    if (types) {
      this.types = types;
    } else {
      this.types.push({
        name: 'MenuFood',
        position: 1,
        iconColor: 'palette.secondary.dark',
        icon: 'fastfood',
        system: true,
      });

      this.types.push({
        name: 'MenuStore',
        position: 2,
        iconColor: 'palette.success.dark',
        icon: 'local_grocery_store',
        system: true,
      });

      this.types.push({
        name: 'MenuBus',
        position: 3,
        iconColor: 'palette.warning.dark',
        icon: 'directions_bus',
        system: true,
      });

      this.types.push({
        name: 'MenuClothes',
        position: 4,
        iconColor: 'palette.primary.dark',
        icon: 'local_mall',
        system: true,
      });

      this.types.push({
        name: 'MenuGasStation',
        position: 5,
        iconColor: 'palette.primary.light',
        icon: 'local_gas_station',
        system: true,
      });

      this.types.push({
        name: 'MenuChilds',
        position: 6,
        iconColor: 'palette.warning.light',
        icon: 'child_friendly',
        system: true,
      });

      this.types.push({
        name: 'MenuServices',
        position: 7,
        iconColor: 'palette.secondary.light',
        icon: 'important_devices',
        system: true,
      });

      this.types.push({
        name: 'MenuOther',
        position: 8,
        iconColor: 'palette.success.light',
        icon: 'more_vert',
        system: true,
      });

      this.types = this.getSortedTypes();
      this.cacheService.add('allTypes', this.types);
    }
    this.types.forEach((t: TypeEntry) => {
      if (t.system) {
        // eslint-disable-next-line no-param-reassign
        t.label = translate[t.name];
      }
    });
    this.typesLoaded = true;
  };
}

export default TypesStore;
