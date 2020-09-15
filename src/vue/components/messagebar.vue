<script>
import { h, computed, ref, onMounted, onBeforeUnmount, watch, onUpdated } from 'vue';
import { classNames, noUndefinedProps } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';
import { f7ready, f7 } from '../shared/f7';

import Link from './link';
import Input from './input';

export default {
  name: 'f7-messagebar',
  props: {
    sheetVisible: Boolean,
    attachmentsVisible: Boolean,
    top: Boolean,
    resizable: {
      type: Boolean,
      default: true,
    },
    bottomOffset: {
      type: Number,
      default: 0,
    },
    topOffset: {
      type: Number,
      default: 0,
    },
    maxHeight: Number,
    resizePage: {
      type: Boolean,
      default: true,
    },
    sendLink: String,
    value: [String, Number, Array],
    disabled: Boolean,
    readonly: Boolean,
    textareaId: [Number, String],
    name: String,
    placeholder: {
      type: String,
      default: 'Message',
    },
    init: {
      type: Boolean,
      default: true,
    },
    ...colorProps,
  },
  emits: [
    'change',
    'input',
    'focus',
    'blur',
    'submit',
    'send',
    'click',
    'messagebar:attachmentdelete',
    'messagebar:attachmentclick',
    'messagebar:resizepage',
  ],
  setup(props, { emit, slots }) {
    const elRef = ref(null);
    const areaElRef = ref(null);
    const f7Messagebar = ref(null);
    const updateSheetVisible = ref(false);
    const updateAttachmentsVisible = ref(false);

    const onChange = (event) => {
      emit('change', event);
    };
    const onInput = (event) => {
      emit('input', event);
    };
    const onFocus = (event) => {
      emit('focus', event);
    };
    const onBlur = (event) => {
      emit('blur', event);
    };
    const onClick = (event) => {
      const inputValue = areaElRef.value.$el;

      const clear = f7Messagebar.value
        ? () => {
            f7Messagebar.value.clear();
          }
        : () => {};
      emit('submit', inputValue, clear);
      emit('send', inputValue, clear);
      emit('click', event);
    };
    const onAttachmentDelete = (instance, attachmentEl, attachmentElIndex) => {
      emit('messagebar:attachmentdelete', instance, attachmentEl, attachmentElIndex);
    };
    const onAttachmentClick = (instance, attachmentEl, attachmentElIndex) => {
      emit('messagebar:attachmentclick', instance, attachmentEl, attachmentElIndex);
    };
    const onResizePage = (instance) => {
      emit('messagebar:resizepage', instance);
    };

    watch(
      () => props.sheetVisible,
      () => {
        if (!props.resizable || !f7Messagebar.value) return;
        updateSheetVisible.value = true;
      },
    );
    watch(
      () => props.attachmentsVisible,
      () => {
        if (!props.resizable || !f7Messagebar.value) return;
        updateAttachmentsVisible.value = true;
      },
    );

    onMounted(() => {
      if (!props.init) return;

      if (!elRef.value) return;

      const params = noUndefinedProps({
        el: elRef.value,
        top: props.top,
        resizePage: props.resizePage,
        bottomOffset: props.bottomOffset,
        topOffset: props.topOffset,
        maxHeight: props.maxHeight,
        on: {
          attachmentDelete: onAttachmentDelete,
          attachmentClick: onAttachmentClick,
          resizePage: onResizePage,
        },
      });

      f7ready(() => {
        f7Messagebar.value = f7.messagebar.create(params);
      });
    });

    onUpdated(() => {
      if (!f7Messagebar.value) return;
      if (updateSheetVisible.value) {
        updateSheetVisible.value = false;
        f7Messagebar.value.sheetVisible = props.sheetVisible;
        f7Messagebar.value.resizePage();
      }
      if (updateAttachmentsVisible.value) {
        updateAttachmentsVisible.value = false;
        f7Messagebar.value.attachmentsVisible = props.attachmentsVisible;
        f7Messagebar.value.resizePage();
      }
    });

    onBeforeUnmount(() => {
      if (f7Messagebar.value && f7Messagebar.value.destroy) f7Messagebar.value.destroy();
      f7Messagebar.value = null;
    });

    const classes = computed(() =>
      classNames(
        'toolbar',
        'messagebar',
        {
          'messagebar-attachments-visible': props.attachmentsVisible,
          'messagebar-sheet-visible': props.sheetVisible,
        },
        colorClasses(props),
      ),
    );
    return () => {
      const valueProps = {};
      if ('value' in props) valueProps.value = props.value;

      const {
        default: slotsDefault,
        'before-inner': slotsBeforeInner,
        'after-inner': slotsAfterInner,
        'send-link': slotsSendLink,
        'inner-start': slotsInnerStart,
        'inner-end': slotsInnerEnd,
        'before-area': slotsBeforeArea,
        'after-area': slotsAfterArea,
      } = slots;

      const innerEndEls = [];

      let messagebarAttachmentsEl;
      let messagebarSheetEl;

      if (slotsDefault) {
        slotsDefault().forEach((vnode) => {
          if (typeof vnode === 'undefined') return;
          const tag = vnode.type && vnode.type.name ? vnode.type.name : vnode.type;

          if (
            tag &&
            (tag.indexOf('messagebar-attachments') >= 0 ||
              tag === 'F7MessagebarAttachments' ||
              tag === 'f7-messagebar-attachments')
          ) {
            messagebarAttachmentsEl = vnode;
          } else if (
            tag &&
            (tag.indexOf('messagebar-sheet') >= 0 ||
              tag === 'F7MessagebarSheet' ||
              tag === 'f7-messagebar-sheet')
          ) {
            messagebarSheetEl = vnode;
          } else {
            innerEndEls.push(vnode);
          }
        });
      }

      return h('div', { class: classes, ref: elRef }, [
        slotsBeforeInner && slotsBeforeInner(),
        h('div', { class: 'toolbar-inner' }, [
          slotsInnerStart && slotsInnerStart(),
          h('div', { class: 'messagebar-area' }, [
            slotsBeforeArea && slotsBeforeArea(),
            messagebarAttachmentsEl,
            h(Input, {
              id: props.textareaId,
              ref: areaElRef,
              type: 'textarea',
              wrap: false,
              placeholder: props.placeholder,
              disabled: props.disabled,
              name: props.name,
              readonly: props.readonly,
              resizable: props.resizable,
              onInput,
              onChange,
              onFocus,
              onBlur,
              ...valueProps,
            }),
            slotsAfterArea && slotsAfterArea(),
          ]),
          ((props.sendLink && props.sendLink.length > 0) || slotsSendLink) &&
            h(Link, { onClick }, [slotsSendLink ? slotsSendLink() : props.sendLink]),
          slotsInnerEnd && slotsInnerEnd(),
          innerEndEls,
        ]),
        slotsAfterInner && slotsAfterInner(),
        messagebarSheetEl,
      ]);
    };
  },
};
</script>