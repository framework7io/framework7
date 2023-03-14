<script>
  import {
    Page,
    Navbar,
    BlockTitle,
    Block,
    Segmented,
    Button,
    List,
    ListButton,
  } from 'framework7-svelte';

  let activeStrongButton = 0;
  let isLoading1 = false;
  let isLoading2 = false;

  const load1 = () => {
    if (isLoading1) return;
    isLoading1 = true;
    setTimeout(() => {
      isLoading1 = false;
    }, 4000);
  };

  const load2 = () => {
    if (isLoading2) return;
    isLoading2 = true;
    setTimeout(() => {
      isLoading2 = false;
    }, 4000);
  };
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<Page>
  <Navbar title="Buttons" backLink="Back" />

  <BlockTitle>Usual Buttons</BlockTitle>
  <Block strong outlineIos>
    <div class="grid grid-cols-3 grid-gap">
      <Button>Button</Button>
      <Button>Button</Button>
      <Button round>Round</Button>
    </div>
  </Block>

  <BlockTitle>Tonal Buttons</BlockTitle>
  <Block strong outlineIos>
    <div class="grid grid-cols-3 grid-gap">
      <Button tonal>Button</Button>
      <Button tonal>Button</Button>
      <Button tonal round>Round</Button>
    </div>
  </Block>

  <BlockTitle>Fill Buttons</BlockTitle>
  <Block strong outlineIos>
    <div class="grid grid-cols-3 grid-gap">
      <Button fill>Button</Button>
      <Button fill>Button</Button>
      <Button fill round>Round</Button>
    </div>
  </Block>

  <BlockTitle>Outline Buttons</BlockTitle>
  <Block strong outlineIos>
    <div class="grid grid-cols-3 grid-gap">
      <Button outline>Button</Button>
      <Button outline>Button</Button>
      <Button outline round>Round</Button>
    </div>
  </Block>

  <BlockTitle>Raised Buttons</BlockTitle>
  <Block strong outlineIos>
    <p class="grid grid-cols-3 grid-gap">
      <Button raised>Button</Button>
      <Button raised fill>Fill</Button>
      <Button raised outline>Outline</Button>
    </p>
    <p class="grid grid-cols-3 grid-gap">
      <Button raised round>Round</Button>
      <Button raised fill round>Fill</Button>
      <Button raised outline round>Outline</Button>
    </p>
  </Block>

  <BlockTitle>Segmented</BlockTitle>
  <Block strong outlineIos>
    <Segmented tag="p">
      <Button>Button</Button>
      <Button>Button</Button>
      <Button active>Active</Button>
    </Segmented>
    <Segmented strong tag="p">
      <Button active={activeStrongButton === 0} onClick={() => (activeStrongButton = 0)}
        >Button</Button
      >
      <Button active={activeStrongButton === 1} onClick={() => (activeStrongButton = 1)}
        >Button</Button
      >
      <Button active={activeStrongButton === 2} onClick={() => (activeStrongButton = 2)}
        >Button</Button
      >
    </Segmented>
    <Segmented raised tag="p">
      <Button>Button</Button>
      <Button>Button</Button>
      <Button active>Active</Button>
    </Segmented>
    <Segmented tag="p">
      <Button outline>Outline</Button>
      <Button outline>Outline</Button>
      <Button outline active>Active</Button>
    </Segmented>
    <Segmented raised round tag="p">
      <Button round>Button</Button>
      <Button round>Button</Button>
      <Button round active>Active</Button>
    </Segmented>
    <Segmented round tag="p">
      <Button round outline>Outline</Button>
      <Button round outline>Outline</Button>
      <Button round outline active>Active</Button>
    </Segmented>
  </Block>

  <BlockTitle>Large Buttons</BlockTitle>
  <Block strong outlineIos>
    <p class="grid grid-cols-2 grid-gap">
      <Button large>Button</Button>
      <Button large fill>Fill</Button>
    </p>
    <p class="grid grid-cols-2 grid-gap">
      <Button large raised>Raised</Button>
      <Button large raised fill>Raised Fill</Button>
    </p>
    <p class="grid grid-cols-2 grid-gap">
      <Button large round>Round</Button>
      <Button large round fill>Round Fill</Button>
    </p>
  </Block>

  <BlockTitle>Small Buttons</BlockTitle>
  <Block strong outlineIos>
    <p class="grid grid-cols-3 grid-gap">
      <Button small>Button</Button>
      <Button small outline>Outline</Button>
      <Button small fill>Fill</Button>
    </p>
    <p class="grid grid-cols-3 grid-gap">
      <Button small round>Button</Button>
      <Button small outline round>Outline</Button>
      <Button small fill round>Fill</Button>
    </p>
  </Block>

  <BlockTitle>Preloader Buttons</BlockTitle>
  <Block strong outlineIos>
    <p class="grid grid-cols-3 grid-gap">
      <Button preloader loading={isLoading1} onClick={load1} large>Load</Button>
      <Button preloader loading={isLoading2} onClick={load2} large fill>Load</Button>
    </p>
  </Block>

  <BlockTitle>Color Buttons</BlockTitle>
  <Block strong outlineIos>
    <div class="grid grid-cols-3 grid-gap">
      <Button color="red">Red</Button>
      <Button color="green">Green</Button>
      <Button color="blue">Blue</Button>
    </div>
  </Block>

  <BlockTitle>Color Fill Buttons</BlockTitle>
  <Block strong outlineIos>
    <p class="grid grid-cols-3 grid-gap">
      <Button color="red">Red</Button>
      <Button color="green">Green</Button>
      <Button color="blue">Blue</Button>
    </p>
    <p class="grid grid-cols-3 grid-gap">
      <Button color="pink">Pink</Button>
      <Button color="yellow">Yellow</Button>
      <Button color="orange">Orange</Button>
    </p>
    <p class="grid grid-cols-3 grid-gap">
      <Button color="black">Black</Button>
      <Button color="white">White</Button>
    </p>
  </Block>

  <BlockTitle>List-Block Buttons</BlockTitle>
  <List inset strong>
    <ListButton title="List Button 1" />
    <ListButton title="List Button 2" />
    <ListButton title="List Button 3" />
  </List>
  <List inset strong>
    <ListButton title="Large Red Button" color="red" />
  </List>
</Page>
