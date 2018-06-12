/* eslint no-underscore-dangle: "off" */
import f7 from './f7';
import events from './events';
import Utils from './utils';

let routerComponentIdCounter = 0;

export default {
  proto: {
    pageComponentLoader(routerEl, component, componentUrl, options, resolve, reject) {
      const router = this;
      const el = routerEl;
      let routerComponent;
      f7.routers.views.forEach((data) => {
        if (data.el && data.el === routerEl) {
          routerComponent = data.component;
        }
      });

      if (!routerComponent || !routerComponent.state.pages) {
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
          options.route.params
        ),
      };
      routerComponent.$f7router = router;
      routerComponent.$f7route = options.route;

      let resolved;
      function onDidUpdate(componentRouterData) {
        if (componentRouterData.component !== routerComponent || resolved) return;
        events.off('viewRouterDidUpdate', onDidUpdate);

        const pageEl = el.children[el.children.length - 1];
        pageData.el = pageEl;

        resolve(pageEl);
        resolved = true;
      }

      events.on('viewRouterDidUpdate', onDidUpdate);

      routerComponent.state.pages.push(pageData);
      routerComponent.setState({ pages: routerComponent.state.pages });
    },
    removePage($pageEl) {
      if (!$pageEl) return;
      const router = this;
      let routerComponent;
      f7.routers.views.forEach((data) => {
        if (data.el && data.el === router.el) {
          routerComponent = data.component;
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
      routerComponent.state.pages.forEach((page, index) => {
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
    tabComponentLoader(tabEl, component, componentUrl, options, resolve, reject) {
      const router = this;
      if (!tabEl) reject();

      let tabsComponent;
      f7.routers.tabs.forEach((tabData) => {
        if (tabData.el && tabData.el === tabEl) {
          tabsComponent = tabData.component;
        }
      });
      if (!tabsComponent) {
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
          options.route.params
        ),
      };

      tabsComponent.$f7router = router;
      tabsComponent.$f7route = options.route;

      let resolved;
      function onDidUpdate(componentRouterData) {
        if (componentRouterData.component !== tabsComponent || resolved) return;
        events.off('tabRouterDidUpdate', onDidUpdate);

        const tabContentEl = tabEl.children[0];
        resolve(tabContentEl);

        resolved = true;
      }

      events.on('tabRouterDidUpdate', onDidUpdate);

      tabsComponent.setState({ tabContent });
    },
    removeTabContent(tabEl) {
      if (!tabEl) return;

      let tabComponent;
      f7.routers.tabs.forEach((tabData) => {
        if (tabData.el && tabData.el === tabEl) {
          tabComponent = tabData.component;
        }
      });
      const hasComponent = !!tabComponent.state.tabContent;
      if (!tabComponent || !hasComponent) {
        tabEl.innerHTML = ''; // eslint-disable-line
        return;
      }
      tabComponent.setState({ tabContent: null });
    },
    modalComponentLoader(rootEl, component, componentUrl, options, resolve, reject) {
      const router = this;
      const modalsComponent = f7.routers.modals && f7.routers.modals.component;
      const modalsComponentEl = f7.routers.modals && f7.routers.modals.el;

      if (!modalsComponent || !modalsComponent.state.modals) {
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
          options.route.params
        ),
      };
      modalsComponent.$f7router = router;
      modalsComponent.$f7route = options.route;

      let resolved;
      function onDidUpdate(componentRouterData) {
        if (componentRouterData.component !== modalsComponent || resolved) return;
        events.off('modalsRouterDidUpdate', onDidUpdate);

        const modalEl = modalsComponentEl.children[modalsComponentEl.children.length - 1];
        modalData.el = modalEl;

        resolve(modalEl);
        resolved = true;
      }

      events.on('modalsRouterDidUpdate', onDidUpdate);

      modalsComponent.state.modals.push(modalData);
      modalsComponent.setState({ modals: modalsComponent.state.modals });
    },
    removeModal(modalEl) {
      const modalsComponent = f7.routers.modals && f7.routers.modals.component;
      if (!modalsComponent) return;

      let modalDataToRemove;
      modalsComponent.state.modals.forEach((modalData) => {
        if (modalData.el === modalEl) modalDataToRemove = modalData;
      });

      modalsComponent.state.modals.splice(modalsComponent.state.modals.indexOf(modalDataToRemove), 1);
      modalsComponent.setState({ modals: modalsComponent.state.modals });
    },
  },
};
