import { getWindow, getDocument } from 'ssr-window';
import $ from '../../shared/dom7.js';
import { id } from '../../shared/utils.js';

function parseComponent(componentString) {
  const window = getWindow();
  const document = getDocument();
  const componentId = id();
  const callbackCreateName = `f7_component_create_callback_${componentId}`;

  // Template
  let template;
  const hasTemplate = componentString.match(/<template([ ]?)([a-z0-9-]*)>/);
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

  if (componentString.indexOf('<style>') >= 0) {
    style = componentString.split('<style>')[1].split('</style>')[0];
  }
  if (componentString.indexOf('<style scoped>') >= 0) {
    style = componentString.split('<style scoped>')[1].split('</style>')[0];
  }

  // Parse Script
  let scriptContent;
  if (componentString.indexOf('<script>') >= 0) {
    const scripts = componentString.split('<script>');
    scriptContent = scripts[scripts.length - 1].split('</script>')[0].trim();
  } else {
    scriptContent = 'return () => {return $render}';
  }
  if (!scriptContent || !scriptContent.trim()) scriptContent = 'return () => {return $render}';

  // Parse Template
  if (template) {
    scriptContent = scriptContent
      .replace(
        '$render',
        `function ($$ctx) {
          var $ = $$ctx.$$;
          var $h = $$ctx.$h;
          var $root = $$ctx.$root;
          var $f7 = $$ctx.$f7;
          var $f7route = $$ctx.$f7route;
          var $f7router = $$ctx.$f7router;
          var $theme = $$ctx.$theme;
          var $update = $$ctx.$update;
          var $store = $$ctx.$store;
          var $ref = $$ctx.$ref;
          var $useState = $$ctx.$useState;

          return $h\`${template}\`
        }
        `,
      )
      .replace(/export default/g, 'return');
  }

  // Execute Script
  scriptContent = `window.${callbackCreateName} = function () {${scriptContent}}`;

  // Insert Script El
  const scriptEl = document.createElement('script');
  scriptEl.innerHTML = scriptContent;
  $('head').append(scriptEl);

  const component = window[callbackCreateName]();

  // Remove Script El
  $(scriptEl).remove();
  window[callbackCreateName] = null;
  delete window[callbackCreateName];

  // Assign Style
  if (style) {
    component.style = style;
  }

  // Component ID
  component.id = componentId;
  return component;
}

export default parseComponent;
