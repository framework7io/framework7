import React from 'react';
import { Navbar, NavRight, Toolbar, Page, Link, Badge, List, ListItem, Icon } from 'framework7-react';

export default () => (
  <Page>
    <Navbar sliding backLink="Back" title="Badge">
      <NavRight>
        <Link iconOnly>
          <Icon ios="f7:person_round_fill" aurora="f7:person_round_fill" md="material:person">
            <Badge color="red">5</Badge>
          </Icon>
        </Link>
      </NavRight>
    </Navbar>
    <Toolbar bottom tabbar labels>
      <Link tabLink="#tab-1" tabLinkActive>
        <Icon ios="f7:email_fill" aurora="f7:email_fill" md="material:email">
          <Badge color="green">5</Badge>
        </Icon>
        <span className="tabbar-label">Inbox</span>
      </Link>
      <Link tabLink="#tab-2">
        <Icon ios="f7:calendar_fill" aurora="f7:calendar_fill" md="material:today">
          <Badge color="red">7</Badge>
        </Icon>
        <span className="tabbar-label">Calendar</span>
      </Link>
      <Link tabLink="#tab-3">
        <Icon ios="f7:cloud_upload_fill" aurora="f7:cloud_upload_fill" md="material:file_upload">
          <Badge color="red">1</Badge>
        </Icon>
        <span className="tabbar-label">Upload</span>
      </Link>
    </Toolbar>

    <List>
      <ListItem title="Foo Bar" badge="0">
        <Icon slot="media" icon="icon-f7"></Icon>
      </ListItem>
      <ListItem title="Ivan Petrov" badge="CEO" badgeColor="blue">
        <Icon slot="media" icon="icon-f7"></Icon>
      </ListItem>
      <ListItem title="John Doe" badge="5" badgeColor="green">
        <Icon slot="media" icon="icon-f7"></Icon>
      </ListItem>
      <ListItem title="Jane Doe" badge="NEW" badgeColor="orange">
        <Icon slot="media" icon="icon-f7"></Icon>
      </ListItem>
    </List>
  </Page>
);
