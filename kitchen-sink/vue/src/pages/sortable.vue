<template>
  <f7-page>
    <f7-navbar title="Sortable List" back-link="Back">
      <f7-nav-right>
        <f7-link sortable-toggle=".sortable">Toggle</f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-block>
      <p>Just click "Toggle" button on navigation bar to enable/disable sorting</p>
    </f7-block>
    <f7-list sortable>
      <f7-list-item
        title="1 Jenna Smith"
        after="CEO">
        <f7-icon icon="icon-f7" slot="media"></f7-icon>
      </f7-list-item>
      <f7-list-item
        title="2 John Doe"
        after="Director">
        <f7-icon icon="icon-f7" slot="media"></f7-icon>
      </f7-list-item>
      <f7-list-item
        title="3 John Doe"
        after="Developer">
        <f7-icon icon="icon-f7" slot="media"></f7-icon>
      </f7-list-item>
      <f7-list-item
        title="4 Aaron Darling"
        after="Manager">
        <f7-icon icon="icon-f7" slot="media"></f7-icon>
      </f7-list-item>
      <f7-list-item
        title="5 Calvin Johnson"
        after="Accounter">
        <f7-icon icon="icon-f7" slot="media"></f7-icon>
      </f7-list-item>
      <f7-list-item
        title="6 John Smith"
        after="SEO">
        <f7-icon icon="icon-f7" slot="media"></f7-icon>
      </f7-list-item>
      <f7-list-item
        title="7 Chloe"
        after="Manager">
        <f7-icon icon="icon-f7" slot="media"></f7-icon>
      </f7-list-item>
    </f7-list>
    <f7-list media-list sortable>
      <f7-list-item
        title="Yellow Submarine"
        after="$15"
        subtitle="Beatles"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
        >
        <img slot="media" src="https://cdn.framework7.io/placeholder/people-160x160-1.jpg" width="80" />
      </f7-list-item>
      <f7-list-item
        title="Don't Stop Me Now"
        after="$22"
        subtitle="Queen"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
        >
        <img slot="media" src="https://cdn.framework7.io/placeholder/people-160x160-2.jpg" width="80" />
      </f7-list-item>
      <f7-list-item
        title="Billie Jean"
        after="$16"
        subtitle="Michael Jackson"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
        >
        <img slot="media" src="https://cdn.framework7.io/placeholder/people-160x160-3.jpg" width="80" />
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7Block, f7List, f7ListItem, f7NavRight, f7Link, f7Icon } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7Block,
      f7List,
      f7ListItem,
      f7NavRight,
      f7Link,
      f7Icon,
    },
  };
</script>
