import React from 'react';
import {Provider} from 'react-redux';
import {store} from './SRC/Redux/store';

import Routes from './Routes';

const App = () => {
  console.log('Apps');
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <Routes />

    </Provider>
  );
};

export default App;
