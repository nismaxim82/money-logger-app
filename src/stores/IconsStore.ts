import * as AllIcons from '@material-ui/icons';
import { action, observable, computed } from 'mobx';
import CacheService from '../services/CacheService';
import { IconTypesEnum } from '../models/Enum';

class IconsStore {
  @observable iconsTypes: Map<IconTypesEnum, string>;
  @observable filledIcons: string[] = [];
  @observable outlinedIcons: string[] = [];
  @observable roundedIcons: string[] = [];
  @observable twoToneIcons: string[] = [];
  @observable sharpIcons: string[] = [];
  @observable iconsOnOnePage = 100;
  @observable foundedIcons: string[] = [];
  @observable foundedTotalCount = 0;

  @computed get pagesCount() {
    return Math.ceil(this.foundedTotalCount / this.iconsOnOnePage);
  }

  private cacheService: CacheService;

  constructor(cacheService: CacheService) {
    this.cacheService = cacheService;

    this.iconsTypes = new Map();
    this.iconsTypes.set(
      IconTypesEnum.Filled,
      IconTypesEnum[IconTypesEnum.Filled]
    );
    this.iconsTypes.set(
      IconTypesEnum.Outlined,
      IconTypesEnum[IconTypesEnum.Outlined]
    );
    this.iconsTypes.set(
      IconTypesEnum.Rounded,
      IconTypesEnum[IconTypesEnum.Rounded]
    );
    this.iconsTypes.set(
      IconTypesEnum.TwoTone,
      IconTypesEnum.TwoTone.toString()
    );
    this.iconsTypes.set(
      IconTypesEnum.Sharp,
      IconTypesEnum[IconTypesEnum.Sharp]
    );

    this.cacheService.get<Object>('allIcons', Object).then((allIcons) => {
      if (!allIcons) {
        Object.keys(AllIcons).forEach((k: string) => {
          if (
            k.indexOf(IconTypesEnum.Outlined) ===
            k.length - IconTypesEnum.Outlined.length
          ) {
            this.outlinedIcons.push(k);
          } else if (
            k.indexOf(IconTypesEnum.Rounded) ===
            k.length - IconTypesEnum.Rounded.length
          ) {
            this.roundedIcons.push(k);
          } else if (
            k.indexOf(IconTypesEnum.TwoTone) ===
            k.length - IconTypesEnum.TwoTone.length
          ) {
            this.twoToneIcons.push(k);
          } else if (
            k.indexOf(IconTypesEnum.Sharp) ===
            k.length - IconTypesEnum.Sharp.length
          ) {
            this.sharpIcons.push(k);
          } else {
            this.filledIcons.push(k);
          }
        });
        const allIconsForCache = {
          outlinedIcons: this.outlinedIcons,
          roundedIcons: this.roundedIcons,
          twoToneIcons: this.twoToneIcons,
          sharpIcons: this.sharpIcons,
          filledIcons: this.filledIcons,
        };
        this.cacheService.add('allIcons', allIconsForCache);
      } else {
        this.filledIcons = allIcons.filledIcons;
        this.outlinedIcons = allIcons.outlinedIcons;
        this.roundedIcons = allIcons.roundedIcons;
        this.twoToneIcons = allIcons.twoToneIcons;
        this.sharpIcons = allIcons.sharpIcons;
      }
    });
  }

  @action searchIconsByFilterAndPage = (
    filter: string,
    types: IconTypesEnum[],
    page: number
  ) => {
    let result: string[] = [];
    const lowerCasedFilter = filter.toLowerCase();
    types.forEach((type: IconTypesEnum) => {
      let workingArray: string[] | null = null;
      if (type === IconTypesEnum.Filled) {
        workingArray = this.filledIcons;
      } else if (type === IconTypesEnum.Outlined) {
        workingArray = this.outlinedIcons;
      } else if (type === IconTypesEnum.Rounded) {
        workingArray = this.roundedIcons;
      } else if (type === IconTypesEnum.TwoTone) {
        workingArray = this.twoToneIcons;
      } else if (type === IconTypesEnum.Sharp) {
        workingArray = this.sharpIcons;
      }
      if (workingArray) {
        result = result.concat(
          workingArray.filter(
            (i: string) => i.toLowerCase().indexOf(lowerCasedFilter) !== -1
          )
        );
      }
    });
    this.foundedTotalCount = result.length;
    this.foundedIcons = result.slice(
      (page - 1) * this.iconsOnOnePage,
      page * this.iconsOnOnePage
    );
  };

  getIconRightStringNameForFontToShow = (iconName: string) => {
    const result = iconName.split(/(?=[A-Z])/);
    let resultStr = result?.map((r) => r.toLowerCase()).join('_');
    const numberMatch = resultStr.match(/[0-9]+/);
    if (numberMatch?.index) {
      resultStr = `${resultStr.substring(
        0,
        numberMatch.index
      )}_${resultStr.substring(numberMatch.index)}`;
    }
    return resultStr;
  };
}

export default IconsStore;
