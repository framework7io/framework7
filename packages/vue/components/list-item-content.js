function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var id = props.id,
        className = props.className,
        style = props.style,
        radio = props.radio,
        checkbox = props.checkbox,
        value = props.value,
        name = props.name,
        checked = props.checked,
        defaultChecked = props.defaultChecked,
        readonly = props.readonly,
        disabled = props.disabled,
        required = props.required,
        media = props.media,
        header = props.header,
        footer = props.footer,
        title = props.title,
        subtitle = props.subtitle,
        text = props.text,
        after = props.after,
        badge = props.badge,
        mediaList = props.mediaList,
        mediaItem = props.mediaItem,
        badgeColor = props.badgeColor;
    var slotsContentStart = [];
    var slotsContent = [];
    var slotsContentEnd = [];
    var slotsInnerStart = [];
    var slotsInner = [];
    var slotsInnerEnd = [];
    var slotsAfterStart = [];
    var slotsAfter = [];
    var slotsAfterEnd = [];
    var slotsMedia = [];
    var slotsBeforeTitle = [];
    var slotsTitle = [];
    var slotsAfterTitle = [];
    var slotsSubtitle = [];
    var slotsText = [];
    var slotsHeader = [];
    var slotsFooter = [];
    var titleEl;
    var afterWrapEl;
    var afterEl;
    var badgeEl;
    var innerEl;
    var titleRowEl;
    var subtitleEl;
    var textEl;
    var mediaEl;
    var inputEl;
    var inputIconEl;
    var headerEl;
    var footerEl;
    var slots = self.$slots.default;
    var flattenSlots = [];

    if (slots && slots.length) {
      slots.forEach(function (slot) {
        if (Array.isArray(slot)) flattenSlots.push.apply(flattenSlots, _toConsumableArray(slot));else flattenSlots.push(slot);
      });
    }

    flattenSlots.forEach(function (child) {
      if (typeof child === 'undefined') return;
      var slotName;
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
            checked: checked,
            readonly: readonly,
            disabled: disabled,
            required: required,
            value: value
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
        class: "icon icon-".concat(radio ? 'radio' : 'checkbox')
      });
    }

    if (media || slotsMedia.length) {
      var mediaImgEl;

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

    var isMedia = mediaItem || mediaList;

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

    var ItemContentTag = checkbox || radio ? 'label' : 'div';
    var classes = Utils.classNames(className, 'item-content', {
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
  created: function created() {
    Utils.bindMethods(this, 'onClick onChange'.split(' '));
  },
  mounted: function mounted() {
    var self = this;
    var _self$$refs = self.$refs,
        el = _self$$refs.el,
        inputEl = _self$$refs.inputEl;
    var indeterminate = self.props.indeterminate;

    if (indeterminate && inputEl) {
      inputEl.indeterminate = true;
    }

    el.addEventListener('click', self.onClick);
  },
  updated: function updated() {
    var self = this;
    var inputEl = self.$refs.inputEl;
    var indeterminate = self.props.indeterminate;

    if (inputEl) {
      inputEl.indeterminate = indeterminate;
    }
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    var el = self.$refs.el;
    el.removeEventListener('click', self.onClick);
  },
  methods: {
    onClick: function onClick(event) {
      this.dispatchEvent('click', event);
    },
    onChange: function onChange(event) {
      this.dispatchEvent('change', event);
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};