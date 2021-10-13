import VirtualList from './virtual-list-class.js';
import ConstructorMethods from '../../shared/constructor-methods.js';

export default {
  name: 'virtualList',
  static: {
    VirtualList,
  },
  create() {
    const app = this;
    app.virtualList = ConstructorMethods({
      defaultSelector: '.virtual-list',
      constructor: VirtualList,
      app,
      domProp: 'f7VirtualList',
    });
  },
};
