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
        destroy(tableEl) {
          const $tableEl = $(tableEl);
          if (!$tableEl.length) return undefined;
          const dataTable = $tableEl[0].f7DataTable;
          if (!dataTable) return undefined;
          return dataTable.destroy();
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
