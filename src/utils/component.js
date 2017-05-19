import $ from 'dom7';
import t7 from 'template7';
import Utils from '../utils/utils';

const Component = {
  parse(componentString) {
    const callbackName = `f7_component_callback_${new Date().getTime()}`;

    let template;
    if (componentString.indexOf('<template>') >= 0) {
      template = componentString.split('<template>')[1].split('</template>')[0].trim();
    }

    let scriptContent = componentString.split('<script>')[1].split('</script>')[0].trim();
    scriptContent = `window.${callbackName} = function () {${scriptContent}}`;

    // Insert Script El
    const scriptEl = document.createElement('script');
    scriptEl.innerHTML = scriptContent;
    $('head').append(scriptEl);

    const component = window[callbackName]();

    // Remove Script El
    $(scriptEl).remove();

    if (!component.template && !component.render) {
      component.template = template;
    }
    return component;
  },
  compile(c, extend = {}) {
    const component = c;
    const context = Utils.extend(component, extend);

    // Apply context
    if (component.data) {
      component.data = component.data.bind(context);
      // Data
      Utils.extend(context, component.data());
    }
    if (component.render) component.render = component.render.bind(context);
    if (component.methods) {
      Object.keys(component.methods).forEach((methodName) => {
        component[methodName] = component.methods[methodName].bind(context);
      });
    }
    if (component.on) {
      Object.keys(component.on).forEach((eventName) => {
        component.on[eventName] = component.on[eventName].bind(context);
      });
    }

    // Render
    let html = '';
    if (component.render) {
      html = component.render();
    } else if (component.template) {
      if (typeof component.template === 'string') {
        html = t7.compile(component.template)(context);
      } else {
        // Supposed to be function
        html = component.template(context);
      }
    }
    return {
      html,
      component,
    };
  },
};
export default Component;
