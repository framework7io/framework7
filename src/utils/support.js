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

let positionSticky = false;
function supportPositionSticky() {
  const div = document.createElement('div');
  ('sticky -webkit-sticky -moz-sticky').split(' ').forEach((prop) => {
    if (positionSticky) return;
    div.style.position = prop;
    if (div.style.position === prop) positionSticky = prop;
  });
}
supportPositionSticky();
function positionStickyFalsy() {
  let falsy = false;
  if (!positionSticky) return falsy;
  const div = document.createElement('div');
  div.innerHTML = `
    <div id="position-sticky-test" style="overflow:scroll; height: 100px; width:100px; position: absolute; left:0px; top:0px; padding-top:50px; visibility: hidden;">
      <div id="position-sticky-test-element" style="margin:0; padding:0; height:10px; width:100%; position:${positionSticky}; top:0"></div>
      <div style="height: 1000px"></div>
    </div>`;
  document.body.appendChild(div);
  document.getElementById('position-sticky-test').scrollTop = 50;
  if (document.getElementById('position-sticky-test-element').offsetTop === 50) {
    falsy = true;
  }
  div.parentNode.removeChild(div);
  return falsy;
}
const Support = {
  touch: supportTouch(),
  // Passive Listeners
  passiveListener: supportsPassiveListener(),
  positionSticky,
  positionStickyFalsy: positionStickyFalsy(),
};

export default Support;
