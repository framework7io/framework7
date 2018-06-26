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

var DataTable = function (_Framework7Class) {
  _inherits(DataTable, _Framework7Class);

  function DataTable(app) {
    var _ret, _ret3;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, DataTable);

    var _this = _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).call(this, params, [app]));

    var table = _this;

    var defaults = {};

    // Extend defaults with modules params
    table.useModulesParams(defaults);

    table.params = _utils2.default.extend(defaults, params);

    // El
    var $el = (0, _dom2.default)(table.params.el);
    if ($el.length === 0) return _ret = undefined, _possibleConstructorReturn(_this, _ret);

    table.$el = $el;
    table.el = $el[0];

    if (table.$el[0].f7DataTable) {
      var _ret2;

      var instance = table.$el[0].f7DataTable;
      table.destroy();
      return _ret2 = instance, _possibleConstructorReturn(_this, _ret2);
    }

    table.$el[0].f7DataTable = table;

    _utils2.default.extend(table, {
      collapsible: $el.hasClass('data-table-collapsible'),
      // Headers
      $headerEl: $el.find('.data-table-header'),
      $headerSelectedEl: $el.find('.data-table-header-selected')
    });

    // Events
    function handleChange(e) {
      if (e.detail && e.detail.sentByF7DataTable) {
        // Scripted event, don't do anything
        return;
      }
      var $inputEl = (0, _dom2.default)(this);
      var checked = $inputEl[0].checked;
      var columnIndex = $inputEl.parents('td,th').index();

      if ($inputEl.parents('thead').length > 0) {
        if (columnIndex === 0) {
          $el.find('tbody tr')[checked ? 'addClass' : 'removeClass']('data-table-row-selected');
        }
        $el.find('tbody tr td:nth-child(' + (columnIndex + 1) + ') input').prop('checked', checked).trigger('change', { sentByF7DataTable: true });
      } else {
        if (columnIndex === 0) {
          $inputEl.parents('tr')[checked ? 'addClass' : 'removeClass']('data-table-row-selected');
        }

        if (!checked) {
          $el.find('thead .checkbox-cell:nth-child(' + (columnIndex + 1) + ') input[type="checkbox"]').prop('checked', false);
        } else if ($el.find('tbody .checkbox-cell:nth-child(' + (columnIndex + 1) + ') input[type="checkbox"]:checked').length === $el.find('tbody tr').length) {
          $el.find('thead .checkbox-cell:nth-child(' + (columnIndex + 1) + ') input[type="checkbox"]').prop('checked', true).trigger('change', { sentByF7DataTable: true });
        }
      }
      table.checkSelectedHeader();
    }
    function handleSortableClick() {
      var $cellEl = (0, _dom2.default)(this);
      var isActive = $cellEl.hasClass('sortable-cell-active');
      var currentSort = $cellEl.hasClass('sortable-desc') ? 'desc' : 'asc';
      var newSort = void 0;
      if (isActive) {
        newSort = currentSort === 'desc' ? 'asc' : 'desc';
        $cellEl.removeClass('sortable-desc sortable-asc').addClass('sortable-' + newSort);
      } else {
        $el.find('thead .sortable-cell-active').removeClass('sortable-cell-active');
        $cellEl.addClass('sortable-cell-active');
        newSort = currentSort;
      }
      $cellEl.trigger('datatable:sort', newSort);
      table.emit('local::sort dataTableSort', table, newSort);
    }
    table.attachEvents = function attachEvents() {
      table.$el.on('change', '.checkbox-cell input[type="checkbox"]', handleChange);
      table.$el.find('thead .sortable-cell').on('click', handleSortableClick);
    };
    table.detachEvents = function detachEvents() {
      table.$el.off('change', '.checkbox-cell input[type="checkbox"]', handleChange);
      table.$el.find('thead .sortable-cell').off('click', handleSortableClick);
    };

    // Install Modules
    table.useModules();

    // Init
    table.init();

    return _ret3 = table, _possibleConstructorReturn(_this, _ret3);
  }

  _createClass(DataTable, [{
    key: 'setCollapsibleLabels',
    value: function setCollapsibleLabels() {
      var table = this;
      if (!table.collapsible) return;
      table.$el.find('tbody td:not(.checkbox-cell)').each(function (index, el) {
        var $el = (0, _dom2.default)(el);
        var elIndex = $el.index();
        var collpsibleTitle = $el.attr('data-collapsible-title');
        if (!collpsibleTitle && collpsibleTitle !== '') {
          $el.attr('data-collapsible-title', table.$el.find('thead th').eq(elIndex).text());
        }
      });
    }
  }, {
    key: 'checkSelectedHeader',
    value: function checkSelectedHeader() {
      var table = this;
      if (table.$headerEl.length > 0 && table.$headerSelectedEl.length > 0) {
        var checkedItems = table.$el.find('tbody .checkbox-cell input:checked').length;
        table.$el[checkedItems > 0 ? 'addClass' : 'removeClass']('data-table-has-checked');
        table.$headerSelectedEl.find('.data-table-selected-count').text(checkedItems);
      }
    }
  }, {
    key: 'init',
    value: function init() {
      var table = this;
      table.attachEvents();
      table.setCollapsibleLabels();
      table.checkSelectedHeader();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var table = this;

      table.$el.trigger('datatable:beforedestroy', table);
      table.emit('local::beforeDestroy datatableBeforeDestroy', table);

      table.attachEvents();
      table.$el[0].f7DataTable = null;
      delete table.$el[0].f7DataTable;
      _utils2.default.deleteProps(table);
      table = null;
    }
  }]);

  return DataTable;
}(_class2.default);

exports.default = DataTable;