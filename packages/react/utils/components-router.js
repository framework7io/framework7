/* eslint no-underscore-dangle: "off" */
import f7 from './f7';
import Utils from './utils';

let routerComponentIdCounter = 0;

export default {
  proto: {
    pageComponentLoader(routerEl, component, componentUrl, options, resolve, reject) {
      const router = this;
      const el = routerEl;
      let viewRouter;
      f7.routers.views.forEach((data) => {
        if (data.el && data.el === routerEl) {
          viewRouter = data;
        }
      });

      if (!viewRouter) {
        reject();
        return;
      }

      const id = `${Utils.now()}_${(routerComponentIdCounter += 1)}`;
      const pageData = {
        component,
        id,
        props: Utils.extend(
          {
            f7route: options.route,
            f7router: router,
          },
          options.route.params,
          options.props || {},
        ),
      };
      if (viewRouter.component) {
        viewRouter.component.$f7router = router;
        viewRouter.component.$f7route = options.route;
      }

      let resolved;
      function onDidUpdate(componentRouterData) {
        if (componentRouterData !== viewRouter || resolved) return;
        f7.events.off('viewRouterDidUpdate', onDidUpdate);

        const pageEl = el.children[el.children.length - 1];
        pageData.el = pageEl;

        resolve(pageEl);
        resolved = true;
      }

      f7.events.on('viewRouterDidUpdate', onDidUpdate);

      viewRouter.pages.push(pageData);
      viewRouter.setPages(viewRouter.pages);
    },
    removePage($pageEl) {
      if (!$pageEl) return;
      const router = this;
      let f7Page;
      if ('length' in $pageEl) f7Page = $pageEl[0].f7Page;
      else f7Page = $pageEl.f7Page;
      if (f7Page && f7Page.route && f7Page.route.route && f7Page.route.route.keepAlive) {
        router.app.$($pageEl).remove();
        return;
      }
      let viewRouter;
      f7.routers.views.forEach((data) => {
        if (data.el && data.el === router.el) {
          viewRouter = data;
        }
      });

      let pageEl;
      if ('length' in $pageEl) {
        // Dom7
        if ($pageEl.length === 0) return;
        pageEl = $pageEl[0];
      } else {
        pageEl = $pageEl;
      }
      if (!pageEl) return;

      let pageComponentFound;
      viewRouter.pages.forEach((page, index) => {
        if (page.el === pageEl) {
          pageComponentFound = true;
          viewRouter.pages.splice(index, 1);
          viewRouter.setPages(viewRouter.pages);
        }
      });
      if (!pageComponentFound) {
        pageEl.parentNode.removeChild(pageEl);
      }
    },
    tabComponentLoader(tabEl, component, componentUrl, options, resolve, reject) {
      const router = this;
      if (!tabEl) reject();

      let tabRouter;
      f7.routers.tabs.forEach((tabData) => {
        if (tabData.el && tabData.el === tabEl) {
          tabRouter = tabData;
        }
      });
      if (!tabRouter) {
        reject();
        return;
      }

      const id = `${Utils.now()}_${(routerComponentIdCounter += 1)}`;
      const tabContent = {
        id,
        component,
        props: Utils.extend(
          {
            f7route: options.route,
            f7router: router,
          },
          options.route.params,
          options.props || {},
        ),
      };

      if (tabRouter.component) {
        tabRouter.component.$f7router = router;
        tabRouter.component.$f7route = options.route;
      }

      let resolved;
      function onDidUpdate(componentRouterData) {
        if (componentRouterData !== tabRouter || resolved) return;
        f7.events.off('tabRouterDidUpdate', onDidUpdate);

        const tabContentEl = tabEl.children[0];
        resolve(tabContentEl);

        resolved = true;
      }

      f7.events.on('tabRouterDidUpdate', onDidUpdate);

      tabRouter.setTabContent(tabContent);
    },
    removeTabContent(tabEl) {
      if (!tabEl) return;

      let tabRouter;
      f7.routers.tabs.forEach((tabData) => {
        if (tabData.el && tabData.el === tabEl) {
          tabRouter = tabData;
        }
      });
      const hasComponent = tabRouter && tabRouter.component;
      if (!tabRouter || !hasComponent) {
        tabEl.innerHTML = ''; // eslint-disable-line
        return;
      }
      tabRouter.setTabContent(null);
    },
    modalComponentLoader(rootEl, component, componentUrl, options, resolve, reject) {
      const router = this;
      const modalsRouter = f7.routers.modals;

      if (!modalsRouter) {
        reject();
        return;
      }

      const id = `${Utils.now()}_${(routerComponentIdCounter += 1)}`;
      const modalData = {
        component,
        id,
        props: Utils.extend(
          {
            f7route: options.route,
            f7router: router,
          },
          options.route.params,
          options.props || {},
        ),
      };
      if (modalsRouter.component) {
        modalsRouter.component.$f7router = router;
        modalsRouter.component.$f7route = options.route;
      }

      let resolved;
      function onDidUpdate() {
        if (resolved) return;
        f7.events.off('modalsRouterDidUpdate', onDidUpdate);

        const modalEl = modalsRouter.el.children[modalsRouter.el.children.length - 1];
        modalData.el = modalEl;

        resolve(modalEl);
        resolved = true;
      }

      f7.events.on('modalsRouterDidUpdate', onDidUpdate);

      modalsRouter.modals.push(modalData);
      modalsRouter.setModals(modalsRouter.modals);
    },
    removeModal(modalEl) {
      const modalsRouter = f7.routers.modals;
      if (!modalsRouter) return;

      let modalDataToRemove;
      modalsRouter.modals.forEach((modalData) => {
        if (modalData.el === modalEl) modalDataToRemove = modalData;
      });

      modalsRouter.modals.splice(modalsRouter.modals.indexOf(modalDataToRemove), 1);
      modalsRouter.setModals(modalsRouter.modals);
    },
  },
};
