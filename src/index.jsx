import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {store} from './_helpers';
import {App} from './App';

const options = {  // alert options
  position: 'bottom center',
  timeout: 2000,  // ms
  offset: '30px',
  transition: 'scale'
};

const Root = () => (
  <Provider store={store}>
    <App/>
  </Provider>
);

render(
  <Root/>,
  document.getElementById('app')
);