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
  <Navbar large transparent mdCenterTitle>
    <NavLeft>
      <Link panelOpen="left" iconIos="f7:menu" iconMd="material:menu" />
    </NavLeft>
    <NavTitle>Framework7 Svelte</NavTitle>
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
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
  </List>

  <BlockTitle class="searchbar-found">Components</BlockTitle>
  <List strong inset dividersIos class="components-list searchbar-found">
    <ListItem link="/accordion/" title="Accordion">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/action-sheet/" title="Action Sheet">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/area-chart/" title="Area Chart">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/autocomplete/" title="Autocomplete">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/badge/" title="Badge">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/breadcrumbs/" title="Breadcrumbs">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/buttons/" title="Buttons">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/calendar/" title="Calendar / Date Picker">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/cards/" title="Cards">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/cards-expandable/" title="Cards Expandable">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/checkbox/" title="Checkbox">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/chips/" title="Chips/Tags">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/color-picker/" title="Color Picker">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/contacts-list/" title="Contacts List">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/content-block/" title="Content Block">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/data-table/" title="Data Table">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/dialog/" title="Dialog">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/fab/" title="FAB">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/fab-morph/" title="FAB Morph">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/form-storage/" title="Form Storage">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/gauge/" title="Gauge">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/grid/" title="Grid / Layout Grid">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/icons/" title="Icons">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/infinite-scroll/" title="Infinite Scroll">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/inputs/" title="Inputs">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/list-button/" title="List Button">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/list/" title="List View">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/list-index/" title="List Index">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/login-screen/" title="Login Screen">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/menu-list/" title="Menu List">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/messages/" title="Messages">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/navbar/" title="Navbar">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/notifications/" title="Notifications">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/panel/" title="Panel / Side Panels">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/photo-browser/" title="Photo Browser">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/picker/" title="Picker">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/pie-chart/" title="Pie Chart">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/popover/" title="Popover">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/popup/" title="Popup">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/preloader/" title="Preloader">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/progressbar/" title="Progress Bar">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/pull-to-refresh/" title="Pull To Refresh">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/radio/" title="Radio">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/range/" title="Range Slider">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/searchbar/" title="Searchbar">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/searchbar-expandable/" title="Searchbar Expandable">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/segmented/" title="Segmented">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/sheet-modal/" title="Sheet Modal">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/skeleton/" title="Skeleton (Ghost) Elements">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/smart-select/" title="Smart Select">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/sortable/" title="Sortable List">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/stepper/" title="Stepper">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/subnavbar/" title="Subnavbar">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/swipeout/" title="Swipeout (Swipe To Delete)">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/swiper/" title="Swiper Slider">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/tabs/" title="Tabs">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/text-editor/" title="Text Editor">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/timeline/" title="Timeline">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/toast/" title="Toast">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/toggle/" title="Toggle">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/toolbar-tabbar/" title="Toolbar & Tabbar">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/tooltip/" title="Tooltip">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/treeview/" title="Treeview">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
    </ListItem>
    <ListItem link="/virtual-list/" title="Virtual List">
      {#snippet media()}
        <i class="icon icon-f7"></i>
      {/snippet}
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
