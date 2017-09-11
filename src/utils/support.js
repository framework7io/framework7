function Support() {
  let positionStickyProp;
  const positionSticky = (function supportPositionSticky() {
    let support = false;
    const div = document.createElement('div');
    ('sticky -webkit-sticky -moz-sticky').split(' ').forEach((prop) => {
      if (support) return;
      div.style.position = prop;
      if (div.style.position === prop) {
        support = true;
        positionStickyProp = prop;
      }
    });
    return support;
  }());

  const positionStickyFalsy = (function positionStickyFalsy() {
    let falsy = false;
    if (!positionStickyProp) return false;
    const div = document.createElement('div');
    div.innerHTML = `
      <div id="position-sticky-test" style="overflow:scroll; height: 100px; width:100px; position: absolute; left:0px; top:0px; padding-top:50px; visibility: hidden;">
        <div id="position-sticky-test-element" style="margin:0; padding:0; height:10px; width:100%; position:${positionStickyProp}; top:0"></div>
        <div style="height: 1000px"></div>
      </div>`;
    document.body.appendChild(div);
    document.getElementById('position-sticky-test').scrollTop = 50;
    if (document.getElementById('position-sticky-test-element').offsetTop === 50) {
      falsy = true;
    }
    div.parentNode.removeChild(div);
    return falsy;
  }());

  return {
    positionSticky,
    positionStickyFalsy,
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
}
export default Support();
