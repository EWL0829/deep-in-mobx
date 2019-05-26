import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'mobx-react';
import { HashRouter } from 'react-router-dom';
import Store from './store';
import './reset.less';
const store = new Store();
import App from './App';

ReactDom.render(
    <Provider store={store}>
      <HashRouter>
        <App/>
      </HashRouter>
    </Provider>,
    document.querySelector('#root'),
);
