<script>
import { h, computed, ref } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { useTooltip } from '../shared/use-tooltip.js';

export default {
  name: 'f7-fab',
  props: {
    morphTo: String,
    href: [Boolean, String],
    target: String,
    text: String,
    position: {
      type: String,
      default: 'right-bottom',
    },
    tooltip: String,
    tooltipTrigger: String,
    ...colorProps,
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    const elRef = ref(null);

    const onClick = (e) => {
      emit('click', e);
    };

    useTooltip(elRef, props);

    const hrefComputed = computed(() => {
      let href = props.href;
      if (href === true) href = '#';
      if (href === false) href = undefined; // no href attribute
      return href;
    });

    return () => {
      const linkChildren = [];
      const rootChildren = [];
      let textEl;
      let linkEl;

      const { link: linkSlots, default: defaultSlots, root: rootSlots, text: textSlots } = slots;

      if (defaultSlots) {
        defaultSlots().forEach((vnode) => {
          if (typeof vnode === 'undefined') return;
          const tag = vnode.type && vnode.type.name ? vnode.type.name : vnode.type;
          if (tag === 'FabButtons' || tag === 'f7-fab-buttons') rootChildren.push(vnode);
          else linkChildren.push(vnode);
        });
      }
      if (props.text || textSlots) {
        textEl = h('div', { class: 'fab-text' }, [props.text, textSlots && textSlots()]);
      }
      if (linkChildren.length || linkSlots || textEl) {
        linkEl = h('a', { target: props.target, href: hrefComputed.value, onClick }, [
          linkChildren,
          textEl,
          linkSlots && linkSlots(),
        ]);
      }
      const classes = classNames(
        'fab',
        `fab-${props.position}`,
        {
          'fab-morph': props.morphTo,
          'fab-extended': typeof textEl !== 'undefined',
        },
        colorClasses(props),
      );
      return h(
        'div',
        {
          class: classes,
          'data-morph-to': props.morphTo,
          ref: elRef,
        },
        [linkEl, rootChildren, rootSlots && rootSlots()],
      );
    };
  },
};
</script>
