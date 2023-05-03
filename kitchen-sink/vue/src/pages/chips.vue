<template>
  <f7-page>
    <f7-navbar title="Chips" back-link="Back"></f7-navbar>
    <f7-block-title>Chips With Text</f7-block-title>
    <f7-block strong-ios outline-ios>
      <f7-chip text="Example Chip"></f7-chip>
      <f7-chip text="Another Chip"></f7-chip>
      <f7-chip text="One More Chip"></f7-chip>
      <f7-chip text="Fourth Chip"></f7-chip>
      <f7-chip text="Last One"></f7-chip>
    </f7-block>
    <f7-block-title>Outline Chips</f7-block-title>
    <f7-block strong-ios outline-ios>
      <f7-chip outline text="Example Chip"></f7-chip>
      <f7-chip outline text="Another Chip"></f7-chip>
      <f7-chip outline text="One More Chip"></f7-chip>
      <f7-chip outline text="Fourth Chip"></f7-chip>
      <f7-chip outline text="Last One"></f7-chip>
    </f7-block>
    <f7-block-title>Icon Chips</f7-block-title>
    <f7-block strong-ios outline-ios>
      <f7-chip text="Add Contact" media-bg-color="blue">
        <template #media>
          <f7-icon ios="f7:plus_circle" md="material:add_circle" />
        </template>
      </f7-chip>
      <f7-chip text="London" media-bg-color="green">
        <template #media>
          <f7-icon ios="f7:compass" md="material:location_on" />
        </template>
      </f7-chip>
      <f7-chip text="John Doe" media-bg-color="red">
        <template #media>
          <f7-icon ios="f7:person" md="material:person" />
        </template>
      </f7-chip>
    </f7-block>
    <f7-block-title>Contact Chips</f7-block-title>
    <f7-block strong-ios outline-ios>
      <f7-chip text="Jane Doe">
        <template #media>
          <img src="https://cdn.framework7.io/placeholder/people-100x100-9.jpg" />
        </template>
      </f7-chip>
      <f7-chip text="John Doe">
        <template #media>
          <img src="https://cdn.framework7.io/placeholder/people-100x100-3.jpg" />
        </template>
      </f7-chip>
      <f7-chip text="Adam Smith">
        <template #media>
          <img src="https://cdn.framework7.io/placeholder/people-100x100-7.jpg" />
        </template>
      </f7-chip>
      <f7-chip text="Jennifer" media-bg-color="pink" media="J"></f7-chip>
      <f7-chip text="Chris" media-bg-color="yellow" media-text-color="black" media="C"></f7-chip>
      <f7-chip text="Kate" media-bg-color="red" media="K"></f7-chip>
    </f7-block>
    <f7-block-title>Deletable Chips / Tags</f7-block-title>
    <f7-block strong-ios outline-ios>
      <f7-chip text="Example Chip" deleteable @delete="deleteChip"></f7-chip>
      <f7-chip
        text="Chris"
        media="C"
        media-bg-color="orange"
        deleteable
        @delete="deleteChip"
      ></f7-chip>
      <f7-chip text="Jane Doe" deleteable @delete="deleteChip">
        <template #media>
          <img src="https://cdn.framework7.io/placeholder/people-100x100-9.jpg" />
        </template>
      </f7-chip>
      <f7-chip text="One More Chip" deleteable @delete="deleteChip"></f7-chip>
      <f7-chip
        text="Jennifer"
        media-bg-color="pink"
        media="J"
        deleteable
        @delete="deleteChip"
      ></f7-chip>
      <f7-chip text="Adam Smith" deleteable @delete="deleteChip">
        <template #media>
          <img src="https://cdn.framework7.io/placeholder/people-100x100-7.jpg" />
        </template>
      </f7-chip>
    </f7-block>
    <f7-block-title>Color Chips</f7-block-title>
    <f7-block strong-ios outline-ios>
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
import { f7Navbar, f7Page, f7BlockTitle, f7Chip, f7Block, f7Icon, f7 } from 'framework7-vue';
import $ from 'dom7';

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
      const target = e.target;
      f7.dialog.confirm('Do you want to delete this tiny demo Chip?', () => {
        $(target).parents('.chip').remove();
      });
    },
  },
};
</script>
