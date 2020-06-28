import { MobXProviderContext } from 'mobx-react';
import { useContext } from 'react';

const useStores = () => {
  return useContext(MobXProviderContext).store;
};
export default useStores;
