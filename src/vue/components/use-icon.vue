<template>
  <f7-icon v-bind="icon.props">
    <f7-badge v-if="icon.badge" v-bind="icon.badge.props">{{ icon.badge.content }}</f7-badge>
  </f7-icon>
</template>
<script>
import f7Icon from './icon.js';
import f7Badge from './badge.js';

export default {
  name: 'f7-use-icon',
  components: {
    f7Icon,
    f7Badge,
  },
  props: {
    icon: Object,
  },
};
</script>
