const Support = (function Support() {
  const positionSticky = (function supportPositionSticky() {
    let support = false;
    const div = document.createElement('div');
    ('sticky -webkit-sticky -moz-sticky').split(' ').forEach((prop) => {
      if (support) return;
      div.style.position = prop;
      if (div.style.position === prop) {
        support = true;
      }
    });
    return support;
  }());

  return {
    positionSticky,
    touch: (function checkTouch() {
      return !!(('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch));
    }()),

    transforms3d: (function checkTransforms3d() {
      const div = document.createElement('div').style;
      return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
    }()),

    flexbox: (function checkFlexbox() {
      const div = document.createElement('div').style;
      const styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
      for (let i = 0; i < styles.length; i += 1) {
        if (styles[i] in div) return true;
      }
      return false;
    }()),

    observer: (function checkObserver() {
      return ('MutationObserver' in window || 'WebkitMutationObserver' in window);
    }()),

    passiveListener: (function checkPassiveListener() {
      let supportsPassive = false;
      try {
        const opts = Object.defineProperty({}, 'passive', {
          // eslint-disable-next-line
          get() {
            supportsPassive = true;
          },
        });
        window.addEventListener('testPassiveListener', null, opts);
      } catch (e) {
        // No support
      }
      return supportsPassive;
    }()),

    gestures: (function checkGestures() {
      return 'ongesturestart' in window;
    }()),
  };
}());

export default Support;
