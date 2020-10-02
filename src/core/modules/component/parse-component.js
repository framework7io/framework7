import { getWindow, getDocument } from 'ssr-window';
import $ from '../../shared/dom7';
import { id } from '../../shared/utils';

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
  let styleScoped = false;

  if (componentString.indexOf('<style>') >= 0) {
    style = componentString.split('<style>')[1].split('</style>')[0];
  } else if (componentString.indexOf('<style scoped>') >= 0) {
    styleScoped = true;
    style = componentString.split('<style scoped>')[1].split('</style>')[0];
    style = style
      .replace(/{{this}}/g, `[data-f7-${componentId}]`)
      .replace(/[\n]?([^{^}]*){/gi, (string, rules) => {
        if (rules.indexOf('"') >= 0 || rules.indexOf("'") >= 0) return string;
        // eslint-disable-next-line
        rules = rules
          .split(',')
          .map((rule) => {
            if (rule.indexOf('@') >= 0) return rule;
            if (rule.indexOf(`[data-f7-${componentId}]`) >= 0) return rule;
            return `[data-f7-${componentId}] ${rule.trim()}`;
          })
          .join(', ');

        return `\n${rules} {`;
      });
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
    component.styleScoped = styleScoped;
  }

  // Component ID
  component.id = componentId;
  return component;
}

export default parseComponent;
