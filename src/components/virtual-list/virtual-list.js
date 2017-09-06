import $ from 'dom7';
import Utils from '../../utils/utils';
import VirtualList from './virtual-list-class';

export default {
  name: 'virtualList',
  static: {
    VirtualList,
  },
  create() {
    const app = this;
    Utils.extend(app, {
      virtualList: {
        create(params) {
          return new VirtualList(app, params);
        },
        get(listEl) {
          if ((listEl instanceof VirtualList)) return listEl;
          const $listEl = $(listEl);
          if ($listEl.length === 0) return undefined;
          return $listEl[0].f7VirtualList;
        },
        destroy(listEl) {
          const virtualList = app.virtualList.get(listEl);
          if (virtualList && virtualList.destroy) return virtualList.destroy();
          return undefined;
        },
      },
    });
  },
};
