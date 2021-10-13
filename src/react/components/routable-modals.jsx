import React, { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect.js';
import { f7events, f7routers, f7 } from '../shared/f7.js';

/* dts-props
 */

const RoutableModals = forwardRef((props, ref) => {
  const [modals, setModals] = useState([]);

  const elRef = useRef(null);
  const routerData = useRef(null);

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const onMount = () => {
    routerData.current = {
      modals,
      el: elRef.current,
      setModals(newModals) {
        setModals([...newModals]);
      },
    };
    f7routers.modals = routerData.current;
  };

  const onDestroy = () => {
    if (!routerData.current) return;
    f7routers.modals = null;
    routerData.current = null;
  };

  useIsomorphicLayoutEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!routerData.current || !f7) return;
    f7events.emit('modalsRouterDidUpdate', routerData.current);
  });

  return (
    <div ref={elRef} className="framework7-modals">
      {modals.map(({ component: ModalComponent, id: modalId, props: modalProps }) => {
        return <ModalComponent key={modalId} {...modalProps} />;
      })}
    </div>
  );
});

RoutableModals.displayName = 'f7-routable-modals';

export default RoutableModals;
