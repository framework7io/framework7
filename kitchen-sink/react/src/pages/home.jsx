import React from 'react';
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
} from 'framework7-react';

export default () => {
  return (
    <Page className="page-home">
      <Navbar large transparent sliding={false} mdCenterTitle>
        <NavLeft>
          <Link panelOpen="left" iconIos="f7:menu" iconMd="material:menu" />
        </NavLeft>
        <NavTitle sliding>Framework7 React</NavTitle>
        <NavRight>
          <Link
            searchbarEnable=".searchbar-components"
            iconIos="f7:search"
            iconMd="material:search"
          />
        </NavRight>
        <NavTitleLarge>Framework7 React</NavTitleLarge>
        <Searchbar
          className="searchbar-components"
          searchContainer=".components-list"
          searchIn="a"
          expandable
        />
      </Navbar>

      <List strong inset dividersIos className="searchbar-hide-on-search">
        <ListItem title="About Framework7" link="/about/">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
      </List>

      <BlockTitle className="searchbar-found">Components</BlockTitle>
      <List strong inset dividersIos className="components-list searchbar-found">
        <ListItem link="/accordion/" title="Accordion">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/action-sheet/" title="Action Sheet">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/area-chart/" title="Area Chart">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/autocomplete/" title="Autocomplete">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/badge/" title="Badge">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/breadcrumbs/" title="Breadcrumbs">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/buttons/" title="Buttons">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/calendar/" title="Calendar / Date Picker">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/cards/" title="Cards">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/cards-expandable/" title="Cards Expandable">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/checkbox/" title="Checkbox">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/chips/" title="Chips/Tags">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/color-picker/" title="Color Picker">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/contacts-list/" title="Contacts List">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/content-block/" title="Content Block">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/data-table/" title="Data Table">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/dialog/" title="Dialog">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/fab/" title="FAB">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/fab-morph/" title="FAB Morph">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/form-storage/" title="Form Storage">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/gauge/" title="Gauge">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/grid/" title="Grid / Layout Grid">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/icons/" title="Icons">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/infinite-scroll/" title="Infinite Scroll">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/inputs/" title="Inputs">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/list-button/" title="List Button">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/list/" title="List View">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/list-index/" title="List Index">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/login-screen/" title="Login Screen">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/menu-list/" title="Menu List">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/messages/" title="Messages">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/navbar/" title="Navbar">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/notifications/" title="Notifications">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/panel/" title="Panel / Side Panels">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/photo-browser/" title="Photo Browser">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/picker/" title="Picker">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/pie-chart/" title="Pie Chart">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/popover/" title="Popover">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/popup/" title="Popup">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/preloader/" title="Preloader">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/progressbar/" title="Progress Bar">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/pull-to-refresh/" title="Pull To Refresh">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/radio/" title="Radio">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/range/" title="Range Slider">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/searchbar/" title="Searchbar">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/searchbar-expandable/" title="Searchbar Expandable">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/segmented/" title="Segmented">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/sheet-modal/" title="Sheet Modal">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/skeleton/" title="Skeleton (Ghost) Elements">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/smart-select/" title="Smart Select">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/sortable/" title="Sortable List">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/stepper/" title="Stepper">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/subnavbar/" title="Subnavbar">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/swipeout/" title="Swipeout (Swipe To Delete)">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/swiper/" title="Swiper Slider">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/tabs/" title="Tabs">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/text-editor/" title="Text Editor">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/timeline/" title="Timeline">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/toast/" title="Toast">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/toggle/" title="Toggle">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/toolbar-tabbar/" title="Toolbar & Tabbar">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/tooltip/" title="Tooltip">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/treeview/" title="Treeview">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
        <ListItem link="/virtual-list/" title="Virtual List">
          <Icon slot="media" icon="icon-f7" />
        </ListItem>
      </List>
      <List strong inset dividersIos className="searchbar-not-found">
        <ListItem title="Nothing found" />
      </List>
      <BlockTitle className="searchbar-hide-on-search">Themes</BlockTitle>
      <List strong inset dividersIos className="searchbar-hide-on-search">
        <ListItem title="iOS Theme" external link="./?theme=ios" />
        <ListItem title="Material (MD) Theme" external link="./?theme=md" />
        <ListItem title="Color Themes" link="/color-themes/" />
      </List>
      <BlockTitle className="searchbar-hide-on-search">Page Loaders & Router</BlockTitle>
      <List strong inset dividersIos className="searchbar-hide-on-search">
        <ListItem title="Page Transitions" link="/page-transitions/" />
        <ListItem title="Routable Modals" link="/routable-modals/" />
        <ListItem title="Default Route (404)" link="/load-something-that-doesnt-exist/" />
        <ListItem title="Master-Detail (Split View)" link="/master-detail/" />
        <ListItem title="Store" link="/store/" />
      </List>
    </Page>
  );
};
