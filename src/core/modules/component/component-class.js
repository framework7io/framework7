/* eslint no-underscore-dangle: "off" */
import { getWindow, getDocument } from 'ssr-window';
import $ from '../../shared/dom7';
import $h from './$h';
import { id as generateId, merge, eventNameToColonCase, deleteProps } from '../../shared/utils';
import vdom from './vdom';
import patch from './patch';

class Component {
  constructor(app, component, props = {}, { el, context, children } = {}) {
    const document = getDocument();
    merge(this, {
      f7: app,
      props: props || {},
      context: context || {},
      id: component.id || generateId(),
      children: children || [],
      theme: {
        ios: app.theme === 'ios',
        md: app.theme === 'md',
        aurora: app.theme === 'aurora',
      },
      style: component.style,
      __storeCallbacks: [],
      __updateQueue: [],
      __eventHandlers: [],
      __onceEventHandlers: [],
      __onBeforeMount: [],
      __onMounted: [],
      __onBeforeUpdate: [],
      __onUpdated: [],
      __onBeforeUnmount: [],
      __onUnmounted: [],
    });

    const createComponent = () => {
      return component(this.props, this.getComponentContext(true));
    };

    const getRenderFuncion = (componentResult) =>
      new Promise((resolve, reject) => {
        if (typeof componentResult === 'function') {
          resolve(componentResult);
        } else if (componentResult instanceof Promise) {
          componentResult
            .then((render) => {
              resolve(render);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          reject(
            new Error(
              'Framework7: Component render function is not a "function" type. Didn\'t you forget to "return $render"?',
            ),
          );
        }
      });

    return new Promise((resolve, reject) => {
      const componentResult = createComponent();
      getRenderFuncion(componentResult)
        .then((render) => {
          this.renderFunction = render;

          const tree = this.render();

          if (el) {
            this.vnode = vdom(tree, this, true);
            if (this.style) {
              this.styleEl = document.createElement('style');
              this.styleEl.innerHTML = this.style;
            }
            this.el = el;
            patch(this.el, this.vnode);
            this.el = this.vnode.elm;
            this.$el = $(this.el);

            this.attachEvents();
            this.el.f7Component = this;
            this.mount();
            resolve(this);
            return;
          }
          // Make Dom
          if (tree) {
            this.vnode = vdom(tree, this, true);
            this.el = document.createElement(this.vnode.sel || 'div');
            patch(this.el, this.vnode);
            this.$el = $(this.el);
          }
          if (this.style) {
            this.styleEl = document.createElement('style');
            this.styleEl.innerHTML = this.style;
          }

          this.attachEvents();

          if (this.el) {
            this.el.f7Component = this;
          }

          resolve(this);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  on(eventName, handler) {
    if (!this.__eventHandlers) return;
    this.__eventHandlers.push({ eventName, handler });
  }

  once(eventName, handler) {
    if (!this.__eventHandlers) return;
    this.__onceEventHandlers.push({ eventName, handler });
  }

  getComponentStore() {
    const { state, getters, dispatch } = this.f7.store;
    const $store = {
      state,
      dispatch,
    };
    $store.getters = new Proxy(getters, {
      get: (target, prop) => {
        const obj = target[prop];
        const callback = () => {
          this.update();
        };
        obj.onUpdated(callback);
        this.__storeCallbacks.push(callback, obj.__callback);
        return obj;
      },
    });

    return $store;
  }

  getComponentContext(includeHooks) {
    const ctx = {
      $f7route: this.context.f7route,
      $f7router: this.context.f7router,
      $h,
      $,
      $id: this.id,
      $f7: this.f7,
      $f7ready: this.f7ready.bind(this),
      $theme: this.theme,
      $tick: this.tick.bind(this),
      $update: this.update.bind(this),
      $emit: this.emit.bind(this),
      $store: this.getComponentStore(),
      $el: {},
    };
    Object.defineProperty(ctx.$el, 'value', {
      get: () => {
        return this.$el;
      },
    });
    if (includeHooks)
      Object.assign(ctx, {
        $on: this.on.bind(this),
        $once: this.once.bind(this),
        $onBeforeMount: (handler) => this.__onBeforeMount.push(handler),
        $onMounted: (handler) => this.__onMounted.push(handler),
        $onBeforeUpdate: (handler) => this.__onBeforeUpdate.push(handler),
        $onUpdated: (handler) => this.__onUpdated.push(handler),
        $onBeforeUnmount: (handler) => this.__onBeforeUnmount.push(handler),
        $onUnmounted: (handler) => this.__onUnmounted.push(handler),
      });

    return ctx;
  }

  render() {
    return this.renderFunction(this.getComponentContext());
  }

  emit(name, data) {
    if (!this.el) return;
    this.$el.trigger(name, data);
  }

  attachEvents() {
    const { $el } = this;
    if (!this.__eventHandlers) return;
    this.__eventHandlers.forEach(({ eventName, handler }) => {
      $el.on(eventNameToColonCase(eventName), handler);
    });
    this.__onceEventHandlers.forEach(({ eventName, handler }) => {
      $el.once(eventNameToColonCase(eventName), handler);
    });
  }

  detachEvents() {
    const { $el } = this;
    if (!this.__eventHandlers) return;
    this.__eventHandlers.forEach(({ eventName, handler }) => {
      $el.on(eventNameToColonCase(eventName), handler);
    });
    this.__onceEventHandlers.forEach(({ eventName, handler }) => {
      $el.once(eventNameToColonCase(eventName), handler);
    });
  }

  startUpdateQueue() {
    const window = getWindow();
    if (this.__requestAnimationFrameId) return;
    const update = () => {
      this.hook('onBeforeUpdate');
      const tree = this.render();

      // Make Dom
      if (tree) {
        const newVNode = vdom(tree, this, false);
        this.vnode = patch(this.vnode, newVNode);
      }
    };
    this.__requestAnimationFrameId = window.requestAnimationFrame(() => {
      if (this.__updateIsPending) update();
      let resolvers = [...this.__updateQueue];
      this.__updateQueue = [];
      this.__updateIsPending = false;
      window.cancelAnimationFrame(this.__requestAnimationFrameId);
      delete this.__requestAnimationFrameId;
      delete this.__updateIsPending;
      resolvers.forEach((resolver) => resolver());
      resolvers = [];
    });
  }

  tick(callback) {
    return new Promise((resolve) => {
      function resolver() {
        resolve();
        if (callback) callback();
      }
      this.__updateQueue.push(resolver);
      this.startUpdateQueue();
    });
  }

  update(callback) {
    if (this.__destroyed) return new Promise(() => {});
    return new Promise((resolve) => {
      const resolver = () => {
        resolve();
        if (callback) callback();
      };
      this.__updateIsPending = true;
      this.__updateQueue.push(resolver);
      this.startUpdateQueue();
    });
  }

  setState(callback) {
    return this.update(callback);
  }

  f7ready(callback) {
    if (this.f7.initialized) {
      callback(this.f7);
      return;
    }
    this.f7.once('init', () => {
      callback(this.f7);
    });
  }

  mount(mountMethod) {
    this.hook('onBeforeMount', this.$el);
    if (this.styleEl) $('head').append(this.styleEl);
    if (mountMethod) mountMethod(this.el);
    this.hook('onMounted', this.$el);
  }

  destroy() {
    if (this.__destroyed) return;
    const window = getWindow();
    this.hook('onBeforeUnmount');

    if (this.styleEl) $(this.styleEl).remove();

    this.detachEvents();
    this.hook('onUnmounted');
    // Delete component instance
    if (this.el && this.el.f7Component) {
      this.el.f7Component = null;
      delete this.el.f7Component;
    }
    // Patch with empty node
    if (this.vnode) {
      this.vnode = patch(this.vnode, { sel: this.vnode.sel, data: {} });
    }
    // Clear update queue
    window.cancelAnimationFrame(this.__requestAnimationFrameId);
    this.__storeCallbacks.forEach((callback) => {
      this.f7.store.__removeCallback(callback);
    });
    this.__storeCallbacks = [];
    this.__updateQueue = [];
    this.__eventHandlers = [];
    this.__onceEventHandlers = [];
    this.__onBeforeMount = [];
    this.__onMounted = [];
    this.__onBeforeUpdate = [];
    this.__onUpdated = [];
    this.__onBeforeUnmount = [];
    this.__onUnmounted = [];
    // Delete all props
    deleteProps(this);
    this.__destroyed = true;
  }

  hook(name, ...args) {
    if (this.__destroyed) return;
    this[`__${name}`].forEach((handler) => {
      handler(...args);
    });
  }
}

export default Component;
