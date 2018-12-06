import React from 'react';
import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7ActionsButton extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onClick']);
    })();
  }

  onClick(event) {
    const self = this;
    const $$ = self.$$;
    const el = self.refs.el;

    if (self.props.close && self.$f7 && el) {
      self.$f7.actions.close($$(el).parents('.actions-modal'));
    }

    self.dispatchEvent('click', event);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      id,
      className,
      style,
      bold
    } = props;
    let mediaEl;

    if (self.slots.media && self.slots.media.length) {
      mediaEl = React.createElement('div', {
        className: 'actions-button-media'
      }, this.slots['media']);
    }

    const classes = Utils.classNames(className, {
      'actions-button': true,
      'actions-button-bold': bold
    }, Mixins.colorClasses(props));
    return React.createElement('div', {
      id: id,
      style: style,
      className: classes,
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      }
    }, mediaEl, React.createElement('div', {
      className: 'actions-button-text'
    }, this.slots['default']));
  }

  componentWillUnmount() {
    this.refs.el.removeEventListener('click', this.onClick);
  }

  componentDidMount() {
    this.refs.el.addEventListener('click', this.onClick);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

}

__reactComponentSetProps(F7ActionsButton, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  bold: Boolean,
  close: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps));

F7ActionsButton.displayName = 'f7-actions-button';
export default F7ActionsButton;