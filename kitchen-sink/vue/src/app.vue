<template>
  <f7-app :params="f7Params">
    <f7-statusbar></f7-statusbar>
    <f7-panel left cover resizable>
      <f7-view url="/panel-left/" links-view=".view-main"></f7-view>
    </f7-panel>
    <f7-panel right reveal resizable>
      <f7-view url="/panel-right/"></f7-view>
    </f7-panel>
    <f7-view url="/" :main="true" class="safe-areas" :master-detail-breakpoint="800"></f7-view>
  </f7-app>
</template>
<script>
  import { f7App, f7Panel, f7View, f7Statusbar } from 'framework7-vue';
  import routes from './routes';

  export default {
    components: {
      f7App,
      f7Panel,
      f7View,
      f7Statusbar,
    },
    data() {
      // Demo Theme
      let theme = 'auto';
      if (document.location.search.indexOf('theme=') >= 0) {
        theme = document.location.search.split('theme=')[1].split('&')[0];
      }

      return {
        f7Params: {
          id: 'io.framework7.testapp',
          theme,
          routes,
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
