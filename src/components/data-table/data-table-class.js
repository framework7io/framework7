import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';

class DataTable extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);
    const table = this;

    const defaults = {
      dual: false,
      step: 1,
      label: false,
    };

    // Extend defaults with modules params
    table.useInstanceModulesParams(defaults);

    table.params = Utils.extend(defaults, params);

    // Install Modules
    table.useInstanceModules();

    return table;
  }
}

export default DataTable;
