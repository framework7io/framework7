<script>
  import { Navbar, Page, PhotoBrowser, Block, Button } from 'framework7-svelte';

  let standalone;
  let popup;
  let page;

  let standaloneDark;
  let popupDark;
  let pageDark;

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

  const thumbs = [
    'img/beach.jpg',
    'http://placekitten.com/1024/1024',
    'img/lock.jpg',
    'img/monkey.jpg',
    'img/mountains.jpg',
  ];
</script>

<Page>
  <Navbar title="Photo Browser" backLink="Back" />
  <Block strongIos outlineIos>
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
  <Block strongIos outlineIos>
    <p>
      Photo Browser could be opened in a three ways - as a Standalone component (Popup
      modification), in Popup, and as separate Page:
    </p>
    <div class="grid grid-cols-3 grid-gap">
      <div>
        <PhotoBrowser {photos} {thumbs} bind:this={standalone} />
        <Button fill onClick={() => standalone.open()}>Standalone</Button>
      </div>
      <div>
        <PhotoBrowser {photos} {thumbs} type="popup" bind:this={popup} />
        <Button fill onClick={() => popup.open()}>Popup</Button>
      </div>
      <div>
        <PhotoBrowser {photos} {thumbs} type="page" pageBackLinkText="Back" bind:this={page} />
        <Button fill onClick={() => page.open()}>Page</Button>
      </div>
    </div>
  </Block>
  <Block strongIos outlineIos>
    <p>
      Photo Browser supports 2 default themes - default Light (like in previous examples) and Dark
      theme. Here is a Dark theme examples:
    </p>
    <div class="grid grid-cols-3 grid-gap">
      <div>
        <PhotoBrowser {photos} {thumbs} theme="dark" bind:this={standaloneDark} />
        <Button fill onClick={() => standaloneDark.open()}>Standalone</Button>
      </div>
      <div>
        <PhotoBrowser {photos} {thumbs} theme="dark" type="popup" bind:this={popupDark} />
        <Button fill onClick={() => popupDark.open()}>Popup</Button>
      </div>
      <div>
        <PhotoBrowser
          {photos}
          {thumbs}
          theme="dark"
          type="page"
          pageBackLinkText="Back"
          bind:this={pageDark}
        />
        <Button fill onClick={() => pageDark.open()}>Page</Button>
      </div>
    </div>
  </Block>
</Page>
