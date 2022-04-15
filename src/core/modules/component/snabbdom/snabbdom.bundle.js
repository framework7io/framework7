import { init } from './snabbdom.js';
import { attributesModule } from './modules/attributes.js'; // for setting attributes on DOM elements
import { classModule } from './modules/class.js'; // makes it easy to toggle classes
import { propsModule } from './modules/props.js'; // for setting properties on DOM elements
import { styleModule } from './modules/style.js'; // handles styling on elements with support for animations
import { eventListenersModule } from './modules/eventlisteners.js'; // attaches event listeners
import { h } from './h.js'; // helper function for creating vnodes
var patch = init([
    attributesModule,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule
]);
export var snabbdomBundle = { patch: patch, h: h };
export default snabbdomBundle;
//# sourceMappingURL=snabbdom.bundle.js.map
