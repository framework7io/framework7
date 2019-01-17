import React from 'react';
import { Navbar, Page, Toolbar, Popover, List, ListItem, Block, Link, Button} from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Popover" backLink="Back"></Navbar>
    <Toolbar bottom>
      <Link>Dummy Link</Link>
      <Link popoverOpen=".popover-menu">Open Popover</Link>
    </Toolbar>

    <Block>
      <p><Button fill popoverOpen=".popover-menu">Open popover on me</Button></p>
      <p>Mauris fermentum neque et luctus venenatis. Vivamus a sem rhoncus, ornare tellus eu, euismod mauris. In porta turpis at semper convallis. Duis adipiscing leo eu nulla lacinia, quis rhoncus metus condimentum. Etiam nec malesuada nibh. Maecenas quis lacinia nisl, vel posuere dolor. Vestibulum condimentum, nisl ac vulputate egestas, neque enim dignissim elit, rhoncus volutpat magna enim a est. Aenean sit amet ligula neque. Cras suscipit rutrum enim. Nam a odio facilisis, elementum tellus non, <Link popoverOpen=".popover-menu">popover</Link> tortor. Pellentesque felis eros, dictum vitae lacinia quis, lobortis vitae ipsum. Cras vehicula bibendum lorem quis imperdiet.</p>
      <p>In hac habitasse platea dictumst. Etiam varius, ante vel ornare facilisis, velit massa rutrum dolor, ac porta magna magna lacinia nunc. Curabitur <Link popoverOpen=".popover-menu">popover!</Link> cursus laoreet. Aenean vel tempus augue. Pellentesque in imperdiet nibh. Mauris rhoncus nulla id sem suscipit volutpat. Pellentesque ac arcu in nisi viverra pulvinar. Nullam nulla orci, bibendum sed ligula non, ullamcorper iaculis mi. In hac habitasse platea dictumst. Praesent varius at nisl eu luctus. Cras aliquet porta est. Quisque elementum quis dui et consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sed laoreet purus. Pellentesque eget ante ante.</p>
      <p>Duis et ultricies nibh. Sed facilisis turpis urna, ac imperdiet erat venenatis eu. Proin sit amet faucibus tortor, et varius sem. Etiam vitae lacinia neque. Aliquam nisi purus, interdum in arcu sed, ultrices rutrum arcu. Nulla mi turpis, consectetur vel enim quis, facilisis viverra dui. Aliquam quis convallis tortor, quis semper ligula. Morbi ullamcorper <Link popoverOpen=".popover-menu">one more popover</Link> massa at accumsan. Etiam purus odio, posuere in ligula vitae, viverra ultricies justo. Vestibulum nec interdum nisi. Aenean ac consectetur velit, non malesuada magna. Sed pharetra vehicula augue, vel venenatis lectus gravida eget. Curabitur lacus tellus, venenatis eu arcu in, interdum auctor nunc. Nunc non metus neque. Suspendisse viverra lectus sed risus aliquet, vel accumsan dolor feugiat.</p>
    </Block>
    <Popover className="popover-menu">
      <List>
        <ListItem link="/dialog/" popoverClose title="Dialog"></ListItem>
        <ListItem link="/tabs/" popoverClose title="Tabs"></ListItem>
        <ListItem link="/panel/" popoverClose title="Side Panels"></ListItem>
        <ListItem link="/list/" popoverClose title="List View"></ListItem>
        <ListItem link="/inputs/" popoverClose title="Form Inputs"></ListItem>
      </List>
    </Popover>
  </Page>
);
