<script>
  import { Page, Navbar, BlockTitle, Block } from 'framework7-svelte';
</script>

<Page class="grid-demo">
  <Navbar title="Grid / Layout" backLink="Back" />

  <Block>
    <p>
      Columns within a row are automatically set to have equal width. Otherwise you can define your
      column with pourcentage of screen you want.
    </p>
  </Block>
  <BlockTitle>Columns with gap</BlockTitle>
  <Block>
    <div class="grid grid-cols-2 grid-gap">
      <div>2 cols</div>
      <div>2 cols</div>
    </div>
    <div class="grid grid-cols-4 grid-gap">
      <div>4 cols</div>
      <div>4 cols</div>
      <div>4 cols</div>
      <div>4 cols</div>
    </div>
    <div class="grid grid-cols-3 grid-gap">
      <div>3 cols</div>
      <div>3 cols</div>
      <div>3 cols</div>
    </div>
    <div class="grid grid-cols-5 grid-gap">
      <div>5 cols</div>
      <div>5 cols</div>
      <div>5 cols</div>
      <div>5 cols</div>
      <div>5 cols</div>
    </div>
  </Block>
  <BlockTitle>No gap between columns</BlockTitle>
  <Block>
    <div class="grid grid-cols-2">
      <div>2 cols</div>
      <div>2 cols</div>
    </div>
    <div class="grid grid-cols-4">
      <div>4 cols</div>
      <div>4 cols</div>
      <div>4 cols</div>
      <div>4 cols</div>
    </div>
    <div class="grid grid-cols-3">
      <div>3 cols</div>
      <div>3 cols</div>
      <div>3 cols</div>
    </div>
    <div class="grid grid-cols-5">
      <div>5 cols</div>
      <div>5 cols</div>
      <div>5 cols</div>
      <div>5 cols</div>
      <div>5 cols</div>
    </div>
  </Block>

  <BlockTitle>Responsive Grid</BlockTitle>
  <Block>
    <p>Grid cells have different size on Phone/Tablet</p>
    <div class="grid grid-cols-1 medium-grid-cols-2 grid-gap">
      <div>1 col / medium 2 cols</div>
      <div>1 col / medium 2 cols</div>
    </div>
    <div class="grid grid-cols-2 medium-grid-cols-4 grid-gap">
      <div>2 col / medium 4 cols</div>
      <div>2 col / medium 4 cols</div>
      <div>2 col / medium 4 cols</div>
      <div>2 col / medium 4 cols</div>
    </div>
  </Block>
</Page>
