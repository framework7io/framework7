import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';

class Messages extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);

    const messages = this;

    const defaults = {

    };

    // Extend defaults with modules params
    messages.useInstanceModulesParams(defaults);

    messages.params = Utils.extend(defaults, params);


    // Install Modules
    messages.useInstanceModules();

    // Init
    messages.init();

    return messages;
  }
}

export default Messages;
