import t7 from 'template7';
import $ from 'dom7';

import Framework7 from './framework7-class';
import Use from './use';

import Device from './device';
import Support from './support';
import Events from './events';
import Touch from './touch';

import Demo from './demo-module';

// Modules Install
Framework7.use = Use.bind(Framework7);
Framework7.prototype.modules = {};

// Template7
Framework7.prototype.t7 = t7;

// Dom7
Framework7.prototype.$ = $;

// Device
Framework7.use(Device);

// Support
Framework7.use(Support);

// Events
Framework7.use(Events);

// Touch
Framework7.use(Touch);

// Demo Module
// Framework7.use(Demo, { foo: 'bar' });

export default Framework7;
