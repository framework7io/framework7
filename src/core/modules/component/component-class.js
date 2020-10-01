/* eslint no-underscore-dangle: "off" */
import { getWindow, getDocument } from 'ssr-window';
import $ from '../../shared/dom7';
import $h from './$h';
import {
  id as generateId,
  merge,
  extend,
  eventNameToColonCase,
  deleteProps,
} from '../../shared/utils';
import vdom from './vdom';
import patch from './patch';

class Component {
  constructor(app, component, props = {}, { root, el, context, children } = {}) {
    const window = getWindow();
    const document = getDocument();
    merge(this, {
      f7: app,
      props: props || {},
      context: context || {},
      id: component.id || generateId(),
      children: children || [],
      isRootComponent: !!root,
      theme: {
        ios: app.theme === 'ios',
        md: app.theme === 'md',
        aurora: app.theme === 'aurora',
      },
      style: component.style,
      styleScoped: component.styleScoped,
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

    Object.defineProperty(this, 'slots', {
      enumerable: true,
      configurable: true,
      get: () => {
        const slots = {};
        this.children.forEach((childVNode) => {
          let childSlotName = 'default';
          if (childVNode.data) {
            childSlotName = (childVNode.data.attrs && childVNode.data.attrs.slot) || 'default';
          }
          if (!slots[childSlotName]) slots[childSlotName] = [];
          slots[childSlotName].push(childVNode);
        });
        return slots;
      },
    });

    // Root data and methods
    Object.defineProperty(this, 'root', {
      enumerable: true,
      configurable: true,
      get: () => {
        if (this.isRootComponent) {
          return this;
        }
        if (app.rootComponent) {
          if (!this.onRootUpdated) {
            this.onRootUpdated = () => this.update();
            app.on('rootComponentUpdated', this.onRootUpdated);
          }
          return app.rootComponent;
        }
        let rootData = merge({}, app.data, app.methods);
        if (window && window.Proxy) {
          rootData = new window.Proxy(rootData, {
            set(target, name, val) {
              app.data[name] = val;
            },
            deleteProperty(target, name) {
              delete app.data[name];
              delete app.methods[name];
            },
            has(target, name) {
              return name in app.data || name in app.methods;
            },
          });
        }
        return rootData;
      },
      set() {},
    });

    const createComponent = () => {
      return component(this.props, this.getComponentContext(true));
    };

    const getRenderFuncion = (componentResult) =>
      new Promise((resolve, reject) => {
        if (typeof componentResult === 'function') {
          resolve(componentResult);
        } else if (componentResult instanceof Promise) {
          componentResult()
            .then((render) => {
              resolve(render);
            })
            .catch((err) => {
              reject(err);
              throw new Error(err);
            });
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
          throw new Error(err);
        });
    });
  }

  on(eventName, handler) {
    this.__eventHandlers.push({ eventName, handler });
  }

  once(eventName, handler) {
    this.__onceEventHandlers.push({ eventName, handler });
  }

  getEl() {
    return this.$el;
  }

  getComponentContext(includeHooks) {
    const ctx = extend(
      {},
      {
        $context: this.context,
        $f7route: this.context.f7route,
        $f7router: this.context.f7router,
        $h,
        $root: this.root,
        $,
        $id: this.id,
        $slots: this.slots,
        $f7: this.f7,
        $f7ready: this.f7ready,
        $theme: this.theme,
        $getEl: this.getEl.bind(this),
        $tick: this.tick.bind(this),
        $update: this.update.bind(this),
      },
    );
    if (includeHooks)
      extend(ctx, {
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

  attachEvents() {
    const { $el } = this;
    this.__eventHandlers.forEach(({ eventName, handler }) => {
      $el.on(eventNameToColonCase(eventName), handler);
    });
    this.__onceEventHandlers.forEach(({ eventName, handler }) => {
      $el.once(eventNameToColonCase(eventName), handler);
    });
  }

  detachEvents() {
    const { $el } = this;
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
    return new Promise((resolve) => {
      const resolver = () => {
        resolve();
        if (callback) callback();
        if (this.isRootComponent) {
          this.f7.emit('rootComponentUpdated');
        }
      };
      this.__updateIsPending = true;
      this.__updateQueue.push(resolver);
      this.startUpdateQueue();
    });
  }

  setState(mergeState = {}, callback) {
    merge(this, mergeState);
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
    const window = getWindow();
    this.hook('onBeforeUnmount');

    if (this.styleEl) $(this.styleEl).remove();
    if (this.onRootUpdated) {
      this.f7.off('rootComponentUpdated', this.onRootUpdated);
      delete this.onRootUpdated;
    }

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
  }

  hook(name, ...args) {
    this[`__${name}`].forEach((handler) => {
      handler(...args);
    });
  }
}

export default Component;
