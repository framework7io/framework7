// eslint-disable-next-line
import { getContext, onDestroy } from 'svelte';

export const getReactiveContext = (name, setValue) => {
  const ctx = getContext(name);
  if (!ctx) return undefined;
  const { value, subscribe, unsubscribe } = ctx;
  subscribe(setValue);
  onDestroy(() => {
    unsubscribe(setValue);
  });
  return value;
};
