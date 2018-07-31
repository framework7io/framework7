import { window, document } from 'ssr-window';
import $ from 'dom7';
import Utils from '../../utils/utils';

let counter = 0;

function parseComponent(componentString) {
  const id = `${Utils.now()}${counter}`;
  const callbackName = `f7_component_create_callback_${id}`;

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
  counter += 1;
  if (componentString.indexOf('<style>') >= 0) {
    style = componentString.split('<style>')[1].split('</style>')[0];
  } else if (componentString.indexOf('<style scoped>') >= 0) {
    styleScoped = true;
    style = componentString.split('<style scoped>')[1].split('</style>')[0];
    style = style.split('\n').map((line) => {
      if (line.indexOf('{') >= 0) {
        if (line.indexOf('{{this}}') >= 0) {
          return line.replace('{{this}}', `[data-scope="${id}"]`);
        }
        return `[data-scope="${id}"] ${line.trim()}`;
      }
      return line;
    }).join('\n');
  }

  // Parse Script
  let scriptContent;
  if (componentString.indexOf('<script>') >= 0) {
    const scripts = componentString.split('<script>');
    scriptContent = scripts[scripts.length - 1].split('</script>')[0].trim();
  } else {
    scriptContent = 'return {}';
  }
  scriptContent = `window.${callbackName} = function () {${scriptContent}}`;

  // Insert Script El
  const scriptEl = document.createElement('script');
  scriptEl.innerHTML = scriptContent;
  $('head').append(scriptEl);

  const component = window[callbackName]();

  // Remove Script El
  $(scriptEl).remove();
  window[callbackName] = null;
  delete window[callbackName];

  // Assign Template
  if (!component.template && !component.render) {
    component.template = template;
    component.templateType = templateType;
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
