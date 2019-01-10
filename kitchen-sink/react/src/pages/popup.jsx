import React from 'react';
import { Navbar, Page, Popup, Block, NavRight, Link, Button } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popupOpened: false,
    }
  }
  render() {
    return (
      <Page onPageBeforeRemove={this.onPageBeforeRemove.bind(this)}>
        <Navbar title="Popup" backLink="Back"></Navbar>
        <Block>
          <p>Popup is a modal window with any HTML content that pops up over App's main content. Popup as all other overlays is part of so called "Temporary Views".</p>
          <p>
            <Button fill popupOpen=".demo-popup">Open Popup</Button>
          </p>
          <p>
            <Button fill onClick={() => this.setState({ popupOpened : true })}>Open Via Prop Change</Button>
          </p>
          <p>
            <Button fill onClick={this.createPopup.bind(this)}>Create Dynamic Popup</Button>
          </p>
        </Block>
        <Popup className="demo-popup" opened={this.state.popupOpened} onPopupClosed={() => this.setState({popupOpened : false})}>
          <Page>
            <Navbar title="Popup Title">
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            <Block>
              <p>Here comes popup. You can put here anything, even independent view with its own navigation. Also not, that by default popup looks a bit different on iPhone/iPod and iPad, on iPhone it is fullscreen.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.</p>
              <p>Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula. Phasellus blandit nisl ut lorem semper pharetra. Nullam tortor nibh, suscipit in consequat vel, feugiat sed quam. Nam risus libero, auctor vel tristique ac, malesuada ut ante. Sed molestie, est in eleifend sagittis, leo tortor ullamcorper erat, at vulputate eros sapien nec libero. Mauris dapibus laoreet nibh quis bibendum. Fusce dolor sem, suscipit in iaculis id, pharetra at urna. Pellentesque tempor congue massa quis faucibus. Vestibulum nunc eros, convallis blandit dui sit amet, gravida adipiscing libero.</p>
            </Block>
          </Page>
        </Popup>
      </Page>
    )
  }
  createPopup() {
    const self = this;
    // Create popup
    if (!self.popup) {
      self.popup = self.$f7.popup.create({
        content: `
          <div class="popup">
            <div class="page">
              <div class="navbar">
                <div class="navbar-inner">
                  <div class="title">Dynamic Popup</div>
                  <div class="right"><a href="#" class="link popup-close">Close</a></div>
                </div>
              </div>
              <div class="page-content">
                <div class="block">
                  <p>This popup was created dynamically</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.</p>
                </div>
              </div>
            </div>
          </div>
        `.trim(),
      });
    }
    // Open it
    self.popup.open();
  }
  onPageBeforeRemove() {
    const self = this;
    // Destroy popup when page removed
    if (self.popup) self.popup.destroy();
  }
};
