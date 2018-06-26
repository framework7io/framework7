'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Support = exports.Device = exports.Utils = exports.Request = exports.Dom7 = exports.Template7 = undefined;

var _template = require('template7');

var _template2 = _interopRequireDefault(_template);

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _appClass = require('./components/app/app-class');

var _appClass2 = _interopRequireDefault(_appClass);

var _request = require('./utils/request');

var _request2 = _interopRequireDefault(_request);

var _utils = require('./utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _support = require('./utils/support');

var _support2 = _interopRequireDefault(_support);

var _device = require('./utils/device');

var _device2 = _interopRequireDefault(_device);

var _device3 = require('./modules/device/device');

var _device4 = _interopRequireDefault(_device3);

var _support3 = require('./modules/support/support');

var _support4 = _interopRequireDefault(_support3);

var _utils3 = require('./modules/utils/utils');

var _utils4 = _interopRequireDefault(_utils3);

var _resize = require('./modules/resize/resize');

var _resize2 = _interopRequireDefault(_resize);

var _request3 = require('./modules/request/request');

var _request4 = _interopRequireDefault(_request3);

var _touch = require('./modules/touch/touch');

var _touch2 = _interopRequireDefault(_touch);

var _clicks = require('./modules/clicks/clicks');

var _clicks2 = _interopRequireDefault(_clicks);

var _router = require('./modules/router/router');

var _router2 = _interopRequireDefault(_router);

var _history = require('./modules/history/history');

var _history2 = _interopRequireDefault(_history);

var _storage = require('./modules/storage/storage');

var _storage2 = _interopRequireDefault(_storage);

var _statusbar = require('./components/statusbar/statusbar');

var _statusbar2 = _interopRequireDefault(_statusbar);

var _view = require('./components/view/view');

var _view2 = _interopRequireDefault(_view);

var _navbar = require('./components/navbar/navbar');

var _navbar2 = _interopRequireDefault(_navbar);

var _toolbar = require('./components/toolbar/toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

var _subnavbar = require('./components/subnavbar/subnavbar');

var _subnavbar2 = _interopRequireDefault(_subnavbar);

var _touchRipple = require('./components/touch-ripple/touch-ripple');

var _touchRipple2 = _interopRequireDefault(_touchRipple);

var _modal = require('./components/modal/modal');

var _modal2 = _interopRequireDefault(_modal);

var _dialog = require('./components/dialog/dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _popup = require('./components/popup/popup');

var _popup2 = _interopRequireDefault(_popup);

var _loginScreen = require('./components/login-screen/login-screen');

var _loginScreen2 = _interopRequireDefault(_loginScreen);

var _popover = require('./components/popover/popover');

var _popover2 = _interopRequireDefault(_popover);

var _actions = require('./components/actions/actions');

var _actions2 = _interopRequireDefault(_actions);

var _sheet = require('./components/sheet/sheet');

var _sheet2 = _interopRequireDefault(_sheet);

var _toast = require('./components/toast/toast');

var _toast2 = _interopRequireDefault(_toast);

var _preloader = require('./components/preloader/preloader');

var _preloader2 = _interopRequireDefault(_preloader);

var _progressbar = require('./components/progressbar/progressbar');

var _progressbar2 = _interopRequireDefault(_progressbar);

var _sortable = require('./components/sortable/sortable');

var _sortable2 = _interopRequireDefault(_sortable);

var _swipeout = require('./components/swipeout/swipeout');

var _swipeout2 = _interopRequireDefault(_swipeout);

var _accordion = require('./components/accordion/accordion');

var _accordion2 = _interopRequireDefault(_accordion);

var _virtualList = require('./components/virtual-list/virtual-list');

var _virtualList2 = _interopRequireDefault(_virtualList);

var _listIndex = require('./components/list-index/list-index');

var _listIndex2 = _interopRequireDefault(_listIndex);

var _timeline = require('./components/timeline/timeline');

var _timeline2 = _interopRequireDefault(_timeline);

var _tabs = require('./components/tabs/tabs');

var _tabs2 = _interopRequireDefault(_tabs);

var _panel = require('./components/panel/panel');

var _panel2 = _interopRequireDefault(_panel);

var _card = require('./components/card/card');

var _card2 = _interopRequireDefault(_card);

var _chip = require('./components/chip/chip');

var _chip2 = _interopRequireDefault(_chip);

var _form = require('./components/form/form');

var _form2 = _interopRequireDefault(_form);

var _input = require('./components/input/input');

var _input2 = _interopRequireDefault(_input);

var _checkbox = require('./components/checkbox/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _radio = require('./components/radio/radio');

var _radio2 = _interopRequireDefault(_radio);

var _toggle = require('./components/toggle/toggle');

var _toggle2 = _interopRequireDefault(_toggle);

var _range = require('./components/range/range');

var _range2 = _interopRequireDefault(_range);

var _stepper = require('./components/stepper/stepper');

var _stepper2 = _interopRequireDefault(_stepper);

var _smartSelect = require('./components/smart-select/smart-select');

var _smartSelect2 = _interopRequireDefault(_smartSelect);

var _grid = require('./components/grid/grid');

var _grid2 = _interopRequireDefault(_grid);

var _calendar = require('./components/calendar/calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _picker = require('./components/picker/picker');

var _picker2 = _interopRequireDefault(_picker);

var _infiniteScroll = require('./components/infinite-scroll/infinite-scroll');

var _infiniteScroll2 = _interopRequireDefault(_infiniteScroll);

var _pullToRefresh = require('./components/pull-to-refresh/pull-to-refresh');

var _pullToRefresh2 = _interopRequireDefault(_pullToRefresh);

var _lazy = require('./components/lazy/lazy');

var _lazy2 = _interopRequireDefault(_lazy);

var _dataTable = require('./components/data-table/data-table');

var _dataTable2 = _interopRequireDefault(_dataTable);

var _fab = require('./components/fab/fab');

var _fab2 = _interopRequireDefault(_fab);

var _searchbar = require('./components/searchbar/searchbar');

var _searchbar2 = _interopRequireDefault(_searchbar);

var _messages = require('./components/messages/messages');

var _messages2 = _interopRequireDefault(_messages);

var _messagebar = require('./components/messagebar/messagebar');

var _messagebar2 = _interopRequireDefault(_messagebar);

var _swiper = require('./components/swiper/swiper');

var _swiper2 = _interopRequireDefault(_swiper);

var _photoBrowser = require('./components/photo-browser/photo-browser');

var _photoBrowser2 = _interopRequireDefault(_photoBrowser);

var _notification = require('./components/notification/notification');

var _notification2 = _interopRequireDefault(_notification);

var _autocomplete = require('./components/autocomplete/autocomplete');

var _autocomplete2 = _interopRequireDefault(_autocomplete);

var _tooltip = require('./components/tooltip/tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _gauge = require('./components/gauge/gauge');

var _gauge2 = _interopRequireDefault(_gauge);

var _vi = require('./components/vi/vi');

var _vi2 = _interopRequireDefault(_vi);

var _elevation = require('./components/elevation/elevation');

var _elevation2 = _interopRequireDefault(_elevation);

var _typography = require('./components/typography/typography');

var _typography2 = _interopRequireDefault(_typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Core Components


// Core Modules


// Import Helpers
if ("es" !== 'es') {
  if (typeof window !== 'undefined') {
    // Template7
    if (!window.Template7) window.Template7 = _template2.default;

    // Dom7
    if (!window.Dom7) window.Dom7 = _dom2.default;
  }
}

// Install Core Modules & Components


// F7 Class
/**
 * Framework7 3.0.0-beta.14
 * Full featured mobile HTML framework for building iOS & Android apps
 * http://framework7.io/
 *
 * Copyright 2014-2018 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: June 24, 2018
 */

_appClass2.default.use([_device4.default, _support4.default, _utils4.default, _resize2.default, _request4.default, _touch2.default, _clicks2.default, _router2.default, _history2.default, _storage2.default, _statusbar2.default, _view2.default, _navbar2.default, _toolbar2.default, _subnavbar2.default, _touchRipple2.default, _modal2.default, _dialog2.default, _popup2.default, _loginScreen2.default, _popover2.default, _actions2.default, _sheet2.default, _toast2.default, _preloader2.default, _progressbar2.default, _sortable2.default, _swipeout2.default, _accordion2.default, _virtualList2.default, _listIndex2.default, _timeline2.default, _tabs2.default, _panel2.default, _card2.default, _chip2.default, _form2.default, _input2.default, _checkbox2.default, _radio2.default, _toggle2.default, _range2.default, _stepper2.default, _smartSelect2.default, _grid2.default, _calendar2.default, _picker2.default, _infiniteScroll2.default, _pullToRefresh2.default, _lazy2.default, _dataTable2.default, _fab2.default, _searchbar2.default, _messages2.default, _messagebar2.default, _swiper2.default, _photoBrowser2.default, _notification2.default, _autocomplete2.default, _tooltip2.default, _gauge2.default, _vi2.default, _elevation2.default, _typography2.default]);

exports.Template7 = _template2.default;
exports.Dom7 = _dom2.default;
exports.Request = _request2.default;
exports.Utils = _utils2.default;
exports.Device = _device2.default;
exports.Support = _support2.default;
exports.default = _appClass2.default;