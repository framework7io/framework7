<template>
  <f7-page>
    <f7-navbar title="List View" back-link="Back"></f7-navbar>
    <f7-block>
      <p>Framework7 allows you to be flexible with list views (table views). You can make them as navigation menus, you can use there icons, inputs, and any elements inside of the list, and even make them nested:</p>
    </f7-block>
    <f7-block-title>Simple List</f7-block-title>
    <f7-list simple-list>
      <f7-list-item title="Item 1"></f7-list-item>
      <f7-list-item title="Item 2"></f7-list-item>
      <f7-list-item title="Item 3"></f7-list-item>
    </f7-list>
    <f7-block-title>Simple Links List</f7-block-title>
    <f7-list>
      <f7-list-item title="Link 1" link="#"></f7-list-item>
      <f7-list-item title="Link 2" link="#"></f7-list-item>
      <f7-list-item title="Link 3" link="#"></f7-list-item>
    </f7-list>
    <f7-block-title>Data list, with icons</f7-block-title>
    <f7-list>
      <f7-list-item title="Ivan Petrov" after="CEO">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item title="John Doe" badge="5">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item title="Jenna Smith">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
    </f7-list>
    <f7-block-title>Links</f7-block-title>
    <f7-list>
      <f7-list-item link="#" title="Ivan Petrov" after="CEO">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="#" title="John Doe" after="Cleaner">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="#" title="Jenna Smith">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
    </f7-list>
    <f7-block-title>Links, Header, Footer</f7-block-title>
    <f7-list>
      <f7-list-item link="#" header="Name" title="John Doe" after="Edit">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="#" header="Phone" title="+7 90 111-22-3344" after="Edit">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="#" header="Email" title="john@doe" footer="Home" after="Edit">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="#" header="Email" title="john@framework7" footer="Work" after="Edit">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
    </f7-list>
    <f7-block-title>Links, no icons</f7-block-title>
    <f7-list>
      <f7-list-item link="#" title="Ivan Petrov"></f7-list-item>
      <f7-list-item link="#" title="John Doe"></f7-list-item>
      <f7-list-item divider title="Divider Here"></f7-list-item>
      <f7-list-item link="#" title="Ivan Petrov"></f7-list-item>
      <f7-list-item link="#" title="Jenna Smith"></f7-list-item>
    </f7-list>
    <f7-block-title>Grouped with sticky titles</f7-block-title>
    <f7-list>
      <f7-list-group>
        <f7-list-item title="A" group-title></f7-list-item>
        <f7-list-item title="Aaron "></f7-list-item>
        <f7-list-item title="Abbie"></f7-list-item>
        <f7-list-item title="Adam"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="B" group-title></f7-list-item>
        <f7-list-item title="Bailey"></f7-list-item>
        <f7-list-item title="Barclay"></f7-list-item>
        <f7-list-item title="Bartolo"></f7-list-item>
      </f7-list-group>
      <f7-list-group>
        <f7-list-item title="C" group-title></f7-list-item>
        <f7-list-item title="Caiden"></f7-list-item>
        <f7-list-item title="Calvin"></f7-list-item>
        <f7-list-item title="Candy"></f7-list-item>
      </f7-list-group>
    </f7-list>
    <f7-block-title>Mixed and nested</f7-block-title>
    <f7-list>
      <f7-list-item link="#" title="Ivan Petrov" after="CEO">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="#" title="Two icons here">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item title="No icons here"></f7-list-item>
      <li>
        <ul>
          <f7-list-item link="#" title="Ivan Petrov" after="CEO">
            <f7-icon slot="media" icon="icon-f7"></f7-icon>
          </f7-list-item>
          <f7-list-item link="#" title="Two icons here">
            <f7-icon slot="media" icon="icon-f7"></f7-icon>
            <f7-icon slot="media" icon="icon-f7"></f7-icon>
          </f7-list-item>
          <f7-list-item title="No icons here"></f7-list-item>
          <f7-list-item link="#" title="Ultra long text goes here, no, it is really really long">
            <f7-icon slot="media" icon="icon-f7"></f7-icon>
          </f7-list-item>
          <f7-list-item title="With toggle">
            <f7-icon slot="media" icon="icon-f7"></f7-icon>
            <f7-toggle slot="after"></f7-toggle>
          </f7-list-item>
        </ul>
      </li>
      <f7-list-item link="#" title="Ultra long text goes here, no, it is really really long">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item title="With toggle">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
        <f7-toggle slot="after"></f7-toggle>
      </f7-list-item>
    </f7-list>
    <f7-block-title>Mixed, inset</f7-block-title>
    <f7-list>
      <f7-list-item link="#" title="Ivan Petrov" after="CEO">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="#" title="Two icons here">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="#" title="Ultra long text goes here, no, it is really really long">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item title="With toggle">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
        <f7-toggle slot="after"></f7-toggle>
      </f7-list-item>
      <f7-block-footer>
        <p>Here comes some useful information about list above</p>
      </f7-block-footer>
    </f7-list>
    <f7-block-title>Tablet inset</f7-block-title>
    <f7-list tablet-inset>
      <f7-list-item link="#" title="Ivan Petrov" after="CEO">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="#" title="Two icons here">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-list-item link="#" title="Ultra long text goes here, no, it is really really long">
        <f7-icon slot="media" icon="icon-f7"></f7-icon>
      </f7-list-item>
      <f7-block-footer>
        <p>This list block will look like "inset" only on tablets (iPad)</p>
      </f7-block-footer>
    </f7-list>

    <f7-block-title>Media Lists</f7-block-title>
    <f7-block>
      <p>Media Lists are almost the same as Data Lists, but with a more flexible layout for visualization of more complex data, like products, services, userc, etc.</p>
    </f7-block>
    <f7-block-title>Songs</f7-block-title>
    <f7-list media-list>
      <f7-list-item
        link="#"
        title="Yellow Submarine"
        after="$15"
        subtitle="Beatles"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      >
        <img slot="media" src="https://cdn.framework7.io/placeholder/people-160x160-1.jpg" width="80" />
      </f7-list-item>
      <f7-list-item
        link="#"
        title="Don't Stop Me Now"
        after="$22"
        subtitle="Queen"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      >
        <img slot="media" src="https://cdn.framework7.io/placeholder/people-160x160-2.jpg" width="80" />
      </f7-list-item>
      <f7-list-item
        link="#"
        title="Billie Jean"
        after="$16"
        subtitle="Michael Jackson"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      >
        <img slot="media" src="https://cdn.framework7.io/placeholder/people-160x160-3.jpg" width="80" />
      </f7-list-item>
    </f7-list>
    <f7-block-title>Mail App</f7-block-title>
    <f7-list media-list>
      <f7-list-item
        link="#"
        title="Facebook"
        after="17:14"
        subtitle="New messages from John Doe"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      ></f7-list-item>
      <f7-list-item
        link="#"
        title="John Doe (via Twitter)"
        after="17:11"
        subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      ></f7-list-item>
      <f7-list-item
        link="#"
        title="Facebook"
        after="16:48"
        subtitle="New messages from John Doe"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      ></f7-list-item>
      <f7-list-item
        link="#"
        title="John Doe (via Twitter)"
        after="15:32"
        subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      ></f7-list-item>
    </f7-list>
    <f7-block-title>Something more simple</f7-block-title>
    <f7-list media-list>
      <f7-list-item
        title="Yellow Submarine"
        subtitle="Beatles">
        <img slot="media" src="https://cdn.framework7.io/placeholder/fashion-88x88-1.jpg" width="44" />
      </f7-list-item>
      <f7-list-item
        link="#"
        title="Don't Stop Me Now"
        subtitle="Queen">
        <img slot="media" src="https://cdn.framework7.io/placeholder/fashion-88x88-2.jpg" width="44" />
      </f7-list-item>
      <f7-list-item
        title="Billie Jean"
        subtitle="Michael Jackson">
        <img slot="media" src="https://cdn.framework7.io/placeholder/fashion-88x88-3.jpg" width="44" />
      </f7-list-item>
    </f7-list>
    <f7-block-title>Inset</f7-block-title>
    <f7-list media-list inset>
      <f7-list-item
        link="#"
        title="Yellow Submarine"
        subtitle="Beatles">
        <img slot="media" src="https://cdn.framework7.io/placeholder/fashion-88x88-4.jpg" width="44" />
      </f7-list-item>
      <f7-list-item
        link="#"
        title="Don't Stop Me Now"
        subtitle="Queen">
        <img slot="media" src="https://cdn.framework7.io/placeholder/fashion-88x88-5.jpg" width="44" />
      </f7-list-item>
      <f7-list-item
        link="#"
        title="Billie Jean"
        subtitle="Michael Jackson">
        <img slot="media" src="https://cdn.framework7.io/placeholder/fashion-88x88-6.jpg" width="44" />
      </f7-list-item>
    </f7-list>
    <f7-block-title>Custom Table-like Layout</f7-block-title>
    <f7-list>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-inner item-cell">
            <div class="item-row">
              <div class="item-cell">Cell 1-1</div>
              <div class="item-cell">Cell 1-2</div>
              <div class="item-cell">Cell 1-3</div>
            </div>
            <div class="item-row">
              <div class="item-cell">Cell 2-1</div>
              <div class="item-cell">Cell 2-2</div>
            </div>
            <div class="item-row">
              <div class="item-cell">Cell 3-1</div>
              <div class="item-cell">
                <div class="item-row">
                  Cell 3-2
                </div>
                <div class="item-row">
                  Cell 3-3
                </div>
              </div>
            </div>
          </div>
        </a>
      </li>
      <li>
        <a href="#" class="item-link item-content">
          <div class="item-inner item-cell">
            <div class="item-row">
              <div class="item-cell">Cell 1-1</div>
              <div class="item-cell">Cell 1-2</div>
              <div class="item-cell">Cell 1-3</div>
            </div>
            <div class="item-row">
              <div class="item-cell">Cell 2-1</div>
              <div class="item-cell">Cell 2-2</div>
            </div>
            <div class="item-row">
              <div class="item-cell">Cell 3-1</div>
              <div class="item-cell">
                <div class="item-row">
                  Cell 3-2
                </div>
                <div class="item-row">
                  Cell 3-3
                </div>
              </div>
            </div>
          </div>
        </a>
      </li>
    </f7-list>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle, f7Block, f7List, f7ListItem, f7ListGroup, f7ListItemCell, f7ListItemRow, f7BlockFooter, f7Icon, f7Toggle } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
      f7Block,
      f7List,
      f7ListItem,
      f7ListGroup,
      f7ListItemCell,
      f7ListItemRow,
      f7BlockFooter,
      f7Icon,
      f7Toggle,
    },
  };
</script>
