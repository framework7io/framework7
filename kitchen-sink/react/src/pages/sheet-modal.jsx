import React from 'react';
import { Page, Navbar, Sheet, PageContent, Toolbar, Block, Button, Link, Row } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sheetOpened: false,
    };
  }
  render() {
    return (
      <Page onPageBeforeOut={this.onPageBeforeOut.bind(this)} onPageBeforeRemove={this.onPageBeforeRemove.bind(this)}>
        <Navbar title="Sheet Modal" backLink="Back"></Navbar>
        <Block>
          <p>Sheet Modals slide up from the bottom of the screen to reveal more content. Such modals allow to create custom overlays with custom content.</p>
          <Row tag="p">
            <Button className="col" fill sheetOpen=".demo-sheet">Open Sheet</Button>
            <Button className="col" fill onClick={this.createSheet.bind(this)}>Create Dynamic Sheet</Button>
          </Row>
          <p>
            <Button className="col" fill onClick={() => {this.setState({sheetOpened: true})}}>Open Via Prop Change</Button>
          </p>
        </Block>

        <Sheet className="demo-sheet" opened={this.state.sheetOpened} onSheetClosed={() => {this.setState({sheetOpened: false})}}>
          <Toolbar>
            <div className="left"></div>
            <div className="right">
              <Link sheetClose>Close</Link>
            </div>
          </Toolbar>
          {/*  Scrollable sheet content */}
          <PageContent>
            <Block>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae ducimus dolorum ipsa aliquid accusamus perferendis laboriosam delectus numquam minima animi, libero illo in tempora harum sequi corporis alias ex adipisci.</p>
              <p>Sunt magni enim saepe quasi aspernatur delectus consectetur fugiat necessitatibus qui sed, similique quis facere tempora, laudantium quae expedita ea, aperiam dolores. Aut deserunt soluta alias magnam. Consequatur, nisi, enim.</p>
              <p>Eaque maiores ducimus, impedit unde culpa qui, explicabo accusamus, non vero corporis voluptatibus similique odit ab. Quaerat quasi consectetur quidem libero? Repudiandae adipisci vel voluptatum, autem libero minus dignissimos repellat.</p>
              <p>Iusto, est corrupti! Totam minus voluptas natus esse possimus nobis, delectus veniam expedita sapiente ut cum reprehenderit aliquid odio amet praesentium vero temporibus obcaecati beatae aspernatur incidunt, perferendis voluptates doloribus?</p>
              <p>Illum id laborum tempore, doloribus culpa labore ex iusto odit. Quibusdam consequuntur totam nam obcaecati, enim cumque nobis, accusamus, quos voluptates, voluptatibus sapiente repellendus nesciunt praesentium velit ipsa illo iusto.</p>
            </Block>
          </PageContent>
        </Sheet>
      </Page>
    );
  }
  createSheet() {
    const self = this;
    const $ = self.$$;
    // Create sheet modal
    if (!self.sheet) {
      self.sheet = self.$f7.sheet.create({
        content: `
          <div class="sheet-modal">
            <div class="toolbar">
              <div class="toolbar-inner justify-content-flex-end">
                <a href="#" class="link sheet-close">Close</a>
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
    if ($('.demo-sheet.modal-in').length > 0) self.$f7.sheet.close('.demo-sheet');
    // Open it
    self.sheet.open();
  }
  onPageBeforeOut() {
    const self = this;
    // Close opened sheets on page out
    self.$f7.sheet.close();
  }
  onPageBeforeRemove() {
    const self = this;
    // Destroy sheet modal when page removed
    if (self.sheet) self.sheet.destroy();
  }
};
