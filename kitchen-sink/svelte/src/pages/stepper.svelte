<Page>
  <Navbar title="Stepper" backLink="Back"></Navbar>
  <BlockTitle>Shape and size</BlockTitle>
  <Block strong class="text-align-center">
    <Row>
      <Col>
        <small class="display-block">Default</small>
        <Stepper></Stepper>
      </Col>
      <Col>
        <small class="display-block">Round</small>
        <Stepper round></Stepper>
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <small class="display-block">Fill</small>
        <Stepper fill></Stepper>
      </Col>
      <Col>
        <small class="display-block">Round Fill</small>
        <Stepper fill round></Stepper>
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <small class="display-block">Small</small>
        <Stepper small></Stepper>
      </Col>
      <Col>
        <small class="display-block">Small Round</small>
        <Stepper small round></Stepper>
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <small class="display-block">Small Fill</small>
        <Stepper small fill></Stepper>
      </Col>
      <Col>
        <small class="display-block">Small Round Fill</small>
        <Stepper small round fill></Stepper>
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <small class="display-block">Large</small>
        <Stepper large></Stepper>
      </Col>
      <Col>
        <small class="display-block">Large Round</small>
        <Stepper large round></Stepper>
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <small class="display-block">Large Fill</small>
        <Stepper large fill></Stepper>
      </Col>
      <Col>
        <small class="display-block">Large Round Fill</small>
        <Stepper large round fill></Stepper>
      </Col>
    </Row>
  </Block>

  <BlockTitle>Raised</BlockTitle>
  <Block strong class="text-align-center">
    <Row>
      <Col>
        <small class="display-block">Default</small>
        <Stepper raised></Stepper>
      </Col>
      <Col>
        <small class="display-block">Round</small>
        <Stepper raised round></Stepper>
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <small class="display-block">Fill</small>
        <Stepper raised fill></Stepper>
      </Col>
      <Col>
        <small class="display-block">Round Fill</small>
        <Stepper raised fill round></Stepper>
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <small class="display-block">Small</small>
        <Stepper raised small></Stepper>
      </Col>
      <Col>
        <small class="display-block">Small Round</small>
        <Stepper raised small round></Stepper>
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <small class="display-block">Small Fill</small>
        <Stepper raised small fill></Stepper>
      </Col>
      <Col>
        <small class="display-block">Small Round Fill</small>
        <Stepper raised small round fill></Stepper>
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <small class="display-block">Large</small>
        <Stepper raised large></Stepper>
      </Col>
      <Col>
        <small class="display-block">Large Round</small>
        <Stepper raised large round></Stepper>
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <small class="display-block">Large Fill</small>
        <Stepper raised large fill></Stepper>
      </Col>
      <Col>
        <small class="display-block">Large Round Fill</small>
        <Stepper raised large round fill></Stepper>
      </Col>
    </Row>
  </Block>
  <BlockTitle>Colors</BlockTitle>
  <Block strong class="text-align-center">
    <Row>
      <Col>
        <Stepper fill color="red"></Stepper>
      </Col>
      <Col>
        <Stepper fill round color="green"></Stepper>
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <Stepper fill color="blue"></Stepper>
      </Col>
      <Col>
        <Stepper fill round color="pink"></Stepper>
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <Stepper fill small color="yellow"></Stepper>
      </Col>
      <Col>
        <Stepper fill small round color="orange"></Stepper>
      </Col>
    </Row>

    <Row class="margin-top">
      <Col>
        <Stepper fill small color="gray"></Stepper>
      </Col>
      <Col>
        <Stepper fill small round color="black"></Stepper>
      </Col>
    </Row>
  </Block>
  <BlockTitle>Without input element</BlockTitle>
  <Block strong class="text-align-center">
    <Row>
      <Col>
        <Stepper input={false}></Stepper>
      </Col>
      <Col>
        <Stepper input={false} round></Stepper>
      </Col>
    </Row>
  </Block>
  <BlockTitle>Min, max, step</BlockTitle>
  <Block strong class="text-align-center">
    <Row>
      <Col>
        <Stepper fill value={100} min={0} max={1000} step={100}></Stepper>
      </Col>
      <Col>
        <Stepper fill input={false} value={5} min={0} max={10} step={0.5}></Stepper>
      </Col>
    </Row>
  </Block>

  <BlockTitle>Autorepeat (Tap & hold)</BlockTitle>
  <BlockHeader>Pressing and holding one of its buttons increments or decrements the stepper’s value repeatedly. With dynamic autorepeat, the rate of change depends on how long the user continues pressing the control.</BlockHeader>
  <Block strong class="text-align-center">
    <Row>
      <Col>
        <small class="display-block">Default</small>
        <Stepper fill value={0} min={0} max={100} step={1} autorepeat={true}></Stepper>
      </Col>
      <Col>
        <small class="display-block">Dynamic</small>
        <Stepper fill value={0} min={0} max={100} step={1} autorepeat={true} autorepeatDynamic={true}></Stepper>
      </Col>
    </Row>
  </Block>

  <BlockTitle>Wraps</BlockTitle>
  <BlockHeader>In wraps mode incrementing beyond maximum value sets value to minimum value, likewise, decrementing below minimum value sets value to maximum value</BlockHeader>
  <Block strong class="text-align-center">
    <Row>
      <Col>
        <Stepper fill value={0} min={0} max={10} step={1} autorepeat={true} wraps={true}></Stepper>
      </Col>
    </Row>
  </Block>

  <BlockTitle>Custom value element</BlockTitle>
  <List>
    <ListItem title={`Apples ${applesCount}`}>
      <span slot="after">
        <Stepper buttonsOnly={true} small raised onStepperChange={setApples}></Stepper>
      </span>
    </ListItem>
    <ListItem title={`Oranges ${orangesCount}`}>
      <span slot="after">
        <Stepper buttonsOnly={true} small raised onStepperChange={setOranges}></Stepper>
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
          onStepperChange={setMeetingTime}
        ></Stepper>
      </span>
    </ListItem>
  </List>

  <BlockTitle>Manual input</BlockTitle>
  <BlockHeader>It is possible to enter value manually from keyboard or mobile keypad. When click on input field, stepper enter into manual input mode, which allow type value from keyboar and check fractional part with defined accurancy. Click outside or enter Return key, ending manual mode.</BlockHeader>
  <Block strong class="text-align-center">
    <Row>
      <Col>
        <Stepper fill value={0} min={0} max={1000} step={1} autorepeat={true} wraps={true} manualInputMode={true} decimalPoint={2}></Stepper>
      </Col>
    </Row>
  </Block>
</Page>
<script>
  import { Page, Navbar, BlockTitle, Block, BlockHeader, Row, Col, List, ListItem, Stepper } from 'framework7-svelte';

  let applesCount = 0;
  let orangesCount = 0;
  let meetingTime = 15;

  $: meetingTimeComputed = (() => {
    const value = meetingTime;

    const hours = Math.floor(value / 60);
    const minutes = value - (hours * 60);
    const formatted = [];
    if (hours > 0) {
      formatted.push(hours + ' ' + (hours > 1 ? 'hours' : 'hour'));
    }
    if (minutes > 0) {
      formatted.push(minutes + ' minutes');
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
