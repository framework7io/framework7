import { useEffect } from 'react';

export const useRouteProps = (elRef, { routeProps } = {}) => {
  useEffect(() => {
    if (elRef.current) {
      elRef.current.f7RouteProps = routeProps;
    }
    return () => {
      if (elRef.current && elRef.current.f7RouteProps) {
        delete elRef.current.f7RouteProps;
      }
    };
  }, [routeProps]);
};
