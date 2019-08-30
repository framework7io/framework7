<template>
  <f7-page>
    <f7-navbar title="Floating Action Button Morph" back-link="Back"></f7-navbar>
    <f7-toolbar tabbar labels bottom class="fab-morph-target">
      <f7-link tab-link tab-link-active icon-ios="f7:envelope_fill" icon-aurora="f7:envelope_fill" icon-md="material:email" text="Inbox"/>
      <f7-link tab-link icon-ios="f7:calendar_fill" icon-aurora="f7:calendar_fill" icon-md="material:today" text="Calendar"/>
      <f7-link tab-link icon-ios="f7:cloud_upload_fill" icon-aurora="f7:cloud_upload_fill" icon-md="material:file_upload" text="Upload"/>
    </f7-toolbar>
    <f7-fab position="right-bottom" morph-to=".toolbar.fab-morph-target">
      <f7-icon ios="f7:plus" aurora="f7:plus" md="material:add"></f7-icon>
    </f7-fab>
    <f7-fab position="left-bottom" morph-to=".demo-fab-sheet.fab-morph-target">
      <f7-icon ios="f7:plus" aurora="f7:plus" md="material:add"></f7-icon>
    </f7-fab>
    <f7-fab position="center-bottom" morph-to=".demo-fab-fullscreen-sheet.fab-morph-target">
      <f7-icon ios="f7:plus" aurora="f7:plus" md="material:add"></f7-icon>
    </f7-fab>
    <div class="list links-list demo-fab-sheet fab-morph-target" slot="fixed">
      <ul>
        <li><a href="#" class="fab-close">Link 1</a></li>
        <li><a href="#" class="fab-close">Link 2</a></li>
        <li><a href="#" class="fab-close">Link 3</a></li>
        <li><a href="#" class="fab-close">Link 4</a></li>
      </ul>
    </div>
    <div class="demo-fab-fullscreen-sheet fab-morph-target" slot="fixed">
      <f7-block-title>Choose Something</f7-block-title>
      <div class="list links-list">
        <ul>
          <li><a href="#" class="fab-close">Link 1</a></li>
          <li><a href="#" class="fab-close">Link 2</a></li>
          <li><a href="#" class="fab-close">Link 3</a></li>
          <li><a href="#" class="fab-close">Link 4</a></li>
        </ul>
      </div>
    </div>
    <f7-block>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, quo rem beatae, delectus eligendi est saepe molestias perferendis suscipit, commodi labore ipsa non quasi eum magnam neque ducimus! Quasi, numquam.</p>
      <p>Maiores culpa, itaque! Eaque natus ab cum ipsam numquam blanditiis a, quia, molestiae aut laudantium recusandae ipsa. Ad iste ex asperiores ipsa, mollitia perferendis consectetur quam eaque, voluptate laboriosam unde.</p>
      <p>Sed odit quis aperiam temporibus vitae necessitatibus, laboriosam, exercitationem dolores odio sapiente provident. Accusantium id, itaque aliquam libero ipsum eos fugiat distinctio laboriosam exercitationem sequi facere quas quidem magnam reprehenderit.</p>
      <p>Pariatur corporis illo, amet doloremque. Ab veritatis sunt nisi consectetur error modi, nam illo et nostrum quia aliquam ipsam vitae facere voluptates atque similique odit mollitia, rerum placeat nobis est.</p>
      <p>Et impedit soluta minus a autem adipisci cupiditate eius dignissimos nihil officia dolore voluptatibus aperiam reprehenderit esse facilis labore qui, officiis consectetur. Ipsa obcaecati aspernatur odio assumenda veniam, ipsum alias.</p>
    </f7-block>
    <f7-block>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa ipsa debitis sed nihil eaque dolore cum iste quibusdam, accusamus doloribus, tempora quia quos voluptatibus corporis officia at quas dolorem earum!</p>
      <p>Quod soluta eos inventore magnam suscipit enim at hic in maiores temporibus pariatur tempora minima blanditiis vero autem est perspiciatis totam dolorum, itaque repellat? Nobis necessitatibus aut odit aliquam adipisci.</p>
      <p>Tenetur delectus perspiciatis ex numquam, unde corrupti velit! Quam aperiam, animi fuga veritatis consectetur, voluptatibus atque consequuntur dignissimos itaque, sint impedit cum cumque at. Adipisci sint, iusto blanditiis ullam? Vel?</p>
      <p>Dignissimos velit officia quibusdam! Eveniet beatae, aut, omnis temporibus consequatur expedita eaque aliquid quos accusamus fugiat id iusto autem obcaecati repellat fugit cupiditate suscipit natus quas doloribus? Temporibus necessitatibus, libero.</p>
      <p>Architecto quisquam ipsa fugit facere, repudiandae asperiores vitae obcaecati possimus, labore excepturi reprehenderit consectetur perferendis, ullam quidem hic, repellat fugiat eaque fuga. Consectetur in eveniet, deleniti recusandae omnis eum quas?</p>
      <p>Quos nulla consequatur quo, officia quaerat. Nulla voluptatum, assumenda quibusdam, placeat cum aut illo deleniti dolores commodi odio ipsam, recusandae est pariatur veniam repudiandae blanditiis. Voluptas unde deleniti quisquam, nobis?</p>
      <p>Atque qui quaerat quasi officia molestiae, molestias totam incidunt reprehenderit laboriosam facilis veritatis, non iusto! Dolore ipsam obcaecati voluptates minima maxime minus qui mollitia facere. Nostrum esse recusandae voluptatibus eligendi.</p>
    </f7-block>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle, f7Block, f7Toolbar, f7Fab, f7Icon, f7Link } from 'framework7-vue';

  export default {
    components: {
      f7Navbar, f7Page, f7BlockTitle, f7Block, f7Toolbar, f7Fab, f7Icon, f7Link,
    },
  };
</script>
