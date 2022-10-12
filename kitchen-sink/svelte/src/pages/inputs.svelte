<script>
  import { Navbar, Page, BlockTitle, List, ListInput, Range } from 'framework7-svelte';
</script>

<Page>
  <Navbar title="Form Inputs" backLink="Back" />

  <BlockTitle>Full Layout / Stacked Labels</BlockTitle>
  <List strongIos dividersIos insetIos>
    <ListInput label="Name" type="text" placeholder="Your name" clearButton>
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>

    <ListInput label="Password" type="password" placeholder="Your password" clearButton>
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>

    <ListInput label="E-mail" type="email" placeholder="Your e-mail" clearButton>
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>

    <ListInput label="URL" type="url" placeholder="URL" clearButton>
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>

    <ListInput label="Phone" type="tel" placeholder="Your phone number" clearButton>
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>

    <ListInput label="Gender" type="select" value="Male" placeholder="Please choose...">
      <i class="icon demo-list-icon" slot="media" />
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </ListInput>

    <ListInput label="Birthday" type="date" value="2014-04-30" placeholder="Please choose...">
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>

    <ListInput label="Date time" type="datetime-local" placeholder="Please choose...">
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>

    <ListInput label="Range" input={false}>
      <i class="icon demo-list-icon" slot="media" />
      <span slot="input">
        <Range value={50} min={0} max={100} step={1} />
      </span>
    </ListInput>

    <ListInput label="Textarea" type="textarea" placeholder="Bio">
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>

    <ListInput label="Resizable" type="textarea" resizable placeholder="Bio">
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>
  </List>

  <BlockTitle>Floating Labels</BlockTitle>
  <List strongIos dividersIos insetIos>
    <ListInput label="Name" floatingLabel type="text" placeholder="Your name" clearButton>
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>

    <ListInput
      label="Password"
      floatingLabel
      type="password"
      placeholder="Your password"
      clearButton
    >
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>

    <ListInput label="E-mail" floatingLabel type="email" placeholder="Your e-mail" clearButton>
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>

    <ListInput label="URL" floatingLabel type="url" placeholder="URL" clearButton>
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>

    <ListInput label="Phone" floatingLabel type="tel" placeholder="Your phone number" clearButton>
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>

    <ListInput label="Resizable" floatingLabel type="textarea" resizable placeholder="Bio">
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>
  </List>

  <BlockTitle>Floating Labels + Outline Inputs</BlockTitle>
  <List strongIos dividersIos insetIos>
    <ListInput outline label="Name" floatingLabel type="text" placeholder="Your name" clearButton>
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>
    <ListInput
      outline
      label="Password"
      floatingLabel
      type="password"
      placeholder="Your password"
      clearButton
    >
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>
    <ListInput
      outline
      label="E-mail"
      floatingLabel
      type="email"
      placeholder="Your e-mail"
      clearButton
    >
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>
    <ListInput outline label="URL" floatingLabel type="url" placeholder="URL" clearButton>
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>
    <ListInput
      outline
      label="Phone"
      floatingLabel
      type="tel"
      placeholder="Your phone number"
      clearButton
    >
      <i class="icon demo-list-icon" slot="media" />
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
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>
  </List>

  <BlockTitle>Validation + Additional Info</BlockTitle>
  <List strongIos dividersIos insetIos>
    <ListInput
      label="Name"
      type="text"
      placeholder="Your name"
      info="Default validation"
      required
      validate
      clearButton
    >
      <i class="icon demo-list-icon" slot="media" />
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
      <i class="icon demo-list-icon" slot="media" />
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
      <i class="icon demo-list-icon" slot="media" />
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
      <i class="icon demo-list-icon" slot="media" />
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
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>
  </List>

  <BlockTitle>Icon + Input</BlockTitle>
  <List strongIos dividersIos insetIos>
    <ListInput type="text" placeholder="Your name" clearButton>
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>

    <ListInput type="password" placeholder="Your password" clearButton>
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>

    <ListInput type="email" placeholder="Your e-mail" clearButton>
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>

    <ListInput type="url" placeholder="URL" clearButton>
      <i class="icon demo-list-icon" slot="media" />
    </ListInput>
  </List>

  <BlockTitle>Label + Input</BlockTitle>
  <List strongIos dividersIos insetIos>
    <ListInput label="Name" type="text" placeholder="Your name" clearButton />

    <ListInput label="Password" type="password" placeholder="Your password" clearButton />

    <ListInput label="E-mail" type="email" placeholder="Your e-mail" clearButton />

    <ListInput label="URL" type="url" placeholder="URL" clearButton />
  </List>

  <BlockTitle>Only Inputs</BlockTitle>
  <List strongIos dividersIos insetIos>
    <ListInput type="text" placeholder="Your name" clearButton />

    <ListInput type="password" placeholder="Your password" clearButton />

    <ListInput type="email" placeholder="Your e-mail" clearButton />

    <ListInput type="url" placeholder="URL" clearButton />
  </List>

  <BlockTitle>Inputs + Additional Info</BlockTitle>
  <List strongIos dividersIos insetIos>
    <ListInput type="text" placeholder="Your name" info="Full name please" clearButton />

    <ListInput
      type="password"
      placeholder="Your password"
      info="8 characters minimum"
      clearButton
    />

    <ListInput type="email" placeholder="Your e-mail" info="Your work e-mail address" clearButton />

    <ListInput type="url" placeholder="URL" info="Your website URL" clearButton />
  </List>
</Page>
