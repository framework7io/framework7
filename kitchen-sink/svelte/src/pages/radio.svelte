<script>
  import { Navbar, Page, BlockTitle, Block, List, ListItem, Radio } from 'framework7-svelte';
</script>

<Page>
  <Navbar title="Radio" backLink="Back" />

  <BlockTitle>Inline</BlockTitle>
  <Block strongIos outlineIos>
    <p>
      Lorem
      <Radio name="demo-radio-inline" value="inline-1" />
      ipsum dolor sit amet, consectetur adipisicing elit. Alias beatae illo nihil aut eius commodi sint
      eveniet aliquid eligendi
      <Radio name="demo-radio-inline" value="inline-2" checked />
      ad delectus impedit tempore nemo, enim vel praesentium consequatur nulla mollitia!
    </p>
  </Block>

  <BlockTitle>Radio Group</BlockTitle>
  <List strongIos outlineIos dividersIos>
    <ListItem radio radioIcon="start" title="Books" name="demo-radio-start" value="Books" checked />
    <ListItem radio radioIcon="start" title="Movies" value="Movies" name="demo-radio-start" />
    <ListItem radio radioIcon="start" title="Food" value="Food" name="demo-radio-start" />
    <ListItem radio radioIcon="start" title="Drinks" value="Drinks" name="demo-radio-start" />
  </List>
  <List strongIos outlineIos dividersIos>
    <ListItem radio radioIcon="end" title="Books" name="demo-radio-end" value="Books" checked />
    <ListItem radio radioIcon="end" title="Movies" value="Movies" name="demo-radio-end" />
    <ListItem radio radioIcon="end" title="Food" value="Food" name="demo-radio-end" />
    <ListItem radio radioIcon="end" title="Drinks" value="Drinks" name="demo-radio-end" />
  </List>

  <BlockTitle>With Media Lists</BlockTitle>
  <List mediaList strongIos outlineIos dividersIos>
    <ListItem
      radio
      radioIcon="start"
      checked
      name="demo-media-radio"
      value="1"
      title="Facebook"
      after="17:14"
      subtitle="New messages from John Doe"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
    />
    <ListItem
      radio
      radioIcon="start"
      name="demo-media-radio"
      value="2"
      title="John Doe (via Twitter)"
      after="17:11"
      subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
    />
    <ListItem
      radio
      radioIcon="start"
      name="demo-media-radio"
      value="3"
      title="Facebook"
      after="16:48"
      subtitle="New messages from John Doe"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
    />
    <ListItem
      radio
      radioIcon="start"
      name="demo-media-radio"
      value="4"
      title="John Doe (via Twitter)"
      after="15:32"
      subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
    />
  </List>
</Page>
