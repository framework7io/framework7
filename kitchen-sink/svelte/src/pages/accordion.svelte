<script>
  import {
    Page,
    Navbar,
    BlockTitle,
    Block,
    List,
    ListItem,
    AccordionContent,
  } from 'framework7-svelte';
</script>

<Page>
  <Navbar title="Accordion" backLink="Back" />

  <BlockTitle>List View Accordion</BlockTitle>
  <List strong outlineIos dividersIos insetMd accordionList>
    <ListItem accordionItem title="Lorem Ipsum">
      <AccordionContent>
        <Block>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec
            commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper
            arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue
            dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.
          </p>
        </Block>
      </AccordionContent>
    </ListItem>
    <ListItem accordionItem title="Nested List">
      <AccordionContent>
        <List>
          <ListItem title="Item 1" />
          <ListItem title="Item 2" />
          <ListItem title="Item 3" />
          <ListItem title="Item 4" />
        </List>
      </AccordionContent>
    </ListItem>
    <ListItem accordionItem title="Integer semper">
      <AccordionContent>
        <Block>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec
            commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper
            arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue
            dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.
          </p>
        </Block>
      </AccordionContent>
    </ListItem>
  </List>

  <BlockTitle>Opposite Side</BlockTitle>
  <List strong outlineIos dividersIos insetMd accordionList accordionOpposite>
    <ListItem accordionItem title="Lorem Ipsum">
      <AccordionContent>
        <Block>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec
            commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper
            arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue
            dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.
          </p>
        </Block>
      </AccordionContent>
    </ListItem>
    <ListItem accordionItem title="Nested List">
      <AccordionContent>
        <List>
          <ListItem title="Item 1" />
          <ListItem title="Item 2" />
          <ListItem title="Item 3" />
          <ListItem title="Item 4" />
        </List>
      </AccordionContent>
    </ListItem>
    <ListItem accordionItem title="Integer semper">
      <AccordionContent>
        <Block>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec
            commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper
            arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue
            dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.
          </p>
        </Block>
      </AccordionContent>
    </ListItem>
  </List>
</Page>
