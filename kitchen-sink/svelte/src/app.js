import Framework7 from 'framework7/lite/bundle';
import Framework7Svelte from 'framework7-svelte';
import App from './app.svelte';

import 'framework7/css/bundle';
import '../../core/css/app.css';

// Demo
if (document.location.href.includes('safe-areas')) {
  const html = document.documentElement;
  if (html) {
    html.style.setProperty('--f7-safe-area-top', '44px');
    html.style.setProperty('--f7-safe-area-bottom', '34px');
  }
}
if (document.location.search.indexOf('mode=') >= 0) {
  const mode = document.location.search.split('mode=')[1].split('&')[0];
  if (mode === 'dark') document.documentElement.classList.add('dark');
}
if (document.location.href.includes('example-preview')) {
  document.documentElement.classList.add('example-preview');
}

Framework7.use(Framework7Svelte);

// Init Svelte App
const app = new App({
  target: document.getElementById('app'),
});

export default app;
