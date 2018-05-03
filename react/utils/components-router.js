/* eslint no-underscore-dangle: "off" */
import routers from './routers';
import events from './events';
import Utils from './utils';

let routerComponentIdCounter = 0;

export default {
  proto: {
    pageComponentLoader(routerEl, component, componentUrl, options, resolve, reject) {
      const router = this;
      const el = routerEl;
      let routerComponent;
      routers.views.forEach((data) => {
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
        params: Utils.extend({}, options.route.params),
      };
      routerComponent.$f7router = router;
      routerComponent.$f7route = options.route;

      let resolved;
      function onDidUpdate(componentRouterData) {
        if (componentRouterData.component !== routerComponent || resolved) return;
        events.off('viewRouterDidUpdate', onDidUpdate);

        const pageEl = el.children[el.children.length - 1];
        pageData.el = pageEl;
        let pageEvents;
        if (component.on) {
          const componentInstance = routerComponent.$children[routerComponent.$children.length - 1];
          if (componentInstance && componentInstance.$el === pageEl) {
            pageEvents = Utils.extend({}, component.on);
            Object.keys(pageEvents).forEach((pageEvent) => {
              pageEvents[pageEvent] = pageEvents[pageEvent].bind(componentInstance);
            });
          }
        }

        resolve(pageEl, { on: pageEvents });
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
      routers.views.forEach((data) => {
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
      routers.tabs.forEach((tabData) => {
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
        params: Utils.extend({}, options.route.params),
      };

      tabsComponent.$f7router = router;
      tabsComponent.$f7route = options.route;

      let resolved;
      function onDidUpdate(componentRouterData) {
        if (componentRouterData.component !== tabsComponent || resolved) return;
        events.off('tabRouterDidUpdate', onDidUpdate);

        let tabEvents;
        if (component.on) {
          tabEvents = Utils.extend({}, component.on);
          Object.keys(tabEvents).forEach((pageEvent) => {
            tabEvents[pageEvent] = tabEvents[pageEvent].bind(tabsComponent);
          });
        }

        const tabContentEl = tabEl.children[0];
        resolve(tabContentEl, { on: tabEvents });

        resolved = true;
      }

      events.on('tabRouterDidUpdate', onDidUpdate);

      tabsComponent.setState({ tabContent });
    },
    removeTabContent(tabEl) {
      if (!tabEl) return;

      let tabComponent;
      routers.tabs.forEach((tabData) => {
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
      const modalsEl = document.querySelector('.framework7-modals');
      if (!modalsEl) {
        reject();
        return;
      }

      const modalsVue = modalsEl.__vue__;
      if (!modalsVue) {
        reject();
        return;
      }

      const id = `${Utils.now()}_${(routerComponentIdCounter += 1)}`;
      const modalData = {
        component,
        id,
        params: Utils.extend({}, options.route.params),
      };
      modalsVue.$f7route = options.route;
      modalsVue.modals.push(modalData);

      modalsVue.$nextTick(() => {
        const modalEl = modalsEl.children[modalsEl.children.length - 1];
        modalData.el = modalEl;

        let modalEvents;
        let modalVueFound;
        let modalVue = modalEl.__vue__;
        while (modalVue.$parent && !modalVueFound) {
          if (modalVue.$parent.$el === modalEl) {
            modalVue = modalVue.$parent;
          } else {
            modalVueFound = true;
          }
        }
        if (component.on && modalVue) {
          modalEvents = Utils.extend({}, component.on);
          Object.keys(modalEvents).forEach((pageEvent) => {
            modalEvents[pageEvent] = modalEvents[pageEvent].bind(modalVue);
          });
        }

        modalEl.addEventListener('modal:closed', () => {
          modalsVue.$nextTick(() => {
            router.removeModal(modalEl, modalVue);
          });
        });

        resolve(modalEl, { on: modalEvents });
      });
    },
    removeModal(modalEl, modalVue) {
      if (!modalVue) return;

      const modalsEl = document.querySelector('.framework7-modals');
      if (!modalsEl) return;

      const modalsVue = modalsEl.__vue__;
      if (!modalsVue) return;

      let modalVueFound;
      modalsVue.modals.forEach((modal, index) => {
        if (modal.el === modalEl) {
          modalVueFound = true;
          modalsVue.modals.splice(index, 1);
        }
      });

      if (!modalVueFound) {
        modalEl.parentNode.removeChild(modalEl);
      }
    },
  },
};
