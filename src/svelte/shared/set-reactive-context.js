// eslint-disable-next-line
import { setContext, beforeUpdate } from 'svelte';

export const setReactiveContext = (name, getValue) => {
  const contextCallbacks = [];
  const contextSubscribe = (callback) => {
    contextCallbacks.push(callback);
  };
  const contextUnsubscribe = (callback) => {
    if (contextCallbacks.indexOf(callback) >= 0) {
      contextCallbacks.splice(contextCallbacks.indexOf, callback);
    }
  };
  const contextRunCallbacks = () => {
    contextCallbacks.forEach((callback) => {
      callback(getValue());
    });
  };
  setContext(name, {
    value: getValue(),
    subscribe: contextSubscribe,
    unsubscribe: contextUnsubscribe,
  });
  beforeUpdate(() => {
    contextRunCallbacks();
  });
};
