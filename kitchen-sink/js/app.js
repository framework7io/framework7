var $ = Dom7;
var app = new Framework7({
  root: '#app',
  data: function data() {
    return {
      user: {
        firstName: 'Vladimir',
        lastName: 'Kharlampidi',
      },
    };
  },
  on: {
    // routerAjaxStart() {
    //   this.progressbar.show();
    // },
    // routerAjaxComplete() {
    //   this.progressbar.hide();
    // },
    routeChanged: function (to, from) {
      // console.log(to, from)
    },
    // pageBeforeRemove(page) {
    //   console.log('pageBeforeRemove', page.name);
    // },
    // pageBeforeInit(page) {
    //   console.log('pageBeforeInit', page.name);
    // },
    pageInit: function (page) {
      // console.log('pageInit', page);
    },
    // pageBeforeIn(page) {
    //   console.log('pageBeforeIn', page.name, page.direction);
    // },
    // pageAfterIn(page) {
    //   console.log('pageAfterIn', page.name, page.direction);
    // },
    // pageBeforeOut(page) {
    //   console.log('pageBeforeOut', page.name, page.direction);
    // },
    // pageAfterOut(page) {
    //   console.log('pageAfterOut', page.name, page.direction);
    // },
    // init() {
    //   console.log('app init');
    // },
  },
  routes: routes,
});

var view = app.view.create('.view-main', {
  main: true,
  url: '/',
});
