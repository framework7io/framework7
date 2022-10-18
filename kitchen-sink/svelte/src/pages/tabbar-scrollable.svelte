<script>
  import { Navbar, Page, Block, Tabs, Tab, Link, Toolbar, NavRight } from 'framework7-svelte';

  let toolbarPosition = 'bottom';
  const tabs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  function toggleToolbarPosition() {
    toolbarPosition = toolbarPosition === 'top' ? 'bottom' : 'top';
  }
</script>

<Page pageContent={false}>
  <Navbar title="Tabbar Scrollable" backLink="Back">
    <NavRight>
      <Link
        iconMd="material:compare_arrows"
        iconIos="f7:arrow_up_arrow_down_circle_fill"
        onClick={toggleToolbarPosition}
      />
    </NavRight>
  </Navbar>
  <Toolbar tabbar scrollable position={toolbarPosition}>
    {#each tabs as tab, index}
      <Link tabLink={`#tab-${tab}`} tabLinkActive={index === 0}>Tab {tab}</Link>
    {/each}
  </Toolbar>
  <Tabs>
    {#each tabs as tab, index}
      <Tab id={`tab-${tab}`} class="page-content" tabActive={index === 0}>
        <Block>
          <p><b>Tab {tab} content</b></p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque corrupti, quos
            asperiores unde aspernatur illum odio, eveniet. Fugiat magnam perspiciatis ex
            dignissimos, rerum modi ea nesciunt praesentium iusto optio rem?
          </p>
          <p>
            Illo debitis et recusandae, ipsum nisi nostrum vero delectus quasi. Quasi, consequatur!
            Corrupti, explicabo maxime incidunt fugit sint dicta saepe officiis sed expedita, minima
            porro! Ipsa dolores quia, delectus labore!
          </p>
          <p>
            At similique minima placeat magni molestias sunt deleniti repudiandae voluptatibus
            magnam quam esse reprehenderit dolor enim qui sed alias, laboriosam quaerat laborum iure
            repellat praesentium pariatur dolorum possimus veniam! Consectetur.
          </p>
          <p>
            Sunt, sed, magnam! Qui, suscipit. Beatae cum ullam necessitatibus eligendi, culpa rem
            excepturi consequatur quidem totam eum voluptates nihil, enim pariatur incidunt corporis
            sed facere magni earum tenetur rerum ea.
          </p>
          <p>
            Veniam nulla quis molestias voluptatem inventore consectetur iusto voluptatibus
            perferendis quisquam, cupiditate voluptates, tenetur vero magnam nisi animi praesentium
            atque adipisci optio quod aliquid vel delectus ad? Dicta deleniti, recusandae.
          </p>
        </Block>
      </Tab>
    {/each}
  </Tabs>
</Page>
