<template>
  <f7-page>
    <f7-navbar title="Form Inputs" back-link="Back"></f7-navbar>
    <f7-block-title>Full Layout / Inline Labels</f7-block-title>
    <f7-list inline-labels no-hairlines-md>
      <f7-list-input
        label="Name"
        type="text"
        placeholder="Your name"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="Password"
        type="password"
        placeholder="Your password"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="E-mail"
        type="email"
        placeholder="Your e-mail"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="URL"
        type="url"
        placeholder="URL"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="Phone"
        type="tel"
        placeholder="Your phone number"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="Gender"
        type="select"
        defaultValue="Male"
        placeholder="Please choose..."
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </f7-list-input>

      <f7-list-input
        label="Birthday"
        type="date"
        defaultValue="2014-04-30"
        placeholder="Please choose..."
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="Date time"
        type="datetime-local"
        placeholder="Please choose..."
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="Range"
        :input="false"
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-range slot="input" :value="50" :min="0" :max="100" :step="1"></f7-range>
      </f7-list-input>

      <f7-list-input
        label="Textarea"
        type="textarea"
        placeholder="Bio"
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="Resizable"
        type="textarea"
        resizable
        placeholder="Bio"
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>
    </f7-list>

    <f7-block-title>Full Layout / Stacked Labels</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-input
        label="Name"
        type="text"
        placeholder="Your name"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="Password"
        type="password"
        placeholder="Your password"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="E-mail"
        type="email"
        placeholder="Your e-mail"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="URL"
        type="url"
        placeholder="URL"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="Phone"
        type="tel"
        placeholder="Your phone number"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="Gender"
        type="select"
        defaultValue="Male"
        placeholder="Please choose..."
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </f7-list-input>

      <f7-list-input
        label="Birthday"
        type="date"
        defaultValue="2014-04-30"
        placeholder="Please choose..."
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="Date time"
        type="datetime-local"
        placeholder="Please choose..."
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="Range"
        :input="false"
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <f7-range slot="input" :value="50" :min="0" :max="100" :step="1"></f7-range>
      </f7-list-input>

      <f7-list-input
        label="Textarea"
        type="textarea"
        placeholder="Bio"
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="Resizable"
        type="textarea"
        resizable
        placeholder="Bio"
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>
    </f7-list>

    <f7-block-title>Floating Labels</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-input
        label="Name"
        floating-label
        type="text"
        placeholder="Your name"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="Password"
        floating-label
        type="password"
        placeholder="Your password"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="E-mail"
        floating-label
        type="email"
        placeholder="Your e-mail"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="URL"
        floating-label
        type="url"
        placeholder="URL"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="Phone"
        floating-label
        type="tel"
        placeholder="Your phone number"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="Resizable"
        floating-label
        type="textarea"
        resizable
        placeholder="Bio"
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>
    </f7-list>

    <f7-block-title>Floating Labels + Outline Inputs</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-input
        outline
        label="Name"
        floating-label
        type="text"
        placeholder="Your name"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>
      <f7-list-input
        outline
        label="Password"
        floating-label
        type="password"
        placeholder="Your password"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>
      <f7-list-input
        outline
        label="E-mail"
        floating-label
        type="email"
        placeholder="Your e-mail"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>
      <f7-list-input
        outline
        label="URL"
        floating-label
        type="url"
        placeholder="URL"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>
      <f7-list-input
        outline
        label="Phone"
        floating-label
        type="tel"
        placeholder="Your phone number"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>
      <f7-list-input
        outline
        label="Bio"
        floating-label
        type="textarea"
        resizable
        placeholder="Bio"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>
    </f7-list>

    <f7-block-title>Validation + Additional Info</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-input
        label="Name"
        type="text"
        placeholder="Your name"
        info="Default validation"
        required
        validate
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="Fruit"
        type="text"
        placeholder="Type 'apple' or 'banana'"
        required
        validate
        pattern="apple|banana"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
        <span slot="info">Pattern validation (<b>apple|banana</b>)</span>
      </f7-list-input>

      <f7-list-input
        label="E-mail"
        type="email"
        placeholder="Your e-mail"
        info="Default e-mail validation"
        required
        validate
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="URL"
        type="url"
        placeholder="Your URL"
        info="Default URL validation"
        required
        validate
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="Number"
        type="text"
        placeholder="Enter number"
        info="With custom error message"
        error-message="Only numbers please!"
        required
        validate
        pattern="[0-9]*"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>
    </f7-list>

    <f7-block-title>Icon + Input</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-input
        type="text"
        placeholder="Your name"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        type="password"
        placeholder="Your password"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        type="email"
        placeholder="Your e-mail"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

      <f7-list-input
        type="url"
        placeholder="URL"
        clear-button
      >
        <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
      </f7-list-input>

    </f7-list>

    <f7-block-title>Label + Input</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-input
        label="Name"
        type="text"
        placeholder="Your name"
        clear-button
      ></f7-list-input>

      <f7-list-input
        label="Password"
        type="password"
        placeholder="Your password"
        clear-button
      ></f7-list-input>

      <f7-list-input
        label="E-mail"
        type="email"
        placeholder="Your e-mail"
        clear-button
      ></f7-list-input>

      <f7-list-input
        label="URL"
        type="url"
        placeholder="URL"
        clear-button
      ></f7-list-input>
    </f7-list>

    <f7-block-title>Only Inputs</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-input
        type="text"
        placeholder="Your name"
        clear-button
      ></f7-list-input>

      <f7-list-input
        type="password"
        placeholder="Your password"
        clear-button
      ></f7-list-input>

      <f7-list-input
        type="email"
        placeholder="Your e-mail"
        clear-button
      ></f7-list-input>

      <f7-list-input
        type="url"
        placeholder="URL"
        clear-button
      ></f7-list-input>
    </f7-list>

    <f7-block-title>Inputs + Additional Info</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-input
        type="text"
        placeholder="Your name"
        info="Full name please"
        clear-button
      ></f7-list-input>

      <f7-list-input
        type="password"
        placeholder="Your password"
        info="8 characters minimum"
        clear-button
      ></f7-list-input>

      <f7-list-input
        type="email"
        placeholder="Your e-mail"
        info="Your work e-mail address"
        clear-button
      ></f7-list-input>

      <f7-list-input
        type="url"
        placeholder="URL"
        info="Your website URL"
        clear-button
      ></f7-list-input>
    </f7-list>

    <f7-block-title>Only Inputs Inset</f7-block-title>
    <f7-list inset>
      <f7-list-input
        type="text"
        placeholder="Your name"
        clear-button
      ></f7-list-input>

      <f7-list-input
        type="password"
        placeholder="Your password"
        clear-button
      ></f7-list-input>

      <f7-list-input
        type="email"
        placeholder="Your e-mail"
        clear-button
      ></f7-list-input>

      <f7-list-input
        type="url"
        placeholder="URL"
        clear-button
      ></f7-list-input>
    </f7-list>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle, f7List, f7ListItem, f7Icon, f7ListInput, f7Range } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
      f7List,
      f7ListItem,
      f7Icon,
      f7ListInput,
      f7Range,
    },
  };
</script>
