'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _class = require('../../utils/class');

var _class2 = _interopRequireDefault(_class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Messagebar = function (_Framework7Class) {
  _inherits(Messagebar, _Framework7Class);

  function Messagebar(app) {
    var _ret, _ret2;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Messagebar);

    var _this = _possibleConstructorReturn(this, (Messagebar.__proto__ || Object.getPrototypeOf(Messagebar)).call(this, params, [app]));

    var messagebar = _this;

    var defaults = {
      top: false,
      topOffset: 0,
      bottomOffset: 0,
      attachments: [],
      renderAttachments: undefined,
      renderAttachment: undefined,
      maxHeight: null,
      resizePage: true
    };

    // Extend defaults with modules params
    messagebar.useModulesParams(defaults);

    messagebar.params = _utils2.default.extend(defaults, params);

    // El
    var $el = (0, _dom2.default)(messagebar.params.el);
    if ($el.length === 0) return _ret = messagebar, _possibleConstructorReturn(_this, _ret);

    $el[0].f7Messagebar = messagebar;

    // Page and PageContent
    var $pageEl = $el.parents('.page').eq(0);
    var $pageContentEl = $pageEl.find('.page-content').eq(0);

    // Area
    var $areaEl = $el.find('.messagebar-area');

    // Textarea
    var $textareaEl = void 0;
    if (messagebar.params.textareaEl) {
      $textareaEl = (0, _dom2.default)(messagebar.params.textareaEl);
    } else {
      $textareaEl = $el.find('textarea');
    }

    // Attachments & Library
    var $attachmentsEl = $el.find('.messagebar-attachments');
    var $sheetEl = $el.find('.messagebar-sheet');

    if (messagebar.params.top) {
      $el.addClass('messagebar-top');
    }

    _utils2.default.extend(messagebar, {
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
      attachments: []
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
      var index = (0, _dom2.default)(this).index();
      if ((0, _dom2.default)(e.target).closest('.messagebar-attachment-delete').length) {
        (0, _dom2.default)(this).trigger('messagebar:attachmentdelete', index);
        messagebar.emit('local::attachmentDelete messagebarAttachmentDelete', messagebar, this, index);
      } else {
        (0, _dom2.default)(this).trigger('messagebar:attachmentclick', index);
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

    return _ret2 = messagebar, _possibleConstructorReturn(_this, _ret2);
  }

  _createClass(Messagebar, [{
    key: 'focus',
    value: function focus() {
      var messagebar = this;
      messagebar.$textareaEl.focus();
      return messagebar;
    }
  }, {
    key: 'blur',
    value: function blur() {
      var messagebar = this;
      messagebar.$textareaEl.blur();
      return messagebar;
    }
  }, {
    key: 'clear',
    value: function clear() {
      var messagebar = this;
      messagebar.$textareaEl.val('').trigger('change');
      return messagebar;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      var messagebar = this;
      return messagebar.$textareaEl.val().trim();
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      var messagebar = this;
      messagebar.$textareaEl.val(value).trigger('change');
      return messagebar;
    }
  }, {
    key: 'setPlaceholder',
    value: function setPlaceholder(placeholder) {
      var messagebar = this;
      messagebar.$textareaEl.attr('placeholder', placeholder);
      return messagebar;
    }
  }, {
    key: 'resizePage',
    value: function resizePage() {
      var messagebar = this;
      var params = messagebar.params,
          $el = messagebar.$el,
          top = messagebar.top,
          $pageEl = messagebar.$pageEl,
          $pageContentEl = messagebar.$pageContentEl,
          $areaEl = messagebar.$areaEl,
          $textareaEl = messagebar.$textareaEl,
          $sheetEl = messagebar.$sheetEl,
          $attachmentsEl = messagebar.$attachmentsEl;

      var elHeight = $el[0].offsetHeight;
      var maxHeight = params.maxHeight;
      if (top) {
        /*
        Disable at the moment
        const requiredPaddingTop = elHeight + params.topOffset;
        const currentPaddingTop = parseInt($pageContentEl.css('padding-top'), 10);
        if (requiredPaddingTop !== currentPaddingTop) {
          if (!maxHeight) {
            maxHeight = $pageEl[0].offsetHeight - currentPaddingTop - $sheetEl.outerHeight() - $attachmentsEl.outerHeight() - parseInt($areaEl.css('margin-top'), 10) - parseInt($areaEl.css('margin-bottom'), 10);
          }
          $textareaEl.css('max-height', `${maxHeight}px`);
          $pageContentEl.css('padding-top', `${requiredPaddingTop}px`);
          $el.trigger('messagebar:resizePage');
          messagebar.emit('local::resizepage messagebarResizePage');
        }
        */
      } else {
        var currentPaddingBottom = parseInt($pageContentEl.css('padding-bottom'), 10);
        var requiredPaddingBottom = elHeight + params.bottomOffset;
        if (requiredPaddingBottom !== currentPaddingBottom && $pageContentEl.length) {
          var currentPaddingTop = parseInt($pageContentEl.css('padding-top'), 10);
          var pageScrollHeight = $pageContentEl[0].scrollHeight;
          var pageOffsetHeight = $pageContentEl[0].offsetHeight;
          var pageScrollTop = $pageContentEl[0].scrollTop;
          var scrollOnBottom = pageScrollTop === pageScrollHeight - pageOffsetHeight;
          if (!maxHeight) {
            maxHeight = $pageEl[0].offsetHeight - currentPaddingTop - $sheetEl.outerHeight() - $attachmentsEl.outerHeight() - parseInt($areaEl.css('margin-top'), 10) - parseInt($areaEl.css('margin-bottom'), 10);
          }
          $textareaEl.css('max-height', maxHeight + 'px');
          $pageContentEl.css('padding-bottom', requiredPaddingBottom + 'px');
          if (scrollOnBottom) {
            $pageContentEl.scrollTop($pageContentEl[0].scrollHeight - pageOffsetHeight);
          }
          $el.trigger('messagebar:resizepage');
          messagebar.emit('local::resizePage messagebarResizePage', messagebar);
        }
      }
    }
  }, {
    key: 'checkEmptyState',
    value: function checkEmptyState() {
      var messagebar = this;
      var $el = messagebar.$el,
          $textareaEl = messagebar.$textareaEl;

      var value = $textareaEl.val().trim();
      if (value && value.length) {
        $el.addClass('messagebar-with-value');
      } else {
        $el.removeClass('messagebar-with-value');
      }
    }
  }, {
    key: 'attachmentsCreate',
    value: function attachmentsCreate() {
      var innerHTML = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var messagebar = this;
      var $attachmentsEl = (0, _dom2.default)('<div class="messagebar-attachments">' + innerHTML + '</div>');
      $attachmentsEl.insertBefore(messagebar.$textareaEl);
      _utils2.default.extend(messagebar, {
        $attachmentsEl: $attachmentsEl,
        attachmentsEl: $attachmentsEl[0]
      });
      return messagebar;
    }
  }, {
    key: 'attachmentsShow',
    value: function attachmentsShow() {
      var innerHTML = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

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
    }
  }, {
    key: 'attachmentsHide',
    value: function attachmentsHide() {
      var messagebar = this;
      messagebar.$el.removeClass('messagebar-attachments-visible');
      messagebar.attachmentsVisible = false;
      if (messagebar.params.resizePage) {
        messagebar.resizePage();
      }
      return messagebar;
    }
  }, {
    key: 'attachmentsToggle',
    value: function attachmentsToggle() {
      var messagebar = this;
      if (messagebar.attachmentsVisible) {
        messagebar.attachmentsHide();
      } else {
        messagebar.attachmentsShow();
      }
      return messagebar;
    }
  }, {
    key: 'renderAttachment',
    value: function renderAttachment(attachment) {
      var messagebar = this;
      if (messagebar.params.renderAttachment) {
        return messagebar.params.renderAttachment.call(messagebar, attachment);
      }
      return '\n      <div class="messagebar-attachment">\n        <img src="' + attachment + '">\n        <span class="messagebar-attachment-delete"></span>\n      </div>\n    ';
    }
  }, {
    key: 'renderAttachments',
    value: function renderAttachments() {
      var messagebar = this;
      var html = void 0;
      if (messagebar.params.renderAttachments) {
        html = messagebar.params.renderAttachments.call(messagebar, messagebar.attachments);
      } else {
        html = '' + messagebar.attachments.map(function (attachment) {
          return messagebar.renderAttachment(attachment);
        }).join('');
      }
      if (messagebar.$attachmentsEl.length === 0) {
        messagebar.attachmentsCreate(html);
      } else {
        messagebar.$attachmentsEl.html(html);
      }
    }
  }, {
    key: 'sheetCreate',
    value: function sheetCreate() {
      var innerHTML = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var messagebar = this;
      var $sheetEl = (0, _dom2.default)('<div class="messagebar-sheet">' + innerHTML + '</div>');
      messagebar.$el.append($sheetEl);
      _utils2.default.extend(messagebar, {
        $sheetEl: $sheetEl,
        sheetEl: $sheetEl[0]
      });
      return messagebar;
    }
  }, {
    key: 'sheetShow',
    value: function sheetShow() {
      var innerHTML = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

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
    }
  }, {
    key: 'sheetHide',
    value: function sheetHide() {
      var messagebar = this;
      messagebar.$el.removeClass('messagebar-sheet-visible');
      messagebar.sheetVisible = false;
      if (messagebar.params.resizePage) {
        messagebar.resizePage();
      }
      return messagebar;
    }
  }, {
    key: 'sheetToggle',
    value: function sheetToggle() {
      var messagebar = this;
      if (messagebar.sheetVisible) {
        messagebar.sheetHide();
      } else {
        messagebar.sheetShow();
      }
      return messagebar;
    }
  }, {
    key: 'init',
    value: function init() {
      var messagebar = this;
      messagebar.attachEvents();
      messagebar.checkEmptyState();
      return messagebar;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var messagebar = this;
      messagebar.emit('local::beforeDestroy messagebarBeforeDestroy', messagebar);
      messagebar.$el.trigger('messagebar:beforedestroy', messagebar);
      messagebar.detachEvents();
      messagebar.$el[0].f7Messagebar = null;
      delete messagebar.$el[0].f7Messagebar;
      _utils2.default.deleteProps(messagebar);
    }
  }]);

  return Messagebar;
}(_class2.default);

exports.default = Messagebar;