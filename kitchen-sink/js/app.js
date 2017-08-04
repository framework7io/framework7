/* eslint-disable */

// Dom7
var $ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
  root: '#app',
  theme: theme,
  data: function data() {
    return {
      user: {
        firstName: 'Vladimir',
        lastName: 'Kharlampidi',
      },
    };
  },
  routes: routes,
});

// Add View
var view = app.views.create('.view-main');
