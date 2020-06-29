import {
  ChildFriendly,
  DirectionsBus,
  Fastfood,
  ImportantDevices,
  LocalGasStation,
  LocalGroceryStore,
  LocalMall,
  MoreVert,
} from '@material-ui/icons';
import { observable } from 'mobx';
import TypeEntry from '../models/entries/TypeEntry';

class TypesStore {
  @observable types!: TypeEntry[];

  constructor() {
    this.initializeDefaultTypes();
  }

  private initializeDefaultTypes = () => {
    this.types = [];

    this.types.push({
      IconComponent: Fastfood,
      name: 'menuFood',
      iconColor: 'palette.secondary.dark',
      label: 'Еда',
    });

    this.types.push({
      IconComponent: LocalGroceryStore,
      name: 'menuStore',
      iconColor: 'palette.success.dark',
      label: 'Магазин',
    });

    this.types.push({
      IconComponent: DirectionsBus,
      name: 'menuBus',
      iconColor: 'palette.warning.dark',
      label: 'Автобус',
    });

    this.types.push({
      IconComponent: LocalMall,
      name: 'menuClothes',
      iconColor: 'palette.primary.dark',
      label: 'Вещи',
    });

    this.types.push({
      IconComponent: LocalGasStation,
      name: 'menuGasStation',
      iconColor: 'palette.primary.light',
      label: 'Заправка',
    });

    this.types.push({
      IconComponent: ChildFriendly,
      name: 'menuChilds',
      iconColor: 'palette.warning.light',
      label: 'Дети',
    });

    this.types.push({
      IconComponent: ImportantDevices,
      name: 'menuServices',
      iconColor: 'palette.secondary.light',
      label: 'Услуги',
    });

    this.types.push({
      IconComponent: MoreVert,
      name: 'menuOther',
      iconColor: 'palette.success.light',
      label: 'Другое',
    });
  };
}

export default TypesStore;
