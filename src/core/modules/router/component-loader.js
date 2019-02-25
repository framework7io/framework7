import Utils from '../../utils/utils';

export default {
  name: 'routerComponentLoader',
  proto: {
    componentLoader(component, componentUrl, options = {}, resolve, reject) {
      const router = this;
      const { app } = router;
      const url = typeof component === 'string' ? component : componentUrl;
      const compiledUrl = router.replaceRequestUrlParams(url, options);
      function compile(componentOptions) {
        let context = options.context || {};
        if (typeof context === 'function') context = context.call(router);
        else if (typeof context === 'string') {
          try {
            context = JSON.parse(context);
          } catch (err) {
            reject();
            throw (err);
          }
        }
        const extendContext = Utils.merge(
          {},
          context,
          {
            $route: options.route,
            $f7route: options.route,
            $router: router,
            $f7router: router,
            $theme: {
              ios: app.theme === 'ios',
              md: app.theme === 'md',
              aurora: app.theme === 'aurora',
            },
          }
        );
        const createdComponent = app.component.create(componentOptions, extendContext);
        resolve(createdComponent.el);
      }
      let cachedComponent;
      if (compiledUrl) {
        router.cache.components.forEach((cached) => {
          if (cached.url === compiledUrl) cachedComponent = cached.component;
        });
      }
      if (compiledUrl && cachedComponent) {
        compile(cachedComponent);
      } else if (compiledUrl && !cachedComponent) {
        // Load via XHR
        if (router.xhr) {
          router.xhr.abort();
          router.xhr = false;
        }
        router
          .xhrRequest(url, options)
          .then((loadedComponent) => {
            const parsedComponent = app.component.parse(loadedComponent);
            router.cache.components.push({
              url: compiledUrl,
              component: parsedComponent,
            });
            compile(parsedComponent);
          })
          .catch((err) => {
            reject();
            throw (err);
          });
      } else {
        compile(component);
      }
    },

    modalComponentLoader(rootEl, component, componentUrl, options, resolve, reject) {
      const router = this;
      router.componentLoader(component, componentUrl, options, (el) => {
        resolve(el);
      }, reject);
    },

    tabComponentLoader(tabEl, component, componentUrl, options, resolve, reject) {
      const router = this;
      router.componentLoader(component, componentUrl, options, (el) => {
        resolve(el);
      }, reject);
    },

    pageComponentLoader(routerEl, component, componentUrl, options, resolve, reject) {
      const router = this;
      router.componentLoader(component, componentUrl, options, (el, newOptions = {}) => {
        resolve(el, newOptions);
      }, reject);
    },
  },
};
