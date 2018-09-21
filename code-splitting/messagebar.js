
function framework7ComponentLoader(chunks) {
  var doc = document;
  var win = window;
  var $ = chunks.$;
  var Template7 = chunks.Template7;
  var Utils = chunks.Utils;
  var Device = chunks.Device;
  var Support = chunks.Support;
  var ConstructorMethods = chunks.ConstructorMethods;
  var ModalMethods = chunks.ModalMethods;
  var Framework7Class = chunks.Framework7Class;
  var Modal = chunks.Modal;

  var Messagebar = (function (Framework7Class$$1) {
    function Messagebar(app, params) {
      if ( params === void 0 ) params = {};

      Framework7Class$$1.call(this, params, [app]);

      var messagebar = this;

      var defaults = {
        top: false,
        topOffset: 0,
        bottomOffset: 0,
        attachments: [],
        renderAttachments: undefined,
        renderAttachment: undefined,
        maxHeight: null,
        resizePage: true,
      };

      // Extend defaults with modules params
      messagebar.useModulesParams(defaults);

      messagebar.params = Utils.extend(defaults, params);

      // El
      var $el = $(messagebar.params.el);
      if ($el.length === 0) { return messagebar; }

      if ($el[0].f7Messagebar) { return $el[0].f7Messagebar; }

      $el[0].f7Messagebar = messagebar;

      // Page and PageContent
      var $pageEl = $el.parents('.page').eq(0);
      var $pageContentEl = $pageEl.find('.page-content').eq(0);

      // Area
      var $areaEl = $el.find('.messagebar-area');

      // Textarea
      var $textareaEl;
      if (messagebar.params.textareaEl) {
        $textareaEl = $(messagebar.params.textareaEl);
      } else {
        $textareaEl = $el.find('textarea');
      }

      // Attachments & Library
      var $attachmentsEl = $el.find('.messagebar-attachments');
      var $sheetEl = $el.find('.messagebar-sheet');

      if (messagebar.params.top) {
        $el.addClass('messagebar-top');
      }

      Utils.extend(messagebar, {
        $el: $el,
        el: $el[0],
        $areaEl: $areaEl,
        areaEl: $areaEl[0],
        $textareaEl: $textareaEl,
        textareaEl: $textareaEl[0],
        $attachmentsEl: $attachmentsEl,
        attachmentsEl: $attachmentsEl[0],
        attachmentsVisible: $attachmentsEl.hasClass('messagebar-attachments-visible'),
        $sheetEl: $sheetEl,
        sheetEl: $sheetEl[0],
        sheetVisible: $sheetEl.hasClass('messagebar-sheet-visible'),
        $pageEl: $pageEl,
        pageEl: $pageEl[0],
        $pageContentEl: $pageContentEl,
        pageContentEl: $pageContentEl,
        top: $el.hasClass('messagebar-top') || messagebar.params.top,
        attachments: [],
      });

      // Events
      function onAppResize() {
        if (messagebar.params.resizePage) {
          messagebar.resizePage();
        }
      }
      function onSubmit(e) {
        e.preventDefault();
      }
      function onAttachmentClick(e) {
        var index = $(this).index();
        if ($(e.target).closest('.messagebar-attachment-delete').length) {
          $(this).trigger('messagebar:attachmentdelete', index);
          messagebar.emit('local::attachmentDelete messagebarAttachmentDelete', messagebar, this, index);
        } else {
          $(this).trigger('messagebar:attachmentclick', index);
          messagebar.emit('local::attachmentClick messagebarAttachmentClick', messagebar, this, index);
        }
      }
      function onTextareaChange() {
        messagebar.checkEmptyState();
        messagebar.$el.trigger('messagebar:change');
        messagebar.emit('local::change messagebarChange', messagebar);
      }
      function onTextareaFocus() {
        messagebar.sheetHide();
        messagebar.$el.addClass('messagebar-focused');
        messagebar.$el.trigger('messagebar:focus');
        messagebar.emit('local::focus messagebarFocus', messagebar);
      }
      function onTextareaBlur() {
        messagebar.$el.removeClass('messagebar-focused');
        messagebar.$el.trigger('messagebar:blur');
        messagebar.emit('local::blur messagebarBlur', messagebar);
      }

      messagebar.attachEvents = function attachEvents() {
        $el.on('textarea:resize', onAppResize);
        $el.on('submit', onSubmit);
        $el.on('click', '.messagebar-attachment', onAttachmentClick);
        $textareaEl.on('change input', onTextareaChange);
        $textareaEl.on('focus', onTextareaFocus);
        $textareaEl.on('blur', onTextareaBlur);
        app.on('resize', onAppResize);
      };
      messagebar.detachEvents = function detachEvents() {
        $el.off('textarea:resize', onAppResize);
        $el.off('submit', onSubmit);
        $el.off('click', '.messagebar-attachment', onAttachmentClick);
        $textareaEl.off('change input', onTextareaChange);
        $textareaEl.off('focus', onTextareaFocus);
        $textareaEl.off('blur', onTextareaBlur);
        app.off('resize', onAppResize);
      };


      // Install Modules
      messagebar.useModules();

      // Init
      messagebar.init();

      return messagebar;
    }

    if ( Framework7Class$$1 ) Messagebar.__proto__ = Framework7Class$$1;
    Messagebar.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
    Messagebar.prototype.constructor = Messagebar;

    Messagebar.prototype.focus = function focus () {
      var messagebar = this;
      messagebar.$textareaEl.focus();
      return messagebar;
    };

    Messagebar.prototype.blur = function blur () {
      var messagebar = this;
      messagebar.$textareaEl.blur();
      return messagebar;
    };

    Messagebar.prototype.clear = function clear () {
      var messagebar = this;
      messagebar.$textareaEl.val('').trigger('change');
      return messagebar;
    };

    Messagebar.prototype.getValue = function getValue () {
      var messagebar = this;
      return messagebar.$textareaEl.val().trim();
    };

    Messagebar.prototype.setValue = function setValue (value) {
      var messagebar = this;
      messagebar.$textareaEl.val(value).trigger('change');
      return messagebar;
    };

    Messagebar.prototype.setPlaceholder = function setPlaceholder (placeholder) {
      var messagebar = this;
      messagebar.$textareaEl.attr('placeholder', placeholder);
      return messagebar;
    };

    Messagebar.prototype.resizePage = function resizePage () {
      var messagebar = this;
      var params = messagebar.params;
      var $el = messagebar.$el;
      var top = messagebar.top;
      var $pageEl = messagebar.$pageEl;
      var $pageContentEl = messagebar.$pageContentEl;
      var $areaEl = messagebar.$areaEl;
      var $textareaEl = messagebar.$textareaEl;
      var $sheetEl = messagebar.$sheetEl;
      var $attachmentsEl = messagebar.$attachmentsEl;
      var elHeight = $el[0].offsetHeight;
      var maxHeight = params.maxHeight;
      if (top) ; else {
        var currentPaddingBottom = parseInt($pageContentEl.css('padding-bottom'), 10);
        var requiredPaddingBottom = elHeight + params.bottomOffset;
        if (requiredPaddingBottom !== currentPaddingBottom && $pageContentEl.length) {
          var currentPaddingTop = parseInt($pageContentEl.css('padding-top'), 10);
          var pageScrollHeight = $pageContentEl[0].scrollHeight;
          var pageOffsetHeight = $pageContentEl[0].offsetHeight;
          var pageScrollTop = $pageContentEl[0].scrollTop;
          var scrollOnBottom = (pageScrollTop === pageScrollHeight - pageOffsetHeight);
          if (!maxHeight) {
            maxHeight = $pageEl[0].offsetHeight - currentPaddingTop - $sheetEl.outerHeight() - $attachmentsEl.outerHeight() - parseInt($areaEl.css('margin-top'), 10) - parseInt($areaEl.css('margin-bottom'), 10);
          }
          $textareaEl.css('max-height', (maxHeight + "px"));
          $pageContentEl.css('padding-bottom', (requiredPaddingBottom + "px"));
          if (scrollOnBottom) {
            $pageContentEl.scrollTop($pageContentEl[0].scrollHeight - pageOffsetHeight);
          }
          $el.trigger('messagebar:resizepage');
          messagebar.emit('local::resizePage messagebarResizePage', messagebar);
        }
      }
    };

    Messagebar.prototype.checkEmptyState = function checkEmptyState () {
      var messagebar = this;
      var $el = messagebar.$el;
      var $textareaEl = messagebar.$textareaEl;
      var value = $textareaEl.val().trim();
      if (value && value.length) {
        $el.addClass('messagebar-with-value');
      } else {
        $el.removeClass('messagebar-with-value');
      }
    };

    Messagebar.prototype.attachmentsCreate = function attachmentsCreate (innerHTML) {
      if ( innerHTML === void 0 ) innerHTML = '';

      var messagebar = this;
      var $attachmentsEl = $(("<div class=\"messagebar-attachments\">" + innerHTML + "</div>"));
      $attachmentsEl.insertBefore(messagebar.$textareaEl);
      Utils.extend(messagebar, {
        $attachmentsEl: $attachmentsEl,
        attachmentsEl: $attachmentsEl[0],
      });
      return messagebar;
    };

    Messagebar.prototype.attachmentsShow = function attachmentsShow (innerHTML) {
      if ( innerHTML === void 0 ) innerHTML = '';

      var messagebar = this;
      messagebar.$attachmentsEl = messagebar.$el.find('.messagebar-attachments');
      if (messagebar.$attachmentsEl.length === 0) {
        messagebar.attachmentsCreate(innerHTML);
      }
      messagebar.$el.addClass('messagebar-attachments-visible');
      messagebar.attachmentsVisible = true;
      if (messagebar.params.resizePage) {
        messagebar.resizePage();
      }
      return messagebar;
    };

    Messagebar.prototype.attachmentsHide = function attachmentsHide () {
      var messagebar = this;
      messagebar.$el.removeClass('messagebar-attachments-visible');
      messagebar.attachmentsVisible = false;
      if (messagebar.params.resizePage) {
        messagebar.resizePage();
      }
      return messagebar;
    };

    Messagebar.prototype.attachmentsToggle = function attachmentsToggle () {
      var messagebar = this;
      if (messagebar.attachmentsVisible) {
        messagebar.attachmentsHide();
      } else {
        messagebar.attachmentsShow();
      }
      return messagebar;
    };

    Messagebar.prototype.renderAttachment = function renderAttachment (attachment) {
      var messagebar = this;
      if (messagebar.params.renderAttachment) {
        return messagebar.params.renderAttachment.call(messagebar, attachment);
      }
      return ("\n      <div class=\"messagebar-attachment\">\n        <img src=\"" + attachment + "\">\n        <span class=\"messagebar-attachment-delete\"></span>\n      </div>\n    ");
    };

    Messagebar.prototype.renderAttachments = function renderAttachments () {
      var messagebar = this;
      var html;
      if (messagebar.params.renderAttachments) {
        html = messagebar.params.renderAttachments.call(messagebar, messagebar.attachments);
      } else {
        html = "" + (messagebar.attachments.map(function (attachment) { return messagebar.renderAttachment(attachment); }).join(''));
      }
      if (messagebar.$attachmentsEl.length === 0) {
        messagebar.attachmentsCreate(html);
      } else {
        messagebar.$attachmentsEl.html(html);
      }
    };

    Messagebar.prototype.sheetCreate = function sheetCreate (innerHTML) {
      if ( innerHTML === void 0 ) innerHTML = '';

      var messagebar = this;
      var $sheetEl = $(("<div class=\"messagebar-sheet\">" + innerHTML + "</div>"));
      messagebar.$el.append($sheetEl);
      Utils.extend(messagebar, {
        $sheetEl: $sheetEl,
        sheetEl: $sheetEl[0],
      });
      return messagebar;
    };

    Messagebar.prototype.sheetShow = function sheetShow (innerHTML) {
      if ( innerHTML === void 0 ) innerHTML = '';

      var messagebar = this;
      messagebar.$sheetEl = messagebar.$el.find('.messagebar-sheet');
      if (messagebar.$sheetEl.length === 0) {
        messagebar.sheetCreate(innerHTML);
      }
      messagebar.$el.addClass('messagebar-sheet-visible');
      messagebar.sheetVisible = true;
      if (messagebar.params.resizePage) {
        messagebar.resizePage();
      }
      return messagebar;
    };

    Messagebar.prototype.sheetHide = function sheetHide () {
      var messagebar = this;
      messagebar.$el.removeClass('messagebar-sheet-visible');
      messagebar.sheetVisible = false;
      if (messagebar.params.resizePage) {
        messagebar.resizePage();
      }
      return messagebar;
    };

    Messagebar.prototype.sheetToggle = function sheetToggle () {
      var messagebar = this;
      if (messagebar.sheetVisible) {
        messagebar.sheetHide();
      } else {
        messagebar.sheetShow();
      }
      return messagebar;
    };

    Messagebar.prototype.init = function init () {
      var messagebar = this;
      messagebar.attachEvents();
      messagebar.checkEmptyState();
      return messagebar;
    };

    Messagebar.prototype.destroy = function destroy () {
      var messagebar = this;
      messagebar.emit('local::beforeDestroy messagebarBeforeDestroy', messagebar);
      messagebar.$el.trigger('messagebar:beforedestroy', messagebar);
      messagebar.detachEvents();
      if (messagebar.$el[0]) {
        messagebar.$el[0].f7Messagebar = null;
        delete messagebar.$el[0].f7Messagebar;
      }
      Utils.deleteProps(messagebar);
    };

    return Messagebar;
  }(Framework7Class));

  var messagebar = {
    name: 'messagebar',
    static: {
      Messagebar: Messagebar,
    },
    create: function create() {
      var app = this;
      app.messagebar = ConstructorMethods({
        defaultSelector: '.messagebar',
        constructor: Messagebar,
        app: app,
        domProp: 'f7Messagebar',
        addMethods: 'clear getValue setValue setPlaceholder resizePage focus blur attachmentsCreate attachmentsShow attachmentsHide attachmentsToggle renderAttachments sheetCreate sheetShow sheetHide sheetToggle'.split(' '),
      });
    },
    on: {
      tabBeforeRemove: function tabBeforeRemove(tabEl) {
        var app = this;
        $(tabEl).find('.messagebar-init').each(function (index, messagebarEl) {
          app.messagebar.destroy(messagebarEl);
        });
      },
      tabMounted: function tabMounted(tabEl) {
        var app = this;
        $(tabEl).find('.messagebar-init').each(function (index, messagebarEl) {
          app.messagebar.create(Utils.extend({ el: messagebarEl }, $(messagebarEl).dataset()));
        });
      },
      pageBeforeRemove: function pageBeforeRemove(page) {
        var app = this;
        page.$el.find('.messagebar-init').each(function (index, messagebarEl) {
          app.messagebar.destroy(messagebarEl);
        });
      },
      pageInit: function pageInit(page) {
        var app = this;
        page.$el.find('.messagebar-init').each(function (index, messagebarEl) {
          app.messagebar.create(Utils.extend({ el: messagebarEl }, $(messagebarEl).dataset()));
        });
      },
    },
    vnode: {
      'messagebar-init': {
        insert: function insert(vnode) {
          var app = this;
          var messagebarEl = vnode.elm;
          app.messagebar.create(Utils.extend({ el: messagebarEl }, $(messagebarEl).dataset()));
        },
        destroy: function destroy(vnode) {
          var app = this;
          var messagebarEl = vnode.elm;
          app.messagebar.destroy(messagebarEl);
        },
      },
    },
  };

  return messagebar;
}
framework7ComponentLoader.componentName = 'messagebar';

