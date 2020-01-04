<!-- svelte-ignore a11y-invalid-attribute -->
<Page>
  <Navbar title="Buttons" backLink="Back" />

  <BlockTitle>Usual Buttons</BlockTitle>
  <Block strong>
    <Row>
      <Col>
        <Button>Button</Button>
      </Col>
      <Col>
        <Button>Button</Button>
      </Col>
      <Col>
        <Button round>Round</Button>
      </Col>
    </Row>
  </Block>

  <BlockTitle>Fill Buttons</BlockTitle>
  <Block strong>
    <Row>
      <Col>
        <Button fill>Button</Button>
      </Col>
      <Col>
        <Button fill>Button</Button>
      </Col>
      <Col>
        <Button fill round>Round</Button>
      </Col>
    </Row>
  </Block>

  <BlockTitle>Outline Buttons</BlockTitle>
  <Block strong>
    <Row>
      <Col>
        <Button outline>Button</Button>
      </Col>
      <Col>
        <Button outline>Button</Button>
      </Col>
      <Col>
        <Button outline round>Round</Button>
      </Col>
    </Row>
  </Block>

  <BlockTitle>Raised Buttons</BlockTitle>
  <Block strong>
    <Row tag="p">
      <Col tag="span">
        <Button raised>Button</Button>
      </Col>
      <Col tag="span">
        <Button raised fill>Fill</Button>
      </Col>
      <Col tag="span">
        <Button raised outline>Outline</Button>
      </Col>
    </Row>
    <Row tag="p">
      <Col tag="span">
        <Button raised round>Round</Button>
      </Col>
      <Col tag="span">
        <Button raised fill round>Fill</Button>
      </Col>
      <Col tag="span">
        <Button raised outline round>Outline</Button>
      </Col>
    </Row>
  </Block>

  <BlockTitle>Segmented</BlockTitle>
  <Block strong>
    <Segmented tag="p">
      <Button>Button</Button>
      <Button>Button</Button>
      <Button active>Active</Button>
    </Segmented>
    <Segmented strong tag="p">
      <Button>Button</Button>
      <Button>Button</Button>
      <Button active>Active</Button>
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
  <Block strong>
    <Row tag="p">
      <Col tag="span">
        <Button large>Button</Button>
      </Col>
      <Col tag="span">
        <Button large fill>Fill</Button>
      </Col>
    </Row>
    <Row tag="p">
      <Col tag="span">
        <Button large raised>Raised</Button>
      </Col>
      <Col tag="span">
        <Button large raised fill>Raised Fill</Button>
      </Col>
    </Row>
    <Row tag="p">
      <Col tag="span">
        <Button large round>Round</Button>
      </Col>
      <Col tag="span">
        <Button large round fill>Round Fill</Button>
      </Col>
    </Row>
  </Block>

  <BlockTitle>Small Buttons</BlockTitle>
  <Block strong>
    <Row tag="p">
      <Col tag="span">
        <Button large small>Button</Button>
      </Col>
      <Col tag="span">
        <Button large small outline>Outline</Button>
      </Col>
      <Col tag="span">
        <Button large small fill>Fill</Button>
      </Col>
    </Row>
    <Row tag="p">
      <Col tag="span">
        <Button large small round>Button</Button>
      </Col>
      <Col tag="span">
        <Button large small outline round>Outline</Button>
      </Col>
      <Col tag="span">
        <Button large small fill round>Fill</Button>
      </Col>
    </Row>
  </Block>

  <BlockTitle>Color Buttons</BlockTitle>
  <Block strong>
    <Row tag="p">
      <Col>
        <Button color="red">Red</Button>
      </Col>
      <Col>
        <Button color="green">Green</Button>
      </Col>
      <Col>
        <Button color="blue">Blue</Button>
      </Col>
    </Row>
    <Row tag="p">
      <Col>
        <Button color="pink">Pink</Button>
      </Col>
      <Col>
        <Button color="yellow">Yellow</Button>
      </Col>
      <Col>
        <Button color="orange">Orange</Button>
      </Col>
    </Row>
    <Row tag="p">
      <Col>
        <Button color="gray">Gray</Button>
      </Col>
      <Col>
        <Button color="black">Black</Button>
      </Col>
    </Row>
  </Block>

  <BlockTitle>Color Fill Buttons</BlockTitle>
  <Block strong>
    <Row tag="p">
      <Col>
        <Button fill color="red">Red</Button>
      </Col>
      <Col>
        <Button fill color="green">Green</Button>
      </Col>
      <Col>
        <Button fill color="blue">Blue</Button>
      </Col>
    </Row>
    <Row tag="p">
      <Col>
        <Button fill color="pink">Pink</Button>
      </Col>
      <Col>
        <Button fill color="yellow">Yellow</Button>
      </Col>
      <Col>
        <Button fill color="orange">Orange</Button>
      </Col>
    </Row>
    <Row tag="p">
      <Col>
        <Button fill color="gray">Gray</Button>
      </Col>
      <Col>
        <Button fill color="black">Black</Button>
      </Col>
    </Row>
  </Block>

  <BlockTitle>List-Block Buttons</BlockTitle>
  <div class="list inset">
    <ul>
      <li><a href="#" class="list-button">List Button 1</a></li>
      <li><a href="#" class="list-button">List Button 2</a></li>
      <li><a href="#" class="list-button">List Button 2</a></li>
    </ul>
  </div>
  <div class="list inset">
    <ul>
      <li><a href="#" class="list-button color-red">Large Red Button</a></li>
    </ul>
  </div>
</Page>

<script>
  import { Page, Navbar, BlockTitle, Block, Row, Col, Segmented, Button, } from 'framework7-svelte';
</script>
