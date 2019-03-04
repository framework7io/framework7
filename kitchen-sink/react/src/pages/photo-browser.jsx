import React from 'react';
import { Navbar, Page, PhotoBrowser, Block, Row, Col, Button } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [
        {
          url: 'img/beach.jpg',
          caption: 'Amazing beach in Goa, India',
        },
        'http://placekitten.com/1024/1024',
        'img/lock.jpg',
        {
          url: 'img/monkey.jpg',
          caption: 'I met this monkey in Chinese mountains',
        },
        {
          url: 'img/mountains.jpg',
          caption: 'Beautiful mountains in Zhangjiajie, China',
        },
      ],
    }
  }
  render() {
    return (
      <Page>
        <Navbar title="Photo Browser" backLink="Back"></Navbar>
        <Block>
          <p>Photo Browser is a standalone and highly configurable component that allows to open window with photo viewer and navigation elements with the following features:</p>
          <ul>
            <li>Swiper between photos</li>
            <li>Multi-gestures support for zooming</li>
            <li>Toggle zoom by double tap on photo</li>
            <li>Single click on photo to toggle Exposition mode</li>
          </ul>
        </Block>
        <Block>
          <p>Photo Browser could be opened in a three ways - as a Standalone component (Popup modification), in Popup, and as separate Page:</p>
          <Row>
            <Col>
              <PhotoBrowser photos={this.state.photos} ref={(el) => {this.standalone = el}} />
              <Button fill onClick={() => this.standalone.open()}>Standalone</Button>
            </Col>
            <Col>
              <PhotoBrowser photos={this.state.photos} type="popup" ref={(el) => {this.popup = el}} />
              <Button fill onClick={() => this.popup.open()}>Popup</Button>
            </Col>
            <Col>
              <PhotoBrowser photos={this.state.photos} type="page" backLinkText="Back" ref={(el) => {this.page = el}} />
              <Button fill onClick={() => this.page.open()}>Page</Button>
            </Col>
          </Row>
        </Block>
        <Block>
          <p>Photo Browser suppots 2 default themes - default Light (like in previous examples) and Dark theme. Here is a Dark theme examples:</p>
          <Row>
            <Col>
              <PhotoBrowser photos={this.state.photos} theme="dark" ref={(el) => {this.standaloneDark = el}} />
              <Button fill onClick={() => this.standaloneDark.open()}>Standalone</Button>
            </Col>
            <Col>
              <PhotoBrowser photos={this.state.photos} theme="dark" type="popup" ref={(el) => {this.popupDark = el}} />
              <Button fill onClick={() => this.popupDark.open()}>Popup</Button>
            </Col>
            <Col>
              <PhotoBrowser photos={this.state.photos} theme="dark" type="page" backLinkText="Back" ref={(el) => {this.pageDark = el}} />
              <Button fill onClick={() => this.pageDark.open()}>Page</Button>
            </Col>
          </Row>
        </Block>
      </Page>
    );
  }
};
