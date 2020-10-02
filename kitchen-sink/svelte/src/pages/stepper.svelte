<script>
  import {
    Page,
    Navbar,
    BlockTitle,
    Block,
    BlockHeader,
    Row,
    Col,
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
  <Block strong class="text-align-center">
    <Row>
      <Col>
        <small class="display-block">Default</small>
        <Stepper />
      </Col>
      <Col>
        <small class="display-block">Round</small>
        <Stepper round />
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <small class="display-block">Fill</small>
        <Stepper fill />
      </Col>
      <Col>
        <small class="display-block">Round Fill</small>
        <Stepper fill round />
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <small class="display-block">Small</small>
        <Stepper small />
      </Col>
      <Col>
        <small class="display-block">Small Round</small>
        <Stepper small round />
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <small class="display-block">Small Fill</small>
        <Stepper small fill />
      </Col>
      <Col>
        <small class="display-block">Small Round Fill</small>
        <Stepper small round fill />
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <small class="display-block">Large</small>
        <Stepper large />
      </Col>
      <Col>
        <small class="display-block">Large Round</small>
        <Stepper large round />
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <small class="display-block">Large Fill</small>
        <Stepper large fill />
      </Col>
      <Col>
        <small class="display-block">Large Round Fill</small>
        <Stepper large round fill />
      </Col>
    </Row>
  </Block>

  <BlockTitle>Raised</BlockTitle>
  <Block strong class="text-align-center">
    <Row>
      <Col>
        <small class="display-block">Default</small>
        <Stepper raised />
      </Col>
      <Col>
        <small class="display-block">Round</small>
        <Stepper raised round />
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <small class="display-block">Fill</small>
        <Stepper raised fill />
      </Col>
      <Col>
        <small class="display-block">Round Fill</small>
        <Stepper raised fill round />
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <small class="display-block">Small</small>
        <Stepper raised small />
      </Col>
      <Col>
        <small class="display-block">Small Round</small>
        <Stepper raised small round />
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <small class="display-block">Small Fill</small>
        <Stepper raised small fill />
      </Col>
      <Col>
        <small class="display-block">Small Round Fill</small>
        <Stepper raised small round fill />
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <small class="display-block">Large</small>
        <Stepper raised large />
      </Col>
      <Col>
        <small class="display-block">Large Round</small>
        <Stepper raised large round />
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <small class="display-block">Large Fill</small>
        <Stepper raised large fill />
      </Col>
      <Col>
        <small class="display-block">Large Round Fill</small>
        <Stepper raised large round fill />
      </Col>
    </Row>
  </Block>
  <BlockTitle>Colors</BlockTitle>
  <Block strong class="text-align-center">
    <Row>
      <Col>
        <Stepper fill color="red" />
      </Col>
      <Col>
        <Stepper fill round color="green" />
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <Stepper fill color="blue" />
      </Col>
      <Col>
        <Stepper fill round color="pink" />
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <Stepper fill small color="yellow" />
      </Col>
      <Col>
        <Stepper fill small round color="orange" />
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <Stepper fill small color="gray" />
      </Col>
      <Col>
        <Stepper fill small round color="black" />
      </Col>
    </Row>
  </Block>
  <BlockTitle>Without input element</BlockTitle>
  <Block strong class="text-align-center">
    <Row>
      <Col>
        <Stepper input={false} />
      </Col>
      <Col>
        <Stepper input={false} round />
      </Col>
    </Row>
  </Block>
  <BlockTitle>Min, max, step</BlockTitle>
  <Block strong class="text-align-center">
    <Row>
      <Col>
        <Stepper fill value={100} min={0} max={1000} step={100} />
      </Col>
      <Col>
        <Stepper fill input={false} value={5} min={0} max={10} step={0.5} />
      </Col>
    </Row>
  </Block>

  <BlockTitle>Autorepeat (Tap & hold)</BlockTitle>
  <BlockHeader>
    Pressing and holding one of its buttons increments or decrements the stepper’s value repeatedly.
    With dynamic autorepeat, the rate of change depends on how long the user continues pressing the
    control.
  </BlockHeader>
  <Block strong class="text-align-center">
    <Row>
      <Col>
        <small class="display-block">Default</small>
        <Stepper fill value={0} min={0} max={100} step={1} autorepeat={true} />
      </Col>
      <Col>
        <small class="display-block">Dynamic</small>
        <Stepper
          fill
          value={0}
          min={0}
          max={100}
          step={1}
          autorepeat={true}
          autorepeatDynamic={true} />
      </Col>
    </Row>
  </Block>

  <BlockTitle>Wraps</BlockTitle>
  <BlockHeader>
    In wraps mode incrementing beyond maximum value sets value to minimum value, likewise,
    decrementing below minimum value sets value to maximum value
  </BlockHeader>
  <Block strong class="text-align-center">
    <Row>
      <Col>
        <Stepper fill value={0} min={0} max={10} step={1} autorepeat={true} wraps={true} />
      </Col>
    </Row>
  </Block>

  <BlockTitle>Custom value element</BlockTitle>
  <List>
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
  <List>
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
          onStepperChange={setMeetingTime} />
      </span>
    </ListItem>
  </List>

  <BlockTitle>Manual input</BlockTitle>
  <BlockHeader>
    It is possible to enter value manually from keyboard or mobile keypad. When click on input
    field, stepper enter into manual input mode, which allow type value from keyboard and check
    fractional part with defined accurancy. Click outside or enter Return key, ending manual mode.
  </BlockHeader>
  <Block strong class="text-align-center">
    <Row>
      <Col>
        <Stepper
          fill
          value={0}
          min={0}
          max={1000}
          step={1}
          autorepeat={true}
          wraps={true}
          manualInputMode={true}
          decimalPoint={2} />
      </Col>
    </Row>
  </Block>
</Page>
