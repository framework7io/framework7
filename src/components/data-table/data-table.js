import $ from 'dom7';
import Utils from '../../utils/utils';
import DataTable from './data-table-class';

export default {
  name: 'dataTable',
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
  clicks: {

  },
};
