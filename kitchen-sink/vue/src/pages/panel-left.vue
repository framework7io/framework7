<template>
  <f7-page>
    <f7-block-title>Left Panel</f7-block-title>
    <f7-block>
      <p>This is a left side panel. You can close it by clicking outsite or on this link: <f7-link panel-close>close me</f7-link>. You can put here anything, even another isolated view like in  <f7-link panel-open="right">Right Panel</f7-link></p>
    </f7-block>
    <f7-block-title>Main View Navigation</f7-block-title>
    <f7-list>
      <f7-list-item link="/accordion/" title="Accordion" panel-close></f7-list-item>
      <f7-list-item link="/action-sheet/" title="Action Sheet" panel-close></f7-list-item>
      <f7-list-item link="/badge/" title="Badge" panel-close></f7-list-item>
      <f7-list-item link="/buttons/" title="Buttons" panel-close></f7-list-item>
      <f7-list-item link="/cards/" title="Cards" panel-close></f7-list-item>
      <f7-list-item link="/checkbox/" title="Checkbox" panel-close></f7-list-item>
      <f7-list-item link="/chips/" title="Chips/Tags" panel-close></f7-list-item>
      <f7-list-item link="/contacts-list/" title="Contacts List" panel-close></f7-list-item>
      <f7-list-item link="/data-table/" title="Data Table" panel-close></f7-list-item>
    </f7-list>
    <f7-block>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.</p>
      <p>Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula. Phasellus blandit nisl ut lorem semper pharetra. Nullam tortor nibh, suscipit in consequat vel, feugiat sed quam. Nam risus libero, auctor vel tristique ac, malesuada ut ante. Sed molestie, est in eleifend sagittis, leo tortor ullamcorper erat, at vulputate eros sapien nec libero. Mauris dapibus laoreet nibh quis bibendum. Fusce dolor sem, suscipit in iaculis id, pharetra at urna. Pellentesque tempor congue massa quis faucibus. Vestibulum nunc eros, convallis blandit dui sit amet, gravida adipiscing libero.</p>
    </f7-block>
  </f7-page>
</template>
<script>
  import { f7Page, f7BlockTitle, f7Block, f7List, f7ListItem, f7Link } from 'framework7-vue';

  export default {
    components: {
      f7Page,
      f7BlockTitle,
      f7Block,
      f7List,
      f7ListItem,
      f7Link,
    },
  };
</script>
