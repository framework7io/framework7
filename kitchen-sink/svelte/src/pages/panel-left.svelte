<script>
  import { Page, BlockTitle, Block, List, ListItem, Link } from 'framework7-svelte';
</script>

<Page>
  <BlockTitle>Left Panel</BlockTitle>
  <Block strong inset>
    <p>
      This is a left side panel. You can close it by clicking outsite or on this link:
      <Link panelClose>close me</Link>. You can put here anything, even another isolated view like
      in
      <Link panelOpen="right">Right Panel</Link>
    </p>
  </Block>
  <BlockTitle>Main View Navigation</BlockTitle>
  <List strong inset dividersIos>
    <ListItem link="/accordion/" title="Accordion" panelClose />
    <ListItem link="/action-sheet/" title="Action Sheet" panelClose />
    <ListItem link="/badge/" title="Badge" panelClose />
    <ListItem link="/buttons/" title="Buttons" panelClose />
    <ListItem link="/cards/" title="Cards" panelClose />
    <ListItem link="/checkbox/" title="Checkbox" panelClose />
    <ListItem link="/chips/" title="Chips/Tags" panelClose />
    <ListItem link="/contacts-list/" title="Contacts List" panelClose />
    <ListItem link="/data-table/" title="Data Table" panelClose />
  </List>
</Page>
