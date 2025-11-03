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
  <Navbar title="Photo Browser" backLink />
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
    <div class="grid grid-cols-3 grid-gap">
      <div>
        <PhotoBrowser {photos} {thumbs} bind:this={standalone} />
        <Button round fill onClick={() => standalone.open()}>Standalone</Button>
      </div>
      <div>
        <PhotoBrowser {photos} {thumbs} type="popup" bind:this={popup} />
        <Button round fill onClick={() => popup.open()}>Popup</Button>
      </div>
      <div>
        <PhotoBrowser {photos} {thumbs} type="page" pageBackLinkText="Back" bind:this={page} />
        <Button round fill onClick={() => page.open()}>Page</Button>
      </div>
    </div>
  </Block>
</Page>
