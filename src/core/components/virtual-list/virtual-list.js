import VirtualList from './virtual-list-class';
import ConstructorMethods from '../../shared/constructor-methods';

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
