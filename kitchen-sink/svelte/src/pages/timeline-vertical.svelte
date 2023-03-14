<script>
  import { Navbar, Page, BlockTitle } from 'framework7-svelte';
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<Page>
  <Navbar title="Vertical Timeline" backLink="Back" />
  <BlockTitle>Default</BlockTitle>
  <div class="timeline">
    <div class="timeline-item">
      <div class="timeline-item-date">21 <small>DEC</small></div>
      <div class="timeline-item-divider" />
      <div class="timeline-item-content">
        <div class="timeline-item-inner">Some text goes here</div>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-item-date">22 <small>DEC</small></div>
      <div class="timeline-item-divider" />
      <div class="timeline-item-content">
        <div class="timeline-item-inner">Another text goes here</div>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-item-date">23 <small>DEC</small></div>
      <div class="timeline-item-divider" />
      <div class="timeline-item-content">
        <div class="timeline-item-inner">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro
          enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi
          quos quis iure, aperiam pariatur?
        </div>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-item-date">24 <small>DEC</small></div>
      <div class="timeline-item-divider" />
      <div class="timeline-item-content">
        <div class="timeline-item-inner">One more text here</div>
      </div>
    </div>
  </div>
  <BlockTitle>Side By Side</BlockTitle>
  <div class="timeline timeline-sides">
    <div class="timeline-item">
      <div class="timeline-item-date">21 <small>DEC</small></div>
      <div class="timeline-item-divider" />
      <div class="timeline-item-content">
        <div class="timeline-item-inner">Some text goes here</div>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-item-date">22 <small>DEC</small></div>
      <div class="timeline-item-divider" />
      <div class="timeline-item-content">
        <div class="timeline-item-inner">Another text goes here</div>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-item-date">23 <small>DEC</small></div>
      <div class="timeline-item-divider" />
      <div class="timeline-item-content">
        <div class="timeline-item-inner">Just plain text</div>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-item-date">24 <small>DEC</small></div>
      <div class="timeline-item-divider" />
      <div class="timeline-item-content">
        <div class="timeline-item-inner">One more text here</div>
      </div>
    </div>
  </div>
  <BlockTitle>Only Tablet Side By Side</BlockTitle>
  <div class="timeline medium-sides">
    <div class="timeline-item">
      <div class="timeline-item-date">21 <small>DEC</small></div>
      <div class="timeline-item-divider" />
      <div class="timeline-item-content">
        <div class="timeline-item-inner">Some text goes here</div>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-item-date">22 <small>DEC</small></div>
      <div class="timeline-item-divider" />
      <div class="timeline-item-content">
        <div class="timeline-item-inner">Another text goes here</div>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-item-date">23 <small>DEC</small></div>
      <div class="timeline-item-divider" />
      <div class="timeline-item-content">
        <div class="timeline-item-inner">Just plain text</div>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-item-date">24 <small>DEC</small></div>
      <div class="timeline-item-divider" />
      <div class="timeline-item-content">
        <div class="timeline-item-inner">One more text here</div>
      </div>
    </div>
  </div>
  <BlockTitle>Forced Sides</BlockTitle>
  <div class="timeline timeline-sides">
    <div class="timeline-item timeline-item-right">
      <div class="timeline-item-date">21 <small>DEC</small></div>
      <div class="timeline-item-divider" />
      <div class="timeline-item-content">
        <div class="timeline-item-inner">Some text goes here</div>
      </div>
    </div>
    <div class="timeline-item timeline-item-right">
      <div class="timeline-item-date">22 <small>DEC</small></div>
      <div class="timeline-item-divider" />
      <div class="timeline-item-content">
        <div class="timeline-item-inner">Another text goes here</div>
      </div>
    </div>
    <div class="timeline-item timeline-item-left">
      <div class="timeline-item-date">23 <small>DEC</small></div>
      <div class="timeline-item-divider" />
      <div class="timeline-item-content">
        <div class="timeline-item-inner">Just plain text</div>
      </div>
    </div>
    <div class="timeline-item timeline-item-left">
      <div class="timeline-item-date">24 <small>DEC</small></div>
      <div class="timeline-item-divider" />
      <div class="timeline-item-content">
        <div class="timeline-item-inner">One more text here</div>
      </div>
    </div>
  </div>
  <BlockTitle>Rich Content</BlockTitle>
  <div class="timeline">
    <div class="timeline-item">
      <div class="timeline-item-date">21 <small>DEC</small></div>
      <div class="timeline-item-divider" />
      <div class="timeline-item-content">
        <div class="timeline-item-inner">
          <div class="timeline-item-time">12:56</div>
          <div class="timeline-item-title">Item Title</div>
          <div class="timeline-item-subtitle">Item Subtitle</div>
          <div class="timeline-item-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro
            enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi
            quos quis iure, aperiam pariatur?
          </div>
          <div class="timeline-item-time">15:07</div>
          <div class="timeline-item-title">Item Title</div>
          <div class="timeline-item-subtitle">Item Subtitle</div>
          <div class="timeline-item-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro
            enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi
            quos quis iure, aperiam pariatur?
          </div>
        </div>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-item-date">22 <small>DEC</small></div>
      <div class="timeline-item-divider" />
      <div class="timeline-item-content">
        <div class="timeline-item-inner">
          <div class="timeline-item-time">12:56</div>
          <div class="timeline-item-title">Item Title</div>
          <div class="timeline-item-subtitle">Item Subtitle</div>
          <div class="timeline-item-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro
            enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi
            quos quis iure, aperiam pariatur?
          </div>
        </div>
        <div class="timeline-item-inner">
          <div class="timeline-item-time">15:07</div>
          <div class="timeline-item-title">Item Title</div>
          <div class="timeline-item-subtitle">Item Subtitle</div>
          <div class="timeline-item-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro
            enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi
            quos quis iure, aperiam pariatur?
          </div>
        </div>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-item-date">23 <small>DEC</small></div>
      <div class="timeline-item-divider" />
      <div class="timeline-item-content card no-safe-areas">
        <div class="card-header">Card Header</div>
        <div class="card-content card-content-padding">Card Content</div>
        <div class="card-footer">Card Footer</div>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-item-date">24 <small>DEC</small></div>
      <div class="timeline-item-divider" />
      <div
        class="timeline-item-content list links-list inset list-strong list-dividers-ios no-safe-areas"
      >
        <ul>
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-item-date">25 <small>DEC</small></div>
      <div class="timeline-item-divider" />
      <div class="timeline-item-content">Plain text</div>
    </div>
  </div>
  <BlockTitle>Inside Content Block</BlockTitle>
  <div class="block block-strong">
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-item-date">21 <small>DEC</small></div>
        <div class="timeline-item-divider" />
        <div class="timeline-item-content">
          <div class="timeline-item-inner">Some text goes here</div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-item-date">22 <small>DEC</small></div>
        <div class="timeline-item-divider" />
        <div class="timeline-item-content">
          <div class="timeline-item-inner">Another text goes here</div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-item-date">23 <small>DEC</small></div>
        <div class="timeline-item-divider" />
        <div class="timeline-item-content">
          <div class="timeline-item-inner">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro
            enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi
            quos quis iure, aperiam pariatur?
          </div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-item-date">24 <small>DEC</small></div>
        <div class="timeline-item-divider" />
        <div class="timeline-item-content">
          <div class="timeline-item-inner">One more text here</div>
        </div>
      </div>
    </div>
  </div>
</Page>
