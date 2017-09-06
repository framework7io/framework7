import $ from 'dom7';
import Utils from '../../utils/utils';
import DataTable from './data-table-class';

export default {
  name: 'dataTable',
  static: {
    DataTable,
  },
  create() {
    const app = this;
    Utils.extend(app, {
      dataTable: {
        create(params) {
          return new DataTable(app, params);
        },
        get(tableEl) {
          if ((tableEl instanceof DataTable)) return tableEl;
          const $tableEl = $(tableEl);
          if (!$tableEl.length) return undefined;
          return $tableEl[0].f7DataTable;
        },
        destroy(tableEl) {
          const dt = app.autocomplete.get(tableEl);
          if (dt && dt.destroy) return dt.destroy();
          return undefined;
        },
      },
    });
  },
  on: {
    tabBeforeRemove(tabEl) {
      const app = this;
      $(tabEl).find('.data-table-init').each((index, tableEl) => {
        app.dataTable.destroy(tableEl);
      });
    },
    tabMounted(tabEl) {
      const app = this;
      $(tabEl).find('.data-table-init').each((index, tableEl) => {
        app.dataTable.create({ el: tableEl });
      });
    },
    pageBeforeRemove(page) {
      const app = this;
      page.$el.find('.data-table-init').each((index, tableEl) => {
        app.dataTable.destroy(tableEl);
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.data-table-init').each((index, tableEl) => {
        app.dataTable.create({ el: tableEl });
      });
    },
  },
  clicks: {

  },
};
