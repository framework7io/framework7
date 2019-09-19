// Swiper Class
import Swiper from './swiper-src/components/core/core-class';

// Core Modules
import Device from './swiper-src/modules/device/device';
import Support from './swiper-src/modules/support/support';
import Browser from './swiper-src/modules/browser/browser';
import Resize from './swiper-src/modules/resize/resize';
import Observer from './swiper-src/modules/observer/observer';

// Components
import Virtual from './swiper-src/components/virtual/virtual';
import Keyboard from './swiper-src/components/keyboard/keyboard';
import Mousewheel from './swiper-src/components/mousewheel/mousewheel';
import Navigation from './swiper-src/components/navigation/navigation';
import Pagination from './swiper-src/components/pagination/pagination';
import Scrollbar from './swiper-src/components/scrollbar/scrollbar';
import Parallax from './swiper-src/components/parallax/parallax';
import Zoom from './swiper-src/components/zoom/zoom';
import Lazy from './swiper-src/components/lazy/lazy';
import Controller from './swiper-src/components/controller/controller';
import A11y from './swiper-src/components/a11y/a11y';
import Autoplay from './swiper-src/components/autoplay/autoplay';
import EffectFade from './swiper-src/components/effect-fade/effect-fade';
import EffectCube from './swiper-src/components/effect-cube/effect-cube';
import EffectFlip from './swiper-src/components/effect-flip/effect-flip';
import EffectCoverflow from './swiper-src/components/effect-coverflow/effect-coverflow';
import Thumbs from './swiper-src/components/thumbs/thumbs';

Swiper.use([
  Device,
  Browser,
  Support,
  Resize,
  Observer,
  Virtual,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
  Parallax,
  Zoom,
  Lazy,
  Controller,
  A11y,
  Autoplay,
  EffectFade,
  EffectCube,
  EffectFlip,
  EffectCoverflow,
  Thumbs,
]);

export default Swiper;
