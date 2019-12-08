import $ from 'dom7';
import Utils from './utils';
import ConstructorMethods from './constructor-methods';

export default function (parameters = {}) {
  const { defaultSelector, constructor, app } = parameters;
  const methods = Utils.extend(
    ConstructorMethods({
      defaultSelector,
      constructor,
      app,
      domProp: 'f7Modal',
    }),
    {
      open(el, animate) {
        const $el = $(el);
        if (!$el.length) return undefined;
        let instance = $el[0].f7Modal;
        if (!instance) instance = new constructor(app, { el: $el });
        return instance.open(animate);
      },
      close(el = defaultSelector, animate) {
        const $el = $(el);
        if (!$el.length) return undefined;
        let instance = $el[0].f7Modal;
        if (!instance) instance = new constructor(app, { el: $el });
        return instance.close(animate);
      },
    }
  );
  return methods;
}
