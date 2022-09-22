<template>
  <f7-page>
    <f7-navbar title="Content Block" back-link="Back"></f7-navbar>
    <p>
      This paragraph is outside of content block. Not cool, but useful for any custom elements with
      custom styling.
    </p>

    <f7-block-title>Block Title</f7-block-title>
    <f7-block>
      <p>
        Here comes paragraph within content block. Donec et nulla auctor massa pharetra adipiscing
        ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis,
        vulputate turpis vel, sagittis felis.
      </p>
    </f7-block>

    <f7-block-title>Strong Block</f7-block-title>
    <f7-block strong>
      <p>
        Here comes another text block with additional "block-strong" class. Praesent nec imperdiet
        diam. Maecenas vel lectus porttitor, consectetur magna nec, viverra sem. Aliquam sed risus
        dolor. Morbi tincidunt ut libero id sodales. Integer blandit varius nisi quis consectetur.
      </p>
    </f7-block>

    <f7-block-title>Strong Outline Block</f7-block-title>
    <f7-block strong outline>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates itaque autem qui quaerat
        vero ducimus praesentium quibusdam veniam error ut alias, numquam iste ea quos maxime
        consequatur ullam at a.
      </p>
    </f7-block>

    <f7-block-title>Strong Inset Block</f7-block-title>
    <f7-block strong inset>
      <p>
        Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit
        vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis.
      </p>
    </f7-block>

    <f7-block-title>Strong Inset Outline Block</f7-block-title>
    <f7-block strong outline inset>
      <p>
        Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit
        vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis.
      </p>
    </f7-block>

    <f7-block-title>Tablet Inset</f7-block-title>
    <f7-block strong medium-inset>
      <p>
        Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit
        vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis.
      </p>
    </f7-block>

    <f7-block-title>With Header & Footer</f7-block-title>
    <f7-block>
      <f7-block-header>Block Header</f7-block-header>
      <p>
        Here comes paragraph within content block. Donec et nulla auctor massa pharetra adipiscing
        ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis,
        vulputate turpis vel, sagittis felis.
      </p>
      <f7-block-footer>Block Footer</f7-block-footer>
    </f7-block>

    <f7-block-header>Block Header</f7-block-header>
    <f7-block>
      <p>
        Here comes paragraph within content block. Donec et nulla auctor massa pharetra adipiscing
        ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis,
        vulputate turpis vel, sagittis felis.
      </p>
    </f7-block>
    <f7-block-footer>Block Footer</f7-block-footer>

    <f7-block strong>
      <f7-block-header>Block Header</f7-block-header>
      <p>
        Here comes paragraph within content block. Donec et nulla auctor massa pharetra adipiscing
        ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis,
        vulputate turpis vel, sagittis felis.
      </p>
      <f7-block-footer>Block Footer</f7-block-footer>
    </f7-block>

    <f7-block-header>Block Header</f7-block-header>
    <f7-block strong>
      <p>
        Here comes paragraph within content block. Donec et nulla auctor massa pharetra adipiscing
        ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis,
        vulputate turpis vel, sagittis felis.
      </p>
    </f7-block>
    <f7-block-footer>Block Footer</f7-block-footer>

    <f7-block-title large>Block Title Large</f7-block-title>
    <f7-block strong>
      <p>
        Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit
        vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis.
      </p>
    </f7-block>

    <f7-block-title medium>Block Title Medium</f7-block-title>
    <f7-block strong>
      <p>
        Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit
        vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis.
      </p>
    </f7-block>
  </f7-page>
</template>
<script>
import {
  f7Navbar,
  f7Page,
  f7BlockTitle,
  f7Block,
  f7BlockHeader,
  f7BlockFooter,
} from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
    f7BlockTitle,
    f7Block,
    f7BlockHeader,
    f7BlockFooter,
  },
};
</script>
