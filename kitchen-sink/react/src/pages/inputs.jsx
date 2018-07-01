import React from 'react';
import { Navbar, Page, BlockTitle, List, ListItem, Icon, Label, Input } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Form Inputs" backLink="Back"></Navbar>
    <BlockTitle>Full Layout / Inline Labels</BlockTitle>
    <List inlineLabels noHairlinesMd>
      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>Name</Label>
        <Input type="text" placeholder="Your name" clearButton></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>Password</Label>
        <Input type="password" placeholder="Your password" clearButton></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>E-mail</Label>
        <Input type="email" placeholder="Your e-mail" clearButton></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>URL</Label>
        <Input type="url" placeholder="URL" clearButton></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>Phone</Label>
        <Input type="tel" placeholder="Your phone number" clearButton></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>Gender</Label>
        <Input type="select" placeholder="Please choose...">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>Birthday</Label>
        <Input type="date" value="2014-04-30" placeholder="Please choose..."></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>Date time</Label>
        <Input type="datetime-local" placeholder="Please choose..."></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>Range</Label>
        <Input id="range-id" type="range" value="50" min="0" max="100" step="1"></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>Textarea</Label>
        <Input type="textarea" placeholder="Bio"></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>Resizable</Label>
        <Input type="textarea" resizable placeholder="Bio"></Input>
      </ListItem>

    </List>

    <BlockTitle>Full Layout / Stacked Labels</BlockTitle>
    <List noHairlinesMd>
      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>Name</Label>
        <Input type="text" placeholder="Your name" clearButton></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>Password</Label>
        <Input type="password" placeholder="Your password" clearButton></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>E-mail</Label>
        <Input type="email" placeholder="Your e-mail" clearButton></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>URL</Label>
        <Input type="url" placeholder="URL" clearButton></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>Phone</Label>
        <Input type="tel" placeholder="Your phone number" clearButton></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>Gender</Label>
        <Input type="select" placeholder="Please choose...">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>Birthday</Label>
        <Input type="date" value="2014-04-30" placeholder="Please choose..."></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>Date time</Label>
        <Input type="datetime-local" placeholder="Please choose..."></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>Range</Label>
        <Input type="range" value="50" min="0" max="100" step="1"></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>Textarea</Label>
        <Input type="textarea" placeholder="Bio"></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>Resizable</Label>
        <Input type="textarea" resizable placeholder="Bio"></Input>
      </ListItem>
    </List>

    <BlockTitle>Floating Labels (MD-theme only)</BlockTitle>
    <List noHairlinesMd>
      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label floating>Name</Label>
        <Input type="text" placeholder="Your name" clearButton></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label floating>Password</Label>
        <Input type="password" placeholder="Your password" clearButton></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label floating>E-mail</Label>
        <Input type="email" placeholder="Your e-mail" clearButton></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label floating>URL</Label>
        <Input type="url" placeholder="URL" clearButton></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label floating>Phone</Label>
        <Input type="tel" placeholder="Your phone number" clearButton></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label floating>Bio</Label>
        <Input type="textarea" placeholder="Bio" resizable></Input>
      </ListItem>
    </List>

    <BlockTitle>Validation + Additional Info</BlockTitle>
    <List noHairlinesMd>
      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>Name</Label>
        <Input type="text" placeholder="Your name" info='Default "required" validation' required validate clearButton></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>Fruit</Label>
        <Input type="text" placeholder="Type 'apple' or 'banana'" required validate pattern="apple|banana" clearButton>
          <span slot="info">Pattern validation (<b>apple|banana</b>)</span>
        </Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>E-mail</Label>
        <Input type="email" placeholder="Your e-mail" info='Default e-mail validation' required validate clearButton></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>URL</Label>
        <Input type="url" placeholder="Your URL" info='Default URL validation' required validate clearButton></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Label>Number</Label>
        <Input type="text" placeholder="Enter number" info='With custom error message' errorMessage="Only numbers please!" required validate pattern="[0-9]*" clearButton></Input>
      </ListItem>

    </List>

    <BlockTitle>Icon + Input</BlockTitle>
    <List noHairlinesMd>
      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Input type="text" placeholder="Your name" clearButton></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Input type="password" placeholder="Your password" clearButton></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Input type="email" placeholder="Your e-mail" clearButton></Input>
      </ListItem>

      <ListItem>
        <Icon icon="demo-list-icon" slot="media"></Icon>
        <Input type="url" placeholder="URL" clearButton></Input>
      </ListItem>

    </List>

    <BlockTitle>Label + Input</BlockTitle>
    <List noHairlinesMd>
      <ListItem>
        <Label>Name</Label>
        <Input type="text" placeholder="Your name" clearButton></Input>
      </ListItem>

      <ListItem>
        <Label>Password</Label>
        <Input type="password" placeholder="Your password" clearButton></Input>
      </ListItem>

      <ListItem>
        <Label>E-mail</Label>
        <Input type="email" placeholder="Your e-mail" clearButton></Input>
      </ListItem>

      <ListItem>
        <Label>URL</Label>
        <Input type="url" placeholder="URL" clearButton></Input>
      </ListItem>
    </List>

    <BlockTitle>Only Inputs</BlockTitle>
    <List noHairlinesMd>
      <ListItem>
        <Input type="text" placeholder="Your name" clearButton></Input>
      </ListItem>

      <ListItem>
        <Input type="password" placeholder="Your password" clearButton></Input>
      </ListItem>

      <ListItem>
        <Input type="email" placeholder="Your e-mail" clearButton></Input>
      </ListItem>

      <ListItem>
        <Input type="url" placeholder="URL" clearButton></Input>
      </ListItem>
    </List>

    <BlockTitle>Inputs + Additional Info</BlockTitle>
    <List noHairlinesMd>
      <ListItem>
        <Input type="text" placeholder="Your name" info="Full name please" clearButton></Input>
      </ListItem>

      <ListItem>
        <Input type="password" placeholder="Your password" info="8 characters minimum" clearButton></Input>
      </ListItem>

      <ListItem>
        <Input type="email" placeholder="Your e-mail" info="Your work e-mail address" clearButton></Input>
      </ListItem>

      <ListItem>
        <Input type="url" placeholder="URL" info="Your website URL" clearButton></Input>
      </ListItem>
    </List>

    <BlockTitle>Only Inputs Inset</BlockTitle>
    <List inset>
      <ListItem>
        <Input type="text" placeholder="Your name" clearButton></Input>
      </ListItem>

      <ListItem>
        <Input type="password" placeholder="Your password" clearButton></Input>
      </ListItem>

      <ListItem>
        <Input type="email" placeholder="Your e-mail" clearButton></Input>
      </ListItem>

      <ListItem>
        <Input type="url" placeholder="URL" clearButton></Input>
      </ListItem>
    </List>
  </Page>
);
