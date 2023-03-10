// Dom7
var $ = Dom7;

// Demo
if (
  window.parent &&
  window !== window.parent &&
  (window.document.referrer === 'https://framework7.io' ||
    window.document.referrer === 'https://framework7.io/' ||
    window.document.referrer === 'http://localhost:3001' ||
    window.document.referrer === 'http://localhost:3001/')
) {
  const html = document.documentElement;
  if (html) {
    html.style.setProperty('--f7-safe-area-top', '44px');
    html.style.setProperty('--f7-safe-area-bottom', '34px');
  }
} else if (
  document.location.host.includes('framework7.io') ||
  document.location.host.includes('localhost:3001')
) {
  $('.view-main').attr('data-browser-history', 'true');
  $('.view-main').attr('data-browser-history-root', '/kitchen-sink/core/');
}

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
  id: 'io.framework7.testapp',
  el: '#app',
  theme,
  // store.js,
  store: store,
  // routes.js,
  routes: routes,
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
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
});
