import { merge } from '../../shared/utils';

export default {
  name: 'routerComponentLoader',
  proto: {
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
