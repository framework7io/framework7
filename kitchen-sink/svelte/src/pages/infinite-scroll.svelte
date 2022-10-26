<script>
  import { Navbar, Page, BlockTitle, List, ListItem } from 'framework7-svelte';

  let items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  let allowInfinite = true;
  let showPreloader = true;

  function loadMore() {
    if (!allowInfinite) return;
    allowInfinite = false;

    setTimeout(() => {
      if (items.length >= 200) {
        showPreloader = false;
        return;
      }

      const itemsLength = items.length;

      for (let i = 1; i <= 20; i += 1) {
        items.push(itemsLength + i);
      }

      items = items;
      allowInfinite = true;
    }, 1000);
  }
</script>

<Page infinite infiniteDistance={50} infinitePreloader={showPreloader} onInfinite={loadMore}>
  <Navbar title="Infinite Scroll" backLink="Back" />
  <BlockTitle>Scroll bottom</BlockTitle>
  <List strongIos outlineIos dividersIos>
    {#each items as item, index (index)}
      <ListItem title={`Item ${item}`} />
    {/each}
  </List>
</Page>
