<template>
  <f7-page>
    <f7-navbar title="Chips" back-link="Back"></f7-navbar>
    <f7-block-title>Chips With Text</f7-block-title>
    <f7-block strong>
      <f7-chip text="Example Chip"></f7-chip>
      <f7-chip text="Another Chip"></f7-chip>
      <f7-chip text="One More Chip"></f7-chip>
      <f7-chip text="Fourth Chip"></f7-chip>
      <f7-chip text="Last One"></f7-chip>
    </f7-block>
    <f7-block-title>Outline Chips</f7-block-title>
    <f7-block strong>
      <f7-chip outline text="Example Chip"></f7-chip>
      <f7-chip outline text="Another Chip"></f7-chip>
      <f7-chip outline text="One More Chip"></f7-chip>
      <f7-chip outline text="Fourth Chip"></f7-chip>
      <f7-chip outline text="Last One"></f7-chip>
    </f7-block>
    <f7-block-title>Icon Chips</f7-block-title>
    <f7-block strong>
      <f7-chip text="Add Contact" media-bg-color="blue">
        <f7-icon slot="media" ios="f7:add_round" aurora="f7:add_round" md="material:add_circle"></f7-icon>
      </f7-chip>
      <f7-chip text="London" media-bg-color="green">
        <f7-icon slot="media" ios="f7:compass" aurora="f7:compass" md="material:location_on"></f7-icon>
      </f7-chip>
      <f7-chip text="John Doe" media-bg-color="red">
        <f7-icon slot="media" ios="f7:person" aurora="f7:person" md="material:person"></f7-icon>
      </f7-chip>
    </f7-block>
    <f7-block-title>Contact Chips</f7-block-title>
    <f7-block strong>
      <f7-chip text="Jane Doe">
        <img slot="media" src="https://cdn.framework7.io/placeholder/people-100x100-9.jpg"/>
      </f7-chip>
      <f7-chip text="John Doe">
        <img slot="media" src="https://cdn.framework7.io/placeholder/people-100x100-3.jpg"/>
      </f7-chip>
      <f7-chip text="Adam Smith">
        <img slot="media" src="https://cdn.framework7.io/placeholder/people-100x100-7.jpg"/>
      </f7-chip>
      <f7-chip text="Jennifer" media-bg-color="pink" media="J"></f7-chip>
      <f7-chip text="Chris" media-bg-color="yellow" media-text-color="black" media="C"></f7-chip>
      <f7-chip text="Kate" media-bg-color="red" media="K"></f7-chip>
    </f7-block>
    <f7-block-title>Deletable Chips / Tags</f7-block-title>
    <f7-block strong>
      <f7-chip text="Example Chip" deleteable @click="deleteChip"></f7-chip>
      <f7-chip text="Chris" media="C" media-bg-color="orange" text-color="black" deleteable @click="deleteChip"></f7-chip>
      <f7-chip text="Jane Doe" deleteable @click="deleteChip">
        <img slot="media" src="https://cdn.framework7.io/placeholder/people-100x100-9.jpg"/>
      </f7-chip>
      <f7-chip text="One More Chip" deleteable @click="deleteChip"></f7-chip>
      <f7-chip text="Jennifer" media-bg-color="pink" media="J" deleteable @click="deleteChip"></f7-chip>
      <f7-chip text="Adam Smith" deleteable @click="deleteChip">
        <img slot="media" src="https://cdn.framework7.io/placeholder/people-100x100-7.jpg"/>
      </f7-chip>
    </f7-block>
    <f7-block-title>Color Chips</f7-block-title>
    <f7-block strong>
      <f7-chip text="Red Chip" color="red"></f7-chip>
      <f7-chip text="Green Chip" color="green"></f7-chip>
      <f7-chip text="Blue Chip" color="blue"></f7-chip>
      <f7-chip text="Orange Chip" color="orange"></f7-chip>
      <f7-chip text="Pink Chip" color="pink"></f7-chip>
      <f7-chip outline text="Red Chip" color="red"></f7-chip>
      <f7-chip outline text="Green Chip" color="green"></f7-chip>
      <f7-chip outline text="Blue Chip" color="blue"></f7-chip>
      <f7-chip outline text="Orange Chip" color="orange"></f7-chip>
      <f7-chip outline text="Pink Chip" color="pink"></f7-chip>
    </f7-block>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle, f7Chip, f7Block, f7Icon } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
      f7Chip,
      f7Block,
      f7Icon,
    },
    methods: {
      deleteChip(e) {
        const $$ = this.$$;
        const app = this.$f7;
        const target = e.target;
        app.dialog.confirm('Do you want to delete this tiny demo Chip?', () => {
          $$(target).parents('.chip').remove();
        });
      },
    },
  };
</script>

