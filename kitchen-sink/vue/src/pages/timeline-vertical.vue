<template>
  <f7-page>
    <f7-navbar title="Vertical Timeline" back-link="Back"></f7-navbar>
    <f7-block-title>Default</f7-block-title>
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-item-date">21 <small>DEC</small></div>
        <div class="timeline-item-divider"></div>
        <div class="timeline-item-content">
          <div class="timeline-item-inner">Some text goes here</div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-item-date">22 <small>DEC</small></div>
        <div class="timeline-item-divider"></div>
        <div class="timeline-item-content">
          <div class="timeline-item-inner">Another text goes here</div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-item-date">23 <small>DEC</small></div>
        <div class="timeline-item-divider"></div>
        <div class="timeline-item-content">
          <div class="timeline-item-inner">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi quos quis iure, aperiam pariatur?</div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-item-date">24 <small>DEC</small></div>
        <div class="timeline-item-divider"></div>
        <div class="timeline-item-content">
          <div class="timeline-item-inner">One more text here</div>
        </div>
      </div>
    </div>
    <f7-block-title>Side By Side</f7-block-title>
    <div class="timeline timeline-sides">
      <div class="timeline-item">
        <div class="timeline-item-date">21 <small>DEC</small></div>
        <div class="timeline-item-divider"></div>
        <div class="timeline-item-content">
          <div class="timeline-item-inner">Some text goes here</div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-item-date">22 <small>DEC</small></div>
        <div class="timeline-item-divider"></div>
        <div class="timeline-item-content">
          <div class="timeline-item-inner">Another text goes here</div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-item-date">23 <small>DEC</small></div>
        <div class="timeline-item-divider"></div>
        <div class="timeline-item-content">
          <div class="timeline-item-inner">Just plain text</div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-item-date">24 <small>DEC</small></div>
        <div class="timeline-item-divider"></div>
        <div class="timeline-item-content">
          <div class="timeline-item-inner">One more text here</div>
        </div>
      </div>
    </div>
    <f7-block-title>Only Tablet Side By Side</f7-block-title>
    <div class="timeline medium-sides">
      <div class="timeline-item">
        <div class="timeline-item-date">21 <small>DEC</small></div>
        <div class="timeline-item-divider"></div>
        <div class="timeline-item-content">
          <div class="timeline-item-inner">Some text goes here</div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-item-date">22 <small>DEC</small></div>
        <div class="timeline-item-divider"></div>
        <div class="timeline-item-content">
          <div class="timeline-item-inner">Another text goes here</div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-item-date">23 <small>DEC</small></div>
        <div class="timeline-item-divider"></div>
        <div class="timeline-item-content">
          <div class="timeline-item-inner">Just plain text</div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-item-date">24 <small>DEC</small></div>
        <div class="timeline-item-divider"></div>
        <div class="timeline-item-content">
          <div class="timeline-item-inner">One more text here</div>
        </div>
      </div>
    </div>
    <f7-block-title>Forced Sides</f7-block-title>
    <div class="timeline timeline-sides">
      <div class="timeline-item timeline-item-right">
        <div class="timeline-item-date">21 <small>DEC</small></div>
        <div class="timeline-item-divider"></div>
        <div class="timeline-item-content">
          <div class="timeline-item-inner">Some text goes here</div>
        </div>
      </div>
      <div class="timeline-item timeline-item-right">
        <div class="timeline-item-date">22 <small>DEC</small></div>
        <div class="timeline-item-divider"></div>
        <div class="timeline-item-content">
          <div class="timeline-item-inner">Another text goes here</div>
        </div>
      </div>
      <div class="timeline-item timeline-item-left">
        <div class="timeline-item-date">23 <small>DEC</small></div>
        <div class="timeline-item-divider"></div>
        <div class="timeline-item-content">
          <div class="timeline-item-inner">Just plain text</div>
        </div>
      </div>
      <div class="timeline-item timeline-item-left">
        <div class="timeline-item-date">24 <small>DEC</small></div>
        <div class="timeline-item-divider"></div>
        <div class="timeline-item-content">
          <div class="timeline-item-inner">One more text here</div>
        </div>
      </div>
    </div>
    <f7-block-title>Rich Content</f7-block-title>
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-item-date">21 <small>DEC</small></div>
        <div class="timeline-item-divider"></div>
        <div class="timeline-item-content">
          <div class="timeline-item-inner">
            <div class="timeline-item-time">12:56</div>
            <div class="timeline-item-title">Item Title</div>
            <div class="timeline-item-subtitle">Item Subtitle</div>
            <div class="timeline-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi quos quis iure, aperiam pariatur?</div>
            <div class="timeline-item-time">15:07</div>
            <div class="timeline-item-title">Item Title</div>
            <div class="timeline-item-subtitle">Item Subtitle</div>
            <div class="timeline-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi quos quis iure, aperiam pariatur?</div>
          </div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-item-date">22 <small>DEC</small></div>
        <div class="timeline-item-divider"></div>
        <div class="timeline-item-content">
          <div class="timeline-item-inner">
            <div class="timeline-item-time">12:56</div>
            <div class="timeline-item-title">Item Title</div>
            <div class="timeline-item-subtitle">Item Subtitle</div>
            <div class="timeline-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi quos quis iure, aperiam pariatur?</div>
          </div>
          <div class="timeline-item-inner">
            <div class="timeline-item-time">15:07</div>
            <div class="timeline-item-title">Item Title</div>
            <div class="timeline-item-subtitle">Item Subtitle</div>
            <div class="timeline-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi quos quis iure, aperiam pariatur?</div>
          </div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-item-date">23 <small>DEC</small></div>
        <div class="timeline-item-divider"></div>
        <div class="timeline-item-content card no-safe-areas">
          <div class="card-header">Card Header</div>
          <div class="card-content card-content-padding">Card Content</div>
          <div class="card-footer">Card Footer</div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-item-date">24 <small>DEC</small></div>
        <div class="timeline-item-divider"></div>
        <div class="timeline-item-content list links-list inset no-safe-areas">
          <ul>
            <li><a href="#">Item 1</a></li>
            <li><a href="#">Item 2</a></li>
            <li><a href="#">Item 3</a></li>
          </ul>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-item-date">25 <small>DEC</small></div>
        <div class="timeline-item-divider"></div>
        <div class="timeline-item-content">Plain text</div>
      </div>
    </div>
    <f7-block-title>Inside Content Block</f7-block-title>
    <div class="block block-strong">
      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-item-date">21 <small>DEC</small></div>
          <div class="timeline-item-divider"></div>
          <div class="timeline-item-content">
            <div class="timeline-item-inner">Some text goes here</div>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-item-date">22 <small>DEC</small></div>
          <div class="timeline-item-divider"></div>
          <div class="timeline-item-content">
            <div class="timeline-item-inner">Another text goes here</div>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-item-date">23 <small>DEC</small></div>
          <div class="timeline-item-divider"></div>
          <div class="timeline-item-content">
            <div class="timeline-item-inner">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi quos quis iure, aperiam pariatur?</div>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-item-date">24 <small>DEC</small></div>
          <div class="timeline-item-divider"></div>
          <div class="timeline-item-content">
            <div class="timeline-item-inner">One more text here</div>
          </div>
        </div>
      </div>
    </div>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
    },
  };
</script>
