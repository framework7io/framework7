<template>
  <f7-page>
    <f7-navbar title="Progress Bar" back-link="Back"></f7-navbar>
    <f7-block>
      <p>
        In addition to <a href="/preloader/">Preloader</a>, Framework7 also comes with fancy
        animated determinate and infinite/indeterminate progress bars to indicate some activity.
      </p>
    </f7-block>
    <f7-block-title>Determinate Progress Bar</f7-block-title>
    <f7-block strong-ios outline-ios>
      <p>
        When progress bar is determinate it indicates how long an operation will take when the
        percentage complete is detectable.
      </p>
      <p>Inline determinate progress bar:</p>
      <div>
        <p><f7-progressbar id="demo-inline-progressbar" :progress="10" /></p>
        <f7-segmented raised>
          <f7-button @click="setInlineProgress(10)">10%</f7-button>
          <f7-button @click="setInlineProgress(30)">30%</f7-button>
          <f7-button @click="setInlineProgress(50)">50%</f7-button>
          <f7-button @click="setInlineProgress(100)">100%</f7-button>
        </f7-segmented>
      </div>
      <div>
        <p>Inline determinate load & hide:</p>
        <p id="demo-determinate-container"></p>
        <p>
          <f7-button fill @click="showDeterminate(true)">Start Loading</f7-button>
        </p>
      </div>
      <div>
        <p>Overlay with determinate progress bar on top of the app:</p>
        <p>
          <f7-button fill @click="showDeterminate(false)">Start Loading</f7-button>
        </p>
      </div>
    </f7-block>
    <f7-block-title>Infinite Progress Bar</f7-block-title>
    <f7-block strong>
      <p>
        When progress bar is infinite/indeterminate it requests that the user wait while something
        finishes when it’s not necessary to indicate how long it will take.
      </p>
      <p>Inline infinite progress bar</p>
      <p>
        <f7-progressbar infinite />
      </p>
      <p>Multi-color infinite progress bar</p>
      <p>
        <f7-progressbar infinite color="multi" />
      </p>
      <div>
        <p>Overlay with infinite progress bar on top of the app</p>
        <p id="demo-infinite-container"></p>
        <p>
          <f7-button fill @click="showInfinite(false)">Start Loading</f7-button>
        </p>
      </div>
      <div>
        <p>Overlay with infinite multi-color progress bar on top of the app</p>
        <p>
          <f7-button fill @click="showInfinite(true)">Start Loading</f7-button>
        </p>
      </div>
    </f7-block>
    <f7-block-title>Colors</f7-block-title>
    <div class="list list-strong-ios list-outline-ios list-dividers-ios simple-list">
      <ul>
        <li>
          <f7-progressbar color="blue" :progress="10" />
        </li>
        <li>
          <f7-progressbar color="red" :progress="20" />
        </li>
        <li>
          <f7-progressbar color="pink" :progress="30" />
        </li>
        <li>
          <f7-progressbar color="green" :progress="80" />
        </li>
        <li>
          <f7-progressbar color="yellow" :progress="90" />
        </li>
        <li>
          <f7-progressbar color="orange" :progress="100" />
        </li>
      </ul>
    </div>
  </f7-page>
</template>
<script>
import {
  f7Navbar,
  f7Page,
  f7BlockTitle,
  f7Block,
  f7Progressbar,
  f7Button,
  f7Segmented,
  f7,
} from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
    f7BlockTitle,
    f7Block,
    f7Progressbar,
    f7Button,
    f7Segmented,
  },
  methods: {
    setInlineProgress(value) {
      f7.progressbar.set('#demo-inline-progressbar', value);
    },
    showDeterminate(inline) {
      const self = this;
      if (self.determinateLoading) return;
      self.determinateLoading = true;
      let progressBarEl;
      if (inline) {
        progressBarEl = f7.progressbar.show('#demo-determinate-container', 0);
      } else {
        progressBarEl = f7.progressbar.show(0);
      }
      let progress = 0;
      function simulateLoading() {
        setTimeout(
          () => {
            const progressBefore = progress;
            progress += Math.random() * 20;
            f7.progressbar.set(progressBarEl, progress);
            if (progressBefore < 100) {
              simulateLoading(); // keep "loading"
            } else {
              self.determinateLoading = false;
              f7.progressbar.hide(progressBarEl); // hide
            }
          },
          Math.random() * 200 + 200,
        );
      }
      simulateLoading();
    },
    showInfinite(multiColor) {
      const self = this;
      if (self.infiniteLoading) return;
      self.infiniteLoading = true;
      if (multiColor) {
        f7.progressbar.show('multi');
      } else {
        f7.progressbar.show();
      }
      setTimeout(() => {
        self.infiniteLoading = false;
        f7.progressbar.hide();
      }, 3000);
    },
  },
};
</script>
