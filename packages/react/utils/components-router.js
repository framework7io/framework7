'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _f = require('./f7');

var _f2 = _interopRequireDefault(_f);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routerComponentIdCounter = 0; /* eslint no-underscore-dangle: "off" */
exports.default = {
  proto: {
    pageComponentLoader: function pageComponentLoader(routerEl, component, componentUrl, options, resolve, reject) {
      var router = this;
      var el = routerEl;
      var routerComponent = void 0;
      _f2.default.routers.views.forEach(function (data) {
        if (data.el && data.el === routerEl) {
          routerComponent = data.component;
        }
      });

      if (!routerComponent || !routerComponent.state.pages) {
        reject();
        return;
      }

      var id = _utils2.default.now() + '_' + (routerComponentIdCounter += 1);
      var pageData = {
        component: component,
        id: id,
        props: _utils2.default.extend({
          f7route: options.route,
          f7router: router
        }, options.route.params)
      };
      routerComponent.$f7router = router;
      routerComponent.$f7route = options.route;

      var resolved = void 0;
      function onDidUpdate(componentRouterData) {
        if (componentRouterData.component !== routerComponent || resolved) return;
        _events2.default.off('viewRouterDidUpdate', onDidUpdate);

        var pageEl = el.children[el.children.length - 1];
        pageData.el = pageEl;

        resolve(pageEl);
        resolved = true;
      }

      _events2.default.on('viewRouterDidUpdate', onDidUpdate);

      routerComponent.state.pages.push(pageData);
      routerComponent.setState({ pages: routerComponent.state.pages });
    },
    removePage: function removePage($pageEl) {
      if (!$pageEl) return;
      var router = this;
      var routerComponent = void 0;
      _f2.default.routers.views.forEach(function (data) {
        if (data.el && data.el === router.el) {
          routerComponent = data.component;
        }
      });

      var pageEl = void 0;
      if ('length' in $pageEl) {
        // Dom7
        if ($pageEl.length === 0) return;
        pageEl = $pageEl[0];
      } else {
        pageEl = $pageEl;
      }
      if (!pageEl) return;

      var pageComponentFound = void 0;
      routerComponent.state.pages.forEach(function (page, index) {
        if (page.el === pageEl) {
          pageComponentFound = true;
          routerComponent.state.pages.splice(index, 1);
          routerComponent.setState({ pages: routerComponent.state.pages });
        }
      });
      if (!pageComponentFound) {
        pageEl.parentNode.removeChild(pageEl);
      }
    },
    tabComponentLoader: function tabComponentLoader(tabEl, component, componentUrl, options, resolve, reject) {
      var router = this;
      if (!tabEl) reject();

      var tabsComponent = void 0;
      _f2.default.routers.tabs.forEach(function (tabData) {
        if (tabData.el && tabData.el === tabEl) {
          tabsComponent = tabData.component;
        }
      });
      if (!tabsComponent) {
        reject();
        return;
      }

      var id = _utils2.default.now() + '_' + (routerComponentIdCounter += 1);
      var tabContent = {
        id: id,
        component: component,
        props: _utils2.default.extend({
          f7route: options.route,
          f7router: router
        }, options.route.params)
      };

      tabsComponent.$f7router = router;
      tabsComponent.$f7route = options.route;

      var resolved = void 0;
      function onDidUpdate(componentRouterData) {
        if (componentRouterData.component !== tabsComponent || resolved) return;
        _events2.default.off('tabRouterDidUpdate', onDidUpdate);

        var tabContentEl = tabEl.children[0];
        resolve(tabContentEl);

        resolved = true;
      }

      _events2.default.on('tabRouterDidUpdate', onDidUpdate);

      tabsComponent.setState({ tabContent: tabContent });
    },
    removeTabContent: function removeTabContent(tabEl) {
      if (!tabEl) return;

      var tabComponent = void 0;
      _f2.default.routers.tabs.forEach(function (tabData) {
        if (tabData.el && tabData.el === tabEl) {
          tabComponent = tabData.component;
        }
      });
      var hasComponent = !!tabComponent.state.tabContent;
      if (!tabComponent || !hasComponent) {
        tabEl.innerHTML = ''; // eslint-disable-line
        return;
      }
      tabComponent.setState({ tabContent: null });
    },
    modalComponentLoader: function modalComponentLoader(rootEl, component, componentUrl, options, resolve, reject) {
      var router = this;
      var modalsComponent = _f2.default.routers.modals && _f2.default.routers.modals.component;
      var modalsComponentEl = _f2.default.routers.modals && _f2.default.routers.modals.el;

      if (!modalsComponent || !modalsComponent.state.modals) {
        reject();
        return;
      }

      var id = _utils2.default.now() + '_' + (routerComponentIdCounter += 1);
      var modalData = {
        component: component,
        id: id,
        props: _utils2.default.extend({
          f7route: options.route,
          f7router: router
        }, options.route.params)
      };
      modalsComponent.$f7router = router;
      modalsComponent.$f7route = options.route;

      var resolved = void 0;
      function onDidUpdate(componentRouterData) {
        if (componentRouterData.component !== modalsComponent || resolved) return;
        _events2.default.off('modalsRouterDidUpdate', onDidUpdate);

        var modalEl = modalsComponentEl.children[modalsComponentEl.children.length - 1];
        modalData.el = modalEl;

        resolve(modalEl);
        resolved = true;
      }

      _events2.default.on('modalsRouterDidUpdate', onDidUpdate);

      modalsComponent.state.modals.push(modalData);
      modalsComponent.setState({ modals: modalsComponent.state.modals });
    },
    removeModal: function removeModal(modalEl) {
      var modalsComponent = _f2.default.routers.modals && _f2.default.routers.modals.component;
      if (!modalsComponent) return;

      var modalDataToRemove = void 0;
      modalsComponent.state.modals.forEach(function (modalData) {
        if (modalData.el === modalEl) modalDataToRemove = modalData;
      });

      modalsComponent.state.modals.splice(modalsComponent.state.modals.indexOf(modalDataToRemove), 1);
      modalsComponent.setState({ modals: modalsComponent.state.modals });
    }
  }
};