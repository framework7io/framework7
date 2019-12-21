<Page class="grid-demo">
  <Navbar title="Grid / Layout" backLink="Back" />

  <Block>
    <p>Columns within a row are automatically set to have equal width. Otherwise you can define your column with pourcentage of screen you want.</p>
  </Block>
  <BlockTitle>Columns with gap</BlockTitle>
  <Block>
    <Row>
      <Col>50% (.col)</Col>
      <Col>50% (.col)</Col>
    </Row>
    <Row>
      <Col>25% (.col)</Col>
      <Col>25% (.col)</Col>
      <Col>25% (.col)</Col>
      <Col>25% (.col)</Col>
    </Row>
    <Row>
      <Col>33% (.col)</Col>
      <Col>33% (.col)</Col>
      <Col>33% (.col)</Col>
    </Row>
    <Row>
      <Col>20% (.col)</Col>
      <Col>20% (.col)</Col>
      <Col>20% (.col)</Col>
      <Col>20% (.col)</Col>
      <Col>20% (.col)</Col>
    </Row>
    <Row>
      <Col width="33">33% (.col-33)</Col>
      <Col width="66">66% (.col-66)</Col>
    </Row>
    <Row>
      <Col width="25">25% (.col-25)</Col>
      <Col width="25">25% (.col-25)</Col>
      <Col width="50">50% (.col-50)</Col>
    </Row>
    <Row>
      <Col width="75">75% (.col-75)</Col>
      <Col width="25">25% (.col-25)</Col>
    </Row>
    <Row>
      <Col width="80">80% (.col-80)</Col>
      <Col width="20">20% (.col-20)</Col>
    </Row>
  </Block>
  <BlockTitle>No gap between columns</BlockTitle>
  <Block>
    <Row noGap>
      <Col>50% (.col)</Col>
      <Col>50% (.col)</Col>
    </Row>
    <Row noGap>
      <Col>25% (.col)</Col>
      <Col>25% (.col)</Col>
      <Col>25% (.col)</Col>
      <Col>25% (.col)</Col>
    </Row>
    <Row noGap>
      <Col>33% (.col)</Col>
      <Col>33% (.col)</Col>
      <Col>33% (.col)</Col>
    </Row>
    <Row noGap>
      <Col>20% (.col)</Col>
      <Col>20% (.col)</Col>
      <Col>20% (.col)</Col>
      <Col>20% (.col)</Col>
      <Col>20% (.col)</Col>
    </Row>
    <Row noGap>
      <Col width="33">33% (.col-33)</Col>
      <Col width="66">66% (.col-66)</Col>
    </Row>
    <Row noGap>
      <Col width="25">25% (.col-25)</Col>
      <Col width="25">25% (.col-25)</Col>
      <Col width="50">50% (.col-50)</Col>
    </Row>
    <Row noGap>
      <Col width="75">75% (.col-75)</Col>
      <Col width="25">25% (.col-25)</Col>
    </Row>
    <Row noGap>
      <Col width="80">80% (.col-80)</Col>
      <Col width="20">20% (.col-20)</Col>
    </Row>
  </Block>

  <BlockTitle>Nested</BlockTitle>
  <Block>
    <Row>
      <Col>50% (.col)
        <Row>
          <Col>50% (.col)</Col>
          <Col>50% (.col)</Col>
        </Row>
      </Col>
      <Col>50% (.col)
        <Row>
          <Col width="33">33% (.col-33)</Col>
          <Col width="66">66% (.col-66)</Col>
        </Row>
      </Col>
    </Row>
  </Block>

  <BlockTitle>Responsive Grid</BlockTitle>
  <Block>
    <p>Grid cells have different size on Phone/Tablet</p>
    <Row>
      <Col width="100" medium="50">.col-100.medium-50</Col>
      <Col width="100" medium="50">.col-100.medium-50</Col>
    </Row>
    <Row>
      <Col width="50" medium="25">.col-50.medium-25</Col>
      <Col width="50" medium="25">.col-50.medium-25</Col>
      <Col width="50" medium="25">.col-50.medium-25</Col>
      <Col width="50" medium="25">.col-50.medium-25</Col>
    </Row>
    <Row>
      <Col width="100" medium="40">.col-100.medium-40</Col>
      <Col width="50" medium="60">.col-50.medium-60</Col>
      <Col width="50" medium="66">.col-50.medium-66</Col>
      <Col width="100" medium="33">.col-100.medium-33</Col>
    </Row>
  </Block>

  <BlockTitle>Resizable Grid</BlockTitle>
  <Block class="grid-resizable-demo">
    <Row class="align-items-stretch" style="height: 300px">
      <Col resizable class="demo-col-center-content" style="min-width: 80px">Left</Col>
      <Col resizable class="display-flex flex-direction-column" style="padding: 0px; border: none; min-width: 80px; background-color: transparent">
        <Row resizable style="height: 50%; min-height: 50px">
          <Col class="demo-col-center-content" style="height: 100%">Center Top</Col>
        </Row>
        <Row resizable style="height: 50%; min-height: 50px">
          <Col class="demo-col-center-content" style="height: 100%">Center Bottom</Col>
        </Row>
      </Col>
      <Col resizable class="demo-col-center-content" style="min-width: 80px">Right</Col>
    </Row>
  </Block>
</Page>

<script>
  import { Page, Navbar, BlockTitle, Block, Row, Col, } from 'framework7-svelte';
</script>
