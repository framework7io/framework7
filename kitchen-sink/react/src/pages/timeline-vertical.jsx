import React from 'react';
import { Navbar, Page, BlockTitle } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Vertical Timeline" backLink="Back"></Navbar>
    <BlockTitle>Default</BlockTitle>
    <div className="timeline">
      <div className="timeline-item">
        <div className="timeline-item-date">21 <small>DEC</small></div>
        <div className="timeline-item-divider"></div>
        <div className="timeline-item-content">
          <div className="timeline-item-inner">Some text goes here</div>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-item-date">22 <small>DEC</small></div>
        <div className="timeline-item-divider"></div>
        <div className="timeline-item-content">
          <div className="timeline-item-inner">Another text goes here</div>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-item-date">23 <small>DEC</small></div>
        <div className="timeline-item-divider"></div>
        <div className="timeline-item-content">
          <div className="timeline-item-inner">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi quos quis iure, aperiam pariatur?</div>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-item-date">24 <small>DEC</small></div>
        <div className="timeline-item-divider"></div>
        <div className="timeline-item-content">
          <div className="timeline-item-inner">One more text here</div>
        </div>
      </div>
    </div>
    <BlockTitle>Side By Side</BlockTitle>
    <div className="timeline timeline-sides">
      <div className="timeline-item">
        <div className="timeline-item-date">21 <small>DEC</small></div>
        <div className="timeline-item-divider"></div>
        <div className="timeline-item-content">
          <div className="timeline-item-inner">Some text goes here</div>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-item-date">22 <small>DEC</small></div>
        <div className="timeline-item-divider"></div>
        <div className="timeline-item-content">
          <div className="timeline-item-inner">Another text goes here</div>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-item-date">23 <small>DEC</small></div>
        <div className="timeline-item-divider"></div>
        <div className="timeline-item-content">
          <div className="timeline-item-inner">Just plain text</div>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-item-date">24 <small>DEC</small></div>
        <div className="timeline-item-divider"></div>
        <div className="timeline-item-content">
          <div className="timeline-item-inner">One more text here</div>
        </div>
      </div>
    </div>
    <BlockTitle>Only Tablet Side By Side</BlockTitle>
    <div className="timeline tablet-sides">
      <div className="timeline-item">
        <div className="timeline-item-date">21 <small>DEC</small></div>
        <div className="timeline-item-divider"></div>
        <div className="timeline-item-content">
          <div className="timeline-item-inner">Some text goes here</div>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-item-date">22 <small>DEC</small></div>
        <div className="timeline-item-divider"></div>
        <div className="timeline-item-content">
          <div className="timeline-item-inner">Another text goes here</div>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-item-date">23 <small>DEC</small></div>
        <div className="timeline-item-divider"></div>
        <div className="timeline-item-content">
          <div className="timeline-item-inner">Just plain text</div>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-item-date">24 <small>DEC</small></div>
        <div className="timeline-item-divider"></div>
        <div className="timeline-item-content">
          <div className="timeline-item-inner">One more text here</div>
        </div>
      </div>
    </div>
    <BlockTitle>Forced Sides</BlockTitle>
    <div className="timeline timeline-sides">
      <div className="timeline-item timeline-item-right">
        <div className="timeline-item-date">21 <small>DEC</small></div>
        <div className="timeline-item-divider"></div>
        <div className="timeline-item-content">
          <div className="timeline-item-inner">Some text goes here</div>
        </div>
      </div>
      <div className="timeline-item timeline-item-right">
        <div className="timeline-item-date">22 <small>DEC</small></div>
        <div className="timeline-item-divider"></div>
        <div className="timeline-item-content">
          <div className="timeline-item-inner">Another text goes here</div>
        </div>
      </div>
      <div className="timeline-item timeline-item-left">
        <div className="timeline-item-date">23 <small>DEC</small></div>
        <div className="timeline-item-divider"></div>
        <div className="timeline-item-content">
          <div className="timeline-item-inner">Just plain text</div>
        </div>
      </div>
      <div className="timeline-item timeline-item-left">
        <div className="timeline-item-date">24 <small>DEC</small></div>
        <div className="timeline-item-divider"></div>
        <div className="timeline-item-content">
          <div className="timeline-item-inner">One more text here</div>
        </div>
      </div>
    </div>
    <BlockTitle>Rich Content</BlockTitle>
    <div className="timeline">
      <div className="timeline-item">
        <div className="timeline-item-date">21 <small>DEC</small></div>
        <div className="timeline-item-divider"></div>
        <div className="timeline-item-content">
          <div className="timeline-item-inner">
            <div className="timeline-item-time">12:56</div>
            <div className="timeline-item-title">Item Title</div>
            <div className="timeline-item-subtitle">Item Subtitle</div>
            <div className="timeline-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi quos quis iure, aperiam pariatur?</div>
            <div className="timeline-item-time">15:07</div>
            <div className="timeline-item-title">Item Title</div>
            <div className="timeline-item-subtitle">Item Subtitle</div>
            <div className="timeline-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi quos quis iure, aperiam pariatur?</div>
          </div>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-item-date">22 <small>DEC</small></div>
        <div className="timeline-item-divider"></div>
        <div className="timeline-item-content">
          <div className="timeline-item-inner">
            <div className="timeline-item-time">12:56</div>
            <div className="timeline-item-title">Item Title</div>
            <div className="timeline-item-subtitle">Item Subtitle</div>
            <div className="timeline-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi quos quis iure, aperiam pariatur?</div>
          </div>
          <div className="timeline-item-inner">
            <div className="timeline-item-time">15:07</div>
            <div className="timeline-item-title">Item Title</div>
            <div className="timeline-item-subtitle">Item Subtitle</div>
            <div className="timeline-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi quos quis iure, aperiam pariatur?</div>
          </div>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-item-date">23 <small>DEC</small></div>
        <div className="timeline-item-divider"></div>
        <div className="timeline-item-content card no-safe-areas">
          <div className="card-header">Card Header</div>
          <div className="card-content card-content-padding">Card Content</div>
          <div className="card-footer">Card Footer</div>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-item-date">24 <small>DEC</small></div>
        <div className="timeline-item-divider"></div>
        <div className="timeline-item-content list links-list inset no-safe-areas">
          <ul>
            <li><a href="#">Item 1</a></li>
            <li><a href="#">Item 2</a></li>
            <li><a href="#">Item 3</a></li>
          </ul>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-item-date">25 <small>DEC</small></div>
        <div className="timeline-item-divider"></div>
        <div className="timeline-item-content">Plain text</div>
      </div>
    </div>
    <BlockTitle>Inside Content Block</BlockTitle>
    <div className="block block-strong">
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-item-date">21 <small>DEC</small></div>
          <div className="timeline-item-divider"></div>
          <div className="timeline-item-content">
            <div className="timeline-item-inner">Some text goes here</div>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-item-date">22 <small>DEC</small></div>
          <div className="timeline-item-divider"></div>
          <div className="timeline-item-content">
            <div className="timeline-item-inner">Another text goes here</div>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-item-date">23 <small>DEC</small></div>
          <div className="timeline-item-divider"></div>
          <div className="timeline-item-content">
            <div className="timeline-item-inner">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi quos quis iure, aperiam pariatur?</div>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-item-date">24 <small>DEC</small></div>
          <div className="timeline-item-divider"></div>
          <div className="timeline-item-content">
            <div className="timeline-item-inner">One more text here</div>
          </div>
        </div>
      </div>
    </div>
  </Page>
);
