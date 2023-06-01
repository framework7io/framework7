<script>
  import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavTitleLarge,
    NavRight,
    BlockTitle,
    List,
    ListItem,
    Link,
    Searchbar,
  } from 'framework7-svelte';
</script>

<Page class="page-home">
  <Navbar large transparent sliding={false} mdCenterTitle>
    <NavLeft>
      <Link panelOpen="left" iconIos="f7:menu" iconMd="material:menu" />
    </NavLeft>
    <NavTitle sliding>Framework7 Svelte</NavTitle>
    <NavRight>
      <Link searchbarEnable=".searchbar-components" iconIos="f7:search" iconMd="material:search" />
    </NavRight>
    <NavTitleLarge>Framework7 Svelte</NavTitleLarge>
    <Searchbar
      class="searchbar-components"
      searchContainer=".components-list"
      searchIn="a"
      expandable
    />
  </Navbar>

  <List strong inset dividersIos class="searchbar-hide-on-search">
    <ListItem title="About Framework7" link="/about/">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
  </List>

  <BlockTitle class="searchbar-found">Components</BlockTitle>
  <List strong inset dividersIos class="components-list searchbar-found">
    <ListItem link="/accordion/" title="Accordion">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/action-sheet/" title="Action Sheet">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/area-chart/" title="Area Chart">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/autocomplete/" title="Autocomplete">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/badge/" title="Badge">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/breadcrumbs/" title="Breadcrumbs">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/buttons/" title="Buttons">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/calendar/" title="Calendar / Date Picker">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/cards/" title="Cards">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/cards-expandable/" title="Cards Expandable">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/checkbox/" title="Checkbox">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/chips/" title="Chips/Tags">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/color-picker/" title="Color Picker">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/contacts-list/" title="Contacts List">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/content-block/" title="Content Block">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/data-table/" title="Data Table">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/dialog/" title="Dialog">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/fab/" title="FAB">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/fab-morph/" title="FAB Morph">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/form-storage/" title="Form Storage">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/gauge/" title="Gauge">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/grid/" title="Grid / Layout Grid">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/icons/" title="Icons">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/infinite-scroll/" title="Infinite Scroll">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/inputs/" title="Inputs">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
     <ListItem link="/list-button/" title="List Button">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/list/" title="List View">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/list-index/" title="List Index">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/login-screen/" title="Login Screen">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/menu-list/" title="Menu List">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/messages/" title="Messages">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/navbar/" title="Navbar">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/notifications/" title="Notifications">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/panel/" title="Panel / Side Panels">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/photo-browser/" title="Photo Browser">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/picker/" title="Picker">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/pie-chart/" title="Pie Chart">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/popover/" title="Popover">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/popup/" title="Popup">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/preloader/" title="Preloader">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/progressbar/" title="Progress Bar">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/pull-to-refresh/" title="Pull To Refresh">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/radio/" title="Radio">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/range/" title="Range Slider">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/searchbar/" title="Searchbar">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/searchbar-expandable/" title="Searchbar Expandable">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/segmented/" title="Segmented">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/sheet-modal/" title="Sheet Modal">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/skeleton/" title="Skeleton (Ghost) Elements">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/smart-select/" title="Smart Select">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/sortable/" title="Sortable List">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/stepper/" title="Stepper">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/subnavbar/" title="Subnavbar">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/swipeout/" title="Swipeout (Swipe To Delete)">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/swiper/" title="Swiper Slider">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/tabs/" title="Tabs">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/text-editor/" title="Text Editor">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/timeline/" title="Timeline">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/toast/" title="Toast">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/toggle/" title="Toggle">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/toolbar-tabbar/" title="Toolbar & Tabbar">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/tooltip/" title="Tooltip">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/treeview/" title="Treeview">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem link="/virtual-list/" title="Virtual List">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
  </List>
  <List strong inset dividersIos class="searchbar-not-found">
    <ListItem title="Nothing found" />
  </List>
  <BlockTitle class="searchbar-hide-on-search">Themes</BlockTitle>
  <List strong inset dividersIos class="searchbar-hide-on-search">
    <ListItem title="iOS Theme" external link="./?theme=ios" />
    <ListItem title="Material (MD) Theme" external link="./?theme=md" />
    <ListItem title="Color Themes" link="/color-themes/" />
  </List>
  <BlockTitle class="searchbar-hide-on-search">Page Loaders & Router</BlockTitle>
  <List strong inset dividersIos class="searchbar-hide-on-search">
    <ListItem title="Page Transitions" link="/page-transitions/" />
    <ListItem title="Routable Modals" link="/routable-modals/" />
    <ListItem title="Default Route (404)" link="/load-something-that-doesnt-exist/" />
    <ListItem title="Master-Detail (Split View)" link="/master-detail/" />
    <ListItem title="Store" link="/store/" />
  </List>
</Page>
