import Framework7Component from './component-class';
import parseComponent from './parse-component';

export default {
  name: 'component',
  create() {
    const app = this;
    app.component = {
      parse(componentString) {
        return parseComponent(componentString);
      },
      create(options, extendContext) {
        return new Framework7Component(app, options, extendContext);
      },
    };
  },
};
