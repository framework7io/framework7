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
function supportTouch() {
  return !!(('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch));
}
function Support() {
  return {
    // Touch
    touch: supportTouch(),
    // Passive Listeners
    passiveListener: supportsPassiveListener(),
  };
}
export default Support();
