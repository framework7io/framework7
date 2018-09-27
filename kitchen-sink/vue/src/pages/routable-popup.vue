<template>
  <f7-popup>
    <f7-page>
      <f7-navbar title="Routable Popup">
        <f7-nav-right>
          <f7-link popup-close>Close</f7-link>
        </f7-nav-right>
      </f7-navbar>
      <f7-block strong>
        <p>This Popup was loaded using route link as standalone component</p>
        <p>Lorem ipsum dolor sit f7amet, consectetur adipiscing elit. Suspendisse faucibus mauris f7leo, eu bibendum neque congue non. Ut leo f7mauris, eleifend eu commodo f7a, egestas ac urna. Maecenas in lacus f7faucibus, viverra ipsum f7pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.</p>
        <p>Duis ut mauris f7sollicitudin, venenatis nisi f7sed, luctus ligula. Phasellus blandit nisl ut lorem semper pharetra. Nullam tortor f7nibh, suscipit in consequat f7vel, feugiat sed quam. Nam risus f7libero, auctor vel tristique f7ac, malesuada ut ante. Sed f7molestie, est in eleifend f7sagittis, leo tortor ullamcorper f7erat, at vulputate eros sapien nec libero. Mauris dapibus laoreet nibh quis bibendum. Fusce dolor f7sem, suscipit in iaculis f7id, pharetra at urna. Pellentesque tempor congue massa quis faucibus. Vestibulum nunc f7eros, convallis blandit dui sit f7amet, gravida adipiscing libero.</p>
      </f7-block>
    </f7-page>
  </f7-popup>
</template>
<script>
  import { f7Popup, f7Navbar, f7NavRight, f7Link, f7Page, f7List, f7ListItem, f7Block } from 'framework7-vue';
  export default {
    components: {
      f7Popup, f7Navbar, f7NavRight, f7Link, f7Page, f7List, f7ListItem, f7Block,
    },
  };
</script>
