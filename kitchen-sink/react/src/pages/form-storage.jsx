import React from 'react';
import { Navbar, Page, Block, List, Range, ListInput } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Form Storage" backLink="Back"></Navbar>
    <Block strong>
      <p>With forms storage it is easy to store and parse form data, especially on Ajax loaded pages. All you need to make it work is to add "form-store-data" class to your &lt;form&gt; and Framework7 will store form data with every input change. And the most awesome part is that when you load this page again Framework7 will parse this data and fill all form fields automatically!</p>
      <p>Just try to fill the form below and then go to any other page, or even you may close this site, and when you return here form fields will have kept your data.</p>
    </Block>
    <List form formStoreData id="demo-form">
      <ListInput
        label="Name"
        name="name"
        type="text"
        clearButton
        placeholder="Your name"
      />
      <ListInput
        label="Password"
        name="password"
        type="password"
        clearButton
        placeholder="Your password"
      />
      <ListInput
        label="E-mail"
        name="email"
        type="email"
        clearButton
        placeholder="Your e-mail"
      />
      <ListInput
        label="URL"
        name="url"
        type="url"
        clearButton
        placeholder="URL"
      />
      <ListInput
        label="Phone"
        name="phone"
        type="tel"
        clearButton
        placeholder="Your phone number"
      />
      <ListInput
        label="Gender"
        type="select"
        name="gender"
        placeholder="Please choose..."
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </ListInput>
      <ListInput
        label="Birthday"
        name="birthday"
        type="date"
        defaultValue="2014-04-30"
        placeholder="Please choose..."
      />
      <ListInput
        label="Date time"
        name="date"
        type="datetime-local"
        placeholder="Please choose..."
      />
      <ListInput
        label="Range"
        input={false}
      >
        <Range name="range" slot="input" value={50} min={0} max={100} step={1}/>
      </ListInput>

      <ListInput
        label="About you"
        type="textarea"
        name="bio"
        resizable
        placeholder="Bio"
      />
    </List>
  </Page>
);