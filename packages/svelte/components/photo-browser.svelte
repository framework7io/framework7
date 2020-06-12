<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';

  import Utils from '../utils/utils';
  import f7 from '../utils/f7';

  const dispatch = createEventDispatcher();

  export let init = true;
  export let params = undefined;
  export let photos = undefined;
  export let exposition = true;
  export let expositionHideCaptions = false;
  export let type = undefined;
  export let navbar = true;
  export let toolbar = true;
  export let theme = undefined;
  export let captionsTheme = undefined;
  export let iconsColor = undefined;
  export let swipeToClose = true;
  export let pageBackLinkText = undefined;
  export let popupCloseLinkText = undefined;
  export let navbarOfText = undefined;
  export let navbarShowCount = undefined;
  export let swiper = undefined;
  export let url = undefined;
  export let routableModals = true;
  export let virtualSlides = true;
  export let view = undefined;
  export let renderNavbar = undefined;
  export let renderToolbar = undefined;
  export let renderCaption = undefined;
  export let renderObject = undefined;
  export let renderLazyPhoto = undefined;
  export let renderPhoto = undefined;
  export let renderPage = undefined;
  export let renderPopup = undefined;
  export let renderStandalone = undefined;

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

  let initialWatched = false;
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

  $: watchPhotos(photos);

  onMount(() => {
    if (!init) return;
    f7.ready(() => {
      let pbParams;

      if (typeof params !== 'undefined') pbParams = params;
      else {
        pbParams = {
          photos,
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
          popupCloseLinkText,
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
        };
      }

      Object.keys(pbParams).forEach((param) => {
        if (typeof pbParams[param] === 'undefined' || pbParams[param] === '') delete pbParams[param];
      });

      pbParams = Utils.extend({}, pbParams, {
        on: {
          open() {
            dispatch('photoBrowserOpen');
            if (typeof $$props.onPhotoBrowserOpen === 'function') $$props.onPhotoBrowserOpen();
          },
          close() {
            dispatch('photoBrowserClose');
            if (typeof $$props.onPhotoBrowserClose === 'function') $$props.onPhotoBrowserClose();
          },
          opened() {
            dispatch('photoBrowserOpened');
            if (typeof $$props.onPhotoBrowserOpened === 'function') $$props.onPhotoBrowserOpened();
          },
          closed() {
            dispatch('photoBrowserClosed');
            if (typeof $$props.onPhotoBrowserClosed === 'function') $$props.onPhotoBrowserClosed();
          },
          swipeToClose() {
            dispatch('photoBrowserSwipeToClose');
            if (typeof $$props.onPhotoBrowserSwipeToClose === 'function') $$props.onPhotoBrowserSwipeToClose();
          },
        },
      });

      f7PhotoBrowser = f7.instance.photoBrowser.create(pbParams);
    });
  });

  onDestroy(() => {
    if (f7PhotoBrowser && f7PhotoBrowser.destroy) f7PhotoBrowser.destroy();
  });
</script>
