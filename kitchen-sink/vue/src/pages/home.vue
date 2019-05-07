<template>
  <f7-page>
    <f7-navbar large :sliding="false">
      <f7-nav-left>
        <f7-link panel-open="left" icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Framework7 Vue</f7-nav-title>
      <f7-nav-right>
        <f7-link class="searchbar-enable" data-searchbar=".searchbar-components" icon-ios="f7:search" icon-aurora="f7:search" icon-md="material:search"></f7-link>
      </f7-nav-right>
      <f7-nav-title-large>Framework7 Vue</f7-nav-title-large>
      <f7-searchbar
        class="searchbar-components"
        search-container=".components-list"
        search-in="a"
        expandable
        :disable-button="!this.$theme.aurora"
      ></f7-searchbar>
    </f7-navbar>

    <f7-list class="searchbar-hide-on-search">
      <f7-list-item title="About Framework7" link="/about/">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
    </f7-list>

    <f7-block-title class="searchbar-found">Components</f7-block-title>
    <f7-list class="components-list searchbar-found">
      <f7-list-item link="/accordion/" title="Accordion">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/action-sheet/" title="Action Sheet">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/appbar/" title="Appbar">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/autocomplete/" title="Autocomplete">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/badge/" title="Badge">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/buttons/" title="Buttons">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/calendar/" title="Calendar / Date Picker">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/cards/" title="Cards">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/cards-expandable/" title="Cards Expandable">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/checkbox/" title="Checkbox">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/chips/" title="Chips/Tags">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/color-picker/" title="Color Picker">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/contacts-list/" title="Contacts List">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/content-block/" title="Content Block">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/data-table/" title="Data Table">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/dialog/" title="Dialog">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/elevation/" title="Elevation">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/fab/" title="FAB">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/fab-morph/" title="FAB Morph">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/form-storage/" title="Form Storage">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/gauge/" title="Gauge">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/grid/" title="Grid / Layout Grid">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/icons/" title="Icons">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/infinite-scroll/" title="Infinite Scroll">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/inputs/" title="Inputs">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/lazy-load/" title="Lazy Load">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/list/" title="List View">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/list-index/" title="List Index">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/login-screen/" title="Login Screen">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/menu/" title="Menu">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/messages/" title="Messages">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/navbar/" title="Navbar">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/notifications/" title="Notifications">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/panel/" title="Panel / Side Panels">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/photo-browser/" title="Photo Browser">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/picker/" title="Picker">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/popover/" title="Popover">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/popup/" title="Popup">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/preloader/" title="Preloader">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/progressbar/" title="Progress Bar">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/pull-to-refresh/" title="Pull To Refresh">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/radio/" title="Radio">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/range/" title="Range Slider">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/searchbar/" title="Searchbar">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/searchbar-expandable/" title="Searchbar Expandable">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/sheet-modal/" title="Sheet Modal">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/skeleton/" title="Skeleton (Ghost) Elements">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/smart-select/" title="Smart Select">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/sortable/" title="Sortable List">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/statusbar/" title="Statusbar">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/stepper/" title="Stepper">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/subnavbar/" title="Subnavbar">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/swipeout/" title="Swipeout (Swipe To Delete)">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/swiper/" title="Swiper Slider">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/tabs/" title="Tabs">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/timeline/" title="Timeline">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/toast/" title="Toast">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/toggle/" title="Toggle">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/toolbar-tabbar/" title="Toolbar & Tabbar">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/tooltip/" title="Tooltip">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/treeview/" title="Treeview">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/virtual-list/" title="Virtual List">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
    </f7-list>
    <f7-list class="searchbar-not-found">
      <f7-list-item title="Nothing found"></f7-list-item>
    </f7-list>
    <f7-block-title class="searchbar-hide-on-search">Themes</f7-block-title>
    <f7-list class="searchbar-hide-on-search">
      <f7-list-item title="iOS Theme" external link="./index.html?theme=ios"></f7-list-item>
      <f7-list-item title="Material (MD) Theme" external link="./index.html?theme=md"></f7-list-item>
      <f7-list-item title="Aurora Desktop Theme" external link="./index.html?theme=aurora"></f7-list-item>
      <f7-list-item title="Color Themes" link="/color-themes/"></f7-list-item>
    </f7-list>

    <f7-block-title class="searchbar-hide-on-search">Page Loaders & Router</f7-block-title>
    <f7-list class="searchbar-hide-on-search">
      <f7-list-item title="Routable Modals" link="/routable-modals/"></f7-list-item>
      <f7-list-item title="Default Route (404)" link="/load-something-that-doesnt-exist/"></f7-list-item>
      <f7-list-item title="Master-Detail (Split View)" link="/master-detail/"></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7NavLeft, f7NavTitle, f7NavTitleLarge, f7NavRight, f7BlockTitle, f7List, f7ListItem, f7Link, f7Searchbar, f7Icon } from 'framework7-vue';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7NavLeft,
      f7NavTitle,
      f7NavTitleLarge,
      f7NavRight,
      f7BlockTitle,
      f7List,
      f7ListItem,
      f7Link,
      f7Searchbar,
      f7Icon,
    },
  };
</script>
