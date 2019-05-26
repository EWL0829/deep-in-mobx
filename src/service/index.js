import React from 'react';
import { get } from '../utils/req';

/**
 * 获取 Mock 数据
 */
export const getMockData = () => {
  return get('https://www.easy-mock.com/mock/5ceacfd0f164c93712b29224/mmall/info');
}
