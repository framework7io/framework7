import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react';
import { f7events, f7routers, f7 } from '../shared/f7';

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
      setModals,
    };
    f7routers.modals = routerData.current;
  };

  const onDestroy = () => {
    if (!routerData.current) return;
    f7routers.modals = null;
    routerData.current = null;
  };

  useEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  useEffect(() => {
    if (!routerData.current || !f7) return;
    f7events.emit('modalsRouterDidUpdate', routerData.current);
  });

  return (
    <div ref={elRef} className="framework7-modals">
      {modals.map((modal) => {
        const ModalComponent = modal.component;
        return <ModalComponent key={modal.id} {...modal.props} />;
      })}
    </div>
  );
});

RoutableModals.displayName = 'f7-routable-modals';

export default RoutableModals;
