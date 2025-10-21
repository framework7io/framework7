import { getDocument } from 'ssr-window';

const startAnimation = (data) => {
  data.raf = requestAnimationFrame(() => {
    if (!data.setTransform) return;
    const highlightEl = data.highlightEl;
    if (!highlightEl) return;
    highlightEl.style.transform = data.setTransform;
    highlightEl.style.transitionTimingFunction = 'ease-out';
    data.setTransform = null;
  });
};

const stopAnimation = (data) => {
  cancelAnimationFrame(data.raf);
};

const setHighlightOnTouch = (data, e) => {
  const { rect, linkEls, highlightEl } = data;
  if (!highlightEl) return;
  const { clientX } = e;
  const highlightWidth = rect.width / linkEls.length;
  const leftOffset = clientX - rect.left - highlightWidth / 2;
  const minLeft = 0;
  const maxLeft = rect.width - highlightWidth;
  const translateX = Math.max(minLeft, Math.min(leftOffset, maxLeft));
  const linkCenters = [...linkEls].map((el, index) => {
    return index * highlightWidth + highlightWidth / 2;
  });

  const closestLinkCenter = linkCenters.reduce((prev, curr) => {
    const highlightCenter = translateX + highlightWidth / 2;
    return Math.abs(curr - highlightCenter) < Math.abs(prev - highlightCenter) ? curr : prev;
  }, linkCenters[0]);
  const closestLinkIndex = linkCenters.indexOf(closestLinkCenter);
  data.newActiveIndex = closestLinkIndex;
  highlightEl.classList.add('tab-link-highlight-pressed');

  data.setTransform = `translateX(${translateX}px)`;
  startAnimation(data);
};

const unsetHighlightOnTouch = (data) => {
  cancelAnimationFrame(data.raf);
  data.setTransform = null;
  const { highlightEl } = data;
  if (!highlightEl) return;
  highlightEl.classList.remove('tab-link-highlight-pressed');
  const { activeIndex, newActiveIndex, linkEls } = data;
  if (activeIndex !== newActiveIndex) {
    linkEls[newActiveIndex].click();
  }
  highlightEl.style.transform = `translateX(${newActiveIndex * 100}%)`;
  highlightEl.style.transitionTimingFunction = '';
  highlightEl.style.transform = `translateX(${newActiveIndex * 100}%)`;
};

export const initTabbarHighlight = (el) => {
  const document = getDocument();
  if (!el) return;
  if (el.classList.contains('tabbar-scrollable')) {
    return;
  }
  const highlightEl = el.querySelector('.tab-link-highlight');
  const toolbarPaneEl = el.querySelector('.toolbar-pane');
  if (!highlightEl || !toolbarPaneEl) return;
  const data = {
    el,
    highlightEl,
    touched: false,
    moved: false,
    rect: null,
    setTransform: null,
    raf: null,
  };
  el.f7ToolbarHighlightData = data;
  el.f7ToolbarOnPointer = (e) => {
    if (e.type === 'touchstart') {
      e.preventDefault();
    }
    if (e.pointerType !== 'touch') return;
    if (!el) return;

    if (e.type === 'pointerdown') {
      data.linkEls = el.querySelectorAll('.tab-link');
      data.rect = toolbarPaneEl.getBoundingClientRect();
      data.touched = true;
      setHighlightOnTouch(data, e);
      startAnimation(data);
    }
    if (e.type === 'pointermove') {
      if (!data.touched) return;
      data.moved = true;
      setHighlightOnTouch(data, e);
    }
    if (e.type === 'pointerup') {
      if (!data.touched) return;
      data.touched = false;
      data.moved = false;
      unsetHighlightOnTouch(data);
      stopAnimation(data);
    }
  };
  el.addEventListener('touchstart', el.f7ToolbarOnPointer, { passive: false });
  el.addEventListener('pointerdown', el.f7ToolbarOnPointer, { passive: false });
  document.addEventListener('pointermove', el.f7ToolbarOnPointer, { passive: false });
  document.addEventListener('pointerup', el.f7ToolbarOnPointer, { passive: false });
  document.addEventListener('pointercancel', el.f7ToolbarOnPointer, { passive: false });
};

export const destroyTabbarHighlight = (el) => {
  if (!el || !el.f7ToolbarOnPointer) return;
  const document = getDocument();
  el.removeEventListener('touchstart', el.f7ToolbarOnPointer);
  el.removeEventListener('pointerdown', el.f7ToolbarOnPointer);
  document.removeEventListener('pointermove', el.f7ToolbarOnPointer);
  document.removeEventListener('pointerup', el.f7ToolbarOnPointer);
  document.removeEventListener('pointercancel', el.f7ToolbarOnPointer);
  el.f7ToolbarOnPointer = null;
  el.f7ToolbarHighlightData = null;
};
