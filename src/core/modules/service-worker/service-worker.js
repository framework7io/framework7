import { window } from 'ssr-window';
import Utils from '../../utils/utils';

const SW = {
  registrations: [],
  register(path, scope) {
    const app = this;
    if (!('serviceWorker' in window.navigator) || !app.serviceWorker.container) {
      return new Promise((resolve, reject) => {
        reject(new Error('Service worker is not supported'));
      });
    }
    return new Promise((resolve, reject) => {
      app.serviceWorker.container.register(path, (scope ? { scope } : {}))
        .then((reg) => {
          SW.registrations.push(reg);
          app.emit('serviceWorkerRegisterSuccess', reg);
          resolve(reg);
        }).catch((error) => {
          app.emit('serviceWorkerRegisterError', error);
          reject(error);
        });
    });
  },
  unregister(registration) {
    const app = this;
    if (!('serviceWorker' in window.navigator) || !app.serviceWorker.container) {
      return new Promise((resolve, reject) => {
        reject(new Error('Service worker is not supported'));
      });
    }
    let registrations;
    if (!registration) registrations = SW.registrations;
    else if (Array.isArray(registration)) registrations = registration;
    else registrations = [registration];
    return Promise.all(registrations.map(reg => new Promise((resolve, reject) => {
      reg.unregister()
        .then(() => {
          if (SW.registrations.indexOf(reg) >= 0) {
            SW.registrations.splice(SW.registrations.indexOf(reg), 1);
          }
          app.emit('serviceWorkerUnregisterSuccess', reg);
          resolve();
        })
        .catch((error) => {
          app.emit('serviceWorkerUnregisterError', reg, error);
          reject(error);
        });
    })));
  },
};

export default {
  name: 'sw',
  params: {
    serviceWorker: {
      path: undefined,
      scope: undefined,
    },
  },
  create() {
    const app = this;
    Utils.extend(app, {
      serviceWorker: {
        container: ('serviceWorker' in window.navigator) ? window.navigator.serviceWorker : undefined,
        registrations: SW.registrations,
        register: SW.register.bind(app),
        unregister: SW.unregister.bind(app),
      },
    });
  },
  on: {
    init() {
      if (!('serviceWorker' in window.navigator)) return;
      const app = this;
      if (!app.serviceWorker.container) return;
      const paths = app.params.serviceWorker.path;
      const scope = app.params.serviceWorker.scope;
      if (!paths || (Array.isArray(paths) && !paths.length)) return;
      const toRegister = Array.isArray(paths) ? paths : [paths];
      toRegister.forEach((path) => {
        app.serviceWorker.register(path, scope);
      });
    },
  },
};
