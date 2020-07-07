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
    this.initializeDefaultTypes();
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

  private initializeDefaultTypes = () => {
    this.types = [];

    this.cacheService
      .get<TypeEntry[]>('allTypes')
      .then((types: TypeEntry[]) => {
        if (types) {
          this.types = types;
        } else {
          this.types.push({
            name: 'menuFood',
            label: 'Еда',
            position: 1,
            iconColor: 'palette.secondary.dark',
            icon: 'fastfood',
          });

          this.types.push({
            name: 'menuStore',
            label: 'Магазин',
            position: 2,
            iconColor: 'palette.success.dark',
            icon: 'local_grocery_store',
          });

          this.types.push({
            name: 'menuBus',
            label: 'Автобус',
            position: 3,
            iconColor: 'palette.warning.dark',
            icon: 'directions_bus',
          });

          this.types.push({
            name: 'menuClothes',
            label: 'Вещи',
            position: 4,
            iconColor: 'palette.primary.dark',
            icon: 'local_mall',
          });

          this.types.push({
            name: 'menuGasStation',
            label: 'Заправка',
            position: 5,
            iconColor: 'palette.primary.light',
            icon: 'local_gas_station',
          });

          this.types.push({
            name: 'menuChilds',
            label: 'Дети',
            position: 6,
            iconColor: 'palette.warning.light',
            icon: 'child_friendly',
          });

          this.types.push({
            name: 'menuServices',
            label: 'Услуги',
            position: 7,
            iconColor: 'palette.secondary.light',
            icon: 'important_devices',
          });

          this.types.push({
            name: 'menuOther',
            label: 'Другое',
            position: 8,
            iconColor: 'palette.success.light',
            icon: 'more_vert',
          });

          this.types = this.getSortedTypes();
          this.cacheService.add('allTypes', this.types);
        }
        this.typesLoaded = true;
      });
  };
}

export default TypesStore;
