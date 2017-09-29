import $ from 'dom7';
import DataTable from './data-table-class';
import ConstructorMethods from '../../utils/constructor-methods';

export default {
  name: 'dataTable',
  static: {
    DataTable,
  },
  create() {
    const app = this;
    app.dataTable = ConstructorMethods({
      defaultSelector: '.data-table',
      constructor: DataTable,
      app,
      domProp: 'f7DataTable',
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
