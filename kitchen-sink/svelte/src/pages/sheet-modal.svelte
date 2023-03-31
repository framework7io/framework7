<script>
  import {
    f7,
    Page,
    Navbar,
    Sheet,
    PageContent,
    Toolbar,
    BlockTitle,
    Block,
    Button,
    Link,
    List,
    ListItem,
  } from 'framework7-svelte';

  let sheetOpened = false;
  let dynamicSheet;

  function toggleSwipeStep() {
    f7.sheet.stepToggle('.demo-sheet-swipe-to-step');
  }
  function createSheet() {
    const $ = f7.$;
    // Create sheet modal
    if (!dynamicSheet) {
      dynamicSheet = f7.sheet.create({
        content: `
          <div class="sheet-modal sheet-modal-bottom">
            <div class="toolbar">
              <div class="toolbar-inner justify-content-flex-end">
                <a  class="link sheet-close">Close</a>
              </div>
            </div>
            <div class="sheet-modal-inner">
              <div class="page-content">
                <div class="block">
                  <p>This sheet modal was created dynamically</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.</p>
                </div>
              </div>
            </div>
          </div>
        `.trim(),
      });
    }
    // Close inline sheet
    if ($('.demo-sheet.modal-in').length > 0) f7.sheet.close('.demo-sheet');
    // Open it
    dynamicSheet.open();
  }
  function onPageBeforeOut() {
    // Close opened sheets on page out
    f7.sheet.close();
  }
  function onPageBeforeRemove() {
    // Destroy sheet modal when page removed
    if (dynamicSheet) dynamicSheet.destroy();
  }
</script>

<Page {onPageBeforeOut} {onPageBeforeRemove}>
  <Navbar title="Sheet Modal" backLink="Back" />
  <Block strongIos outlineIos>
    <p>
      Sheet Modals slide up from the bottom of the screen to reveal more content. Such modals allow
      to create custom overlays with custom content.
    </p>
    <p class="grid grid-cols-2 grid-gap">
      <Button fill sheetOpen=".demo-sheet">Open Sheet</Button>
      <Button fill onClick={createSheet}>Dynamic Sheet</Button>
    </p>
    <p>
      <Button fill sheetOpen=".demo-sheet-top">Top Sheet</Button>
    </p>
    <p>
      <Button fill onClick={() => (sheetOpened = true)}>Open Via Prop Change</Button>
    </p>
  </Block>

  <BlockTitle>Push View</BlockTitle>
  <Block strongIos outlineIos>
    <p>
      Sheet can push view behind on open. By default it has effect only when `safe-area-inset-top`
      is more than zero (iOS fullscreen webapp or iOS cordova app)
    </p>
    <p>
      <Button fill sheetOpen=".demo-sheet-push">Sheet Push</Button>
    </p>
  </Block>

  <BlockTitle>Swipeable Sheet</BlockTitle>
  <Block strongIos outlineIos>
    <p>
      Sheet modal can be closed with swipe to top (for top Sheet) or bottom (for default Bottom
      sheet):
    </p>
    <p>
      <Button fill sheetOpen=".demo-sheet-swipe-to-close">Swipe To Close</Button>
    </p>
    <p>Also there is swipe-step that can be set on Sheet modal to expand it with swipe:</p>
    <p>
      <Button fill sheetOpen=".demo-sheet-swipe-to-step">Swipe To Step</Button>
    </p>
  </Block>

  <Sheet class="demo-sheet" opened={sheetOpened} onSheetClosed={() => (sheetOpened = false)}>
    <Toolbar>
      <div class="left" />
      <div class="right">
        <Link sheetClose>Close</Link>
      </div>
    </Toolbar>
    <PageContent>
      <Block>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae ducimus dolorum ipsa
          aliquid accusamus perferendis laboriosam delectus numquam minima animi, libero illo in
          tempora harum sequi corporis alias ex adipisci.
        </p>
        <p>
          Sunt magni enim saepe quasi aspernatur delectus consectetur fugiat necessitatibus qui sed,
          similique quis facere tempora, laudantium quae expedita ea, aperiam dolores. Aut deserunt
          soluta alias magnam. Consequatur, nisi, enim.
        </p>
        <p>
          Eaque maiores ducimus, impedit unde culpa qui, explicabo accusamus, non vero corporis
          voluptatibus similique odit ab. Quaerat quasi consectetur quidem libero? Repudiandae
          adipisci vel voluptatum, autem libero minus dignissimos repellat.
        </p>
        <p>
          Iusto, est corrupti! Totam minus voluptas natus esse possimus nobis, delectus veniam
          expedita sapiente ut cum reprehenderit aliquid odio amet praesentium vero temporibus
          obcaecati beatae aspernatur incidunt, perferendis voluptates doloribus?
        </p>
        <p>
          Illum id laborum tempore, doloribus culpa labore ex iusto odit. Quibusdam consequuntur
          totam nam obcaecati, enim cumque nobis, accusamus, quos voluptates, voluptatibus sapiente
          repellendus nesciunt praesentium velit ipsa illo iusto.
        </p>
      </Block>
    </PageContent>
  </Sheet>

  <Sheet top class="demo-sheet-top">
    <Toolbar bottom>
      <div class="left" />
      <div class="right">
        <Link sheetClose>Close</Link>
      </div>
    </Toolbar>
    <PageContent>
      <Block>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae ducimus dolorum ipsa
          aliquid accusamus perferendis laboriosam delectus numquam minima animi, libero illo in
          tempora harum sequi corporis alias ex adipisci.
        </p>
        <p>
          Sunt magni enim saepe quasi aspernatur delectus consectetur fugiat necessitatibus qui sed,
          similique quis facere tempora, laudantium quae expedita ea, aperiam dolores. Aut deserunt
          soluta alias magnam. Consequatur, nisi, enim.
        </p>
        <p>
          Eaque maiores ducimus, impedit unde culpa qui, explicabo accusamus, non vero corporis
          voluptatibus similique odit ab. Quaerat quasi consectetur quidem libero? Repudiandae
          adipisci vel voluptatum, autem libero minus dignissimos repellat.
        </p>
        <p>
          Iusto, est corrupti! Totam minus voluptas natus esse possimus nobis, delectus veniam
          expedita sapiente ut cum reprehenderit aliquid odio amet praesentium vero temporibus
          obcaecati beatae aspernatur incidunt, perferendis voluptates doloribus?
        </p>
        <p>
          Illum id laborum tempore, doloribus culpa labore ex iusto odit. Quibusdam consequuntur
          totam nam obcaecati, enim cumque nobis, accusamus, quos voluptates, voluptatibus sapiente
          repellendus nesciunt praesentium velit ipsa illo iusto.
        </p>
      </Block>
    </PageContent>
  </Sheet>

  <Sheet class="demo-sheet-push" push>
    <Toolbar>
      <div class="left" />
      <div class="right">
        <Link sheetClose>Close</Link>
      </div>
    </Toolbar>
    <PageContent>
      <Block>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae ducimus dolorum ipsa
          aliquid accusamus perferendis laboriosam delectus numquam minima animi, libero illo in
          tempora harum sequi corporis alias ex adipisci.
        </p>
        <p>
          Sunt magni enim saepe quasi aspernatur delectus consectetur fugiat necessitatibus qui sed,
          similique quis facere tempora, laudantium quae expedita ea, aperiam dolores. Aut deserunt
          soluta alias magnam. Consequatur, nisi, enim.
        </p>
        <p>
          Eaque maiores ducimus, impedit unde culpa qui, explicabo accusamus, non vero corporis
          voluptatibus similique odit ab. Quaerat quasi consectetur quidem libero? Repudiandae
          adipisci vel voluptatum, autem libero minus dignissimos repellat.
        </p>
        <p>
          Iusto, est corrupti! Totam minus voluptas natus esse possimus nobis, delectus veniam
          expedita sapiente ut cum reprehenderit aliquid odio amet praesentium vero temporibus
          obcaecati beatae aspernatur incidunt, perferendis voluptates doloribus?
        </p>
        <p>
          Illum id laborum tempore, doloribus culpa labore ex iusto odit. Quibusdam consequuntur
          totam nam obcaecati, enim cumque nobis, accusamus, quos voluptates, voluptatibus sapiente
          repellendus nesciunt praesentium velit ipsa illo iusto.
        </p>
      </Block>
    </PageContent>
  </Sheet>

  <Sheet class="demo-sheet-swipe-to-close" style="height: auto" swipeToClose push backdrop>
    <div class="swipe-handler" />

    <PageContent>
      <BlockTitle large>Hello!</BlockTitle>
      <Block>
        <p>
          Eaque maiores ducimus, impedit unde culpa qui, explicabo accusamus, non vero corporis
          voluptatibus similique odit ab. Quaerat quasi consectetur quidem libero? Repudiandae
          adipisci vel voluptatum, autem libero minus dignissimos repellat.
        </p>
        <p>
          Iusto, est corrupti! Totam minus voluptas natus esse possimus nobis, delectus veniam
          expedita sapiente ut cum reprehenderit aliquid odio amet praesentium vero temporibus
          obcaecati beatae aspernatur incidunt, perferendis voluptates doloribus?
        </p>
      </Block>
    </PageContent>
  </Sheet>

  <Sheet
    class="demo-sheet-swipe-to-step"
    style="height: auto"
    swipeToClose
    swipeToStep
    push
    backdrop
  >
    <div class="swipe-handler" on:click={() => toggleSwipeStep()} />
    <div class="sheet-modal-swipe-step">
      <div class="display-flex padding justify-content-space-between align-items-center">
        <div style="font-size: 18px"><b>Total:</b></div>
        <div style="font-size: 22px"><b>$500</b></div>
      </div>
      <div class="padding-horizontal padding-bottom">
        <Button large fill>Make Payment</Button>
        <div class="margin-top text-align-center">Swipe up for more details</div>
      </div>
    </div>
    <BlockTitle medium class="margin-top">Your order:</BlockTitle>
    <List>
      <ListItem title="Item 1"><b slot="after">$200</b></ListItem>
      <ListItem title="Item 2"><b slot="after">$180</b></ListItem>
      <ListItem title="Delivery"><b slot="after">$120</b></ListItem>
    </List>
  </Sheet>
</Page>
