import React, { useEffect } from 'react';
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
  Icon,
  f7,
  theme,
} from 'framework7-react';

export default ({ f7router }) => {
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
  useEffect(() => {
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
  }, []);

  return (
    <Page className="page-home" onPageAfterIn={onPageAfterIn}>
      <Navbar large transparent sliding={false}>
        <NavLeft>
          <Link panelOpen="left" iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" />
        </NavLeft>
        <NavTitle sliding>Framework7 React</NavTitle>
        <NavRight>
          <Link
            searchbarEnable=".searchbar-components"
            iconIos="f7:search"
            iconAurora="f7:search"
            iconMd="material:search"
          />
        </NavRight>
        <NavTitleLarge>Framework7 React</NavTitleLarge>
        <Searchbar
          className="searchbar-components"
          searchContainer=".components-list"
          searchIn="a"
          expandable
          disableButton={!theme.aurora}
        />
      </Navbar>

      <List className="searchbar-hide-on-search">
        <ListItem title="About Framework7" reloadDetail link="/about/">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
      </List>

      <BlockTitle medium className="searchbar-found">
        Components
      </BlockTitle>
      <List className="components-list searchbar-found">
        <ListItem reloadDetail link="/accordion/" title="Accordion">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/action-sheet/" title="Action Sheet">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/appbar/" title="Appbar">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/area-chart/" title="Area Chart">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/autocomplete/" title="Autocomplete">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/badge/" title="Badge">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/breadcrumbs/" title="Breadcrumbs">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/buttons/" title="Buttons">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/calendar/" title="Calendar / Date Picker">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/cards/" title="Cards">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/cards-expandable/" title="Cards Expandable">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/checkbox/" title="Checkbox">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/chips/" title="Chips/Tags">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/color-picker/" title="Color Picker">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/contacts-list/" title="Contacts List">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/content-block/" title="Content Block">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/data-table/" title="Data Table">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/dialog/" title="Dialog">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/elevation/" title="Elevation">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/fab/" title="FAB">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/fab-morph/" title="FAB Morph">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/form-storage/" title="Form Storage">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/gauge/" title="Gauge">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/grid/" title="Grid / Layout Grid">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/icons/" title="Icons">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/infinite-scroll/" title="Infinite Scroll">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/inputs/" title="Inputs">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/lazy-load/" title="Lazy Load">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/list/" title="List View">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/list-index/" title="List Index">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/login-screen/" title="Login Screen">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/menu/" title="Menu">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/menu-list/" title="Menu List">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/messages/" title="Messages">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/navbar/" title="Navbar">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/notifications/" title="Notifications">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/panel/" title="Panel / Side Panels">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/photo-browser/" title="Photo Browser">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/picker/" title="Picker">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/pie-chart/" title="Pie Chart">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/popover/" title="Popover">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/popup/" title="Popup">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/preloader/" title="Preloader">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/progressbar/" title="Progress Bar">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/pull-to-refresh/" title="Pull To Refresh">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/radio/" title="Radio">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/range/" title="Range Slider">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/searchbar/" title="Searchbar">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/searchbar-expandable/" title="Searchbar Expandable">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/sheet-modal/" title="Sheet Modal">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/skeleton/" title="Skeleton (Ghost) Elements">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/smart-select/" title="Smart Select">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/sortable/" title="Sortable List">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/stepper/" title="Stepper">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/subnavbar/" title="Subnavbar">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/swipeout/" title="Swipeout (Swipe To Delete)">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/swiper/" title="Swiper Slider">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/tabs/" title="Tabs">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/text-editor/" title="Text Editor">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/timeline/" title="Timeline">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/toast/" title="Toast">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/toggle/" title="Toggle">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/toolbar-tabbar/" title="Toolbar & Tabbar">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/tooltip/" title="Tooltip">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/treeview/" title="Treeview">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem reloadDetail link="/virtual-list/" title="Virtual List">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
      </List>
      <List className="searchbar-not-found">
        <ListItem title="Nothing found" />
      </List>
      <BlockTitle medium className="searchbar-hide-on-search">
        Themes
      </BlockTitle>
      <List className="searchbar-hide-on-search">
        <ListItem title="iOS Theme" external link="./index.html?theme=ios" />
        <ListItem title="Material (MD) Theme" external link="./index.html?theme=md" />
        <ListItem title="Aurora Desktop Theme" external link="./index.html?theme=aurora" />
        <ListItem title="Color Themes" reloadDetail link="/color-themes/" />
      </List>
      <BlockTitle medium className="searchbar-hide-on-search">
        Page Loaders & Router
      </BlockTitle>
      <List className="searchbar-hide-on-search">
        <ListItem title="Page Transitions" reloadDetail link="/page-transitions/" />
        <ListItem title="Routable Modals" reloadDetail link="/routable-modals/" />
        <ListItem
          title="Default Route (404)"
          reloadDetail
          link="/load-something-that-doesnt-exist/"
        />
        {!theme.aurora && <ListItem title="Master-Detail (Split View)" link="/master-detail/" />}
        <ListItem title="Store" reloadDetail link="/store/" />
      </List>
    </Page>
  );
};
