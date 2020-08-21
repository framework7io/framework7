import React, { lazy, Suspense } from 'react';

export const useAsyncComponent = (component, key, props) => {
  const Component = lazy(component);
  return (
    <Suspense fallback={null} key={key}>
      <Component {...props} />
    </Suspense>
  );
};
