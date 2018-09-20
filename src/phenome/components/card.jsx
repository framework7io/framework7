/* eslint import/no-unresolved: ["off"] */
/* eslint import/extensions: ["off"] */
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

import F7CardHeader from './card-header';
import F7CardContent from './card-content';
import F7CardFooter from './card-footer';

export default {
  name: 'f7-card',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    title: [String, Number],
    content: [String, Number],
    footer: [String, Number],
    outline: Boolean,
    padding: {
      type: Boolean,
      default: true,
    },
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      title,
      content,
      footer,
      padding,
      outline,
    } = props;

    let headerEl;
    let contentEl;
    let footerEl;

    const classes = Utils.classNames(
      className,
      'card',
      {
        'card-outline': outline,
      },
      Mixins.colorClasses(props),
    );

    if (title || (self.slots && self.slots.header)) {
      headerEl = (
        <F7CardHeader>
          {title}
          <slot name="header" />
        </F7CardHeader>
      );
    }
    if (content || (self.slots && self.slots.content)) {
      contentEl = (
        <F7CardContent padding={padding}>
          {content}
          <slot name="content" />
        </F7CardContent>
      );
    }
    if (footer || (self.slots && self.slots.footer)) {
      footerEl = (
        <F7CardFooter>
          {footer}
          <slot name="footer" />
        </F7CardFooter>
      );
    }

    return (
      <div id={id} style={style} className={classes}>
        {headerEl}
        {contentEl}
        {footerEl}
        <slot />
      </div>
    );
  },
};
