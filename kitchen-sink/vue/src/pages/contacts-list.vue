<template>
  <f7-page>
    <f7-navbar title="Contacts List" back-link="Back"></f7-navbar>
    <f7-list contacts-list>
      <f7-list-group>
        <f7-list-item title="A" group-title></f7-list-item>
        <f7-list-item title="Aaron "></f7-list-item>
        <f7-list-item title="Abbie"></f7-list-item>
        <f7-list-item title="Adam"></f7-list-item>
        <f7-list-item title="Adele"></f7-list-item>
        <f7-list-item title="Agatha"></f7-list-item>
        <f7-list-item title="Agnes"></f7-list-item>
        <f7-list-item title="Albert"></f7-list-item>
        <f7-list-item title="Alexander"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="B" group-title></f7-list-item>
        <f7-list-item title="Bailey"></f7-list-item>
        <f7-list-item title="Barclay"></f7-list-item>
        <f7-list-item title="Bartolo"></f7-list-item>
        <f7-list-item title="Bellamy"></f7-list-item>
        <f7-list-item title="Belle"></f7-list-item>
        <f7-list-item title="Benjamin"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="C" group-title></f7-list-item>
        <f7-list-item title="Caiden"></f7-list-item>
        <f7-list-item title="Calvin"></f7-list-item>
        <f7-list-item title="Candy"></f7-list-item>
        <f7-list-item title="Carl"></f7-list-item>
        <f7-list-item title="Cherilyn"></f7-list-item>
        <f7-list-item title="Chester"></f7-list-item>
        <f7-list-item title="Chloe"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="V" group-title></f7-list-item>
        <f7-list-item title="Vladimir"></f7-list-item>
      </f7-list-group>
    </f7-list>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7List, f7ListGroup, f7ListItem } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7List,
      f7ListGroup,
      f7ListItem,
    },
  };
</script>
