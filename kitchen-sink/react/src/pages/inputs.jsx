import React from 'react';
import { Navbar, Page, BlockTitle, List, Icon, ListInput, Range } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Form Inputs" backLink="Back"></Navbar>
    <BlockTitle>Full Layout / Inline Labels</BlockTitle>
    <List inlineLabels noHairlinesMd>
      <ListInput
        label="Name"
        type="text"
        placeholder="Your name"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="Password"
        type="password"
        placeholder="Your password"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="E-mail"
        type="email"
        placeholder="Your e-mail"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="URL"
        type="url"
        placeholder="URL"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="Phone"
        type="tel"
        placeholder="Your phone number"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="Gender"
        type="select"
        defaultValue="Male"
        placeholder="Please choose..."
      >
        <Icon icon="demo-list-icon" slot="media"/>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </ListInput>

      <ListInput
        label="Birthday"
        type="date"
        defaultValue="2014-04-30"
        placeholder="Please choose..."
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="Date time"
        type="datetime-local"
        placeholder="Please choose..."
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="Range"
        input={false}
      >
        <Icon icon="demo-list-icon" slot="media"/>
        <Range slot="input" value={50} min={0} max={100} step={1}/>
      </ListInput>

      <ListInput
        label="Textarea"
        type="textarea"
        placeholder="Bio"
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="Resizable"
        type="textarea"
        resizable
        placeholder="Bio"
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

    </List>

    <BlockTitle>Full Layout / Stacked Labels</BlockTitle>
    <List noHairlinesMd>
      <ListInput
        label="Name"
        type="text"
        placeholder="Your name"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="Password"
        type="password"
        placeholder="Your password"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="E-mail"
        type="email"
        placeholder="Your e-mail"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="URL"
        type="url"
        placeholder="URL"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="Phone"
        type="tel"
        placeholder="Your phone number"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="Gender"
        type="select"
        defaultValue="Male"
        placeholder="Please choose..."
      >
        <Icon icon="demo-list-icon" slot="media"/>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </ListInput>

      <ListInput
        label="Birthday"
        type="date"
        defaultValue="2014-04-30"
        placeholder="Please choose..."
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="Date time"
        type="datetime-local"
        placeholder="Please choose..."
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="Range"
        input={false}
      >
        <Icon icon="demo-list-icon" slot="media"/>
        <Range slot="input" value={50} min={0} max={100} step={1}/>
      </ListInput>

      <ListInput
        label="Textarea"
        type="textarea"
        placeholder="Bio"
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="Resizable"
        type="textarea"
        resizable
        placeholder="Bio"
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>
    </List>

    <BlockTitle>Floating Labels</BlockTitle>
    <List noHairlinesMd>
      <ListInput
        label="Name"
        floatingLabel
        type="text"
        placeholder="Your name"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="Password"
        floatingLabel
        type="password"
        placeholder="Your password"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="E-mail"
        floatingLabel
        type="email"
        placeholder="Your e-mail"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="URL"
        floatingLabel
        type="url"
        placeholder="URL"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="Phone"
        floatingLabel
        type="tel"
        placeholder="Your phone number"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="Resizable"
        floatingLabel
        type="textarea"
        resizable
        placeholder="Bio"
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>
    </List>

    <BlockTitle>Floating Labels + Outline Inputs</BlockTitle>
    <List noHairlinesMd>
      <ListInput
        outline
        label="Name"
        floatingLabel
        type="text"
        placeholder="Your name"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media" />
      </ListInput>
      <ListInput
        outline
        label="Password"
        floatingLabel
        type="password"
        placeholder="Your password"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media" />
      </ListInput>
      <ListInput
        outline
        label="E-mail"
        floatingLabel
        type="email"
        placeholder="Your e-mail"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media" />
      </ListInput>
      <ListInput
        outline
        label="URL"
        floatingLabel
        type="url"
        placeholder="URL"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media" />
      </ListInput>
      <ListInput
        outline
        label="Phone"
        floatingLabel
        type="tel"
        placeholder="Your phone number"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media" />
      </ListInput>
      <ListInput
        outline
        label="Bio"
        floatingLabel
        type="textarea"
        resizable
        placeholder="Bio"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media" />
      </ListInput>
    </List>

    <BlockTitle>Validation + Additional Info</BlockTitle>
    <List noHairlinesMd>
      <ListInput
        label="Name"
        type="text"
        placeholder="Your name"
        info="Default validation"
        required
        validate
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="Fruit"
        type="text"
        placeholder="Type 'apple' or 'banana'"
        required
        validate
        pattern="apple|banana"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
        <span slot="info">Pattern validation (<b>apple|banana</b>)</span>
      </ListInput>

      <ListInput
        label="E-mail"
        type="email"
        placeholder="Your e-mail"
        info="Default e-mail validation"
        required
        validate
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="URL"
        type="url"
        placeholder="Your URL"
        info="Default URL validation"
        required
        validate
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        label="Number"
        type="text"
        placeholder="Enter number"
        info="With custom error message"
        errorMessage="Only numbers please!"
        required
        validate
        pattern="[0-9]*"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

    </List>

    <BlockTitle>Icon + Input</BlockTitle>
    <List noHairlinesMd>
      <ListInput
        type="text"
        placeholder="Your name"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        type="password"
        placeholder="Your password"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        type="email"
        placeholder="Your e-mail"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

      <ListInput
        type="url"
        placeholder="URL"
        clearButton
      >
        <Icon icon="demo-list-icon" slot="media"/>
      </ListInput>

    </List>

    <BlockTitle>Label + Input</BlockTitle>
    <List noHairlinesMd>
      <ListInput
        label="Name"
        type="text"
        placeholder="Your name"
        clearButton
      />

      <ListInput
        label="Password"
        type="password"
        placeholder="Your password"
        clearButton
      />

      <ListInput
        label="E-mail"
        type="email"
        placeholder="Your e-mail"
        clearButton
      />

      <ListInput
        label="URL"
        type="url"
        placeholder="URL"
        clearButton
      />
    </List>

    <BlockTitle>Only Inputs</BlockTitle>
    <List noHairlinesMd>
      <ListInput
        type="text"
        placeholder="Your name"
        clearButton
      />

      <ListInput
        type="password"
        placeholder="Your password"
        clearButton
      />

      <ListInput
        type="email"
        placeholder="Your e-mail"
        clearButton
      />

      <ListInput
        type="url"
        placeholder="URL"
        clearButton
      />
    </List>

    <BlockTitle>Inputs + Additional Info</BlockTitle>
    <List noHairlinesMd>
      <ListInput
        type="text"
        placeholder="Your name"
        info="Full name please"
        clearButton
      />

      <ListInput
        type="password"
        placeholder="Your password"
        info="8 characters minimum"
        clearButton
      />

      <ListInput
        type="email"
        placeholder="Your e-mail"
        info="Your work e-mail address"
        clearButton
      />

      <ListInput
        type="url"
        placeholder="URL"
        info="Your website URL"
        clearButton
      />
    </List>

    <BlockTitle>Only Inputs Inset</BlockTitle>
    <List inset>
      <ListInput
        type="text"
        placeholder="Your name"
        clearButton
      />

      <ListInput
        type="password"
        placeholder="Your password"
        clearButton
      />

      <ListInput
        type="email"
        placeholder="Your e-mail"
        clearButton
      />

      <ListInput
        type="url"
        placeholder="URL"
        clearButton
      />
    </List>
  </Page>
);
