import React from 'react';
import { Page, BlockTitle, Block, List, ListItem, Link } from 'framework7-react';

export default () => (
  <Page>
    <BlockTitle>Left Panel</BlockTitle>
    <Block>
      <p>This is a left side panel. You can close it by clicking outsite or on this link: <Link panelClose>close me</Link>. You can put here anything, even another isolated view like in  <Link panelOpen="right">Right Panel</Link></p>
    </Block>
    <BlockTitle>Main View Navigation</BlockTitle>
    <List>
      <ListItem link="/accordion/" title="Accordion" panelClose></ListItem>
      <ListItem link="/action-sheet/" title="Action Sheet" panelClose></ListItem>
      <ListItem link="/badge/" title="Badge" panelClose></ListItem>
      <ListItem link="/buttons/" title="Buttons" panelClose></ListItem>
      <ListItem link="/cards/" title="Cards" panelClose></ListItem>
      <ListItem link="/checkbox/" title="Checkbox" panelClose></ListItem>
      <ListItem link="/chips/" title="Chips/Tags" panelClose></ListItem>
      <ListItem link="/contacts-list/" title="Contacts List" panelClose></ListItem>
      <ListItem link="/data-table/" title="Data Table" panelClose></ListItem>
    </List>
    <Block>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.</p>
      <p>Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula. Phasellus blandit nisl ut lorem semper pharetra. Nullam tortor nibh, suscipit in consequat vel, feugiat sed quam. Nam risus libero, auctor vel tristique ac, malesuada ut ante. Sed molestie, est in eleifend sagittis, leo tortor ullamcorper erat, at vulputate eros sapien nec libero. Mauris dapibus laoreet nibh quis bibendum. Fusce dolor sem, suscipit in iaculis id, pharetra at urna. Pellentesque tempor congue massa quis faucibus. Vestibulum nunc eros, convallis blandit dui sit amet, gravida adipiscing libero.</p>
    </Block>
  </Page>
);