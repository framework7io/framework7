import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Badge from './badge';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-list-item-content',
  props: Object.assign({
    id: [String, Number],
    title: [String, Number],
    text: [String, Number],
    media: String,
    subtitle: [String, Number],
    header: [String, Number],
    footer: [String, Number],
    after: [String, Number],
    badge: [String, Number],
    badgeColor: String,
    mediaList: Boolean,
    mediaItem: Boolean,
    checkbox: Boolean,
    checked: Boolean,
    defaultChecked: Boolean,
    indeterminate: Boolean,
    radio: Boolean,
    name: String,
    value: [String, Number, Array],
    readonly: Boolean,
    required: Boolean,
    disabled: Boolean
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      id,
      className,
      style,
      radio,
      checkbox,
      value,
      name,
      checked,
      defaultChecked,
      readonly,
      disabled,
      required,
      media,
      header,
      footer,
      title,
      subtitle,
      text,
      after,
      badge,
      mediaList,
      mediaItem,
      badgeColor
    } = props;
    const slotsContentStart = [];
    const slotsContent = [];
    const slotsContentEnd = [];
    const slotsInnerStart = [];
    const slotsInner = [];
    const slotsInnerEnd = [];
    const slotsAfterStart = [];
    const slotsAfter = [];
    const slotsAfterEnd = [];
    const slotsMedia = [];
    const slotsBeforeTitle = [];
    const slotsTitle = [];
    const slotsAfterTitle = [];
    const slotsSubtitle = [];
    const slotsText = [];
    const slotsHeader = [];
    const slotsFooter = [];
    let titleEl;
    let afterWrapEl;
    let afterEl;
    let badgeEl;
    let innerEl;
    let titleRowEl;
    let subtitleEl;
    let textEl;
    let mediaEl;
    let inputEl;
    let inputIconEl;
    let headerEl;
    let footerEl;
    const slotsDefault = self.$slots.default;
    const flattenSlots = [];

    if (slotsDefault && slotsDefault.length) {
      slotsDefault.forEach(slot => {
        if (Array.isArray(slot)) flattenSlots.push(...slot);else flattenSlots.push(slot);
      });
    }

    const passedSlotsContentStart = self.$slots['content-start'];

    if (passedSlotsContentStart && passedSlotsContentStart.length) {
      slotsContentStart.push(...passedSlotsContentStart);
    }

    flattenSlots.forEach(child => {
      if (typeof child === 'undefined') return;
      let slotName;
      slotName = child.data ? child.data.slot : undefined;
      if (!slotName || slotName === 'inner') slotsInner.push(child);
      if (slotName === 'content-start') slotsContentStart.push(child);
      if (slotName === 'content') slotsContent.push(child);
      if (slotName === 'content-end') slotsContentEnd.push(child);
      if (slotName === 'after-start') slotsAfterStart.push(child);
      if (slotName === 'after') slotsAfter.push(child);
      if (slotName === 'after-end') slotsAfterEnd.push(child);
      if (slotName === 'media') slotsMedia.push(child);
      if (slotName === 'inner-start') slotsInnerStart.push(child);
      if (slotName === 'inner-end') slotsInnerEnd.push(child);
      if (slotName === 'before-title') slotsBeforeTitle.push(child);
      if (slotName === 'title') slotsTitle.push(child);
      if (slotName === 'after-title') slotsAfterTitle.push(child);
      if (slotName === 'subtitle') slotsSubtitle.push(child);
      if (slotName === 'text') slotsText.push(child);
      if (slotName === 'header') slotsHeader.push(child);
      if (slotName === 'footer') slotsFooter.push(child);
    });

    if (radio || checkbox) {
      {
        inputEl = _h('input', {
          ref: 'inputEl',
          domProps: {
            checked,
            readonly,
            disabled,
            required,
            value
          },
          on: {
            change: this.onChange
          },
          attrs: {
            name: name,
            type: radio ? 'radio' : 'checkbox'
          }
        });
      }
      inputIconEl = _h('i', {
        class: `icon icon-${radio ? 'radio' : 'checkbox'}`
      });
    }

    if (media || slotsMedia.length) {
      let mediaImgEl;

      if (media) {
        mediaImgEl = _h('img', {
          attrs: {
            src: media
          }
        });
      }

      mediaEl = _h('div', {
        class: 'item-media'
      }, [mediaImgEl, slotsMedia]);
    }

    const isMedia = mediaItem || mediaList;

    if (header || slotsHeader.length) {
      headerEl = _h('div', {
        class: 'item-header'
      }, [header, slotsHeader]);
    }

    if (footer || slotsFooter.length) {
      footerEl = _h('div', {
        class: 'item-footer'
      }, [footer, slotsFooter]);
    }

    if (title || slotsTitle.length || !isMedia && headerEl || !isMedia && footerEl) {
      titleEl = _h('div', {
        class: 'item-title'
      }, [!isMedia && headerEl, title, slotsTitle, !isMedia && footerEl]);
    }

    if (subtitle || slotsSubtitle.length) {
      subtitleEl = _h('div', {
        class: 'item-subtitle'
      }, [subtitle, slotsSubtitle]);
    }

    if (text || slotsText.length) {
      textEl = _h('div', {
        class: 'item-text'
      }, [text, slotsText]);
    }

    if (after || badge || slotsAfter.length) {
      if (after) {
        afterEl = _h('span', [after]);
      }

      if (badge) {
        badgeEl = _h(F7Badge, {
          attrs: {
            color: badgeColor
          }
        }, [badge]);
      }

      afterWrapEl = _h('div', {
        class: 'item-after'
      }, [slotsAfterStart, afterEl, badgeEl, slotsAfter, slotsAfterEnd]);
    }

    if (isMedia) {
      titleRowEl = _h('div', {
        class: 'item-title-row'
      }, [slotsBeforeTitle, titleEl, slotsAfterTitle, afterWrapEl]);
      innerEl = _h('div', {
        ref: 'innerEl',
        class: 'item-inner'
      }, [slotsInnerStart, headerEl, titleRowEl, subtitleEl, textEl, slotsInner, footerEl, slotsInnerEnd]);
    } else {
      innerEl = _h('div', {
        ref: 'innerEl',
        class: 'item-inner'
      }, [slotsInnerStart, slotsBeforeTitle, titleEl, slotsAfterTitle, afterWrapEl, slotsInner, slotsInnerEnd]);
    }

    const ItemContentTag = checkbox || radio ? 'label' : 'div';
    const classes = Utils.classNames(className, 'item-content', {
      'item-checkbox': checkbox,
      'item-radio': radio
    }, Mixins.colorClasses(props));
    return _h(ItemContentTag, {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [slotsContentStart, inputEl, inputIconEl, mediaEl, innerEl, slotsContent, slotsContentEnd]);
  },

  created() {
    Utils.bindMethods(this, 'onClick onChange'.split(' '));
  },

  mounted() {
    const self = this;
    const {
      el,
      inputEl
    } = self.$refs;
    const {
      indeterminate
    } = self.props;

    if (indeterminate && inputEl) {
      inputEl.indeterminate = true;
    }

    el.addEventListener('click', self.onClick);
  },

  updated() {
    const self = this;
    const {
      inputEl
    } = self.$refs;
    const {
      indeterminate
    } = self.props;

    if (inputEl) {
      inputEl.indeterminate = indeterminate;
    }
  },

  beforeDestroy() {
    const self = this;
    const {
      el
    } = self.$refs;
    el.removeEventListener('click', self.onClick);
  },

  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },

    onChange(event) {
      this.dispatchEvent('change', event);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};