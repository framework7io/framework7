/* eslint import/no-named-as-default: off */
import { init } from './snabbdom/snabbdom';
import attributesModule from './snabbdom/modules/attributes';
import propsModule from './snabbdom/modules/props';
import styleModule from './snabbdom/modules/style';
import eventListenersModule from './eventslisteners';

const patch = init([
  attributesModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

export default patch;
