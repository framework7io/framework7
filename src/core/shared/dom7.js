// eslint-disable-next-line
import * as methods from 'dom7';

Object.keys(methods).forEach((methodName) => {
  if (methodName === '$') return;
  methods.$.fn[methodName] = methods[methodName];
});

export default methods.$;
