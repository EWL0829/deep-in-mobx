import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import axios from "axios";
import settings from './index.less';

@inject('store')
@observer
export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      val: ''
    };
  }

  handleBtnClick = () => {
    const { store } = this.props;
    const { val } = this.state;
    store.changeUserName(val);
  };

  handleInputChange = (e) => {
    this.setState({
      val: e.target.value
    });
  };

  render() {
    const { store } = this.props;
    const { username } = this.props.store;
    const { val } = this.state;

    return (
        <div className={settings.wrap}>
          <div className={settings['title-part']}>
            <input type="text" value={val} onChange={this.handleInputChange}/>
            <button onClick={this.handleBtnClick}>修改用户名</button>
          </div>
          <div className={settings['show-part']}>
            当前用户名为： {username}
          </div>
        </div>
    )
  }
};
