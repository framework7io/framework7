import React from 'react';
import { Navbar, Page, BlockTitle, Block, List, ListItem, Label, Input, Range } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Form Storage" backLink="Back"></Navbar>
    <Block strong>
      <p>With forms storage it is easy to store and parse form data, especially on Ajax loaded pages. All you need to make it work is to add "form-store-data" class to your &lt;form&gt; and Framework7 will store form data with every input change. And the most awesome part is that when you load this page again Framework7 will parse this data and fill all form fields automatically!</p>
      <p>Just try to fill the form below and then go to any other page, or even you may close this site, and when you return here form fields will have kept your data.</p>
    </Block>
    <List form formStoreData id="demo-form">
      <ListItem>
        <Label>Name</Label>
        <Input name="name" type="text" clearButton placeholder="Your name" />
      </ListItem>
      <ListItem>
        <Label>Password</Label>
        <Input name="password" type="password" clearButton placeholder="Your password" />
      </ListItem>
      <ListItem>
        <Label>E-mail</Label>
        <Input name="email" type="email" clearButton placeholder="Your e-mail" />
      </ListItem>
      <ListItem>
        <Label>URL</Label>
        <Input name="url" type="url" clearButton placeholder="URL" />
      </ListItem>
      <ListItem>
        <Label>Phone</Label>
        <Input name="phone" type="tel" clearButton placeholder="Your phone number" />
      </ListItem>
      <ListItem>
        <Label>Gender</Label>
        <Input type="select" name="gender" placeholder="Please choose...">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Input>
      </ListItem>
      <ListItem>
        <Label>Birthday</Label>
        <Input name="birthday" type="date" defaultValue="2014-04-30" placeholder="Please choose..." />
      </ListItem>
      <ListItem>
        <Label>Date time</Label>
        <Input name="date" type="datetime-local" placeholder="Please choose..." />
      </ListItem>
      <ListItem>
        <Label>Range</Label>
        <Input>
          <div className="range-slider range-slider-init" data-label="true">
            <input name="range" type="range" defaultValue="50" min="0" max="100" step="1" />
          </div>
        </Input>
      </ListItem>
      <ListItem>
        <Label>About you</Label>
        <Input type="textarea" name="bio" resizable placeholder="Bio" />
      </ListItem>
    </List>
  </Page>
);