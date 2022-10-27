<template>
  <f7-page>
    <f7-navbar title="Menu List" back-link="Back"></f7-navbar>

    <f7-block>
      <p>
        Menu list unlike usual links list is designed to indicate currently active screen (or
        section) of your app. Think about it like a Tabbar but in a form of a list.
      </p>
    </f7-block>

    <f7-list menu-list strong-ios outline-ios>
      <f7-list-item
        link
        title="Home"
        :selected="selected === 'home'"
        @click="() => (selected = 'home')"
      >
        <template #media>
          <f7-icon md="material:home" ios="f7:house_fill" />
        </template>
      </f7-list-item>
      <f7-list-item
        link
        title="Profile"
        :selected="selected === 'profile'"
        @click="() => (selected = 'profile')"
      >
        <template #media>
          <f7-icon md="material:person" ios="f7:person_fill" />
        </template>
      </f7-list-item>
      <f7-list-item
        link
        title="Settings"
        :selected="selected === 'settings'"
        @click="() => (selected = 'settings')"
      >
        <template #media>
          <f7-icon md="material:settings" ios="f7:gear_alt_fill" />
        </template>
      </f7-list-item>
    </f7-list>

    <f7-list menu-list media-list strong-ios outline-ios>
      <f7-list-item
        link
        title="Home"
        subtitle="Home subtitle"
        :selected="selectedMedia === 'home'"
        @click="() => (selectedMedia = 'home')"
      >
        <template #media>
          <f7-icon md="material:home" ios="f7:house_fill" />
        </template>
      </f7-list-item>
      <f7-list-item
        link
        title="Profile"
        subtitle="Profile subtitle"
        :selected="selectedMedia === 'profile'"
        @click="() => (selectedMedia = 'profile')"
      >
        <template #media>
          <f7-icon md="material:person" ios="f7:person_fill" />
        </template>
      </f7-list-item>
      <f7-list-item
        link
        title="Settings"
        subtitle="Settings subtitle"
        :selected="selectedMedia === 'settings'"
        @click="() => (selectedMedia = 'settings')"
      >
        <template #media>
          <f7-icon md="material:settings" ios="f7:gear_alt_fill" />
        </template>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
import { ref } from 'vue';
import { f7Navbar, f7Page, f7Block, f7List, f7ListItem, f7Icon } from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
    f7Block,
    f7List,
    f7ListItem,
    f7Icon,
  },
  setup() {
    const selected = ref('home');
    const selectedMedia = ref('home');
    return {
      selected,
      selectedMedia,
    };
  },
};
</script>
