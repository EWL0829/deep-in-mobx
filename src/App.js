import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/home';
import Settings from './pages/settings';
import Display from './pages/display';
import NotFound from './pages/exception'

import styles from './App.less';

export default (props) => {
  return (
      <div className={styles.app}>
        <Switch>
          <Route path='/settings' component={ Settings } />
          <Route path='/display' component={ Display } />
          <Route exact path='/' component={ Home } />
          <Route component={ NotFound } />
        </Switch>
      </div>
  )
}
