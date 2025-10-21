import { getDocument } from 'ssr-window';

const initTouchHighlight = (app) => {
  const document = getDocument();
  const isEnabled = app.params.touch.touchHighlight;
  const elements = app.params.touch.touchHighlightElements;
  const data = {};
  const offset = 1;
  const opacity = 1;
  const zIndex = 500;

  const removeHoverHighlight = () => {
    const el = data.currentEl;
    if (el && data.elScale) {
      data.elScale = false;
      el.style.scale = '';

      const onTransitionEnd = () => {
        el.style.transitionDuration = '';
        el.style.transitionTimingFunction = '';
        el.removeEventListener('transitionend', onTransitionEnd);
      };
      el.addEventListener('transitionend', onTransitionEnd);
    }

    if (data.lightElWrap) {
      const lightElWrap = data.lightElWrap;
      if (lightElWrap.style.opacity === '0') {
        lightElWrap.remove();
      } else {
        lightElWrap.addEventListener('transitionend', () => {
          lightElWrap.remove();
        });
        lightElWrap.style.opacity = 0;
      }
    }
    data.currentEl = null;
    data.lightElWrap = null;
    data.lightEl = null;
  };

  const setLightPosition = (e) => {
    if (data.lightEl) {
      const { x, y } = e;
      const offsetX = x - data.rect.x;
      const offsetY = y - data.rect.y;
      data.lightEl.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
    }
  };

  const onPointerMove = (e) => {
    if (!isEnabled) return;
    setLightPosition(e);
  };
  const onPointerLeave = () => {
    if (!isEnabled) return;
    removeHoverHighlight();
  };

  const onPointerDown = (e) => {
    if (!isEnabled) return;

    if (e.pointerType === 'mouse') return;
    const d = data;
    const el = e.target.closest(elements);
    if (!el) return;
    if (d.currentEl === el) return;
    d.currentEl = el;

    d.rect = el.getBoundingClientRect();
    const lightElWrap = document.createElement('span');
    lightElWrap.className = 'rounded-[inherit]';
    lightElWrap.style = `left: ${offset}px; top: ${offset}px; right: ${offset}px; bottom: ${offset}px;transition-duration: 300ms; opacity: 0; position: absolute; overflow: hidden; pointer-events: none; border-radius: inherit;`;
    const lightEl = document.createElement('span');
    const { width, height } = d.rect;
    const radius = (width ** 2 + height ** 2) ** 0.5;
    lightEl.style.position = `absolute`;
    lightEl.style.zIndex = zIndex;
    lightEl.style.width = `${radius * 2}px`;
    lightEl.style.left = `${-radius}px`;
    lightEl.style.height = `${radius * 2}px`;
    lightEl.style.top = `${-radius}px`;
    lightEl.style.borderRadius = `50%`;
    const lightColor = 'var(--f7-touch-highlight-bg-color)';

    lightEl.style.backgroundImage = `radial-gradient(circle at center, color-mix(in oklab, ${lightColor} ${
      opacity * 100
    }%, transparent), transparent 50%)`;

    lightEl.style.pointerEvents = 'none';
    d.lightEl = lightEl;
    d.lightElWrap = lightElWrap;
    setLightPosition(e);
    lightElWrap.append(lightEl);
    el.append(lightElWrap);
    if (e.pointerType !== 'mouse') {
      if (e.pointerType !== 'mouse') {
        d.elScale = true;
        let scale = 1.25;
        if (d.rect.width > 60 || d.rect.height > 60) {
          scale = 1.05;
        }
        el.style.scale = scale;
        el.style.transitionDuration = '300ms';
        el.style.transitionTimingFunction = 'ease-in-out';
      }
    }
    requestAnimationFrame(() => {
      lightElWrap.style.opacity = 1;
    });
    el.removeEventListener('pointermove', onPointerMove);
    el.removeEventListener('pointerleave', onPointerLeave);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerleave', onPointerLeave);
  };

  document.addEventListener('pointerdown', onPointerDown, { capture: true });
  document.addEventListener('contextmenu', onPointerLeave, { capture: true });
};

export default {
  name: 'touch-highlight',
  on: {
    init() {
      initTouchHighlight(this);
    },
  },
};
