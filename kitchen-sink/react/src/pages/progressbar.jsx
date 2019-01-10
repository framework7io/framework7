
import React from 'react';
import { Navbar, Page, BlockTitle, Block, Progressbar, Button, Segmented, List, ListItem } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.setInlineProgress = this.setInlineProgress.bind(this);
    this.showInfinite = this.showInfinite.bind(this);
    this.showDeterminate = this.showDeterminate.bind(this);
  }
  render() {
    return (
      <Page>
        <Navbar title="Progress Bar" backLink="Back"></Navbar>
        <Block>
          <p>In addition to <a href="/preloader/">Preloader</a>, Framework7 also comes with fancy animated determinate and infinite/indeterminate progress bars to indicate some activity.</p>
        </Block>
        <BlockTitle>Determinate Progress Bar</BlockTitle>
        <Block strong>
          <p>When progress bar is determinate it indicates how long an operation will take when the percentage complete is detectable.</p>
          <p>Inline determinate progress bar:</p>
          <div>
            <p><Progressbar progress={10} id="demo-inline-progressbar"></Progressbar></p>
            <Segmented raised>
              <Button onClick={()=>{this.setInlineProgress(10)}}>10%</Button>
              <Button onClick={()=>{this.setInlineProgress(30)}}>30%</Button>
              <Button onClick={()=>{this.setInlineProgress(50)}}>50%</Button>
              <Button onClick={()=>{this.setInlineProgress(100)}}>100%</Button>
            </Segmented>
          </div>
          <div>
            <p>Inline determinate load & hide:</p>
            <p id="demo-determinate-container"></p>
            <p>
              <Button fill onClick={()=>{this.showDeterminate(true)}}>Start Loading</Button>
            </p>
          </div>
          <div>
            <p>Overlay with determinate progress bar on top of the app:</p>
            <p>
              <Button fill onClick={()=>{this.showDeterminate(false)}}>Start Loading</Button>
            </p>
          </div>
        </Block>
        <BlockTitle>Infinite Progress Bar</BlockTitle>
        <Block strong>
          <p>When progress bar is infinite/indeterminate it requests that the user wait while something finishes when it’s not necessary to indicate how long it will take.</p>
          <p>Inline infinite progress bar</p>
          <p>
            <Progressbar infinite></Progressbar>
          </p>
          <p>Multi-color infinite progress bar</p>
          <p>
            <Progressbar infinite color="multi"></Progressbar>
          </p>
          <div>
            <p>Overlay with infinite progress bar on top of the app</p>
            <p id="demo-infinite-container"></p>
            <p>
              <Button fill onClick={()=>{this.showInfinite(false)}}>Start Loading</Button>
            </p>
          </div>
          <div>
            <p>Overlay with infinite multi-color progress bar on top of the app</p>
            <p>
              <Button fill onClick={()=>{this.showInfinite(true)}}>Start Loading</Button>
            </p>
          </div>
        </Block>
        <BlockTitle>Colors</BlockTitle>
        <List simpleList>
          <ListItem>
            <Progressbar color="blue" progress={10}></Progressbar>
          </ListItem>
          <ListItem>
            <Progressbar color="red" progress={20}></Progressbar>
          </ListItem>
          <ListItem>
            <Progressbar color="pink" progress={30}></Progressbar>
          </ListItem>
          <ListItem>
            <Progressbar color="green" progress={80}></Progressbar>
          </ListItem>
          <ListItem>
            <Progressbar color="yellow" progress={90}></Progressbar>
          </ListItem>
          <ListItem>
            <Progressbar color="orange" progress={100}></Progressbar>
          </ListItem>
        </List>
      </Page>
    );
  }
  setInlineProgress(value) {
    const self = this;
    const app = self.$f7;
    app.progressbar.set('#demo-inline-progressbar', value);
  }
  showDeterminate(inline) {
    const self = this;
    const app = self.$f7;
    if (self.determinateLoading) return;
    self.determinateLoading = true;
    let progressBarEl;
    if (inline) {
      progressBarEl = app.progressbar.show('#demo-determinate-container', 0);
    } else {
      progressBarEl = app.progressbar.show(0, app.theme === 'md' ? 'yellow' : 'blue');
    }
    let progress = 0;
    function simulateLoading() {
      setTimeout(() => {
        const progressBefore = progress;
        progress += Math.random() * 20;
        app.progressbar.set(progressBarEl, progress);
        if (progressBefore < 100) {
          simulateLoading(); // keep "loading"
        } else {
          self.determinateLoading = false;
          app.progressbar.hide(progressBarEl); // hide
        }
      }, Math.random() * 200 + 200);
    }
    simulateLoading();
  }
  showInfinite(multiColor) {
    const self = this;
    const app = self.$f7;
    if (self.infiniteLoading) return;
    self.infiniteLoading = true;
    if (multiColor) {
      app.progressbar.show('multi');
    } else {
      app.progressbar.show(app.theme === 'md' ? 'yellow' : 'blue');
    }
    setTimeout(() => {
      self.infiniteLoading = false;
      app.progressbar.hide();
    }, 3000);
  }
};
