import React, { useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect.js';
import { f7events, f7routers, f7 } from '../shared/f7.js';
import { setRef } from '../shared/set-ref.js';
/* dts-props
 */

const RoutableModals = (props) => {
  const { ref } = props;
  const [modals, setModals] = useState([]);

  const elRef = useRef(null);
  const routerData = useRef(null);

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
    <div
      ref={(el) => {
        elRef.current = el;
        setRef(ref, el);
      }}
      className="framework7-modals"
    >
      {modals.map(({ component: ModalComponent, id: modalId, props: modalProps }) => {
        return <ModalComponent key={modalId} {...modalProps} />;
      })}
    </div>
  );
};

RoutableModals.displayName = 'f7-routable-modals';

export default RoutableModals;
