import React from 'react';
import { Navbar, Page, Block, List, ListItem, NavRight, Link, Icon } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Sortable List" backLink="Back">
      <NavRight>
        <Link sortableToggle=".sortable">Toggle</Link>
      </NavRight>
    </Navbar>

    <Block>
      <p>Just click "Toggle" button on navigation bar to enable/disable sorting</p>
    </Block>
    <List sortable>
      <ListItem
        title="1 Jenna Smith"
        after="CEO">
        <Icon icon="icon-f7" slot="media"></Icon>
      </ListItem>
      <ListItem
        title="2 John Doe"
        after="Director">
        <Icon icon="icon-f7" slot="media"></Icon>
      </ListItem>
      <ListItem
        title="3 John Doe"
        after="Developer">
        <Icon icon="icon-f7" slot="media"></Icon>
      </ListItem>
      <ListItem
        title="4 Aaron Darling"
        after="Manager">
        <Icon icon="icon-f7" slot="media"></Icon>
      </ListItem>
      <ListItem
        title="5 Calvin Johnson"
        after="Accounter">
        <Icon icon="icon-f7" slot="media"></Icon>
      </ListItem>
      <ListItem
        title="6 John Smith"
        after="SEO">
        <Icon icon="icon-f7" slot="media"></Icon>
      </ListItem>
      <ListItem
        title="7 Chloe"
        after="Manager">
        <Icon icon="icon-f7" slot="media"></Icon>
      </ListItem>
    </List>
    <List mediaList sortable>
      <ListItem
        title="Yellow Submarine"
        after="$15"
        subtitle="Beatles"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
        >
        <img slot="media" src="https://cdn.framework7.io/placeholder/people-160x160-1.jpg" width="80" />
      </ListItem>
      <ListItem
        title="Don't Stop Me Now"
        after="$22"
        subtitle="Queen"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
        >
        <img slot="media" src="https://cdn.framework7.io/placeholder/people-160x160-2.jpg" width="80" />
      </ListItem>
      <ListItem
        title="Billie Jean"
        after="$16"
        subtitle="Michael Jackson"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
        >
        <img slot="media" src="https://cdn.framework7.io/placeholder/people-160x160-3.jpg" width="80" />
      </ListItem>
    </List>
  </Page>
);
