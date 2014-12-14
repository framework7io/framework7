/*======================================================
 ************  Ionic Keyboard + Messagebar  ************
 ======================================================*/
app.initIonicKeyboardMessagebar = function(pageContainer) {
  pageContainer = $(pageContainer);
  var messagebar = pageContainer.find('.page-content').parents('.page').find('.messagebar');
  if (messagebar.length === 0) return;
  var messageBarHeight = messagebar.height();
  var textarea = messagebar.find('textarea');
  var pageContent = pageContainer.find('.page-content');
  messagebar.css('transition', 'bottom 10ms linear');
  pageContent.css('transition', 'padding-bottom 200ms linear');
  var initialPadding = parseInt(pageContent.css('padding-bottom'), 10);
  var initialBarHeight = messageBarHeight;
  var initialAreaHeight = textarea[0].offsetHeight;
  var isKeyboardOpen = false;
  // guess initial height until keyboard is opened -- TODO: estimate better height by device OS -- maybe by a function
  var keyboardHeight = pageContent.outerHeight()/2;
  var notStopped = true;
  var newBarHeight = 0;
  var aE = null;

  // Resize textarea
  function sizeTextarea() {
    // Reset
    textarea.css({'height': ''});

    var height = textarea[0].offsetHeight;
    var diff = height - textarea[0].clientHeight;
    var scrollHeight = textarea[0].scrollHeight;
    // Update
    if (scrollHeight + diff > height) {
      var newAreaHeight = scrollHeight + diff;
      newBarHeight = initialBarHeight + (newAreaHeight - initialAreaHeight);
      var maxBarHeight = messagebar.attr('data-max-height') || messagebar.parents('.view')[0].offsetHeight - 88;
      if (newBarHeight > maxBarHeight) {
        newBarHeight = maxBarHeight;
        newAreaHeight = newBarHeight - initialBarHeight + initialAreaHeight;
      }
      textarea.css('height', newAreaHeight + 'px');
      messagebar.css('height', newBarHeight + 'px');
      if (pageContent.length > 0) {
        pageContent.css('padding-bottom', newBarHeight/1 + keyboardHeight + 10 + 'px');
        pageContent.scrollTop(pageContent[0].scrollHeight - pageContent[0].offsetHeight, 50);
      }
    } else {
      if (pageContent.length > 0) {
        messagebar.css({'height': ''});
        pageContent.css({'padding-bottom': initialPadding + keyboardHeight + 'px'});
        newBarHeight = 0;
      }
    }
  }
  var to;
  function handleKey(e) {
    if (notStopped) {
      notStopped = false;
      clearTimeout(to);
      to = setTimeout(function () {
        sizeTextarea();
        notStopped = true;
      }, 0);
    }
  }

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
      var height = newBarHeight != 0 ? newBarHeight/1 : initialPadding;
      messagebar.css('bottom', e.keyboardHeight + 'px');
      pageContent.css('padding-bottom', e.keyboardHeight + height + 'px');
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
      messagebar.css('bottom', '0');
      var height = newBarHeight != 0 ? newBarHeight/1 : initialPadding;
      pageContent.css('padding-bottom', height + 'px');
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
    textarea[method]('change keydown keypress keyup paste cut', handleKey);
  }
  function detachEvents() {
    attachEvents(true);
  }

  messagebar[0].f7DestroyMessagebar = detachEvents;

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
app.destroyMessagebar = function (pageContainer) {
  pageContainer = $(pageContainer);
  var messagebar = pageContainer.hasClass('messagebar') ? pageContainer : pageContainer.find('.messagebar');
  if (messagebar.length === 0) return;
  if (messagebar[0].f7DestroyMessagebar) messagebar[0].f7DestroyMessagebar();
};