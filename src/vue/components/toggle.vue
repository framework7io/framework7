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
    const f7Toggle = ref(null);
    const elRef = ref(null);
    const toggle = () => {
      if (f7Toggle.value && f7Toggle.value.toggle) f7Toggle.value.toggle();
    };
    const onChange = (event) => {
      emit('change', event);
    };

    watch(
      () => props.checked,
      (newValue) => {
        if (!f7Toggle.value) return;
        f7Toggle.value.checked = newValue;
      },
    );

    onMounted(() => {
      f7ready(() => {
        if (!props.init || !elRef.value) return;
        f7Toggle.value = f7.toggle.create({
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
      if (f7Toggle.value && f7Toggle.value.destroy && f7Toggle.value.$el) {
        f7Toggle.value.destroy();
      }
      f7Toggle.value = null;
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
