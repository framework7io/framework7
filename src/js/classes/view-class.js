import $ from 'dom7';
import Use from '../utils/use';
import Events from '../modules/events';
import Router from '../modules/router';
import Utils from '../utils/utils';

class View {
  constructor(app, el, viewParams) {
    const view = this;
    const $el = $(el);

    const defaults = {
      name: undefined,
      main: false,
      routes: [],
      linksView: undefined,
    };

    // Default View params
    view.params = Utils.extend(defaults, viewParams);

    // View Props
    Utils.extend(view, {
      $el,
      el: $el[0],
      name: view.params.name,
      main: view.params.main || $el.hasClass(app.params.viewMainClass),
      pagesEl: $el.find('.pages')[0],

    });

    $el[0].f7View = view;

    // Install Modules
    view.useInstanceModules({
      events: {
        parents: [app],
      },
      router: {
        app,
      },
    });

    return view;
  }
}

// Use Events and Router
Use(View).use(Events).use(Router);


export default View;
