import { window, document } from 'ssr-window';
import Template7 from 'template7';
import $ from 'dom7';
import Utils from '../../utils/utils';

function parseComponent(componentString) {
  const id = Utils.id();
  const callbackCreateName = `f7_component_create_callback_${id}`;
  const callbackRenderName = `f7_component_render_callback_${id}`;

  // Template
  let template;
  const hasTemplate = componentString.match(/<template([ ]?)([a-z0-9-]*)>/);
  const templateType = hasTemplate[2] || 't7';
  if (hasTemplate) {
    template = componentString
      .split(/<template[ ]?[a-z0-9-]*>/)
      .filter((item, index) => index > 0)
      .join('<template>')
      .split('</template>')
      .filter((item, index, arr) => index < arr.length - 1)
      .join('</template>')
      .replace(/{{#raw}}([ \n]*)<template/g, '{{#raw}}<template')
      .replace(/\/template>([ \n]*){{\/raw}}/g, '/template>{{/raw}}')
      .replace(/([ \n])<template/g, '$1{{#raw}}<template')
      .replace(/\/template>([ \n])/g, '/template>{{/raw}}$1');
  }

  // Parse Styles
  let style = null;
  let styleScoped = false;

  if (componentString.indexOf('<style>') >= 0) {
    style = componentString.split('<style>')[1].split('</style>')[0];
  } else if (componentString.indexOf('<style scoped>') >= 0) {
    styleScoped = true;
    style = componentString.split('<style scoped>')[1].split('</style>')[0];
    style = style
      .replace(/{{this}}/g, `[data-f7-${id}]`)
      .replace(/[\n]?([^{^}]*){/ig, (string, rules) => {
        // eslint-disable-next-line
        rules = rules
          .split(',')
          .map((rule) => {
            if (rule.indexOf('@') >= 0) return rule;
            if (rule.indexOf(`[data-f7-${id}]`) >= 0) return rule;
            return `[data-f7-${id}] ${rule.trim()}`;
          })
          .join(', ');

        return `\n${rules} {`;
      });
  }

  // Parse Script
  let scriptContent;
  let scriptEl;
  if (componentString.indexOf('<script>') >= 0) {
    const scripts = componentString.split('<script>');
    scriptContent = scripts[scripts.length - 1].split('</script>')[0].trim();
  } else {
    scriptContent = 'return {}';
  }
  if (!scriptContent || !scriptContent.trim()) scriptContent = 'return {}';

  scriptContent = `window.${callbackCreateName} = function () {${scriptContent}}`;

  // Insert Script El
  scriptEl = document.createElement('script');
  scriptEl.innerHTML = scriptContent;
  $('head').append(scriptEl);

  const component = window[callbackCreateName]();
  const isClassComponent = typeof component === 'function';

  // Remove Script El
  $(scriptEl).remove();
  window[callbackCreateName] = null;
  delete window[callbackCreateName];

  // Assign Template
  if (!component.template && !component.render) {
    component.template = template;
    component.templateType = templateType;
  }
  if (component.template) {
    if (component.templateType === 't7') {
      if (isClassComponent) {
        const templateFunction = Template7.compile(component.template);
        component.prototype.render = function render() {
          return templateFunction(this);
        };
      } else {
        component.template = Template7.compile(component.template);
      }
    }
    if (component.templateType === 'es') {
      const renderContent = `window.${callbackRenderName} = function () {
        return function render() {
          return \`${component.template}\`;
        }
      }`;
      scriptEl = document.createElement('script');
      scriptEl.innerHTML = renderContent;
      $('head').append(scriptEl);

      if (isClassComponent) {
        component.prototype.render = component.template;
      } else {
        component.render = window[callbackRenderName]();
      }

      // Remove Script El
      $(scriptEl).remove();
      window[callbackRenderName] = null;
      delete window[callbackRenderName];
    }
  }

  if (isClassComponent) {
    delete component.template;
    delete component.templateType;
  }

  // Assign Style
  if (style) {
    component.style = style;
    component.styleScoped = styleScoped;
  }

  // Component ID
  component.id = id;
  return component;
}

export default parseComponent;
