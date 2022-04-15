import Framework7 from 'framework7/lite/bundle';
import Framework7Svelte from 'framework7-svelte';
import App from './app.svelte';

import 'framework7/css/bundle';
import './css/app.css';

// Demo
if (window.parent && window.parent !== window) {
  const html = document.documentElement;
  if (html) {
    html.style.setProperty('--f7-safe-area-top', '44px');
    html.style.setProperty('--f7-safe-area-bottom', '34px');
  }
}

Framework7.use(Framework7Svelte);

// Init Svelte App
const app = new App({
  target: document.getElementById('app'),
});

export default app;
