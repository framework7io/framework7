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
    ToolbarPane,
  } from 'framework7-svelte';
</script>

<Page>
  <Navbar backLink title="Badge">
    <NavRight>
      <Link iconOnly>
        <Icon ios="f7:person_circle_fill" md="material:person">
          <Badge color="red">5</Badge>
        </Icon>
      </Link>
    </NavRight>
  </Navbar>
  <Toolbar bottom tabbar icons>
    <ToolbarPane>
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
    </ToolbarPane>
  </Toolbar>

  <List strongIos outlineIos dividersIos>
    <ListItem title="Foo Bar" badge="0">
      {#snippet media()}
        <i class="icon icon-f7" />
      {/snippet}
    </ListItem>
    <ListItem title="Ivan Petrov" badge="CEO" badgeColor="blue">
      {#snippet media()}
        <i class="icon icon-f7" />
      {/snippet}
    </ListItem>
    <ListItem title="John Doe" badge="5" badgeColor="green">
      {#snippet media()}
        <i class="icon icon-f7" />
      {/snippet}
    </ListItem>
    <ListItem title="Jane Doe" badge="NEW" badgeColor="orange">
      {#snippet media()}
        <i class="icon icon-f7" />
      {/snippet}
    </ListItem>
  </List>
</Page>
