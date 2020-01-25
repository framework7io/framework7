import $ from 'dom7';
import { window, document } from 'ssr-window';
import Utils from '../../utils/utils';

const fetchedModules = [];
function loadModule(moduleToLoad) {
  const Framework7 = this;
  return new Promise((resolve, reject) => {
    const app = Framework7.instance;
    let modulePath;
    let moduleObj;
    let moduleFunc;
    if (!moduleToLoad) {
      reject(new Error('Framework7: Lazy module must be specified'));
      return;
    }

    function install(module) {
      Framework7.use(module);

      if (app) {
        app.useModuleParams(module, app.params);
        app.useModule(module);
      }
    }

    if (typeof moduleToLoad === 'string') {
      const matchNamePattern = moduleToLoad.match(/([a-z0-9-]*)/i);
      if (moduleToLoad.indexOf('.') < 0 && matchNamePattern && matchNamePattern[0].length === moduleToLoad.length) {
        if (!app || (app && !app.params.lazyModulesPath)) {
          reject(new Error('Framework7: "lazyModulesPath" app parameter must be specified to fetch module by name'));
          return;
        }
        modulePath = `${app.params.lazyModulesPath}/${moduleToLoad}.js`;
      } else {
        modulePath = moduleToLoad;
      }
    } else if (typeof moduleToLoad === 'function') {
      moduleFunc = moduleToLoad;
    } else {
      // considering F7-Plugin object
      moduleObj = moduleToLoad;
    }

    if (moduleFunc) {
      const module = moduleFunc(Framework7, false);
      if (!module) {
        reject(new Error('Framework7: Can\'t find Framework7 component in specified component function'));
        return;
      }
      // Check if it was added
      if (Framework7.prototype.modules && Framework7.prototype.modules[module.name]) {
        resolve();
        return;
      }
      // Install It
      install(module);

      resolve();
    }
    if (moduleObj) {
      const module = moduleObj;
      if (!module) {
        reject(new Error('Framework7: Can\'t find Framework7 component in specified component'));
        return;
      }
      // Check if it was added
      if (Framework7.prototype.modules && Framework7.prototype.modules[module.name]) {
        resolve();
        return;
      }
      // Install It
      install(module);

      resolve();
    }
    if (modulePath) {
      if (fetchedModules.indexOf(modulePath) >= 0) {
        resolve();
        return;
      }
      fetchedModules.push(modulePath);
      const scriptLoad = new Promise((resolveScript, rejectScript) => {
        Framework7.request.get(
          modulePath,
          (scriptContent) => {
            const id = Utils.id();
            const callbackLoadName = `f7_component_loader_callback_${id}`;

            const scriptEl = document.createElement('script');
            scriptEl.innerHTML = `window.${callbackLoadName} = function (Framework7, Framework7AutoInstallComponent) {return ${scriptContent.trim()}}`;
            $('head').append(scriptEl);

            const componentLoader = window[callbackLoadName];
            delete window[callbackLoadName];
            $(scriptEl).remove();

            const module = componentLoader(Framework7, false);

            if (!module) {
              rejectScript(new Error(`Framework7: Can't find Framework7 component in ${modulePath} file`));
              return;
            }

            // Check if it was added
            if (Framework7.prototype.modules && Framework7.prototype.modules[module.name]) {
              resolveScript();
              return;
            }

            // Install It
            install(module);

            resolveScript();
          },
          (xhr, status) => {
            rejectScript(xhr, status);
          }
        );
      });
      const styleLoad = new Promise((resolveStyle) => {
        Framework7.request.get(
          modulePath.replace('.js', app.rtl ? '.rtl.css' : '.css'),
          (styleContent) => {
            const styleEl = document.createElement('style');
            styleEl.innerHTML = styleContent;
            $('head').append(styleEl);

            resolveStyle();
          },
          () => {
            resolveStyle();
          }
        );
      });

      Promise.all([scriptLoad, styleLoad]).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
    }
  });
}

export default loadModule;
