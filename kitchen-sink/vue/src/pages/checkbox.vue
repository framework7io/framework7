<template>
  <f7-page>
    <f7-navbar title="Checkbox" back-link="Back"></f7-navbar>
    <f7-block-title>Inline</f7-block-title>
    <f7-block strong>
      <p>Lorem <f7-checkbox name="checkbox-1"></f7-checkbox> ipsum dolor sit amet, consectetur adipisicing elit. Alias beatae illo nihil aut eius commodi sint eveniet aliquid eligendi <f7-checkbox name="checkbox-2" checked></f7-checkbox> ad delectus impedit tempore nemo, enim vel praesentium consequatur nulla mollitia!</p>
    </f7-block>

    <f7-block-title>Checkbox Group</f7-block-title>
    <f7-list>
      <f7-list-item checkbox title="Books" name="demo-checkbox" checked></f7-list-item>
      <f7-list-item checkbox title="Movies" name="demo-checkbox"></f7-list-item>
      <f7-list-item checkbox title="Food" name="demo-checkbox"></f7-list-item>
      <f7-list-item checkbox title="Drinks" name="demo-checkbox"></f7-list-item>
    </f7-list>

    <f7-block-title>With Media Lists</f7-block-title>
    <f7-list media-list>
      <f7-list-item
        checkbox
        checked
        name="demo-media-checkbox"
        title="Facebook"
        after="17:14"
        subtitle="New messages from John Doe"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      ></f7-list-item>
      <f7-list-item
        checkbox
        name="demo-media-checkbox"
        title="John Doe (via Twitter)"
        after="17:11"
        subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      ></f7-list-item>
      <f7-list-item
        checkbox
        name="demo-media-checkbox"
        title="Facebook"
        after="16:48"
        subtitle="New messages from John Doe"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      ></f7-list-item>
      <f7-list-item
        checkbox
        name="demo-media-checkbox"
        title="John Doe (via Twitter)"
        after="15:32"
        subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      ></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle, f7Block, f7List, f7ListItem, f7Checkbox } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
      f7Block,
      f7List,
      f7ListItem,
      f7Checkbox,
    },
  };
</script>
