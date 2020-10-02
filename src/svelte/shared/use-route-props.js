export const useRouteProps = (el, routeProps) => {
  if (el && routeProps) {
    el.f7RouteProps = routeProps;
  }

  return {
    update(newValue) {
      if (el && el.f7RouteProps && !newValue) delete el.f7RouteProps;
      else if (el && newValue) el.f7RouteProps = newValue;
    },
    destroy() {
      if (el && routeProps) {
        delete el.f7RouteProps;
      }
    },
  };
};
