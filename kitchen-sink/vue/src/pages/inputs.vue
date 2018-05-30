<template>
  <f7-page>
    <f7-navbar title="Form Inputs" back-link="Back"></f7-navbar>
    <f7-block-title>Full Layout / Inline Labels</f7-block-title>
    <f7-list inline-labels no-hairlines-md>
      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Name</f7-label>
        <f7-input type="text" placeholder="Your name" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Password</f7-label>
        <f7-input type="password" placeholder="Your password" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>E-mail</f7-label>
        <f7-input type="email" placeholder="Your e-mail" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>URL</f7-label>
        <f7-input type="url" placeholder="URL" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Phone</f7-label>
        <f7-input type="tel" placeholder="Your phone number" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Gender</f7-label>
        <f7-input type="select" placeholder="Please choose...">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Birthday</f7-label>
        <f7-input type="date" value="2014-04-30" placeholder="Please choose..."></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Date time</f7-label>
        <f7-input type="datetime-local" placeholder="Please choose..."></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Range</f7-label>
        <f7-input type="range" value="50" min="0" max="100" step="1"></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Textarea</f7-label>
        <f7-input type="textarea" placeholder="Bio"></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Resizable</f7-label>
        <f7-input type="textarea" resizable placeholder="Bio"></f7-input>
      </f7-list-item>

    </f7-list>

    <f7-block-title>Full Layout / Stacked Labels</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Name</f7-label>
        <f7-input type="text" placeholder="Your name" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Password</f7-label>
        <f7-input type="password" placeholder="Your password" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>E-mail</f7-label>
        <f7-input type="email" placeholder="Your e-mail" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>URL</f7-label>
        <f7-input type="url" placeholder="URL" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Phone</f7-label>
        <f7-input type="tel" placeholder="Your phone number" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Gender</f7-label>
        <f7-input type="select" placeholder="Please choose...">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Birthday</f7-label>
        <f7-input type="date" value="2014-04-30" placeholder="Please choose..."></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Date time</f7-label>
        <f7-input type="datetime-local" placeholder="Please choose..."></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Range</f7-label>
        <f7-input type="range" value="50" min="0" max="100" step="1"></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Textarea</f7-label>
        <f7-input type="textarea" placeholder="Bio"></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Resizable</f7-label>
        <f7-input type="textarea" resizable placeholder="Bio"></f7-input>
      </f7-list-item>
    </f7-list>

    <f7-block-title>Floating Labels (MD-theme only)</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label floating>Name</f7-label>
        <f7-input type="text" placeholder="Your name" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label floating>Password</f7-label>
        <f7-input type="password" placeholder="Your password" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label floating>E-mail</f7-label>
        <f7-input type="email" placeholder="Your e-mail" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label floating>URL</f7-label>
        <f7-input type="url" placeholder="URL" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label floating>Phone</f7-label>
        <f7-input type="tel" placeholder="Your phone number" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label floating>Bio</f7-label>
        <f7-input type="textarea" placeholder="Bio" resizable></f7-input>
      </f7-list-item>
    </f7-list>

    <f7-block-title>Validation + Additional Info</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Name</f7-label>
        <f7-input type="text" placeholder="Your name" info='Default "required" validation' required validate clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Fruit</f7-label>
        <f7-input type="text" placeholder="Type 'apple' or 'banana'" required validate pattern="apple|banana" clear-button>
          <span slot="info">Pattern validation (<b>apple|banana</b>)</span>
        </f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>E-mail</f7-label>
        <f7-input type="email" placeholder="Your e-mail" info='Default e-mail validation' required validate clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>URL</f7-label>
        <f7-input type="url" placeholder="Your URL" info='Default URL validation' required validate clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-label>Number</f7-label>
        <f7-input type="text" placeholder="Enter number" info='With custom error message' error-message="Only numbers please!" required validate pattern="[0-9]*" clear-button></f7-input>
      </f7-list-item>

    </f7-list>

    <f7-block-title>Icon + Input</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-input type="text" placeholder="Your name" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-input type="password" placeholder="Your password" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-input type="email" placeholder="Your e-mail" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-input type="url" placeholder="URL" clear-button></f7-input>
      </f7-list-item>

    </f7-list>

    <f7-block-title>Label + Input</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-item>
        <f7-label>Name</f7-label>
        <f7-input type="text" placeholder="Your name" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-label>Password</f7-label>
        <f7-input type="password" placeholder="Your password" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-label>E-mail</f7-label>
        <f7-input type="email" placeholder="Your e-mail" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-label>URL</f7-label>
        <f7-input type="url" placeholder="URL" clear-button></f7-input>
      </f7-list-item>
    </f7-list>

    <f7-block-title>Only Inputs</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-item>
        <f7-input type="text" placeholder="Your name" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-input type="password" placeholder="Your password" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-input type="email" placeholder="Your e-mail" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-input type="url" placeholder="URL" clear-button></f7-input>
      </f7-list-item>
    </f7-list>

    <f7-block-title>Inputs + Additional Info</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-item>
        <f7-input type="text" placeholder="Your name" info="Full name please" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-input type="password" placeholder="Your password" info="8 characters minimum" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-input type="email" placeholder="Your e-mail" info="Your work e-mail address" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-input type="url" placeholder="URL" info="Your website URL" clear-button></f7-input>
      </f7-list-item>
    </f7-list>

    <f7-block-title>Only Inputs Inset</f7-block-title>
    <f7-list inset>
      <f7-list-item>
        <f7-input type="text" placeholder="Your name" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-input type="password" placeholder="Your password" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-input type="email" placeholder="Your e-mail" clear-button></f7-input>
      </f7-list-item>

      <f7-list-item>
        <f7-input type="url" placeholder="URL" clear-button></f7-input>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle, f7List, f7ListItem, f7Icon, f7Label, f7Input } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
      f7List,
      f7ListItem,
      f7Icon,
      f7Label,
      f7Input,
    },
  };
</script>
