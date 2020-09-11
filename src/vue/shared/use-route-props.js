import { onMounted, onUpdated } from 'vue';

export const useRouteProps = (elRef, { routeProps } = {}) => {
  onMounted(() => {
    if (elRef.value && routeProps) {
      elRef.value.f7RouteProps = routeProps;
    }
  });
  onUpdated(() => {
    if (elRef.value && routeProps) {
      elRef.value.f7RouteProps = routeProps;
    } else if (elRef.value && elRef.value.f7RouteProps) {
      delete elRef.value.f7RouteProps;
    }
  });
};
