<template>
  <f7-page>
    <f7-navbar title="Virtual List" back-link="Back">
      <f7-subnavbar :inner="false">
        <f7-searchbar
          search-container=".virtual-list"
          search-item="li"
          search-in=".item-title"
          :disable-button="!$theme.aurora"
        ></f7-searchbar>
      </f7-subnavbar>
    </f7-navbar>
    <f7-block>
      <p>Virtual List allows to render lists with huge amount of elements without loss of performance. And it is fully compatible with all Framework7 list components such as Search Bar, Infinite Scroll, Pull To Refresh, Swipeouts (swipe-to-delete) and Sortable.</p>
      <p>Here is the example of virtual list with 10 000 items:</p>
    </f7-block>
    <f7-list class="searchbar-not-found">
      <f7-list-item title="Nothing found"></f7-list-item>
    </f7-list>
    <f7-list
      class="searchbar-found"
      medial-list
      virtual-list
      :virtual-list-params="{ items, searchAll, renderExternal, height: $theme.ios ? 63 : ($theme.md ? 73 : 46)}"
    >
      <ul>
        <f7-list-item
          v-for="(item, index) in vlData.items"
          :key="index"
          media-item
          link="#"
          :title="item.title"
          :subtitle="item.subtitle"
          :style="`top: ${vlData.topPosition}px`"
          :virtual-list-index="items.indexOf(item)"
        ></f7-list-item>
      </ul>
    </f7-list>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7List, f7ListItem, f7Subnavbar, f7Searchbar, f7Block } from 'framework7-vue';

  export default {
    components: {
      f7Navbar, f7Page, f7List, f7ListItem, f7Subnavbar, f7Searchbar, f7Block,
    },
    data() {
      const items = [];
      for (let i = 1; i <= 10000; i += 1) {
        items.push({
          title: `Item ${i}`,
          subtitle: `Subtitle ${i}`,
        });
      }
      return {
        items,
        vlData: {
          items: [],
        },
      };
    },
    methods: {
      searchAll(query, items) {
        const found = [];
        for (let i = 0; i < items.length; i += 1) {
          if (items[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
        }
        return found; // return array with mathced indexes
      },
      renderExternal(vl, vlData) {
        this.vlData = vlData;
      },
    },
  };
</script>
