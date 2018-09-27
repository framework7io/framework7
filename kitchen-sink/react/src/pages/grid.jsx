import React from 'react';
import { Navbar, Page, BlockTitle, Row, Col, Block } from 'framework7-react';

export default () => (
  <Page className="grid-demo">
    <Navbar title="Grid / Layout" backLink="Back"></Navbar>
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
        <Col width="100" tabletWidth="50">.col-100.tablet-50</Col>
        <Col width="100" tabletWidth="50">.col-100.tablet-50</Col>
      </Row>
      <Row>
        <Col width="50" tabletWidth="25">.col-50.tablet-25</Col>
        <Col width="50" tabletWidth="25">.col-50.tablet-25</Col>
        <Col width="50" tabletWidth="25">.col-50.tablet-25</Col>
        <Col width="50" tabletWidth="25">.col-50.tablet-25</Col>
      </Row>
      <Row>
        <Col width="100" tabletWidth="40">.col-100.tablet-40</Col>
        <Col width="50" tabletWidth="60">.col-50.tablet-60</Col>
        <Col width="50" tabletWidth="66">.col-50.tablet-66</Col>
        <Col width="100" tabletWidth="33">.col-100.tablet-33</Col>
      </Row>
    </Block>
  </Page>
);