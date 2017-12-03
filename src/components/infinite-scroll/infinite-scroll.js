import $ from 'dom7';
import Utils from '../../utils/utils';

const InfiniteScroll = {
  handleScroll(el, e) {
    const app = this;
    const $el = $(el);
    const scrollTop = $el[0].scrollTop;
    const scrollHeight = $el[0].scrollHeight;
    const height = $el[0].offsetHeight;
    let distance = $el[0].getAttribute('data-infinite-distance');

    const virtualListContainer = $el.find('.virtual-list');
    let virtualList;

    const onTop = $el.hasClass('infinite-scroll-top');
    if (!distance) distance = 50;
    if (typeof distance === 'string' && distance.indexOf('%') >= 0) {
      distance = (parseInt(distance, 10) / 100) * height;
    }
    if (distance > height) distance = height;
    if (onTop) {
      if (scrollTop < distance) {
        $el.trigger('infinite', e);
        app.emit('infinite', $el[0], e);
      }
    } else if (scrollTop + height >= scrollHeight - distance) {
      if (virtualListContainer.length > 0) {
        virtualList = virtualListContainer.eq(-1)[0].f7VirtualList;
        if (virtualList && !virtualList.reachEnd && !virtualList.params.updatableScroll) {
          return;
        }
      }
      $el.trigger('infinite', e);
      app.emit('infinite', $el[0], e);
    }
  },
  create(el) {
    const $el = $(el);
    const app = this;
    $el.on('scroll', function handle(e) {
      app.infiniteScroll.handle(this, e);
    });
  },
  destroy(el) {
    const $el = $(el);
    $el.off('scroll');
  },
};
export default {
  name: 'infiniteScroll',
  create() {
    const app = this;
    Utils.extend(app, {
      infiniteScroll: {
        handle: InfiniteScroll.handleScroll.bind(app),
        create: InfiniteScroll.create.bind(app),
        destroy: InfiniteScroll.destroy.bind(app),
      },
    });
  },
  on: {
    tabMounted(tabEl) {
      const app = this;
      const $tabEl = $(tabEl);
      $tabEl.find('.infinite-scroll-content').each((index, el) => {
        app.infiniteScroll.create(el);
      });
    },
    tabBeforeRemove(tabEl) {
      const $tabEl = $(tabEl);
      const app = this;
      $tabEl.find('.infinite-scroll-content').each((index, el) => {
        app.infiniteScroll.destroy(el);
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.infinite-scroll-content').each((index, el) => {
        app.infiniteScroll.create(el);
      });
    },
    pageBeforeRemove(page) {
      const app = this;
      page.$el.find('.infinite-scroll-content').each((index, el) => {
        app.infiniteScroll.destroy(el);
      });
    },
  },
};
