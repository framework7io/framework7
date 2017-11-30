// Swiper Class
import Swiper from './components/core/core-class';

// Core Modules
import Device from './modules/device/device';
import Support from './modules/support/support';
import Browser from './modules/browser/browser';
import Resize from './modules/resize/resize';
import Observer from './modules/observer/observer';

// Components
import Virtual from './components/virtual/virtual';
import Navigation from './components/navigation/navigation';
import Pagination from './components/pagination/pagination';
import Scrollbar from './components/scrollbar/scrollbar';
import Parallax from './components/parallax/parallax';
import Zoom from './components/zoom/zoom';
import Lazy from './components/lazy/lazy';
import Controller from './components/controller/controller';
import A11y from './components/a11y/a11y';
import Autoplay from './components/autoplay/autoplay';
import EffectFade from './components/effect-fade/effect-fade';
import EffectCube from './components/effect-cube/effect-cube';
import EffectFlip from './components/effect-flip/effect-flip';
import EffectCoverflow from './components/effect-coverflow/effect-coverflow';

Swiper.use([
  Device,
  Browser,
  Support,
  Resize,
  Observer,
  Virtual,
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
]);

export default Swiper;
