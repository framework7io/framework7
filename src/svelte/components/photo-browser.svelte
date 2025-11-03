<script>
  import { onMount, onDestroy } from 'svelte';

  import { extend } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';
  let {
    init = true,
    params = undefined,
    photos = undefined,
    thumbs = undefined,
    exposition = true,
    expositionHideCaptions = false,
    type = undefined,
    navbar = true,
    toolbar = true,
    theme = undefined,
    captionsTheme = undefined,
    iconsColor = undefined,
    swipeToClose = true,
    pageBackLinkText = undefined,
    navbarOfText = undefined,
    navbarShowCount = undefined,
    swiper = undefined,
    url = undefined,
    routableModals = false,
    virtualSlides = true,
    view = undefined,
    renderNavbar = undefined,
    renderToolbar = undefined,
    renderCaption = undefined,
    renderObject = undefined,
    renderLazyPhoto = undefined,
    renderPhoto = undefined,
    renderPage = undefined,
    renderPopup = undefined,
    renderStandalone = undefined,
    renderThumb = undefined,
    ...restProps
  } = $props();

  let f7PhotoBrowser;

  export function instance() {
    return f7PhotoBrowser;
  }

  export function open(index) {
    return f7PhotoBrowser.open(index);
  }
  export function close() {
    return f7PhotoBrowser.close();
  }
  export function expositionToggle() {
    return f7PhotoBrowser.expositionToggle();
  }
  export function expositionEnable() {
    return f7PhotoBrowser.expositionEnable();
  }
  export function expositionDisable() {
    return f7PhotoBrowser.expositionDisable();
  }

  let initialWatched = $state(false);
  function watchPhotos(newValue) {
    if (!initialWatched) {
      initialWatched = true;
      return;
    }
    if (!f7PhotoBrowser) return;
    f7PhotoBrowser.params.photos = newValue;
    if (f7PhotoBrowser.opened && f7PhotoBrowser.swiper) {
      f7PhotoBrowser.swiper.update();
    }
  }

  $effect(() => watchPhotos(photos));

  onMount(() => {
    if (!init) return;
    f7ready(() => {
      let pbParams;

      if (typeof params !== 'undefined') pbParams = params;
      else {
        pbParams = {
          photos,
          thumbs,
          exposition,
          expositionHideCaptions,
          type,
          navbar,
          toolbar,
          theme,
          captionsTheme,
          iconsColor,
          swipeToClose,
          pageBackLinkText,
          navbarOfText,
          navbarShowCount,
          swiper,
          url,
          routableModals,
          virtualSlides,
          view,
          renderNavbar,
          renderToolbar,
          renderCaption,
          renderObject,
          renderLazyPhoto,
          renderPhoto,
          renderPage,
          renderPopup,
          renderStandalone,
          renderThumb,
        };
      }

      Object.keys(pbParams).forEach((param) => {
        if (typeof pbParams[param] === 'undefined' || pbParams[param] === '')
          delete pbParams[param];
      });

      pbParams = extend({}, pbParams, {
        on: {
          open() {
            restProps.onPhotoBrowserOpen?.();
            restProps.onphotobrowseropen?.();
          },
          close() {
            restProps.onPhotoBrowserClose?.();
            restProps.onphotobrowserclose?.();
          },
          opened() {
            restProps.onPhotoBrowserOpened?.();
            restProps.onphotobrowseropened?.();
          },
          closed() {
            restProps.onPhotoBrowserClosed?.();
            restProps.onphotobrowserclosed?.();
          },
          swipeToClose() {
            restProps.onPhotoBrowserSwipeToClose?.();
            restProps.onphotobrowserswipetoclose?.();
          },
        },
      });

      f7PhotoBrowser = app.f7.photoBrowser.create(pbParams);
    });
  });

  onDestroy(() => {
    if (f7PhotoBrowser && f7PhotoBrowser.destroy) {
      f7PhotoBrowser.destroy();
      f7PhotoBrowser = null;
    }
  });
</script>
