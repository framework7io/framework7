<Page>
  <Navbar title="Accordion" backLink="Back" />

  <BlockTitle>List View Accordion</BlockTitle>
  <List accordionList>
    <ListItem accordionItem title="Lorem Ipsum">
      <AccordionContent>
        <Block>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.
          </p>
        </Block>
      </AccordionContent>
    </ListItem>
    <ListItem accordionItem title="Nested List">
      <AccordionContent>
        <List>
          <ListItem title="Item 1"></ListItem>
          <ListItem title="Item 2"></ListItem>
          <ListItem title="Item 3"></ListItem>
          <ListItem title="Item 4"></ListItem>
        </List>
      </AccordionContent>
    </ListItem>
    <ListItem accordionItem title="Integer semper">
      <AccordionContent>
        <Block>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.
          </p>
        </Block>
      </AccordionContent>
    </ListItem>
  </List>

  <BlockTitle>Inset Accordion</BlockTitle>
  <List accordionList inset>
    <ListItem accordionItem title="Lorem Ipsum">
      <AccordionContent>
        <Block>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.
          </p>
        </Block>
      </AccordionContent>
    </ListItem>
    <ListItem accordionItem title="Nested List">
      <AccordionContent>
        <List>
          <ListItem title="Item 1"></ListItem>
          <ListItem title="Item 2"></ListItem>
          <ListItem title="Item 3"></ListItem>
          <ListItem title="Item 4"></ListItem>
        </List>
      </AccordionContent>
    </ListItem>
    <ListItem accordionItem title="Integer semper">
      <AccordionContent>
        <Block>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.
          </p>
        </Block>
      </AccordionContent>
    </ListItem>
  </List>


  <BlockTitle>Opposite Side</BlockTitle>
  <List accordionList accordionOpposite>
    <ListItem accordionItem title="Lorem Ipsum">
      <AccordionContent>
        <Block>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.
          </p>
        </Block>
      </AccordionContent>
    </ListItem>
    <ListItem accordionItem title="Nested List">
      <AccordionContent>
        <List>
          <ListItem title="Item 1"></ListItem>
          <ListItem title="Item 2"></ListItem>
          <ListItem title="Item 3"></ListItem>
          <ListItem title="Item 4"></ListItem>
        </List>
      </AccordionContent>
    </ListItem>
    <ListItem accordionItem title="Integer semper">
      <AccordionContent>
        <Block>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.
          </p>
        </Block>
      </AccordionContent>
    </ListItem>
  </List>

  <BlockTitle>Custom Collapsible</BlockTitle>
  <Block inner accordionList>
    {#each [0,1,2] as n}
      <AccordionItem>
        <AccordionToggle><b>Item {n + 1}</b></AccordionToggle>
        <AccordionContent>Content {n + 1}</AccordionContent>
      </AccordionItem>
    {/each}
  </Block>
</Page>
<script>
  import {
    Page,
    Navbar,
    BlockTitle,
    Block,
    List,
    ListItem,
    AccordionContent,
    AccordionItem,
    AccordionToggle
  } from 'framework7-svelte';
</script>
