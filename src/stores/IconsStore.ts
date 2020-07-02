import { observable } from 'mobx';
import * as AllIcons from '@material-ui/icons';
import CacheService from '../services/CacheService';

class IconsStore {
  @observable filledIcons: string[] = [];
  @observable outlinedIcons: string[] = [];
  @observable roundedIcons: string[] = [];
  @observable twoToneIcons: string[] = [];
  @observable sharpIcons: string[] = [];

  private cacheService: CacheService;

  constructor(cacheService: CacheService) {
    this.cacheService = cacheService;
    this.cacheService.get('allIcons').then((allIcons) => {
      if (!allIcons) {
        Object.keys(AllIcons).forEach((k: string) => {
          if (k.indexOf('Outlined') === k.length - 8) {
            this.outlinedIcons.push(k);
          } else if (k.indexOf('Rounded') === k.length - 7) {
            this.roundedIcons.push(k);
          } else if (k.indexOf('TwoTone') === k.length - 7) {
            this.twoToneIcons.push(k);
          } else if (k.indexOf('Sharp') === k.length - 5) {
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
        this.outlinedIcons = allIcons.outlinedIcons;
        this.roundedIcons = allIcons.roundedIcons;
        this.twoToneIcons = allIcons.twoToneIcons;
        this.sharpIcons = allIcons.sharpIcons;
        this.filledIcons = allIcons.filledIcons;
      }
    });
  }
}

export default IconsStore;
