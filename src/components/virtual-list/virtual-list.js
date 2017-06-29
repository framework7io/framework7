import $ from 'dom7';
import Utils from '../../utils/utils';
import VirtualList from './virtual-list-class';

export default {
  name: 'virtualList',
  create() {
    const app = this;
    Utils.extend(app, {
      virtualList: {
        create(params) {
          return new VirtualList(app, params);
        },
        destroy(listEl) {
          const $listEl = $(listEl);
          if (!$listEl.length) return undefined;
          const virtualList = $listEl[0].f7VirtualList;
          if (!virtualList) return undefined;
          return virtualList.destroy();
        },
      },
    });
  },
};
