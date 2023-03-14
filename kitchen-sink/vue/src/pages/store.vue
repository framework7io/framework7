<template>
  <f7-page>
    <f7-navbar title="Store" back-link="Back" />
    <f7-block strong outline-ios inset-md>
      <p>
        Framework7 comes with a built-in lightweight application state management library - Store.
        It serves as a centralized Store for all the components in an application.
      </p>
    </f7-block>
    <f7-block v-if="!users" class="text-align-center">
      <f7-button v-if="!loading" fill round @click="load">Load Users</f7-button>
      <f7-preloader v-else />
    </f7-block>
    <f7-list v-if="users" strong outline-ios dividers-ios inset-md>
      <f7-list-item v-for="user in users" :key="user" :title="user" />
    </f7-list>
  </f7-page>
</template>
<script>
import {
  f7,
  useStore,
  f7Page,
  f7Navbar,
  f7Block,
  f7Button,
  f7Preloader,
  f7List,
  f7ListItem,
} from 'framework7-vue';

export default {
  components: {
    f7Page,
    f7Navbar,
    f7Block,
    f7Button,
    f7Preloader,
    f7List,
    f7ListItem,
  },
  setup() {
    // Subscribe to store getters
    const users = useStore('users');
    const loading = useStore('usersLoading');

    // Call store action
    const load = () => f7.store.dispatch('loadUsers');

    return {
      users,
      loading,
      load,
    };
  },
};
</script>
