/* eslint import/no-extraneous-dependencies: "off" */
import Vue from 'vue';
import Framework7 from '../../../core/framework7.esm.bundle';
import Framework7Vue from 'framework7-vue';
import App from './app.vue';

Framework7.use(Framework7Vue, { Vue });

// Init Vue App
export default new Vue({
  // Root Element
  el: '#app',
  render: c => c(App),
});
