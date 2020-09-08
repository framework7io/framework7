import {createApp} from 'vue';
import Framework7 from 'framework7/lite-bundle';
import Framework7Vue from 'framework7-vue';
import App from './app.vue';

Framework7.use(Framework7Vue);

// Init Vue App
const app = createApp(App);

app.mount('#app');
