<template>
  <div ref="elRef" :class="classes">
    <div class="navbar-bg" />
    <slot name="before-inner" />
    <div :class="innerClasses">
      <f7-nav-left
        v-if="hasLeft"
        :back-link="backLink"
        :back-link-url="backLinkUrl"
        :back-link-force="backLinkForce"
        :back-link-show-text="backLinkShowText"
        @back:click="onBackClick"
      >
        <slot name="nav-left" />
        <slot name="left" />
      </f7-nav-left>
      <f7-nav-title v-if="hasTitle" :title="title" :subtitle="subtitle">
        <slot name="title" />
      </f7-nav-title>
      <f7-nav-right v-if="hasRight">
        <slot name="nav-right" />
        <slot name="right" />
      </f7-nav-right>
      <div v-if="hasLargeTitle" className="title-large">
        <div className="title-large-text">
          {{ largeTitle }}
          <slot name="title-large" />
        </div>
      </div>
      <slot />
    </div>
    <slot name="after-inner" />
  </div>
</template>
<script>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { f7ready, f7 } from '../shared/f7.js';
import { useTheme } from '../shared/use-theme.js';

import f7NavLeft from './nav-left.js';
import f7NavTitle from './nav-title.js';
import f7NavRight from './nav-right.js';

export default {
  name: 'f7-navbar',
  components: {
    f7NavLeft,
    f7NavTitle,
    f7NavRight,
  },
  props: {
    backLink: [Boolean, String],
    backLinkUrl: String,
    backLinkForce: Boolean,
    backLinkShowText: {
      type: Boolean,
      default: undefined,
    },
    sliding: {
      type: Boolean,
      default: true,
    },
    title: String,
    subtitle: String,
    hidden: Boolean,
    outline: { type: Boolean, default: true },
    innerClass: String,
    innerClassName: String,
    large: Boolean,
    largeTransparent: Boolean,
    transparent: Boolean,
    titleLarge: String,
    ...colorProps,
  },
  emits: [
    'navbar:hide',
    'navbar:show',
    'navbar:expand',
    'navbar:collapse',
    'navbar:transparentshow',
    'navbar:transparenthide',
    'click:back',
    'back:click',
  ],
  setup(props, { emit, slots }) {
    let routerPositionClass = '';
    let largeCollapsed = false;
    let routerNavbarRole = null;
    let routerNavbarRoleDetailRoot = false;
    let routerNavbarMasterStack = false;
    let transparentVisible = false;

    const elRef = ref(null);

    const theme = useTheme();

    const onHide = (navbarEl) => {
      if (elRef.value !== navbarEl) return;
      emit('navbar:hide');
    };
    const onShow = (navbarEl) => {
      if (elRef.value !== navbarEl) return;
      emit('navbar:show');
    };
    const onExpand = (navbarEl) => {
      if (elRef.value !== navbarEl) return;
      largeCollapsed = false;
      emit('navbar:expand');
    };
    const onCollapse = (navbarEl) => {
      if (elRef.value !== navbarEl) return;
      largeCollapsed = true;
      emit('navbar:collapse');
    };
    const onNavbarTransparentShow = (navbarEl) => {
      if (elRef.value !== navbarEl) return;
      transparentVisible = true;
      emit('navbar:transparentshow');
    };
    const onNavbarTransparentHide = (navbarEl) => {
      if (elRef.value !== navbarEl) return;
      transparentVisible = false;
      emit('navbar:transparenthide');
    };
    const onNavbarPosition = (navbarEl, position) => {
      if (elRef.value !== navbarEl) return;
      routerPositionClass = position ? `navbar-${position}` : '';
    };
    const onNavbarRole = (navbarEl, rolesData) => {
      if (elRef.value !== navbarEl) return;
      routerNavbarRole = rolesData.role;
      routerNavbarRoleDetailRoot = rolesData.detailRoot;
    };
    const onNavbarMasterStack = (navbarEl) => {
      if (elRef.value !== navbarEl) return;
      routerNavbarMasterStack = true;
    };
    const onNavbarMasterUnstack = (navbarEl) => {
      if (elRef.value !== navbarEl) return;
      routerNavbarMasterStack = false;
    };
    const hide = (animate) => {
      if (!f7) return;
      f7.navbar.hide(elRef.value, animate);
    };
    const show = (animate) => {
      if (!f7) return;
      f7.navbar.show(elRef.value, animate);
    };
    const size = () => {
      if (!f7) return;
      f7.navbar.size(elRef.value);
    };
    const onBackClick = (event) => {
      emit('back:click', event);
      emit('click:back', event);
    };

    onMounted(() => {
      if (!elRef.value) return;
      f7ready(() => {
        f7.navbar.size(elRef.value);
        f7.on('navbarShow', onShow);
        f7.on('navbarHide', onHide);
        f7.on('navbarCollapse', onCollapse);
        f7.on('navbarExpand', onExpand);
        f7.on('navbarPosition', onNavbarPosition);
        f7.on('navbarRole', onNavbarRole);
        f7.on('navbarMasterStack', onNavbarMasterStack);
        f7.on('navbarMasterUnstack', onNavbarMasterUnstack);
        f7.on('navbarTransparentShow', onNavbarTransparentShow);
        f7.on('navbarTransparentHide', onNavbarTransparentHide);
      });
    });

    onBeforeUnmount(() => {
      if (!f7) return;
      f7.off('navbarShow', onShow);
      f7.off('navbarHide', onHide);
      f7.off('navbarCollapse', onCollapse);
      f7.off('navbarExpand', onExpand);
      f7.off('navbarPosition', onNavbarPosition);
      f7.off('navbarRole', onNavbarRole);
      f7.off('navbarMasterStack', onNavbarMasterStack);
      f7.off('navbarMasterUnstack', onNavbarMasterUnstack);
      f7.off('navbarTransparentShow', onNavbarTransparentShow);
      f7.off('navbarTransparentHide', onNavbarTransparentHide);
    });

    const addLeftTitleClass = computed(
      () => theme.value && theme.value.ios && f7 && !f7.params.navbar.iosCenterTitle,
    );

    const addCenterTitleClass = computed(
      () => theme.value && theme.value.md && f7 && f7.params.navbar.mdCenterTitle,
    );

    const isLarge = computed(() => props.large || props.largeTransparent);
    const isTransparent = computed(
      () => props.transparent || (isLarge.value && props.largeTransparent),
    );
    const isTransparentVisible = computed(() => isTransparent.value && transparentVisible);

    const classes = computed(() =>
      classNames(
        'navbar',
        routerPositionClass,
        {
          'navbar-hidden': props.hidden,
          'navbar-large': isLarge.value,
          'navbar-large-collapsed': isLarge.value && largeCollapsed,
          'navbar-transparent': isTransparent.value,
          'navbar-transparent-visible': isTransparentVisible.value,
          'navbar-master': routerNavbarRole === 'master',
          'navbar-master-detail': routerNavbarRole === 'detail',
          'navbar-master-detail-root': routerNavbarRoleDetailRoot === true,
          'navbar-master-stacked': routerNavbarMasterStack === true,
          'no-outline': !props.outline,
        },
        colorClasses(props),
      ),
    );

    const largeTitle = computed(() => {
      let largeTitleText = props.titleLarge;
      if (!largeTitleText && props.large && props.title) largeTitleText = props.title;
      return largeTitleText;
    });

    const hasLeft = computed(() => {
      return props.backLink || slots['nav-left'] || slots.left;
    });

    const hasTitle = computed(() => {
      return props.title || props.subtitle || slots.title;
    });

    const hasRight = computed(() => {
      return slots['nav-right'] || slots.right;
    });

    const hasLargeTitle = computed(() => {
      return largeTitle.value || slots['title-large'];
    });

    const innerClasses = computed(() => {
      return classNames('navbar-inner', props.innerClass, props.innerClassName, {
        sliding: props.sliding,
        'navbar-inner-left-title': addLeftTitleClass.value,
        'navbar-inner-centered-title': addCenterTitleClass.value,
      });
    });

    return {
      elRef,
      classes,
      innerClasses,
      hide,
      show,
      size,
      largeTitle,
      hasLeft,
      hasTitle,
      hasRight,
      hasLargeTitle,
      onBackClick,
    };
  },
};
</script>
