<script>
  import {
    Navbar,
    NavRight,
    Toolbar,
    Page,
    Link,
    Badge,
    List,
    ListItem,
    Icon,
  } from 'framework7-svelte';
</script>

<Page>
  <Navbar sliding backLink="Back" title="Badge">
    <NavRight>
      <Link iconOnly>
        <Icon ios="f7:person_circle_fill" md="material:person">
          <Badge color="red">5</Badge>
        </Icon>
      </Link>
    </NavRight>
  </Navbar>
  <Toolbar bottom tabbar icons>
    <Link tabLink="#tab-1" tabLinkActive>
      <Icon ios="f7:envelope_fill" md="material:email">
        <Badge color="green">5</Badge>
      </Icon>
      <span class="tabbar-label">Inbox</span>
    </Link>
    <Link tabLink="#tab-2">
      <Icon ios="f7:calendar_fill" md="material:today">
        <Badge color="red">7</Badge>
      </Icon>
      <span class="tabbar-label">Calendar</span>
    </Link>
    <Link tabLink="#tab-3">
      <Icon ios="f7:cloud_upload_fill" md="material:file_upload">
        <Badge color="red">1</Badge>
      </Icon>
      <span class="tabbar-label">Upload</span>
    </Link>
  </Toolbar>

  <List strongIos outlineIos dividersIos>
    <ListItem title="Foo Bar" badge="0"><i slot="media" class="icon icon-f7" /></ListItem>
    <ListItem title="Ivan Petrov" badge="CEO" badgeColor="blue">
      <i slot="media" class="icon icon-f7" />
    </ListItem>
    <ListItem title="John Doe" badge="5" badgeColor="green">
      <i slot="media" class="icon icon-f7" />
    </ListItem>
    <ListItem title="Jane Doe" badge="NEW" badgeColor="orange">
      <i slot="media" class="icon icon-f7" />
    </ListItem>
  </List>
</Page>
