import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Link from './link';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7NavLeft extends React.Component {
  constructor(props, context) {
    super(props, context);

    (() => {
      Utils.bindMethods(this, ['onBackClick']);
    })();
  }

  onBackClick(event) {
    this.dispatchEvent('back-click backClick click:back clickBack', event);
  }

  render() {
    const props = this.props;
    const {
      backLink,
      backLinkUrl,
      backLinkForce,
      backLinkShowText,
      sliding,
      className,
      style,
      id
    } = props;
    let linkEl;
    let needBackLinkText = backLinkShowText;
    if (typeof needBackLinkText === 'undefined') needBackLinkText = !this.$theme.md;

    if (backLink) {
      linkEl = React.createElement(F7Link, {
        href: backLinkUrl || '#',
        back: true,
        icon: 'icon-back',
        force: backLinkForce || undefined,
        className: backLink === true || backLink && this.$theme.md ? 'icon-only' : undefined,
        text: backLink !== true && needBackLinkText ? backLink : undefined,
        onClick: this.onBackClick
      });
    }

    const classes = Utils.classNames(className, 'left', {
      sliding
    }, Mixins.colorClasses(props));
    const children = [];
    const slots = this.slots;

    if (slots && Object.keys(slots).length) {
      Object.keys(slots).forEach(key => {
        children.push(...slots[key]);
      });
    }

    return React.createElement('div', {
      id: id,
      style: style,
      className: classes
    }, linkEl, children);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

}

__reactComponentSetProps(F7NavLeft, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  backLink: [Boolean, String],
  backLinkUrl: String,
  backLinkForce: Boolean,
  backLinkShowText: {
    type: Boolean,
    default: undefined
  },
  sliding: Boolean
}, Mixins.colorProps));

F7NavLeft.displayName = 'f7-nav-left';
export default F7NavLeft;