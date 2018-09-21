
function framework7ComponentLoader(chunks) {
  var doc = document;
  var win = window;
  var $ = chunks.$;
  var Template7 = chunks.Template7;
  var Utils = chunks.Utils;
  var Device = chunks.Device;
  var Support = chunks.Support;
  var ConstructorMethods = chunks.ConstructorMethods;
  var ModalMethods = chunks.ModalMethods;
  var Framework7Class = chunks.Framework7Class;
  var Modal = chunks.Modal;

  var InfiniteScroll = {
    handleScroll: function handleScroll(el, e) {
      var app = this;
      var $el = $(el);
      var scrollTop = $el[0].scrollTop;
      var scrollHeight = $el[0].scrollHeight;
      var height = $el[0].offsetHeight;
      var distance = $el[0].getAttribute('data-infinite-distance');

      var virtualListContainer = $el.find('.virtual-list');
      var virtualList;

      var onTop = $el.hasClass('infinite-scroll-top');
      if (!distance) { distance = 50; }
      if (typeof distance === 'string' && distance.indexOf('%') >= 0) {
        distance = (parseInt(distance, 10) / 100) * height;
      }
      if (distance > height) { distance = height; }
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
    create: function create(el) {
      var $el = $(el);
      var app = this;
      $el.on('scroll', function handle(e) {
        app.infiniteScroll.handle(this, e);
      });
    },
    destroy: function destroy(el) {
      var $el = $(el);
      $el.off('scroll');
    },
  };
  var infiniteScroll = {
    name: 'infiniteScroll',
    create: function create() {
      var app = this;
      Utils.extend(app, {
        infiniteScroll: {
          handle: InfiniteScroll.handleScroll.bind(app),
          create: InfiniteScroll.create.bind(app),
          destroy: InfiniteScroll.destroy.bind(app),
        },
      });
    },
    on: {
      tabMounted: function tabMounted(tabEl) {
        var app = this;
        var $tabEl = $(tabEl);
        $tabEl.find('.infinite-scroll-content').each(function (index, el) {
          app.infiniteScroll.create(el);
        });
      },
      tabBeforeRemove: function tabBeforeRemove(tabEl) {
        var $tabEl = $(tabEl);
        var app = this;
        $tabEl.find('.infinite-scroll-content').each(function (index, el) {
          app.infiniteScroll.destroy(el);
        });
      },
      pageInit: function pageInit(page) {
        var app = this;
        page.$el.find('.infinite-scroll-content').each(function (index, el) {
          app.infiniteScroll.create(el);
        });
      },
      pageBeforeRemove: function pageBeforeRemove(page) {
        var app = this;
        page.$el.find('.infinite-scroll-content').each(function (index, el) {
          app.infiniteScroll.destroy(el);
        });
      },
    },
  };

  return infiniteScroll;
}
framework7ComponentLoader.componentName = 'infiniteScroll';

