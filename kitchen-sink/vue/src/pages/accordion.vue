<template>
  <f7-page>
    <f7-navbar title="Accordion" back-link="Back"></f7-navbar>

    <f7-block-title>List View Accordion</f7-block-title>
    <f7-list strong outline-ios dividers-ios inset-md accordion-list>
      <f7-list-item accordion-item title="Lorem Ipsum">
        <f7-accordion-content>
          <f7-block>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec
              commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper
              arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel
              congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget
              ipsum.
            </p>
          </f7-block>
        </f7-accordion-content>
      </f7-list-item>
      <f7-list-item accordion-item title="Nested List">
        <f7-accordion-content>
          <f7-list>
            <f7-list-item title="Item 1"></f7-list-item>
            <f7-list-item title="Item 2"></f7-list-item>
            <f7-list-item title="Item 3"></f7-list-item>
            <f7-list-item title="Item 4"></f7-list-item>
          </f7-list>
        </f7-accordion-content>
      </f7-list-item>
      <f7-list-item accordion-item title="Integer semper">
        <f7-accordion-content>
          <f7-block>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec
              commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper
              arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel
              congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget
              ipsum.
            </p>
          </f7-block>
        </f7-accordion-content>
      </f7-list-item>
    </f7-list>

    <f7-block-title>Opposite Side</f7-block-title>
    <f7-list strong outline-ios dividers-ios inset-md accordion-list accordion-opposite>
      <f7-list-item accordion-item title="Lorem Ipsum">
        <f7-accordion-content>
          <f7-block>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec
              commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper
              arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel
              congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget
              ipsum.
            </p>
          </f7-block>
        </f7-accordion-content>
      </f7-list-item>
      <f7-list-item accordion-item title="Nested List">
        <f7-accordion-content>
          <f7-list>
            <f7-list-item title="Item 1"></f7-list-item>
            <f7-list-item title="Item 2"></f7-list-item>
            <f7-list-item title="Item 3"></f7-list-item>
            <f7-list-item title="Item 4"></f7-list-item>
          </f7-list>
        </f7-accordion-content>
      </f7-list-item>
      <f7-list-item accordion-item title="Integer semper">
        <f7-accordion-content>
          <f7-block>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec
              commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper
              arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel
              congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget
              ipsum.
            </p>
          </f7-block>
        </f7-accordion-content>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
import {
  f7Navbar,
  f7Page,
  f7BlockTitle,
  f7Block,
  f7AccordionContent,
  f7List,
  f7ListItem,
} from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
    f7BlockTitle,
    f7Block,
    f7AccordionContent,
    f7List,
    f7ListItem,
  },
};
</script>
