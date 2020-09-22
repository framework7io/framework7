<template>
  <label ref="elRef" :class="classes">
    <input
      type="checkbox"
      :name="name"
      :disabled="disabled"
      :readonly="readonly"
      :checked="checked"
      :value="value"
      @change="onChange"
    />
    <span class="toggle-icon" />
  </label>
</template>
<script>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';
import { f7ready, f7 } from '../shared/f7';

export default {
  name: 'f7-toggle',
  props: {
    init: {
      type: Boolean,
      default: true,
    },
    checked: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    name: String,
    value: [String, Number, Array],
    ...colorProps,
  },
  emits: ['change', 'toggle:change', 'update:checked'],
  setup(props, { emit }) {
    let f7Toggle = null;
    const elRef = ref(null);
    const toggle = () => {
      if (f7Toggle && f7Toggle.toggle) f7Toggle.toggle();
    };
    const onChange = (event) => {
      emit('change', event);
    };

    watch(
      () => props.checked,
      (newValue) => {
        if (!f7Toggle) return;
        f7Toggle.checked = newValue;
      },
    );

    onMounted(() => {
      f7ready(() => {
        if (!props.init || !elRef.value) return;
        f7Toggle = f7.toggle.create({
          el: elRef.value,
          on: {
            change(toggleInstance) {
              emit('toggle:change', toggleInstance.checked);
              emit('update:checked', toggleInstance.checked);
            },
          },
        });
      });
    });

    onBeforeUnmount(() => {
      if (f7Toggle && f7Toggle.destroy && f7Toggle.$el) {
        f7Toggle.destroy();
      }
      f7Toggle = null;
    });

    const classes = computed(() =>
      classNames(
        'toggle',
        {
          disabled: props.disabled,
        },
        colorClasses(props),
      ),
    );
    return {
      classes,
      elRef,
      toggle,
      f7Toggle,
      onChange,
    };
  },
};
</script>
