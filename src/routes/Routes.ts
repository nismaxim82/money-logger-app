import CashPanel from '../components/CashPanel/CashPanel';
import RecordsPanel from '../components/RecordsPanel/RecordsPanel';
import TypesPanel from '../components/TypesPanel/TypesPanel';
import MenuPanel from '../components/MenuPanel/MenuPanel';
import { MenuTypes } from '../models/Enum';
import TypeEditPanel from '../components/TypeEditPanel/TypeEditPanel';

const routes = [
  {
    path: `/`,
    exact: true,
    components: CashPanel,
  },
  {
    path: `/${MenuTypes.Cash}`,
    exact: true,
    components: CashPanel,
  },
  {
    path: `/${MenuTypes.Records}`,
    exact: true,
    components: RecordsPanel,
  },
  {
    path: `/${MenuTypes.Types}`,
    exact: true,
    components: TypesPanel,
  },
  {
    path: `/${MenuTypes.Types}/add`,
    exact: true,
    components: TypeEditPanel,
  },
  {
    path: `/${MenuTypes.Menu}`,
    exact: true,
    components: MenuPanel,
  },
];

export default routes;
