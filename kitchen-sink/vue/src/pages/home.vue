<template>
  <f7-page class="page-home">
    <f7-navbar large transparent :sliding="false" md-center-title>
      <f7-nav-left>
        <f7-link panel-open="left" icon-ios="f7:menu" icon-md="material:menu"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Framework7 Vue</f7-nav-title>
      <f7-nav-right>
        <f7-link
          class="searchbar-enable"
          data-searchbar=".searchbar-components"
          icon-ios="f7:search"
          icon-md="material:search"
        ></f7-link>
      </f7-nav-right>
      <f7-nav-title-large>Framework7 Vue</f7-nav-title-large>
      <f7-searchbar
        class="searchbar-components"
        search-container=".components-list"
        search-in="a"
        expandable
      ></f7-searchbar>
    </f7-navbar>

    <f7-list strong inset dividers-ios class="searchbar-hide-on-search">
      <f7-list-item title="About Framework7" link="/about/">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
    </f7-list>

    <f7-block-title class="searchbar-found">Components</f7-block-title>
    <f7-list strong inset dividers-ios class="components-list searchbar-found">
      <f7-list-item link="/accordion/" title="Accordion">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/action-sheet/" title="Action Sheet">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/area-chart/" title="Area Chart">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/autocomplete/" title="Autocomplete">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/badge/" title="Badge">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/breadcrumbs/" title="Breadcrumbs">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/buttons/" title="Buttons">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/calendar/" title="Calendar / Date Picker">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/cards/" title="Cards">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/cards-expandable/" title="Cards Expandable">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/checkbox/" title="Checkbox">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/chips/" title="Chips/Tags">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/color-picker/" title="Color Picker">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/contacts-list/" title="Contacts List">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/content-block/" title="Content Block">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/data-table/" title="Data Table">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/dialog/" title="Dialog">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/fab/" title="FAB">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/fab-morph/" title="FAB Morph">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/form-storage/" title="Form Storage">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/gauge/" title="Gauge">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/grid/" title="Grid / Layout Grid">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/icons/" title="Icons">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/infinite-scroll/" title="Infinite Scroll">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/inputs/" title="Inputs">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/list-button/" title="List Button">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/list/" title="List View">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/list-index/" title="List Index">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/login-screen/" title="Login Screen">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/menu-list/" title="Menu List">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/messages/" title="Messages">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/navbar/" title="Navbar">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/notifications/" title="Notifications">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/panel/" title="Panel / Side Panels">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/photo-browser/" title="Photo Browser">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/picker/" title="Picker">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/pie-chart/" title="Pie Chart">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/popover/" title="Popover">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/popup/" title="Popup">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/preloader/" title="Preloader">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/progressbar/" title="Progress Bar">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/pull-to-refresh/" title="Pull To Refresh">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/radio/" title="Radio">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/range/" title="Range Slider">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/searchbar/" title="Searchbar">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/searchbar-expandable/" title="Searchbar Expandable">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/segmented/" title="Segmented">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/sheet-modal/" title="Sheet Modal">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/skeleton/" title="Skeleton (Ghost) Elements">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/smart-select/" title="Smart Select">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/sortable/" title="Sortable List">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/stepper/" title="Stepper">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/subnavbar/" title="Subnavbar">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/swipeout/" title="Swipeout (Swipe To Delete)">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/swiper/" title="Swiper Slider">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/tabs/" title="Tabs">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/text-editor/" title="Text Editor">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/timeline/" title="Timeline">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/toast/" title="Toast">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/toggle/" title="Toggle">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/toolbar-tabbar/" title="Toolbar & Tabbar">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/tooltip/" title="Tooltip">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/treeview/" title="Treeview">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
      <f7-list-item link="/virtual-list/" title="Virtual List">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
    </f7-list>
    <f7-list strong inset dividers-ios class="searchbar-not-found">
      <f7-list-item title="Nothing found" />
    </f7-list>
    <f7-block-title class="searchbar-hide-on-search">Themes</f7-block-title>
    <f7-list strong inset dividers-ios class="searchbar-hide-on-search">
      <f7-list-item title="iOS Theme" external link="./?theme=ios" />
      <f7-list-item title="Material (MD) Theme" external link="./?theme=md" />
      <f7-list-item title="Color Themes" link="/color-themes/" />
    </f7-list>

    <f7-block-title class="searchbar-hide-on-search">Page Loaders & Router</f7-block-title>
    <f7-list strong inset dividers-ios class="searchbar-hide-on-search">
      <f7-list-item title="Page Transitions" link="/page-transitions/" />
      <f7-list-item title="Routable Modals" link="/routable-modals/" />
      <f7-list-item title="Default Route (404)" link="/load-something-that-doesnt-exist/" />
      <f7-list-item title="Master-Detail (Split View)" link="/master-detail/" />
      <f7-list-item title="Store" link="/store/" />
    </f7-list>
  </f7-page>
</template>
<script>
import {
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
  theme,
} from 'framework7-vue';

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
  props: {
    f7router: Object,
  },
  // eslint-disable-next-line
  setup() {
    return {
      theme,
    };
  },
};
</script>
