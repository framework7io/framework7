<template>
  <f7-page>
    <f7-navbar sliding back-link="Back" title="Breadcrumbs" />
    <f7-block strong-ios outline-ios>
      <p>
        Breadcrumbs allow users to keep track and maintain awareness of their locations within the
        app or website. They should be used for large sites and apps with hierarchically arranged
        pages.
      </p>
    </f7-block>

    <f7-block-title>Basic</f7-block-title>
    <f7-block strong-ios outline-ios>
      <f7-breadcrumbs>
        <f7-breadcrumbs-item>
          <f7-link>Home</f7-link>
        </f7-breadcrumbs-item>
        <f7-breadcrumbs-separator />
        <f7-breadcrumbs-item>
          <f7-link>Catalog</f7-link>
        </f7-breadcrumbs-item>
        <f7-breadcrumbs-separator />
        <f7-breadcrumbs-item active>Phones</f7-breadcrumbs-item>
      </f7-breadcrumbs>
    </f7-block>

    <f7-block-title>Scrollable</f7-block-title>
    <f7-block-header>Breadcrumbs will be scrollable if they don't fit the screen</f7-block-header>
    <f7-block strong-ios outline-ios>
      <f7-breadcrumbs>
        <f7-breadcrumbs-item>
          <f7-link>Home</f7-link>
        </f7-breadcrumbs-item>
        <f7-breadcrumbs-separator />
        <f7-breadcrumbs-item>
          <f7-link>Catalog</f7-link>
        </f7-breadcrumbs-item>
        <f7-breadcrumbs-separator />
        <f7-breadcrumbs-item>
          <f7-link>Phones</f7-link>
        </f7-breadcrumbs-item>
        <f7-breadcrumbs-separator />
        <f7-breadcrumbs-item>
          <f7-link>Apple</f7-link>
        </f7-breadcrumbs-item>
        <f7-breadcrumbs-separator />
        <f7-breadcrumbs-item active>iPhone 12</f7-breadcrumbs-item>
      </f7-breadcrumbs>
    </f7-block>

    <f7-block-title>Collapsed</f7-block-title>
    <f7-block strong-ios outline-ios>
      <f7-breadcrumbs>
        <f7-breadcrumbs-item>
          <f7-link>Home</f7-link>
        </f7-breadcrumbs-item>
        <f7-breadcrumbs-separator />
        <f7-breadcrumbs-collapsed class="popover-open" data-popover=".breadcrumbs-popover">
          <f7-popover class="breadcrumbs-popover" style="width: 120px">
            <f7-list>
              <f7-list-item link title="Catalog" popover-close />
              <f7-list-item link title="Phones" popover-close />
              <f7-list-item link title="Apple" popover-close />
            </f7-list>
          </f7-popover>
        </f7-breadcrumbs-collapsed>
        <f7-breadcrumbs-separator />
        <f7-breadcrumbs-item active>iPhone 12</f7-breadcrumbs-item>
      </f7-breadcrumbs>
    </f7-block>

    <f7-block-title>With Icons</f7-block-title>
    <f7-block strong-ios outline-ios>
      <f7-breadcrumbs>
        <f7-breadcrumbs-item>
          <f7-link icon-ios="f7:house_fill" icon-md="material:home" text="Home" />
        </f7-breadcrumbs-item>
        <f7-breadcrumbs-separator />
        <f7-breadcrumbs-item>
          <f7-link icon-ios="f7:square_list_fill" icon-md="material:list_alt" text="Catalog" />
        </f7-breadcrumbs-item>
        <f7-breadcrumbs-separator />
        <f7-breadcrumbs-item>
          <f7-link
            icon-ios="f7:device_phone_portrait"
            icon-md="material:smartphone"
            text="Phones"
          />
        </f7-breadcrumbs-item>
        <f7-breadcrumbs-separator />
        <f7-breadcrumbs-item>
          <f7-link icon-f7="logo_apple" text="Apple" />
        </f7-breadcrumbs-item>
        <f7-breadcrumbs-separator />
        <f7-breadcrumbs-item active>iPhone 12</f7-breadcrumbs-item>
      </f7-breadcrumbs>
    </f7-block>
  </f7-page>
</template>
<script>
import {
  f7Navbar,
  f7Page,
  f7Link,
  f7Block,
  f7BlockTitle,
  f7BlockHeader,
  f7Breadcrumbs,
  f7BreadcrumbsItem,
  f7BreadcrumbsSeparator,
  f7BreadcrumbsCollapsed,
  f7Popover,
  f7List,
  f7ListItem,
} from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
    f7Link,
    f7Block,
    f7BlockTitle,
    f7BlockHeader,
    f7Breadcrumbs,
    f7BreadcrumbsItem,
    f7BreadcrumbsSeparator,
    f7BreadcrumbsCollapsed,
    f7Popover,
    f7List,
    f7ListItem,
  },
};
</script>
