import Framework7 from 'framework7/lite-bundle';
import Framework7Svelte from 'framework7-svelte';
import App from './app.svelte';

import 'framework7/framework7-bundle.css';
import './css/app.css';

Framework7.use(Framework7Svelte);

// Init Svelte App
const app = new App({
  target: document.getElementById('app'),
});

export default app;
