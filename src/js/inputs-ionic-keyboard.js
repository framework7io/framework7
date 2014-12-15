/*======================================================
 ************  Ionic Keyboard + Inputs  ************
 ======================================================*/
app.initIonicKeyboardInputs = function(pageContainer) {
  pageContainer = $(pageContainer);
  var inputs = pageContainer.find('.page-content').parents('.page').find('input, select, textarea:not("#messaging")');
  if (inputs.length === 0) return;
  var pageContent = pageContainer.find('.page-content');
  pageContent.css('transition', 'padding-bottom 200ms linear');
  var initialPadding = parseInt(pageContent.css('padding-bottom'), 10);
  var isKeyboardOpen = false;
  // guess initial height until keyboard is opened -- TODO: estimate better height by device OS -- maybe by a function
  var keyboardHeight = pageContent.outerHeight()/2;
  var notStopped = true;
  var aE = null;

  function keyboardClose() {
    if (notStopped) {
      setTimeout(function(){
        aE = document.activeElement;
        if (isKeyboardOpen && aE) aE.blur();
      }, 10);
    }
  }

  function keyboardShowHandler(e) {
    if (notStopped) {
      notStopped = false;
      pageContent.css('padding-bottom', e.keyboardHeight + initialPadding + 'px');
      setTimeout(function () {
        pageContent.scrollTop(pageContent[0].scrollHeight - pageContent[0].offsetHeight, 200);
      }, 300);
      setTimeout(function(){
        notStopped = true;
      }, 750);
      isKeyboardOpen = true;
      setTimeout(function () {
        keyboardHeight = e.keyboardHeight;
      }, 10);
    }
  }
  function keyboardHideHandler() {
    setTimeout(function() {
      pageContent.css('padding-bottom', initialPadding + 'px');
      pageContent.scrollTop(pageContent[0].scrollHeight - pageContent[0].offsetHeight, 200);
      isKeyboardOpen = false;
    }, 10);
  }

  function attachEvents(destroy) {
    var method = destroy ? 'off' : 'on';
    if (window.cordova && window.cordova.plugins.Keyboard) {
      if (method === 'on') {
        window.addEventListener('native.keyboardshow', keyboardShowHandler);
        window.addEventListener('native.keyboardhide', keyboardHideHandler);
      } else {
        window.removeEventListener('native.keyboardshow', keyboardShowHandler);
        window.removeEventListener('native.keyboardhide', keyboardHideHandler);
      }
    }
    pageContent[method]('click', keyboardClose);
    //inputs[method]('focus', handleKey);
  }
  function detachEvents() {
    attachEvents(true);
  }

  // Attach events
  attachEvents();

  // Destroy on page remove
  function pageBeforeRemove() {
    detachEvents();
    pageContainer.off('pageBeforeRemove', pageBeforeRemove);
  }
  if (pageContainer.hasClass('page')) {
    pageContainer.on('pageBeforeRemove', pageBeforeRemove);
  }
};