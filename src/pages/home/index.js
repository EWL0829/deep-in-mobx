import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from "mobx-react";
import axios from 'axios';
import home from './index.less';

@observer
@inject('store')
export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get('https://www.easy-mock.com/mock/5ceacfd0f164c93712b29224/mmall/login.do').then((data) => {
      console.log('type sth.,', data); // eslint-disable-line
    });
  }

  render() {
    return (
        <ul>
          <div className={home['btn-item']}><Link to={'/settings'}>settings</Link></div>
          <div className={home['btn-item']}><Link to={'/display'}>display</Link></div>
        </ul>
    )
  }
};
