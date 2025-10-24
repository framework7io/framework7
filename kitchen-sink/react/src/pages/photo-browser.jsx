import React, { useRef } from 'react';
import { Navbar, Page, PhotoBrowser, Block, Button } from 'framework7-react';

export default () => {
  const standalone = useRef(null);
  const popup = useRef(null);
  const page = useRef(null);

  const photos = [
    { url: 'img/beach.jpg', caption: 'Amazing beach in Goa, India' },
    'http://placekitten.com/1024/1024',
    'img/lock.jpg',
    { url: 'img/monkey.jpg', caption: 'I met this monkey in Chinese mountains' },
    { url: 'img/mountains.jpg', caption: 'Beautiful mountains in Zhangjiajie, China' },
  ];
  const thumbs = [
    'img/beach.jpg',
    'http://placekitten.com/1024/1024',
    'img/lock.jpg',
    'img/monkey.jpg',
    'img/mountains.jpg',
  ];
  return (
    <Page>
      <Navbar title="Photo Browser" backLink></Navbar>
      <Block strong inset>
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
      <Block strong inset>
        <p>
          Photo Browser could be opened in a three ways - as a Standalone component (Popup
          modification), in Popup, and as separate Page:
        </p>
        <div className="grid grid-cols-3 grid-gap">
          <div>
            <PhotoBrowser photos={photos} thumbs={thumbs} ref={standalone} />
            <Button round fill onClick={() => standalone.current.open()}>
              Standalone
            </Button>
          </div>
          <div>
            <PhotoBrowser photos={photos} thumbs={thumbs} type="popup" ref={popup} />
            <Button round fill onClick={() => popup.current.open()}>
              Popup
            </Button>
          </div>
          <div>
            <PhotoBrowser photos={photos} thumbs={thumbs} type="page" ref={page} />
            <Button round fill onClick={() => page.current.open()}>
              Page
            </Button>
          </div>
        </div>
      </Block>
    </Page>
  );
};
