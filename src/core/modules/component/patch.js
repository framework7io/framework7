/* eslint import/no-named-as-default: off */
import { init } from './snabbdom/snabbdom';
import attributesModule from './snabbdom/modules/attributes';
import propsModule from './snabbdom/modules/props';
import eventListenersModule from './eventslisteners';

const patch = init([
  attributesModule,
  propsModule,
  eventListenersModule,
]);

export default patch;
