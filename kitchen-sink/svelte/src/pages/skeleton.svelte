<script>
  import {
    Page,
    Navbar,
    BlockTitle,
    Block,
    List,
    ListItem,
    Card,
    SkeletonBlock,
    Button,
  } from 'framework7-svelte';

  let loading = false;
  let effect = null;

  function load(newEffect) {
    if (loading) return;
    effect = newEffect;
    loading = true;
    setTimeout(() => {
      loading = false;
    }, 3000);
  }
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<Page>
  <Navbar title="Skeleton Elements" backLink="Back" />
  <Block strongIos outlineIos>
    <p>
      Skeleton (or Ghost) elements designed to improve perceived performance and make app feels
      faster.
    </p>
    <p>
      Framework7 comes with two types of such elements: Skeleton Block and Skeleton Text. Skeleton
      block is a gray box that can be used as placeholder for any element. Skeleton text uses
      special built-in skeleton font to render each character of such text as gray rectangle.
      Skeleton text allows to make such elements responsive and feel more natural.
    </p>
    <p>It can be used in any places and with any elements.</p>
  </Block>

  <BlockTitle>Skeleton List</BlockTitle>
  <List strongIos outlineIos dividersIos mediaList class="skeleton-text">
    <ListItem
      title="Title"
      subtitle="Subtitle"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum."
    >
      <span slot="media">
        <SkeletonBlock style="width: 40px; height: 40px; border-radius: 50%" />
      </span>
    </ListItem>
    <ListItem
      title="Title"
      subtitle="Subtitle"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum."
    >
      <span slot="media">
        <SkeletonBlock style="width: 40px; height: 40px; border-radius: 50%" />
      </span>
    </ListItem>
  </List>

  <BlockTitle>Skeleton Card</BlockTitle>
  <Card
    outline
    class="skeleton-text"
    title="Card Header"
    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit."
    footer="Card Footer"
  />

  <BlockTitle>Loading Effects</BlockTitle>
  <Block strongIos outlineIos>
    <p>It supports few loading effects:</p>
    <p class="grid grid-cols-3 grid-gap">
      <Button fill small round onClick={() => load('fade')}>Fade</Button>
      <Button fill small round onClick={() => load('wave')}>Wave</Button>
      <Button fill small round onClick={() => load('pulse')}>Pulse</Button>
    </p>
  </Block>
  {#if loading}
    <List strongIos outlineIos dividersIos mediaList v-if="loading">
      {#each [1, 2, 3] as n}
        <ListItem
          key={n}
          class={`skeleton-text skeleton-effect-${effect}`}
          title="Full Name"
          subtitle="Position"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit. Aliquam vestibulum vitae lorem ac iaculis. Praesent nec pharetra massa, at blandit lectus. Sed tincidunt, lectus eu convallis elementum, nibh nisi aliquet urna, nec imperdiet felis sapien at enim."
        >
          <span slot="media">
            <SkeletonBlock style="width: 40px; height: 40px; border-radius: 50%" />
          </span>
        </ListItem>
      {/each}
    </List>
  {:else}
    <List strongIos outlineIos dividersIos mediaList>
      <ListItem
        title="John Doe"
        subtitle="CEO"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit. Aliquam vestibulum vitae lorem ac iaculis. Praesent nec pharetra massa, at blandit lectus. Sed tincidunt, lectus eu convallis elementum, nibh nisi aliquet urna, nec imperdiet felis sapien at enim."
      >
        <img
          src="https://placeimg.com/80/80/people/1"
          style="width: 40px; height: 40px; border-radius: 50%"
          slot="media"
        />
      </ListItem>
      <ListItem
        title="Jane Doe"
        subtitle="Marketing"
        text="Cras consequat felis at consequat hendrerit. Aliquam vestibulum vitae lorem ac iaculis. Praesent nec pharetra massa, at blandit lectus. Sed tincidunt, lectus eu convallis elementum, nibh nisi aliquet urna, nec imperdiet felis sapien at enim."
      >
        <img
          src="https://placeimg.com/80/80/people/2"
          style="width: 40px; height: 40px; border-radius: 50%"
          slot="media"
        />
      </ListItem>
      <ListItem
        title="Kate Johnson"
        subtitle="Admin"
        text="Sed tincidunt, lectus eu convallis elementum, nibh nisi aliquet urna, nec imperdiet felis sapien at enim."
      >
        <img
          src="https://placeimg.com/80/80/people/3"
          style="width: 40px; height: 40px; border-radius: 50%"
          slot="media"
        />
      </ListItem>
    </List>
  {/if}
</Page>
