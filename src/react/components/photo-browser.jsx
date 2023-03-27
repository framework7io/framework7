import { forwardRef, useRef, useImperativeHandle } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect.js';
import { extend, emit } from '../shared/utils.js';
import { watchProp } from '../shared/watch-prop.js';
import { f7ready, f7 } from '../shared/f7.js';

/* dts-imports
import { PhotoBrowser } from 'framework7/types';
*/

/* dts-props
  init? : boolean
  params? : Object
  photos? : Array<any>
  thumbs? : Array<any>
  exposition? : boolean
  expositionHideCaptions? : boolean
  type? : string
  navbar? : boolean
  toolbar? : boolean
  theme? : string
  captionsTheme? : string
  iconsColor? : string
  swipeToClose? : boolean
  pageBackLinkText? : string
  popupCloseLinkIcon? : boolean
  popupCloseLinkText? : string
  navbarOfText? : string
  navbarShowCount? : boolean
  swiper? : Object
  url? : string
  routableModals? : boolean
  virtualSlides? : boolean
  view? : string | object
  renderNavbar? : Function
  renderToolbar? : Function
  renderCaption? : Function
  renderObject? : Function
  renderLazyPhoto? : Function
  renderPhoto? : Function
  renderPage? : Function
  renderPopup? : Function
  renderStandalone? : Function
  renderThumb?: Function
  onPhotoBrowserOpen? : (...args: any[]) => void
  onPhotoBrowserClose? : (...args: any[]) => void
  onPhotoBrowserOpened? : (...args: any[]) => void
  onPhotoBrowserClosed? : (...args: any[]) => void
  onPhotoBrowserSwipeToClose? : (...args: any[]) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null; f7PhotoBrowser: () => PhotoBrowser.PhotoBrowser; open: () => void; close: () => void;}>;
  children?: React.ReactNode;
*/

const PhotoBrowser = forwardRef((props, ref) => {
  const f7PhotoBrowser = useRef(null);
  const {
    init = true,
    params,
    photos,
    thumbs,
    exposition = true,
    expositionHideCaptions = false,
    type,
    navbar = true,
    toolbar = true,
    theme,
    captionsTheme,
    iconsColor,
    swipeToClose = true,
    pageBackLinkText,
    popupCloseLinkIcon,
    popupCloseLinkText,
    navbarOfText,
    navbarShowCount,
    swiper,
    url,
    routableModals = false,
    virtualSlides = true,
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
  } = props;

  const open = (index) => {
    return f7PhotoBrowser.current.open(index);
  };
  const close = () => {
    return f7PhotoBrowser.current.close();
  };
  const expositionToggle = () => {
    return f7PhotoBrowser.current.expositionToggle();
  };
  const expositionEnable = () => {
    return f7PhotoBrowser.current.expositionEnable();
  };
  const expositionDisable = () => {
    return f7PhotoBrowser.current.expositionDisable();
  };

  useImperativeHandle(ref, () => ({
    f7PhotoBrowser: () => f7PhotoBrowser.current,
    open,
    close,
    expositionToggle,
    expositionEnable,
    expositionDisable,
  }));

  watchProp(photos, (newValue) => {
    const pb = f7PhotoBrowser.current;
    if (!pb) return;
    pb.params.photos = newValue;
    if (pb.opened && pb.swiper) {
      pb.swiper.update();
    }
  });
  watchProp(thumbs, (newValue) => {
    const pb = f7PhotoBrowser.current;
    if (!pb) return;
    pb.params.thumbs = newValue;
    if (pb.opened && pb.thumbsSwiper) {
      pb.thumbsSwiper.update();
    }
  });

  const onMount = () => {
    if (!init) return;
    f7ready(() => {
      let paramsComputed;

      if (typeof params !== 'undefined') {
        paramsComputed = params;
      } else {
        paramsComputed = {
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
          popupCloseLinkText,
          popupCloseLinkIcon,
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

      Object.keys(paramsComputed).forEach((param) => {
        if (typeof paramsComputed[param] === 'undefined' || paramsComputed[param] === '')
          delete paramsComputed[param];
      });

      paramsComputed = extend({}, paramsComputed, {
        on: {
          open() {
            emit(props, 'photoBrowserOpen');
          },
          close() {
            emit(props, 'photoBrowserClose');
          },
          opened() {
            emit(props, 'photoBrowserOpened');
          },
          closed() {
            emit(props, 'photoBrowserClosed');
          },
          swipeToClose() {
            emit(props, 'photoBrowserSwipeToClose');
          },
        },
      });

      f7PhotoBrowser.current = f7.photoBrowser.create(paramsComputed);
    });
  };

  const onDestroy = () => {
    if (f7PhotoBrowser.current && f7PhotoBrowser.current.destroy) f7PhotoBrowser.current.destroy();
    f7PhotoBrowser.current = null;
  };

  useIsomorphicLayoutEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  return null;
});

PhotoBrowser.displayName = 'f7-photo-browser';

export default PhotoBrowser;
