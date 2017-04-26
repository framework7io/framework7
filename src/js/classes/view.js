import $ from 'dom7';
import Use from '../utils/use';
import Events from '../modules/events';
import Router from '../classes/router';
import Utils from '../utils/utils';

class View {
  constructor(app, el, viewParams) {
    const view = this;
    const $el = $(el);

    // Default View params
    view.params = Utils.extend({
      name: undefined,
      main: false,
    }, viewParams);

    Utils.extend(view, {
      $el,
      el: $el[0],
      name: view.params.name,
      main: view.params.main || $el.hasClass(app.params.viewMainClass),
      router: new Router(app, view),
    });

    $el[0].f7View = view;

    return view;
  }
}

// Use Events
Use(View).use(Events);


export default View;
