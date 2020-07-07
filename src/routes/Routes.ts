import CashPanel from '../components/CashPanel/CashPanel';
import RecordsPanel from '../components/RecordsPanel/RecordsPanel';
import TypesPanel from '../components/TypesPanel/TypesPanel';
import MenuPanel from '../components/MenuPanel/MenuPanel';
import { MenuTypesEnum } from '../models/Enum';
import TypeEditPanel from '../components/TypeEditPanel/TypeEditPanel';
import CashEditPanel from '../components/CashEditPanel/CashEditPanel';

const routes = [
  {
    path: `/`,
    exact: true,
    components: CashPanel,
  },
  {
    path: `/${MenuTypesEnum.Cash}`,
    exact: true,
    components: CashPanel,
  },
  {
    path: `/${MenuTypesEnum.Cash}/add`,
    exact: true,
    components: CashEditPanel,
  },
  {
    path: `/${MenuTypesEnum.Cash}/add/:typeId`,
    exact: true,
    components: CashEditPanel,
  },
  {
    path: `/${MenuTypesEnum.Cash}/edit/:id`,
    exact: true,
    components: CashEditPanel,
  },
  {
    path: `/${MenuTypesEnum.Records}`,
    exact: true,
    components: RecordsPanel,
  },
  {
    path: `/${MenuTypesEnum.Types}`,
    exact: true,
    components: TypesPanel,
  },
  {
    path: `/${MenuTypesEnum.Types}/add`,
    exact: true,
    components: TypeEditPanel,
  },
  {
    path: `/${MenuTypesEnum.Types}/edit/:id`,
    exact: true,
    components: TypeEditPanel,
  },
  {
    path: `/${MenuTypesEnum.Menu}`,
    exact: true,
    components: MenuPanel,
  },
];

export default routes;
