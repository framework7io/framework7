<script>
import { h, computed, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';
import { f7ready, f7 } from '../shared/f7';
import { modalStateClasses } from '../shared/modal-state-classes';

export default {
  name: 'f7-sheet',
  props: {
    opened: Boolean,
    animate: {
      type: Boolean,
      default: undefined,
    },
    top: Boolean,
    bottom: Boolean,
    position: String,
    backdrop: {
      type: Boolean,
      default: undefined,
    },
    backdropEl: {
      type: [String, Object],
      default: undefined,
    },
    closeByBackdropClick: {
      type: Boolean,
      default: undefined,
    },
    closeByOutsideClick: {
      type: Boolean,
      default: undefined,
    },
    closeOnEscape: {
      type: Boolean,
      default: undefined,
    },
    push: Boolean,
    swipeToClose: {
      type: Boolean,
      default: undefined,
    },
    swipeToStep: {
      type: Boolean,
      default: undefined,
    },
    swipeHandler: {
      type: [String, Object],
      default: undefined,
    },
    containerEl: {
      type: [String, Object],
      default: undefined,
    },
    ...colorProps,
  },
  emits: [
    'sheet:stepprogress',
    'sheet:stepopen',
    'sheet:stepclose',
    'sheet:open',
    'sheet:opened',
    'sheet:close',
    'sheet:closed',
    'update:opened',
  ],
  setup(props, { emit, slots }) {
    let f7Sheet = null;
    // eslint-disable-next-line
    let isOpened = props.opened;
    let isClosing = false;
    const elRef = ref(null);

    const onStepProgress = (instance, progress) => {
      emit('sheet:stepprogress', instance, progress);
    };
    const onStepOpen = (instance) => {
      emit('sheet:stepopen', instance);
    };
    const onStepClose = (instance) => {
      emit('sheet:stepclose', instance);
    };
    const onOpen = (instance) => {
      isOpened = true;
      isClosing = false;
      emit('sheet:open', instance);
      emit('update:opened', true);
    };
    const onOpened = (instance) => {
      emit('sheet:opened', instance);
    };
    const onClose = (instance) => {
      isOpened = false;
      isClosing = true;
      emit('sheet:close', instance);
    };
    const onClosed = (instance) => {
      isClosing = false;
      emit('sheet:closed', instance);
      emit('update:opened', false);
    };

    onMounted(() => {
      if (!elRef.value) return;
      const sheetParams = {
        el: elRef.value,
        on: {
          open: onOpen,
          opened: onOpened,
          close: onClose,
          closed: onClosed,
          stepOpen: onStepOpen,
          stepClose: onStepClose,
          stepProgress: onStepProgress,
        },
      };
      const {
        animate,
        backdrop,
        backdropEl,
        closeByBackdropClick,
        closeByOutsideClick,
        closeOnEscape,
        swipeToClose,
        swipeToStep,
        swipeHandler,
        containerEl,
      } = props;

      if (typeof animate !== 'undefined') sheetParams.animate = animate;
      if (typeof backdrop !== 'undefined') sheetParams.backdrop = backdrop;
      if (typeof backdropEl !== 'undefined') sheetParams.backdropEl = backdropEl;
      if (typeof closeByBackdropClick !== 'undefined')
        sheetParams.closeByBackdropClick = closeByBackdropClick;
      if (typeof closeByOutsideClick !== 'undefined')
        sheetParams.closeByOutsideClick = closeByOutsideClick;
      if (typeof closeOnEscape !== 'undefined') sheetParams.closeOnEscape = closeOnEscape;
      if (typeof swipeToClose !== 'undefined') sheetParams.swipeToClose = swipeToClose;
      if (typeof swipeToStep !== 'undefined') sheetParams.swipeToStep = swipeToStep;
      if (typeof swipeHandler !== 'undefined') sheetParams.swipeHandler = swipeHandler;
      if (typeof containerEl !== 'undefined') sheetParams.containerEl = containerEl;

      f7ready(() => {
        f7Sheet = f7.sheet.create(sheetParams);
        if (props.opened) {
          f7Sheet.open(false);
        }
      });
    });

    onBeforeUnmount(() => {
      if (f7Sheet) {
        f7Sheet.destroy();
      }
      f7Sheet = null;
    });

    watch(
      () => props.opened,
      (value) => {
        if (!f7Sheet) return;
        if (value) {
          f7Sheet.open();
        } else {
          f7Sheet.close();
        }
      },
    );

    const classes = computed(() => {
      let positionComputed = 'bottom';
      if (props.position) positionComputed = props.position;
      else if (props.top) positionComputed = 'top';
      else if (props.bottom) positionComputed = 'bottom';
      return classNames(
        'sheet-modal',
        `sheet-modal-${positionComputed}`,
        {
          'sheet-modal-push': props.push,
        },
        modalStateClasses({ isOpened, isClosing }),
        colorClasses(props),
      );
    });

    const fixedTags = 'navbar toolbar tabbar subnavbar searchbar messagebar fab list-index panel'
      .split(' ')
      .map((tagName) => `f7-${tagName}`);

    return () => {
      const fixedList = [];
      const staticList = [];
      if (slots.default) {
        slots.default().forEach((vnode) => {
          if (typeof vnode === 'undefined') return;
          const tag = vnode.type && vnode.type.name ? vnode.type.name : vnode.type;
          if (fixedTags.indexOf(tag) >= 0) {
            fixedList.push(vnode);
          } else {
            staticList.push(vnode);
          }
        });
      }
      return h('div', { class: classes.value, ref: elRef }, [
        fixedList,
        slots.fixed && slots.fixed(),
        h('div', { class: 'sheet-modal-inner' }, [staticList, slots.static && slots.static()]),
      ]);
    };
  },
};
</script>
