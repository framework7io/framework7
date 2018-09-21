
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

  var DataTable = (function (Framework7Class$$1) {
    function DataTable(app, params) {
      if ( params === void 0 ) params = {};

      Framework7Class$$1.call(this, params, [app]);

      var table = this;

      var defaults = {

      };

      // Extend defaults with modules params
      table.useModulesParams(defaults);

      table.params = Utils.extend(defaults, params);

      // El
      var $el = $(table.params.el);
      if ($el.length === 0) { return undefined; }

      table.$el = $el;
      table.el = $el[0];

      if (table.$el[0].f7DataTable) {
        var instance = table.$el[0].f7DataTable;
        table.destroy();
        return instance;
      }

      table.$el[0].f7DataTable = table;

      Utils.extend(table, {
        collapsible: $el.hasClass('data-table-collapsible'),
        // Headers
        $headerEl: $el.find('.data-table-header'),
        $headerSelectedEl: $el.find('.data-table-header-selected'),
      });

      // Events
      function handleChange(e) {
        if (e.detail && e.detail.sentByF7DataTable) {
          // Scripted event, don't do anything
          return;
        }
        var $inputEl = $(this);
        var checked = $inputEl[0].checked;
        var columnIndex = $inputEl.parents('td,th').index();

        if ($inputEl.parents('thead').length > 0) {
          if (columnIndex === 0) {
            $el
              .find('tbody tr')[checked ? 'addClass' : 'removeClass']('data-table-row-selected');
          }
          $el
            .find(("tbody tr td:nth-child(" + (columnIndex + 1) + ") input"))
            .prop('checked', checked)
            .trigger('change', { sentByF7DataTable: true });
        } else {
          if (columnIndex === 0) {
            $inputEl.parents('tr')[checked ? 'addClass' : 'removeClass']('data-table-row-selected');
          }

          if (!checked) {
            $el.find(("thead .checkbox-cell:nth-child(" + (columnIndex + 1) + ") input[type=\"checkbox\"]")).prop('checked', false);
          } else if ($el.find(("tbody .checkbox-cell:nth-child(" + (columnIndex + 1) + ") input[type=\"checkbox\"]:checked")).length === $el.find('tbody tr').length) {
            $el.find(("thead .checkbox-cell:nth-child(" + (columnIndex + 1) + ") input[type=\"checkbox\"]")).prop('checked', true).trigger('change', { sentByF7DataTable: true });
          }
        }
        table.checkSelectedHeader();
      }
      function handleSortableClick() {
        var $cellEl = $(this);
        var isActive = $cellEl.hasClass('sortable-cell-active');
        var currentSort = $cellEl.hasClass('sortable-desc') ? 'desc' : 'asc';
        var newSort;
        if (isActive) {
          newSort = currentSort === 'desc' ? 'asc' : 'desc';
          $cellEl.removeClass('sortable-desc sortable-asc').addClass(("sortable-" + newSort));
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

      return table;
    }

    if ( Framework7Class$$1 ) DataTable.__proto__ = Framework7Class$$1;
    DataTable.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
    DataTable.prototype.constructor = DataTable;

    DataTable.prototype.setCollapsibleLabels = function setCollapsibleLabels () {
      var table = this;
      if (!table.collapsible) { return; }
      table.$el.find('tbody td:not(.checkbox-cell)').each(function (index, el) {
        var $el = $(el);
        var elIndex = $el.index();
        var collpsibleTitle = $el.attr('data-collapsible-title');
        if (!collpsibleTitle && collpsibleTitle !== '') {
          $el.attr('data-collapsible-title', table.$el.find('thead th').eq(elIndex).text());
        }
      });
    };

    DataTable.prototype.checkSelectedHeader = function checkSelectedHeader () {
      var table = this;
      if (table.$headerEl.length > 0 && table.$headerSelectedEl.length > 0) {
        var checkedItems = table.$el.find('tbody .checkbox-cell input:checked').length;
        table.$el[checkedItems > 0 ? 'addClass' : 'removeClass']('data-table-has-checked');
        table.$headerSelectedEl.find('.data-table-selected-count').text(checkedItems);
      }
    };

    DataTable.prototype.init = function init () {
      var table = this;
      table.attachEvents();
      table.setCollapsibleLabels();
      table.checkSelectedHeader();
    };

    DataTable.prototype.destroy = function destroy () {
      var table = this;

      table.$el.trigger('datatable:beforedestroy', table);
      table.emit('local::beforeDestroy dataTableBeforeDestroy', table);

      table.attachEvents();

      if (table.$el[0]) {
        table.$el[0].f7DataTable = null;
        delete table.$el[0].f7DataTable;
      }
      Utils.deleteProps(table);
      table = null;
    };

    return DataTable;
  }(Framework7Class));

  var dataTable = {
    name: 'dataTable',
    static: {
      DataTable: DataTable,
    },
    create: function create() {
      var app = this;
      app.dataTable = ConstructorMethods({
        defaultSelector: '.data-table',
        constructor: DataTable,
        app: app,
        domProp: 'f7DataTable',
      });
    },
    on: {
      tabBeforeRemove: function tabBeforeRemove(tabEl) {
        var app = this;
        $(tabEl).find('.data-table-init').each(function (index, tableEl) {
          app.dataTable.destroy(tableEl);
        });
      },
      tabMounted: function tabMounted(tabEl) {
        var app = this;
        $(tabEl).find('.data-table-init').each(function (index, tableEl) {
          app.dataTable.create({ el: tableEl });
        });
      },
      pageBeforeRemove: function pageBeforeRemove(page) {
        var app = this;
        page.$el.find('.data-table-init').each(function (index, tableEl) {
          app.dataTable.destroy(tableEl);
        });
      },
      pageInit: function pageInit(page) {
        var app = this;
        page.$el.find('.data-table-init').each(function (index, tableEl) {
          app.dataTable.create({ el: tableEl });
        });
      },
    },
    vnode: {
      'data-table-init': {
        insert: function insert(vnode) {
          var app = this;
          var tableEl = vnode.elm;
          app.dataTable.create({ el: tableEl });
        },
        destroy: function destroy(vnode) {
          var app = this;
          var tableEl = vnode.elm;
          app.dataTable.destroy(tableEl);
        },
      },
    },
  };

  return dataTable;
}
framework7ComponentLoader.componentName = 'dataTable';

