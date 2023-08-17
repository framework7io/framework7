import { merge } from '../../shared/utils.js';

export default {
  name: 'routerComponentLoader',
  proto: {
    openIn(router, url, options) {
      const navigateOptions = {
        url,
        route: {
          path: url,
          options: {
            ...options,
            openIn: undefined,
          },
        },
      };
      const params = {
        ...options,
      };

      const component = (props, ctx) => {
        const { $h, $onMounted, $el, $f7 } = ctx;
        $onMounted(() => {
          const viewEl = $el.value.find('.view');
          const view = $f7.view.create(viewEl, {
            linksView: router.view.selector,
            ignoreOpenIn: true,
            loadInitialPage: false,
          });
          view.router.navigate(url, { props: options.props, reloadAll: true });
        });
        // eslint-disable-next-line
        return () => {
          if (options.openIn === 'popup') {
            return $h`<div class="popup popup-router-open-in" data-url="${url}"><div class="view"></div></div>`;
          }
          if (options.openIn === 'loginScreen') {
            return $h`<div class="login-screen login-screen-router-open-in" data-url="${url}"><div class="view"></div></div>`;
          }
          if (options.openIn === 'sheet') {
            return $h`<div class="sheet-modal sheet-modal-router-open-in" data-url="${url}"><div class="sheet-modal-inner"><div class="view"></div></div></div>`;
          }
          if (options.openIn === 'popover') {
            return $h`<div class="popover popover-router-open-in" data-url="${url}"><div class="popover-inner"><div class="view"></div></div></div>`;
          }
          if (options.openIn.indexOf('panel') >= 0) {
            const parts = options.openIn.split(':');
            const side = parts[1] || 'left';
            const effect = parts[2] || 'cover';

            return $h`<div class="panel panel-router-open-in panel-${side} panel-${effect}" data-url="${url}"><div class="view"></div></div>`;
          }
        };
      };
      if (options.openIn === 'popup') {
        navigateOptions.route.popup = params;
      }
      if (options.openIn === 'loginScreen') {
        navigateOptions.route.loginScreen = params;
      }
      if (options.openIn === 'sheet') {
        navigateOptions.route.sheet = params;
      }
      if (options.openIn === 'popover') {
        params.targetEl = options.clickedEl || options.targetEl;
        navigateOptions.route.popover = params;
      }
      if (options.openIn.indexOf('panel') >= 0) {
        params.targetEl = options.clickedEl || options.targetEl;
        navigateOptions.route.panel = params;
      }
      params.component = component;

      return router.navigate(navigateOptions);
    },
    componentLoader(component, componentUrl, options = {}, resolve, reject) {
      const router = this;
      const { app } = router;
      const url = typeof component === 'string' ? component : componentUrl;
      const compiledUrl = router.replaceRequestUrlParams(url, options);
      function compile(componentFunction) {
        let context = options.context || {};
        if (typeof context === 'function') context = context.call(router);
        else if (typeof context === 'string') {
          try {
            context = JSON.parse(context);
          } catch (err) {
            reject(err);
            throw err;
          }
        }
        const componentContext = merge({}, context, {
          f7route: options.route,
          f7router: router,
        });
        const componentProps = merge(
          options.route ? options.route.params || {} : {},
          options.props || {},
          options.routeProps || {},
        );
        let componentEl;
        let componentRoot;
        if (options.componentOptions && options.componentOptions.el) {
          componentEl = options.componentOptions.el;
        }
        if (options.componentOptions && options.componentOptions.root) {
          componentRoot = options.componentOptions.root;
        }
        app.component
          .create(componentFunction, componentProps, {
            context: componentContext,
            el: componentEl,
            root: componentRoot,
          })
          .then((createdComponent) => {
            resolve(createdComponent.el);
          })
          .catch((err) => {
            reject(err);
            throw new Error(err);
          });
      }
      let cachedComponent;
      if (compiledUrl && router.params.componentCache) {
        router.cache.components.forEach((cached) => {
          if (cached.url === compiledUrl) cachedComponent = cached.component;
        });
      }
      if (compiledUrl && cachedComponent) {
        compile(cachedComponent);
      } else if (compiledUrl && !cachedComponent) {
        // Load via XHR
        if (router.xhrAbortController) {
          router.xhrAbortController.abort();
          router.xhrAbortController = false;
        }
        router
          .xhrRequest(url, options)
          .then((loadedComponent) => {
            const parsedComponent = app.component.parse(loadedComponent);
            if (router.params.componentCache) {
              router.cache.components.push({
                url: compiledUrl,
                component: parsedComponent,
              });
            }
            compile(parsedComponent);
          })
          .catch((err) => {
            reject();
            throw err;
          });
      } else {
        compile(component);
      }
    },

    modalComponentLoader({ component, componentUrl, options, resolve, reject } = {}) {
      const router = this;
      router.componentLoader(
        component,
        componentUrl,
        options,
        (el) => {
          resolve(el);
        },
        reject,
      );
    },

    tabComponentLoader({ component, componentUrl, options, resolve, reject } = {}) {
      const router = this;
      router.componentLoader(
        component,
        componentUrl,
        options,
        (el) => {
          resolve(el);
        },
        reject,
      );
    },

    pageComponentLoader({ component, componentUrl, options, resolve, reject } = {}) {
      const router = this;
      router.componentLoader(
        component,
        componentUrl,
        options,
        (el, newOptions = {}) => {
          resolve(el, newOptions);
        },
        reject,
      );
    },
  },
};
