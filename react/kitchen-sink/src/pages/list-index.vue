<template>
  <f7-page>
    <f7-navbar title="List Index" back-link="Back"></f7-navbar>
    <f7-list-index
      indexes="auto"
      list-el=".list.contacts-list"
      :scroll-list="true"
      :label="true"
      @listindex:select="onIndexSelect"
    ></f7-list-index>
    <f7-list contacts-list>
      <f7-list-group>
        <f7-list-item title="A" group-title></f7-list-item>
        <f7-list-item title="Aaron"></f7-list-item>
        <f7-list-item title="Adam"></f7-list-item>
        <f7-list-item title="Aiden"></f7-list-item>
        <f7-list-item title="Albert"></f7-list-item>
        <f7-list-item title="Alex"></f7-list-item>
        <f7-list-item title="Alexander"></f7-list-item>
        <f7-list-item title="Alfie"></f7-list-item>
        <f7-list-item title="Archie"></f7-list-item>
        <f7-list-item title="Arthur"></f7-list-item>
        <f7-list-item title="Austin"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="B" group-title></f7-list-item>
        <f7-list-item title="Benjamin"></f7-list-item>
        <f7-list-item title="Blake"></f7-list-item>
        <f7-list-item title="Bobby"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="C" group-title></f7-list-item>
        <f7-list-item title="Caleb"></f7-list-item>
        <f7-list-item title="Callum"></f7-list-item>
        <f7-list-item title="Cameron"></f7-list-item>
        <f7-list-item title="Charles"></f7-list-item>
        <f7-list-item title="Charlie"></f7-list-item>
        <f7-list-item title="Connor"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="D" group-title></f7-list-item>
        <f7-list-item title="Daniel"></f7-list-item>
        <f7-list-item title="David"></f7-list-item>
        <f7-list-item title="Dexter"></f7-list-item>
        <f7-list-item title="Dylan"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="E" group-title></f7-list-item>
        <f7-list-item title="Edward"></f7-list-item>
        <f7-list-item title="Elijah"></f7-list-item>
        <f7-list-item title="Elliot"></f7-list-item>
        <f7-list-item title="Elliott"></f7-list-item>
        <f7-list-item title="Ethan"></f7-list-item>
        <f7-list-item title="Evan"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="F" group-title></f7-list-item>
        <f7-list-item title="Felix"></f7-list-item>
        <f7-list-item title="Finlay"></f7-list-item>
        <f7-list-item title="Finley"></f7-list-item>
        <f7-list-item title="Frankie"></f7-list-item>
        <f7-list-item title="Freddie"></f7-list-item>
        <f7-list-item title="Frederick"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="G" group-title></f7-list-item>
        <f7-list-item title="Gabriel"></f7-list-item>
        <f7-list-item title="George"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="H" group-title></f7-list-item>
        <f7-list-item title="Harley"></f7-list-item>
        <f7-list-item title="Harrison"></f7-list-item>
        <f7-list-item title="Harry"></f7-list-item>
        <f7-list-item title="Harvey"></f7-list-item>
        <f7-list-item title="Henry"></f7-list-item>
        <f7-list-item title="Hugo"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="I" group-title></f7-list-item>
        <f7-list-item title="Ibrahim"></f7-list-item>
        <f7-list-item title="Isaac"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="J" group-title></f7-list-item>
        <f7-list-item title="Jack"></f7-list-item>
        <f7-list-item title="Jacob"></f7-list-item>
        <f7-list-item title="Jake"></f7-list-item>
        <f7-list-item title="James"></f7-list-item>
        <f7-list-item title="Jamie"></f7-list-item>
        <f7-list-item title="Jayden"></f7-list-item>
        <f7-list-item title="Jenson"></f7-list-item>
        <f7-list-item title="Joseph"></f7-list-item>
        <f7-list-item title="Joshua"></f7-list-item>
        <f7-list-item title="Jude"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="K" group-title></f7-list-item>
        <f7-list-item title="Kai"></f7-list-item>
        <f7-list-item title="Kian"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="L" group-title></f7-list-item>
        <f7-list-item title="Leo"></f7-list-item>
        <f7-list-item title="Leon"></f7-list-item>
        <f7-list-item title="Lewis"></f7-list-item>
        <f7-list-item title="Liam"></f7-list-item>
        <f7-list-item title="Logan"></f7-list-item>
        <f7-list-item title="Louie"></f7-list-item>
        <f7-list-item title="Louis"></f7-list-item>
        <f7-list-item title="Luca"></f7-list-item>
        <f7-list-item title="Lucas"></f7-list-item>
        <f7-list-item title="Luke"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="M" group-title></f7-list-item>
        <f7-list-item title="Mason"></f7-list-item>
        <f7-list-item title="Matthew"></f7-list-item>
        <f7-list-item title="Max"></f7-list-item>
        <f7-list-item title="Michael"></f7-list-item>
        <f7-list-item title="Mohammad"></f7-list-item>
        <f7-list-item title="Mohammed"></f7-list-item>
        <f7-list-item title="Muhammad"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="N" group-title></f7-list-item>
        <f7-list-item title="Nathan"></f7-list-item>
        <f7-list-item title="Noah"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="O" group-title></f7-list-item>
        <f7-list-item title="Oliver"></f7-list-item>
        <f7-list-item title="Ollie"></f7-list-item>
        <f7-list-item title="Oscar"></f7-list-item>
        <f7-list-item title="Owen"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="R" group-title></f7-list-item>
        <f7-list-item title="Reuben"></f7-list-item>
        <f7-list-item title="Riley"></f7-list-item>
        <f7-list-item title="Robert"></f7-list-item>
        <f7-list-item title="Ronnie"></f7-list-item>
        <f7-list-item title="Rory"></f7-list-item>
        <f7-list-item title="Ryan"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="S" group-title></f7-list-item>
        <f7-list-item title="Samuel"></f7-list-item>
        <f7-list-item title="Sebastian"></f7-list-item>
        <f7-list-item title="Seth"></f7-list-item>
        <f7-list-item title="Sonny"></f7-list-item>
        <f7-list-item title="Stanley"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="T" group-title></f7-list-item>
        <f7-list-item title="Teddy"></f7-list-item>
        <f7-list-item title="Theo"></f7-list-item>
        <f7-list-item title="Theodore"></f7-list-item>
        <f7-list-item title="Thomas"></f7-list-item>
        <f7-list-item title="Toby"></f7-list-item>
        <f7-list-item title="Tommy"></f7-list-item>
        <f7-list-item title="Tyler"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="W" group-title></f7-list-item>
        <f7-list-item title="William"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="Z" group-title></f7-list-item>
        <f7-list-item title="Zachary"></f7-list-item>
      </f7-list-group>
    </f7-list>
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7List, f7ListGroup, f7ListItem, f7ListIndex } from 'framework7-vue';

  export default {
    components: {
      f7Page, f7Navbar, f7List, f7ListGroup, f7ListItem, f7ListIndex,
    },
    methods: {
      onIndexSelect(itemContent) {
        console.log(itemContent);
      },
    },
  };
</script>