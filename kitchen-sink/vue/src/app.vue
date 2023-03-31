<template>
  <f7-app v-bind="f7Params">
    <f7-panel left floating resizable>
      <f7-view url="/panel-left/" links-view=".view-main"></f7-view>
    </f7-panel>
    <f7-panel right floating resizable>
      <f7-view url="/panel-right/"></f7-view>
    </f7-panel>
    <f7-view
      url="/"
      :main="true"
      class="safe-areas"
      :master-detail-breakpoint="768"
      :browser-history="needsBrowserHistory"
      :browser-history-root="needsBrowserHistory ? '/kitchen-sink/react/dist/' : ''"
      :preload-previous-page="!needsBrowserHistory"
      :ios-swipe-back="!needsBrowserHistory"
    ></f7-view>
  </f7-app>
</template>
<script>
import { f7App, f7Panel, f7View } from 'framework7-vue';
import routes from './routes';
import store from './store';

export default {
  components: {
    f7App,
    f7Panel,
    f7View,
  },
  data() {
    // Demo Theme
    let theme = 'auto';
    if (document.location.search.indexOf('theme=') >= 0) {
      theme = document.location.search.split('theme=')[1].split('&')[0];
    }

    const needsBrowserHistory = document.location.href.includes('example-preview');

    return {
      needsBrowserHistory,
      f7Params: {
        theme,
        routes,
        store,
        popup: {
          closeOnEscape: true,
        },
        sheet: {
          closeOnEscape: true,
        },
        popover: {
          closeOnEscape: true,
        },
        actions: {
          closeOnEscape: true,
        },
      },
    };
  },
};
</script>
