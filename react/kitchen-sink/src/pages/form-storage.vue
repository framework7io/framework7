<template>
  <Page>
    <Navbar title="About Framework7" backLink="Back"></Navbar>
    <div className="block block-strong">
      <p>With forms storage it is easy to store and parse form data, especially on Ajax loaded pages. All you need to make it work is to add "form-store-data" class to your &lt;form&gt; and Framework7 will store form data with every input change. And the most awesome part is that when you load this page again Framework7 will parse this data and fill all form fields automatically!</p>
      <p>Just try to fill the form below and then go to any other page, or even you may close this site, and when you return here form fields will have kept your data.</p>
    </div>
    <form className="list form-store-data" id="demo-form">
      <ul>
        <li className="item-content item-input">
          <div className="item-inner">
            <div className="item-title item-label">Name</div>
            <div className="item-input-wrap">
              <input name="name" type="text" placeholder="Your name">
              <span className="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li className="item-content item-input">
          <div className="item-inner">
            <div className="item-title item-label">Password</div>
            <div className="item-input-wrap">
              <input name="password" type="password" placeholder="Your password">
              <span className="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li className="item-content item-input">
          <div className="item-inner">
            <div className="item-title item-label">E-mail</div>
            <div className="item-input-wrap">
              <input name="email" type="email" placeholder="Your e-mail">
              <span className="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li className="item-content item-input">
          <div className="item-inner">
            <div className="item-title item-label">URL</div>
            <div className="item-input-wrap">
              <input name="url" type="url" placeholder="URL">
              <span className="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li className="item-content item-input">
          <div className="item-inner">
            <div className="item-title item-label">Phone</div>
            <div className="item-input-wrap">
              <input name="phone" type="tel" placeholder="Your phone number">
              <span className="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li className="item-content item-input">
          <div className="item-inner">
            <div className="item-title item-label">Gender</div>
            <div className="item-input-wrap">
              <select name="gender" placeholder="Please choose...">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </li>
        <li className="item-content item-input">
          <div className="item-inner">
            <div className="item-title item-label">Birthday</div>
            <div className="item-input-wrap">
              <input name="birthday" type="date" value="2014-04-30" placeholder="Please choose...">
            </div>
          </div>
        </li>
        <li className="item-content item-input">
          <div className="item-inner">
            <div className="item-title item-label">Date time</div>
            <div className="item-input-wrap">
              <input name="date" type="datetime-local" placeholder="Please choose...">
            </div>
          </div>
        </li>
        <li className="item-content item-input">
          <div className="item-inner">
            <div className="item-title item-label">Range</div>
            <div className="item-input-wrap">
              <div className="range-slider range-slider-init" data-label="true">
                <input name="range" type="range" value="50" min="0" max="100" step="1">
              </div>
            </div>
          </div>
        </li>
        <li className="item-content item-input">
          <div className="item-inner">
            <div className="item-title item-label">About you</div>
            <div className="item-input-wrap">
              <textarea name="bio" className="resizable" placeholder="Bio"></textarea>
            </div>
          </div>
        </li>
      </ul>
    </form>
  </Page>
</template>
<script>
  import React from 'react';
  import { Navbar, Page, BlockTitle } from 'framework7-react';

  export default {
    components: {
      Navbar,
      Page,
      BlockTitle,
    },
  };
</script>
