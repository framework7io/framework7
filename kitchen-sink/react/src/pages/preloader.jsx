import React from 'react';
import { Navbar, Page, BlockTitle, Block, Preloader, Col } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Page>
        <Navbar title="Preloader" backLink="Back"></Navbar>
        <Block>
          <p>How about an activity indicator? Framework 7 has a nice one. The F7 Preloader is made with SVG and animated with CSS so it can be easily resized.</p>
        </Block>

        <BlockTitle>Default</BlockTitle>
        <Block className="row demo-preloaders align-items-stretch text-align-center">
          <Col>
            <Preloader></Preloader>
          </Col>
          <Col style={{background: '#000'}}>
            <Preloader color="white"></Preloader>
          </Col>
          <Col>
            <Preloader size={42}></Preloader>
          </Col>
          <Col style={{background: '#000'}}>
            <Preloader size={42} color="white"></Preloader>
          </Col>
        </Block>

        <BlockTitle>Color Preloaders</BlockTitle>
        <Block className="row text-align-center">
          <Col>
            <Preloader color="red"></Preloader>
          </Col>
          <Col>
            <Preloader color="green"></Preloader>
          </Col>
          <Col>
            <Preloader color="orange"></Preloader>
          </Col>
          <Col>
            <Preloader color="blue"></Preloader>
          </Col>
        </Block>

        <BlockTitle>Multi-color (MD-theme only)</BlockTitle>
        <Block className="text-align-center">
          <Preloader color="multi"></Preloader>
        </Block>

        <BlockTitle>Preloader Modals</BlockTitle>
        <Block>
          <p>With <b>app.preloader.show()</b> you can show small overlay with preloader indicator.</p>
          <p>
            <a className="button button-fill" onClick={this.openIndicator.bind(this)}>Open Small Indicator</a>
          </p>
          <p>With <b>app.dialog.preloader()</b> you can show dialog modal with preloader indicator.</p>
          <p>
            <a className="button button-fill" onClick={this.openDialog.bind(this)}>Open Dialog Preloader</a>
          </p>
          <p>With <b>app.dialog.preloader('My text...')</b> you can show dialog preloader modal with custom title.</p>
          <p>
            <a className="button button-fill" onClick={this.openCustomDialog.bind(this)}>Open Dialog Preloader</a>
          </p>
        </Block>
      </Page>
    );
  }

  openIndicator() {
    const self = this;
    self.$f7.preloader.show();
    setTimeout(() => {
      self.$f7.preloader.hide();
    }, 2000);
  }
  openDialog() {
    const self = this;
    self.$f7.dialog.preloader();
    setTimeout(() => {
      self.$f7.dialog.close();
    }, 2000);
  }
  openCustomDialog() {
    const self = this;
    self.$f7.dialog.preloader('My text...');
    setTimeout(() => {
      self.$f7.dialog.close();
    }, 2000);
  }
};
