<script>
  import {
    Page,
    Navbar,
    BlockTitle,
    Block,
    BlockHeader,
    List,
    ListItem,
    Stepper,
  } from 'framework7-svelte';

  let applesCount = 0;
  let orangesCount = 0;
  let meetingTime = 15;

  $: meetingTimeComputed = (() => {
    const value = meetingTime;

    const hours = Math.floor(value / 60);
    const minutes = value - hours * 60;
    const formatted = [];
    if (hours > 0) {
      formatted.push(`${hours} ${hours > 1 ? 'hours' : 'hour'}`);
    }
    if (minutes > 0) {
      formatted.push(`${minutes} minutes`);
    }
    return formatted.join(' ');
  })();

  function setApples(value) {
    applesCount = value;
  }
  function setOranges(value) {
    orangesCount = value;
  }
  function setMeetingTime(value) {
    meetingTime = value;
  }
</script>

<Page>
  <Navbar title="Stepper" backLink="Back" />
  <BlockTitle>Shape and size</BlockTitle>
  <Block strong outlineIos class="text-align-center">
    <div class="grid grid-cols-2 grid-gap">
      <div>
        <small class="display-block">Default</small>
        <Stepper />
      </div>
      <div>
        <small class="display-block">Round</small>
        <Stepper round />
      </div>
    </div>

    <div class="grid grid-cols-2 grid-gap margin-top">
      <div>
        <small class="display-block">Fill</small>
        <Stepper fill />
      </div>
      <div>
        <small class="display-block">Round Fill</small>
        <Stepper fill round />
      </div>
    </div>

    <div class="grid grid-cols-2 grid-gap margin-top">
      <div>
        <small class="display-block">Small</small>
        <Stepper small />
      </div>
      <div>
        <small class="display-block">Small Round</small>
        <Stepper small round />
      </div>
    </div>

    <div class="grid grid-cols-2 grid-gap margin-top">
      <div>
        <small class="display-block">Small Fill</small>
        <Stepper small fill />
      </div>
      <div>
        <small class="display-block">Small Round Fill</small>
        <Stepper small round fill />
      </div>
    </div>

    <div class="grid grid-cols-2 grid-gap margin-top">
      <div>
        <small class="display-block">Large</small>
        <Stepper large />
      </div>
      <div>
        <small class="display-block">Large Round</small>
        <Stepper large round />
      </div>
    </div>

    <div class="grid grid-cols-2 grid-gap margin-top">
      <div>
        <small class="display-block">Large Fill</small>
        <Stepper large fill />
      </div>
      <div>
        <small class="display-block">Large Round Fill</small>
        <Stepper large round fill />
      </div>
    </div>
  </Block>

  <BlockTitle>Raised</BlockTitle>
  <Block strong outlineIos class="text-align-center">
    <div class="grid grid-cols-2 grid-gap">
      <div>
        <small class="display-block">Default</small>
        <Stepper raised />
      </div>
      <div>
        <small class="display-block">Round</small>
        <Stepper raised round />
      </div>
    </div>

    <div class="grid grid-cols-2 grid-gap margin-top">
      <div>
        <small class="display-block">Fill</small>
        <Stepper raised fill />
      </div>
      <div>
        <small class="display-block">Round Fill</small>
        <Stepper raised fill round />
      </div>
    </div>

    <div class="grid grid-cols-2 grid-gap margin-top">
      <div>
        <small class="display-block">Small</small>
        <Stepper raised small />
      </div>
      <div>
        <small class="display-block">Small Round</small>
        <Stepper raised small round />
      </div>
    </div>

    <div class="grid grid-cols-2 grid-gap margin-top">
      <div>
        <small class="display-block">Small Fill</small>
        <Stepper raised small fill />
      </div>
      <div>
        <small class="display-block">Small Round Fill</small>
        <Stepper raised small round fill />
      </div>
    </div>

    <div class="grid grid-cols-2 grid-gap margin-top">
      <div>
        <small class="display-block">Large</small>
        <Stepper raised large />
      </div>
      <div>
        <small class="display-block">Large Round</small>
        <Stepper raised large round />
      </div>
    </div>

    <div class="grid grid-cols-2 grid-gap margin-top">
      <div>
        <small class="display-block">Large Fill</small>
        <Stepper raised large fill />
      </div>
      <div>
        <small class="display-block">Large Round Fill</small>
        <Stepper raised large round fill />
      </div>
    </div>
  </Block>
  <BlockTitle>Colors</BlockTitle>
  <Block strong outlineIos class="text-align-center">
    <div class="grid grid-cols-2 grid-gap">
      <div>
        <Stepper fill color="red" />
      </div>
      <div>
        <Stepper fill round color="green" />
      </div>
    </div>

    <div class="grid grid-cols-2 grid-gap margin-top">
      <div>
        <Stepper fill color="blue" />
      </div>
      <div>
        <Stepper fill round color="pink" />
      </div>
    </div>

    <div class="grid grid-cols-2 grid-gap margin-top">
      <div>
        <Stepper fill small color="yellow" />
      </div>
      <div>
        <Stepper fill small round color="orange" />
      </div>
    </div>

    <div class="grid grid-cols-2 grid-gap margin-top">
      <div>
        <Stepper fill small color="gray" />
      </div>
      <div>
        <Stepper fill small round color="black" />
      </div>
    </div>
  </Block>
  <BlockTitle>Without input element</BlockTitle>
  <Block strong outlineIos class="text-align-center">
    <div class="grid grid-cols-2 grid-gap">
      <div>
        <Stepper input={false} />
      </div>
      <div>
        <Stepper input={false} round />
      </div>
    </div>
  </Block>
  <BlockTitle>Min, max, step</BlockTitle>
  <Block strong outlineIos class="text-align-center">
    <div class="grid grid-cols-2 grid-gap">
      <div>
        <Stepper fill value={100} min={0} max={1000} step={100} />
      </div>
      <div>
        <Stepper fill input={false} value={5} min={0} max={10} step={0.5} />
      </div>
    </div>
  </Block>

  <BlockTitle>Autorepeat (Tap & hold)</BlockTitle>
  <BlockHeader>
    Pressing and holding one of its buttons increments or decrements the stepper’s value repeatedly.
    With dynamic autorepeat, the rate of change depends on how long the user continues pressing the
    control.
  </BlockHeader>
  <Block strong outlineIos class="text-align-center">
    <div class="grid grid-cols-2 grid-gap">
      <div>
        <small class="display-block">Default</small>
        <Stepper fill value={0} min={0} max={100} step={1} autorepeat={true} />
      </div>
      <div>
        <small class="display-block">Dynamic</small>
        <Stepper
          fill
          value={0}
          min={0}
          max={100}
          step={1}
          autorepeat={true}
          autorepeatDynamic={true}
        />
      </div>
    </div>
  </Block>

  <BlockTitle>Wraps</BlockTitle>
  <BlockHeader>
    In wraps mode incrementing beyond maximum value sets value to minimum value, likewise,
    decrementing below minimum value sets value to maximum value
  </BlockHeader>
  <Block strong outlineIos class="text-align-center">
    <Stepper fill value={0} min={0} max={10} step={1} autorepeat={true} wraps={true} />
  </Block>

  <BlockTitle>Custom value element</BlockTitle>
  <List strongIos outlineIos dividersIos>
    <ListItem title={`Apples ${applesCount}`}>
      <span slot="after">
        <Stepper buttonsOnly={true} small raised onStepperChange={setApples} />
      </span>
    </ListItem>
    <ListItem title={`Oranges ${orangesCount}`}>
      <span slot="after">
        <Stepper buttonsOnly={true} small raised onStepperChange={setOranges} />
      </span>
    </ListItem>
  </List>

  <BlockTitle>Custom value format</BlockTitle>
  <List strongIos outlineIos dividersIos>
    <ListItem header="Meeting starts in" title={meetingTimeComputed}>
      <span slot="after">
        <Stepper
          min={15}
          max={240}
          step={15}
          value={meetingTime}
          buttonsOnly={true}
          small
          fill
          raised
          onStepperChange={setMeetingTime}
        />
      </span>
    </ListItem>
  </List>

  <BlockTitle>Manual input</BlockTitle>
  <BlockHeader>
    It is possible to enter value manually from keyboard or mobile keypad. When click on input
    field, stepper enter into manual input mode, which allow type value from keyboard and check
    fractional part with defined accurancy. Click outside or enter Return key, ending manual mode.
  </BlockHeader>
  <Block strong outlineIos class="text-align-center">
    <Stepper
      fill
      value={0}
      min={0}
      max={1000}
      step={1}
      autorepeat={true}
      wraps={true}
      manualInputMode={true}
      decimalPoint={2}
    />
  </Block>
</Page>
