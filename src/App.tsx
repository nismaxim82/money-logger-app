import { Provider } from 'mobx-react';
import React from 'react';
import ThemeCreator from './components/ThemeCreator/ThemeCreator';
import store from './stores';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeCreator />
    </Provider>
  );
};

export default App;
