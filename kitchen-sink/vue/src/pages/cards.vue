<template>
  <f7-page>
    <f7-navbar title="Cards" back-link="Back"></f7-navbar>

    <f7-block>
      <p>
        Cards are a great way to contain and organize your information, especially when combined
        with List Views. Cards can contain unique related data, like for example photos, text or
        links about a particular subject. Cards are typically an entry point to more complex and
        detailed information.
      </p>
    </f7-block>
    <f7-block-title>Simple Cards</f7-block-title>
    <f7-card
      content="This is a simple card with plain text, but cards can also contain their own header, footer, list view, image, or any other element."
    ></f7-card>
    <f7-card
      title="Card header"
      content="Card with header and footer. Card headers are used to display card titles and footers for additional information or just for custom actions."
      footer="Card footer"
    ></f7-card>
    <f7-card
      content="Another card. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse feugiat sem est, non tincidunt ligula volutpat sit amet. Mauris aliquet magna justo. "
    ></f7-card>

    <f7-block-title>Outline Cards</f7-block-title>
    <f7-card
      outline
      content="This is a simple card with plain text, but cards can also contain their own header, footer, list view, image, or any other element."
    ></f7-card>
    <f7-card
      outline
      title="Card header"
      content="Card with header and footer. Card headers are used to display card titles and footers for additional information or just for custom actions."
      footer="Card footer"
    ></f7-card>
    <f7-card
      outline
      content="Another card. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse feugiat sem est, non tincidunt ligula volutpat sit amet. Mauris aliquet magna justo. "
    ></f7-card>

    <f7-block-title>Outline With Dividers</f7-block-title>
    <f7-card
      outline
      header-divider
      footer-divider
      title="Card header"
      content="Card with header and footer. Card headers are used to display card titles and footers for additional information or just for custom actions."
      footer="Card footer"
    ></f7-card>

    <f7-block-title>Raised Cards</f7-block-title>
    <f7-card
      raised
      content="This is a simple card with plain text, but cards can also contain their own header, footer, list view, image, or any other element."
    ></f7-card>
    <f7-card
      raised
      title="Card header"
      content="Card with header and footer. Card headers are used to display card titles and footers for additional information or just for custom actions."
      footer="Card footer"
    ></f7-card>
    <f7-card
      raised
      content="Another card. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse feugiat sem est, non tincidunt ligula volutpat sit amet. Mauris aliquet magna justo. "
    ></f7-card>

    <f7-block-title>Styled Cards</f7-block-title>
    <f7-card outline-md class="demo-card-header-pic">
      <f7-card-header
        valign="bottom"
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-1000x600-3.jpg)"
        >Journey To Mountains</f7-card-header
      >
      <f7-card-content>
        <p class="date">Posted on January 21, 2015</p>
        <p>
          Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non
          felis. Phasellus quis nibh hendrerit...
        </p>
      </f7-card-content>
      <f7-card-footer>
        <f7-link>Like</f7-link>
        <f7-link>Read more</f7-link>
      </f7-card-footer>
    </f7-card>
    <f7-card class="demo-card-header-pic">
      <f7-card-header
        valign="bottom"
        style="background-image: url(https://cdn.framework7.io/placeholder/people-1000x600-6.jpg)"
        >Journey To Mountains</f7-card-header
      >
      <f7-card-content>
        <p class="date">Posted on January 21, 2015</p>
        <p>
          Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non
          felis. Phasellus quis nibh hendrerit...
        </p>
      </f7-card-content>
      <f7-card-footer>
        <f7-link>Like</f7-link>
        <f7-link>Read more</f7-link>
      </f7-card-footer>
    </f7-card>

    <f7-block-title>Cards With List View</f7-block-title>
    <f7-card>
      <f7-card-content :padding="false">
        <f7-list>
          <f7-list-item link="#">Link 1</f7-list-item>
          <f7-list-item link="#">Link 2</f7-list-item>
          <f7-list-item link="#">Link 3</f7-list-item>
          <f7-list-item link="#">Link 4</f7-list-item>
          <f7-list-item link="#">Link 5</f7-list-item>
        </f7-list>
      </f7-card-content>
    </f7-card>
    <f7-card title="New Releases:">
      <f7-card-content :padding="false">
        <f7-list medial-list>
          <f7-list-item title="Yellow Submarine" subtitle="Beatles">
            <template #media>
              <img src="https://cdn.framework7.io/placeholder/fashion-88x88-4.jpg" width="44" />
            </template>
          </f7-list-item>
          <f7-list-item title="Don't Stop Me Now" subtitle="Queen">
            <template #media>
              <img src="https://cdn.framework7.io/placeholder/fashion-88x88-5.jpg" width="44" />
            </template>
          </f7-list-item>
          <f7-list-item title="Billie Jean" subtitle="Michael Jackson">
            <template #media>
              <img src="https://cdn.framework7.io/placeholder/fashion-88x88-6.jpg" width="44" />
            </template>
          </f7-list-item>
        </f7-list>
      </f7-card-content>
      <f7-card-footer>
        <span>January 20, 2015</span>
        <span>5 comments</span>
      </f7-card-footer>
    </f7-card>
  </f7-page>
</template>
<script>
import {
  f7Navbar,
  f7Page,
  f7Block,
  f7BlockTitle,
  f7Card,
  f7CardHeader,
  f7CardContent,
  f7CardFooter,
  f7List,
  f7ListItem,
  f7Link,
} from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
    f7Block,
    f7BlockTitle,
    f7Card,
    f7CardHeader,
    f7CardContent,
    f7CardFooter,
    f7List,
    f7ListItem,
    f7Link,
  },
};
</script>
