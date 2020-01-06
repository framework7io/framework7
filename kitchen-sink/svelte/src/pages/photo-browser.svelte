<Page>
  <Navbar title="Photo Browser" backLink="Back"></Navbar>
  <Block strong>
    <p>Photo Browser is a standalone and highly configurable component that allows to open window with photo viewer and navigation elements with the following features:</p>
    <ul>
      <li>Swiper between photos</li>
      <li>Multi-gestures support for zooming</li>
      <li>Toggle zoom by double tap on photo</li>
      <li>Single click on photo to toggle Exposition mode</li>
    </ul>
  </Block>
  <Block strong>
    <p>Photo Browser could be opened in a three ways - as a Standalone component (Popup modification), in Popup, and as separate Page:</p>
    <Row>
      <Col>
        <PhotoBrowser photos={photos} bind:this={ standalone } />
        <Button fill on:click={() => standalone.open()}>Standalone</Button>
      </Col>
      <Col>
        <PhotoBrowser photos={photos} type="popup" bind:this={ popup } />
        <Button fill on:click={() => popup.open()}>Popup</Button>
      </Col>
      <Col>
        <PhotoBrowser photos={photos} type="page" pageBackLinkText="Back" bind:this={ page } />
        <Button fill on:click={() => page.open()}>Page</Button>
      </Col>
    </Row>
  </Block>
  <Block strong>
    <p>Photo Browser suppots 2 default themes - default Light (like in previous examples) and Dark theme. Here is a Dark theme examples:</p>
    <Row>
      <Col>
        <PhotoBrowser photos={photos} theme="dark" bind:this={ standaloneDark } />
        <Button fill on:click={() => standaloneDark.open()}>Standalone</Button>
      </Col>
      <Col>
        <PhotoBrowser photos={photos} theme="dark" type="popup" bind:this={ popupDark } />
        <Button fill on:click={() => popupDark.open()}>Popup</Button>
      </Col>
      <Col>
        <PhotoBrowser photos={photos} theme="dark" type="page" pageBackLinkText="Back" bind:this={ pageDark } />
        <Button fill on:click={() => pageDark.open()}>Page</Button>
      </Col>
    </Row>
  </Block>
</Page>
<script>
  import { Navbar, Page, PhotoBrowser, Block, Row, Col, Button } from 'framework7-svelte';

  let standalone;
  let popup;
  let page;

  let standaloneDark;
  let popupDark;
  let pageDark;

  let photos = [
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
</script>
