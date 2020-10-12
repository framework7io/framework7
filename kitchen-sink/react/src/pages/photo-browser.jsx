import React, { useRef } from 'react';
import { Navbar, Page, PhotoBrowser, Block, Row, Col, Button } from 'framework7-react';

export default () => {
  const standalone = useRef(null);
  const popup = useRef(null);
  const page = useRef(null);
  const standaloneDark = useRef(null);
  const popupDark = useRef(null);
  const pageDark = useRef(null);
  const photos = [
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
  ];
  return (
    <Page>
      <Navbar title="Photo Browser" backLink="Back"></Navbar>
      <Block strong>
        <p>
          Photo Browser is a standalone and highly configurable component that allows to open window
          with photo viewer and navigation elements with the following features:
        </p>
        <ul>
          <li>Swiper between photos</li>
          <li>Multi-gestures support for zooming</li>
          <li>Toggle zoom by double tap on photo</li>
          <li>Single click on photo to toggle Exposition mode</li>
        </ul>
      </Block>
      <Block strong>
        <p>
          Photo Browser could be opened in a three ways - as a Standalone component (Popup
          modification), in Popup, and as separate Page:
        </p>
        <Row>
          <Col>
            <PhotoBrowser photos={photos} ref={standalone} />
            <Button fill onClick={() => standalone.current.open()}>
              Standalone
            </Button>
          </Col>
          <Col>
            <PhotoBrowser photos={photos} type="popup" ref={popup} />
            <Button fill onClick={() => popup.current.open()}>
              Popup
            </Button>
          </Col>
          <Col>
            <PhotoBrowser photos={photos} type="page" pageBackLinkText="Back" ref={page} />
            <Button fill onClick={() => page.current.open()}>
              Page
            </Button>
          </Col>
        </Row>
      </Block>
      <Block strong>
        <p>
          Photo Browser supports 2 default themes - default Light (like in previous examples) and
          Dark theme. Here is a Dark theme examples:
        </p>
        <Row>
          <Col>
            <PhotoBrowser photos={photos} theme="dark" ref={standaloneDark} />
            <Button fill onClick={() => standaloneDark.current.open()}>
              Standalone
            </Button>
          </Col>
          <Col>
            <PhotoBrowser photos={photos} theme="dark" type="popup" ref={popupDark} />
            <Button fill onClick={() => popupDark.current.open()}>
              Popup
            </Button>
          </Col>
          <Col>
            <PhotoBrowser
              photos={photos}
              theme="dark"
              type="page"
              pageBackLinkText="Back"
              ref={pageDark}
            />
            <Button fill onClick={() => pageDark.current.open()}>
              Page
            </Button>
          </Col>
        </Row>
      </Block>
    </Page>
  );
};
