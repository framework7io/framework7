<script>
  import { Navbar, Page, BlockTitle, Range, List, ListItem, Icon, Block } from 'framework7-svelte';

  let priceMin = 200;
  let priceMax = 400;

  function onPriceChange(values) {
    priceMin = values[0];
    priceMax = values[1];
  }
</script>

<Page>
  <Navbar title="Range Slider" backLink="Back" />

  <BlockTitle>Volume</BlockTitle>
  <List simpleList strongIos outlineIos>
    <ListItem>
      <div>
        <Icon ios="f7:speaker_fill" md="material:volume_mute" />
      </div>
      <div style="width: 100%; margin: 0 16px">
        <Range min={0} max={100} step={1} value={10} />
      </div>
      <div>
        <Icon ios="f7:speaker_3_fill" md="material:volume_up" />
      </div>
    </ListItem>
  </List>

  <BlockTitle>Brightness</BlockTitle>
  <List simpleList strongIos outlineIos>
    <ListItem>
      <div>
        <Icon ios="f7:sun_min" md="material:brightness_low" />
      </div>
      <div style="width: 100%; margin: 0 16px">
        <Range min={0} max={100} step={1} value={50} label={true} color="orange" />
      </div>
      <div>
        <Icon ios="f7:sun_max_fill" md="material:brightness_high" />
      </div>
    </ListItem>
  </List>

  <BlockTitle class="display-flex justify-content-space-between">
    Price Filter
    <span>${priceMin} - ${priceMax}</span>
  </BlockTitle>
  <List simpleList strongIos outlineIos>
    <ListItem>
      <div>
        <Icon ios="f7:money_dollar_circle" md="material:attach_money" />
      </div>
      <div style="width: 100%; margin: 0 16px">
        <Range
          min={0}
          max={500}
          step={1}
          value={[priceMin, priceMax]}
          label={true}
          dual={true}
          color="green"
          onRangeChange={onPriceChange}
        />
      </div>
      <div>
        <Icon ios="f7:money_dollar_circle_fill" md="material:monetization_on" />
      </div>
    </ListItem>
  </List>

  <BlockTitle>With Scale</BlockTitle>
  <Block strongIos outlineIos>
    <Range
      min={0}
      max={100}
      label={true}
      step={5}
      value={25}
      scale={true}
      scaleSteps={5}
      scaleSubSteps={4}
    />
  </Block>

  <BlockTitle>Vertical</BlockTitle>
  <Block strongIos outlineIos class="display-flex justify-content-center">
    <Range
      class="margin-right"
      style="height: 160px"
      vertical={true}
      min={0}
      max={100}
      label={true}
      step={1}
      value={25}
    />
    <Range
      class="margin-horizontal"
      style="height: 160px"
      vertical={true}
      min={0}
      max={100}
      label={true}
      step={1}
      value={50}
    />
    <Range
      class="margin-horizontal"
      style="height: 160px"
      vertical={true}
      min={0}
      max={100}
      label={true}
      step={1}
      value={75}
    />
    <Range
      class="margin-left"
      style="height: 160px"
      dual={true}
      vertical={true}
      min={0}
      max={100}
      label={true}
      step={1}
      value={[25, 75]}
    />
  </Block>

  <BlockTitle>Vertical Reversed</BlockTitle>
  <Block strongIos outlineIos class="display-flex justify-content-center">
    <Range
      class="margin-right"
      color="red"
      style="height: 160px"
      vertical={true}
      verticalReversed={true}
      min={0}
      max={100}
      label={true}
      step={1}
      value={25}
    />
    <Range
      class="margin-horizontal"
      color="red"
      style="height: 160px"
      vertical={true}
      verticalReversed={true}
      min={0}
      max={100}
      label={true}
      step={1}
      value={50}
    />
    <Range
      class="margin-horizontal"
      color="red"
      style="height: 160px"
      vertical={true}
      verticalReversed={true}
      min={0}
      max={100}
      label={true}
      step={1}
      value={75}
    />
    <Range
      class="margin-left"
      color="red"
      style="height: 160px"
      dual={true}
      vertical={true}
      verticalReversed={true}
      min={0}
      max={100}
      label={true}
      step={1}
      value={[25, 75]}
    />
  </Block>
</Page>
