import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';

class DataTable extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);

    const table = this;

    const defaults = {

    };

    // Extend defaults with modules params
    table.useModulesParams(defaults);

    table.params = Utils.extend(defaults, params);

    // El
    const $el = $(table.params.el);
    if ($el.length === 0) return undefined;

    table.$el = $el;
    table.el = $el[0];

    if (table.$el[0].f7DataTable) {
      const instance = table.$el[0].f7DataTable;
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
      const $inputEl = $(this);
      const checked = $inputEl[0].checked;
      const columnIndex = $inputEl.parents('td,th').index();

      if ($inputEl.parents('thead').length > 0) {
        if (columnIndex === 0) {
          $el
            .find('tbody tr')[checked ? 'addClass' : 'removeClass']('data-table-row-selected');
        }
        $el
          .find(`tbody tr td:nth-child(${columnIndex + 1}) input`)
          .prop('checked', checked)
          .trigger('change', { sentByF7DataTable: true });
      } else {
        if (columnIndex === 0) {
          $inputEl.parents('tr')[checked ? 'addClass' : 'removeClass']('data-table-row-selected');
        }

        if (!checked) {
          $el.find(`thead .checkbox-cell:nth-child(${columnIndex + 1}) input[type="checkbox"]`).prop('checked', false);
        } else if ($el.find(`tbody .checkbox-cell:nth-child(${columnIndex + 1}) input[type="checkbox"]:checked`).length === $el.find('tbody tr').length) {
          $el.find(`thead .checkbox-cell:nth-child(${columnIndex + 1}) input[type="checkbox"]`).prop('checked', true).trigger('change', { sentByF7DataTable: true });
        }
      }
      table.checkSelectedHeader();
    }
    function handleSortableClick() {
      const $cellEl = $(this);
      const isActive = $cellEl.hasClass('sortable-cell-active');
      const currentSort = $cellEl.hasClass('sortable-desc') ? 'desc' : 'asc';
      let newSort;
      if (isActive) {
        newSort = currentSort === 'desc' ? 'asc' : 'desc';
        $cellEl.removeClass('sortable-desc sortable-asc').addClass(`sortable-${newSort}`);
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

  setCollapsibleLabels() {
    const table = this;
    if (!table.collapsible) return;
    table.$el.find('tbody td:not(.checkbox-cell)').each((index, el) => {
      const $el = $(el);
      const elIndex = $el.index();
      const collpsibleTitle = $el.attr('data-collapsible-title');
      if (!collpsibleTitle && collpsibleTitle !== '') {
        $el.attr('data-collapsible-title', table.$el.find('thead th').eq(elIndex).text());
      }
    });
  }

  checkSelectedHeader() {
    const table = this;
    if (table.$headerEl.length > 0 && table.$headerSelectedEl.length > 0) {
      const checkedItems = table.$el.find('tbody .checkbox-cell input:checked').length;
      table.$el[checkedItems > 0 ? 'addClass' : 'removeClass']('data-table-has-checked');
      table.$headerSelectedEl.find('.data-table-selected-count').text(checkedItems);
    }
  }

  init() {
    const table = this;
    table.attachEvents();
    table.setCollapsibleLabels();
    table.checkSelectedHeader();
  }

  destroy() {
    let table = this;

    table.$el.trigger('datatable:beforedestroy', table);
    table.emit('local::beforeDestroy datatableBeforeDestroy', table);

    table.attachEvents();
    table.$el[0].f7DataTable = null;
    delete table.$el[0].f7DataTable;
    Utils.deleteProps(table);
    table = null;
  }
}

export default DataTable;
