/* eslint import/no-named-as-default: off */
import { init } from './snabbdom/snabbdom.js';
import attributesModule from './snabbdom/modules/attributes.js';
import propsModule from './snabbdom/modules/props.js';
import styleModule from './snabbdom/modules/style.js';
import eventListenersModule from './eventslisteners.js';

const patch = init([attributesModule, propsModule, styleModule, eventListenersModule]);

export default patch;
