import React from 'react';
import { Navbar, Page, BlockTitle } from 'framework7-react';

export default () => (
  <Page>
    <Navbar noShadow title="Horizontal Timeline" backLink="Back"></Navbar>
    <div className="timeline timeline-horizontal col-33 tablet-20">
      <div className="timeline-item">
        <div className="timeline-item-date">21 <small>DEC</small></div>
        <div className="timeline-item-content">
          <div className="timeline-item-inner">
            <div className="timeline-item-time">12:56</div>
            <div className="timeline-item-title">Title 1</div>
            <div className="timeline-item-subtitle">Subtitle 1</div>
            <div className="timeline-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit</div>
          </div>
          <div className="timeline-item-inner">
            <div className="timeline-item-time">13:15</div>
            <div className="timeline-item-title">Title 2</div>
            <div className="timeline-item-subtitle">Subtitle 2</div>
            <div className="timeline-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit</div>
          </div>
          <div className="timeline-item-inner">
            <div className="timeline-item-time">14:45</div>
            <div className="timeline-item-text">Do something</div>
          </div>
          <div className="timeline-item-inner">
            <div className="timeline-item-time">16:11</div>
            <div className="timeline-item-text">Do something else</div>
          </div>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-item-date">22 <small>DEC</small></div>
        <div className="timeline-item-content">Plain text goes here</div>
      </div>
      <div className="timeline-item">
        <div className="timeline-item-date">23 <small>DEC</small></div>
        <div className="timeline-item-content">
          <div className="card no-safe-areas">
            <div className="card-header">Card</div>
            <div className="card-content card-content-padding">Card Content</div>
            <div className="card-footer">Card Footer</div>
          </div>
          <div className="card no-safe-areas">
            <div className="card-content card-content-padding">Another Card Content</div>
          </div>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-item-date">24 <small>DEC</small></div>
        <div className="timeline-item-content">
          <div className="list links-list inset no-safe-areas">
            <ul>
              <li><a href="#">Item 1</a></li>
              <li><a href="#">Item 2</a></li>
              <li><a href="#">Item 3</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-item-date">25 <small>DEC</small></div>
        <div className="timeline-item-content">
          <div className="timeline-item-time">11:11</div>
          <div className="timeline-item-text">Task 1</div>
          <div className="timeline-item-time">12:33</div>
          <div className="timeline-item-text">Task 2</div>
          <div className="timeline-item-time">13:24</div>
          <div className="timeline-item-text">Task 3</div>
          <div className="timeline-item-time">14:55</div>
          <div className="timeline-item-text">Task 4</div>
          <div className="timeline-item-time">15:15</div>
          <div className="timeline-item-text">Task 5</div>
          <div className="timeline-item-time">16:54</div>
          <div className="timeline-item-text">Task 6</div>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-item-date">26 <small>DEC</small></div>
        <div className="timeline-item-content">
          <div className="timeline-item-inner">
            <div className="timeline-item-time">11:11</div>
            <div className="timeline-item-text">Task 1</div>
          </div>
          <div className="timeline-item-inner">
            <div className="timeline-item-time">12:33</div>
            <div className="timeline-item-text">Task 2</div>
          </div>
          <div className="timeline-item-inner">
            <div className="timeline-item-time">13:24</div>
            <div className="timeline-item-text">Task 3</div>
          </div>
          <div className="timeline-item-inner">
            <div className="timeline-item-time">14:55</div>
            <div className="timeline-item-text">Task 4</div>
          </div>
          <div className="timeline-item-inner">
            <div className="timeline-item-time">15:15</div>
            <div className="timeline-item-text">Task 5</div>
          </div>
          <div className="timeline-item-inner">
            <div className="timeline-item-time">16:54</div>
            <div className="timeline-item-text">Task 6</div>
          </div>
        </div>
      </div>
    </div>
  </Page>
);
