function Support() {
  function supportsPassiveListener() {
    let supportsPassive = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() {
          supportsPassive = true;
        },
      });
      window.addEventListener('testPassiveListener', null, opts);
    } catch (e) {
      supportsPassive = false;
    }
    return supportsPassive;
  }
  return {
    // Touch
    touch: !!(('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch)),
    // Passive Listeners
    passiveListener: supportsPassiveListener(),
  };
}
export default {
  name: 'support',
  proto: {
    support: Support(),
  },
};
