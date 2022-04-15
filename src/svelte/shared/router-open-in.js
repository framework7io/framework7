import RouterOpenInComponent from './router-open-in-component.svelte';

export const routerOpenIn = (router, url, options) => {
  const navigateOptions = {
    url,
    route: {
      path: url,
      options: {
        ...options,
        openIn: undefined,
        props: {
          ...(options.props || {}),
          url,
          openIn: options.openIn,
          viewSelector: router.view.selector,
        },
      },
    },
  };

  const params = {
    ...options,
  };
  params.component = RouterOpenInComponent;
  if (options.openIn === 'popup') {
    navigateOptions.route.popup = params;
  }
  if (options.openIn === 'loginScreen') {
    navigateOptions.route.loginScreen = params;
  }
  if (options.openIn === 'sheet') {
    navigateOptions.route.sheet = params;
  }
  if (options.openIn === 'popover') {
    params.targetEl = options.clickedEl || options.targetEl;
    navigateOptions.route.popover = params;
    navigateOptions.route.options.props.targetEl = params.targetEl;
  }
  if (options.openIn.indexOf('panel') >= 0) {
    const parts = options.openIn.split(':');
    navigateOptions.route.options.props.side = parts[1] || 'left';
    navigateOptions.route.options.props.effect = parts[2] || 'cover';
    navigateOptions.route.panel = params;
  }
  return router.navigate(navigateOptions);
};
