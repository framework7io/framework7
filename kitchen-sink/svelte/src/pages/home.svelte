<script>
  import {
    f7,
    theme,
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
  import { onMount } from 'svelte';

  export let f7router;

  const onResize = () => {
    const $el = f7.$('.page-home');
    if (f7.width >= 768) {
      $el.find('.list:not(.searchbar-not-found)').addClass('menu-list');
    } else {
      $el.find('.list:not(.searchbar-not-found)').removeClass('menu-list');
    }
  };

  const onPageAfterIn = () => {
    if (!theme.aurora) return;
    if (f7.width >= 768) {
      f7router.navigate('/about/', { reloadDetail: true });
    }
  };

  onMount(() => {
    if (theme.aurora) {
      const $el = f7.$('.page-home');
      onResize();

      f7.on('resize', onResize);

      f7router.on('routeChange', (route) => {
        const url = route.url;
        if (!$el) return;
        const $linkEl = $el.find(`a[href="${url}"]`);
        if (!$linkEl.length) return;
        $el.find('.item-selected').removeClass('item-selected');
        $linkEl.addClass('item-selected');
      });
    }
  });
</script>

<Page class="page-home" {onPageAfterIn}>
  <Navbar large transparent sliding={false}>
    <NavLeft>
      <Link panelOpen="left" iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" />
    </NavLeft>
    <NavTitle sliding>Framework7 Svelte</NavTitle>
    <NavRight>
      <Link
        searchbarEnable=".searchbar-components"
        iconIos="f7:search"
        iconAurora="f7:search"
        iconMd="material:search" />
    </NavRight>
    <NavTitleLarge>Framework7 Svelte</NavTitleLarge>
    <Searchbar
      class="searchbar-components"
      searchContainer=".components-list"
      searchIn="a"
      expandable
      disableButton={!theme.aurora} />
  </Navbar>

  <List class="searchbar-hide-on-search">
    <ListItem title="About Framework7" reloadDetail={theme.aurora} link="/about/">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
  </List>

  <BlockTitle medium class="searchbar-found">Components</BlockTitle>
  <List class="components-list searchbar-found">
    <ListItem reloadDetail={theme.aurora} link="/accordion/" title="Accordion">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/action-sheet/" title="Action Sheet">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/appbar/" title="Appbar">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/area-chart/" title="Area Chart">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/autocomplete/" title="Autocomplete">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/badge/" title="Badge">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/buttons/" title="Buttons">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/calendar/" title="Calendar / Date Picker">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/cards/" title="Cards">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/cards-expandable/" title="Cards Expandable">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/checkbox/" title="Checkbox">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/chips/" title="Chips/Tags">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/color-picker/" title="Color Picker">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/contacts-list/" title="Contacts List">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/content-block/" title="Content Block">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/data-table/" title="Data Table">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/dialog/" title="Dialog">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/elevation/" title="Elevation">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/fab/" title="FAB">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/fab-morph/" title="FAB Morph">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/form-storage/" title="Form Storage">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/gauge/" title="Gauge">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/grid/" title="Grid / Layout Grid">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/icons/" title="Icons">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/infinite-scroll/" title="Infinite Scroll">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/inputs/" title="Inputs">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/lazy-load/" title="Lazy Load">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/list/" title="List View">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/list-index/" title="List Index">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/login-screen/" title="Login Screen">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/menu/" title="Menu">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/menu-list/" title="Menu List">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/messages/" title="Messages">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/navbar/" title="Navbar">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/notifications/" title="Notifications">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/panel/" title="Panel / Side Panels">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/photo-browser/" title="Photo Browser">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/picker/" title="Picker">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/pie-chart/" title="Pie Chart">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/popover/" title="Popover">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/popup/" title="Popup">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/preloader/" title="Preloader">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/progressbar/" title="Progress Bar">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/pull-to-refresh/" title="Pull To Refresh">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/radio/" title="Radio">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/range/" title="Range Slider">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/searchbar/" title="Searchbar">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem
      reloadDetail={theme.aurora}
      link="/searchbar-expandable/"
      title="Searchbar Expandable">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/sheet-modal/" title="Sheet Modal">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/skeleton/" title="Skeleton (Ghost) Elements">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/smart-select/" title="Smart Select">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/sortable/" title="Sortable List">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/stepper/" title="Stepper">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/subnavbar/" title="Subnavbar">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/swipeout/" title="Swipeout (Swipe To Delete)">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/swiper/" title="Swiper Slider">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/tabs/" title="Tabs">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/text-editor/" title="Text Editor">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/timeline/" title="Timeline">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/toast/" title="Toast">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/toggle/" title="Toggle">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/toolbar-tabbar/" title="Toolbar & Tabbar">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/tooltip/" title="Tooltip">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/treeview/" title="Treeview">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
    <ListItem reloadDetail={theme.aurora} link="/virtual-list/" title="Virtual List">
      <i class="icon icon-f7" slot="media" />
    </ListItem>
  </List>
  <List class="searchbar-not-found">
    <ListItem title="Nothing found" />
  </List>
  <BlockTitle medium class="searchbar-hide-on-search">Themes</BlockTitle>
  <List class="searchbar-hide-on-search">
    <ListItem title="iOS Theme" external link="./index.html?theme=ios" />
    <ListItem title="Material (MD) Theme" external link="./index.html?theme=md" />
    <ListItem title="Aurora Desktop Theme" external link="./index.html?theme=aurora" />
    <ListItem title="Color Themes" reloadDetail={theme.aurora} link="/color-themes/" />
  </List>
  <BlockTitle medium class="searchbar-hide-on-search">Page Loaders & Router</BlockTitle>
  <List class="searchbar-hide-on-search">
    <ListItem title="Page Transitions" reloadDetail={theme.aurora} link="/page-transitions/" />
    <ListItem title="Routable Modals" reloadDetail={theme.aurora} link="/routable-modals/" />
    <ListItem
      title="Default Route (404)"
      reloadDetail={theme.aurora}
      link="/load-something-that-doesnt-exist/" />
    {#if !theme.aurora}
      <ListItem title="Master-Detail (Split View)" link="/master-detail/" />
    {/if}
    <ListItem title="Store" reloadDetail={theme.aurora} link="/store/" />
  </List>
</Page>
