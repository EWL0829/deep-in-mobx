import { observable, action, computed } from 'mobx';

export default class Store {
  @observable username = '小明';
  @observable usernameLen = 0;

  @action changeUserName = (name) => {
    this.username = name;
  };

  @computed get getCurrentNameIsEmpty() {
    return !!this.username;
  };

  @observable length = 2;
  @computed get squared() {
    return this.length * this.length;
  }
  set squared(value) { // 这是一个自动的动作，不需要注解
    this.length = Math.sqrt(value);
  }

}
