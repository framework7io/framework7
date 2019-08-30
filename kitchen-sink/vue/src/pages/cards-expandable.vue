<template>
  <f7-page>
    <f7-navbar title="Cards Expandable" back-link="Back"></f7-navbar>

    <f7-block>
      <p>In addition to usual <a href="/cards/">Cards</a> there are also Expandable Cards that allow to store more information and illustrations about particular subject.</p>
    </f7-block>

    <div class="demo-expandable-cards">
      <f7-card expandable>
        <f7-card-content :padding="false">
          <div class="bg-color-red" :style="{height: '300px'}">
            <f7-card-header text-color="white" class="display-block">
              Framework7
              <br />
              <small :style="{opacity: 0.7}">Build Mobile Apps</small>
            </f7-card-header>
            <f7-link card-close color="white" class="card-opened-fade-in" :style="{position: 'absolute', right: '15px', top: '15px'}" icon-f7="xmark_circle_fill"></f7-link>
          </div>
          <div class="card-content-padding">
            <p>Framework7 - is a free and open source HTML mobile framework to develop hybrid mobile apps or web apps with iOS or Android (Material) native look and feel. It is also an indispensable prototyping apps tool to show working app prototype as soon as possible in case you need to. Framework7 is created by Vladimir Kharlampidi (iDangero.us).</p>
            <p>The main approach of the Framework7 is to give you an opportunity to create iOS and Android (Material) apps with HTML, CSS and JavaScript easily and clear. Framework7 is full of freedom. It doesn't limit your imagination or offer ways of any solutions somehow. Framework7 gives you freedom!</p>
            <p>Framework7 is not compatible with all platforms. It is focused only on iOS and Android (Material) to bring the best experience and simplicity.</p>
            <p>Framework7 is definitely for you if you decide to build iOS and Android hybrid app (Cordova or PhoneGap) or web app that looks like and feels as great native iOS or Android (Material) apps.</p>
            <p>
              <f7-button fill round large card-close color="red">Close</f7-button>
            </p>
          </div>
        </f7-card-content>
      </f7-card>

      <f7-card expandable>
        <f7-card-content :padding="false">
          <div class="bg-color-yellow" :style="{height: '300px'}">
            <f7-card-header text-color="black" class="display-block">
              Framework7
              <br/>
              <small :style="{opacity: 0.7}">Build Mobile Apps</small>
            </f7-card-header>
            <f7-link card-close color="black" class="card-opened-fade-in" :style="{position: 'absolute', right: '15px', top: '15px'}" icon-f7="xmark_circle_fill"></f7-link>
          </div>
          <div class="card-content-padding">
            <p>Framework7 - is a free and open source HTML mobile framework to develop hybrid mobile apps or web apps with iOS or Android (Material) native look and feel. It is also an indispensable prototyping apps tool to show working app prototype as soon as possible in case you need to. Framework7 is created by Vladimir Kharlampidi (iDangero.us).</p>
            <p>The main approach of the Framework7 is to give you an opportunity to create iOS and Android (Material) apps with HTML, CSS and JavaScript easily and clear. Framework7 is full of freedom. It doesn't limit your imagination or offer ways of any solutions somehow. Framework7 gives you freedom!</p>
            <p>Framework7 is not compatible with all platforms. It is focused only on iOS and Android (Material) to bring the best experience and simplicity.</p>
            <p>Framework7 is definitely for you if you decide to build iOS and Android hybrid app (Cordova or PhoneGap) or web app that looks like and feels as great native iOS or Android (Material) apps.</p>
            <p>
              <f7-button fill round large card-close color="yellow" text-color="black">Close</f7-button>
            </p>
          </div>
        </f7-card-content>
      </f7-card>

      <f7-card expandable>
        <f7-card-content :padding="false">
          <div :style="{background: 'url(./img/beach.jpg) no-repeat center bottom', 'background-size': 'cover', height: '240px'}"></div>
          <f7-link card-close color="white" class="card-opened-fade-in" :style="{position: 'absolute', right: '15px', top: '15px'}" icon-f7="xmark_circle_fill"></f7-link>
          <f7-card-header :style="{height: '60px'}">Beach, Goa</f7-card-header>
          <div class="card-content-padding">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus rhoncus cursus. Etiam lorem est, consectetur vitae tempor a, volutpat eget purus. Duis urna lectus, vehicula at quam id, sodales dapibus turpis. Suspendisse potenti. Proin condimentum luctus nulla, et rhoncus ante rutrum eu. Maecenas ut tincidunt diam. Vestibulum lacinia dui ligula, sit amet pulvinar nisl blandit luctus. Vestibulum aliquam ligula nulla, tincidunt rhoncus tellus interdum at. Phasellus mollis ipsum at mollis tristique. Maecenas sit amet tempus justo. Duis dolor elit, mollis quis viverra quis, vehicula eu ante. Integer a molestie risus. Vestibulum eu sollicitudin massa, sit amet dictum sem. Aliquam nisi tellus, maximus eget placerat in, porta vel lorem. Aenean tempus sodales nisl in cursus. Curabitur tincidunt turpis in nisl ornare euismod eget at libero.</p>
            <p>Suspendisse ligula eros, congue in nulla pellentesque, imperdiet blandit sapien. Morbi nisi sem, efficitur a rutrum porttitor, feugiat vel enim. Fusce eget vehicula odio, et luctus neque. Donec mattis a nulla laoreet commodo. Integer eget hendrerit augue, vel porta libero. Morbi imperdiet, eros at ultricies rutrum, eros urna auctor enim, eget laoreet massa diam vitae lorem. Proin eget urna ultrices, semper ligula aliquam, dignissim eros. Donec vitae augue eu sapien tristique elementum a nec nulla. Aliquam erat volutpat. Curabitur condimentum, metus blandit lobortis fringilla, enim mauris venenatis neque, et venenatis lorem urna ut justo. Maecenas neque enim, congue ac tempor quis, tincidunt ut mi. Donec venenatis ante non consequat molestie. Quisque ut rhoncus ligula. Vestibulum sodales maximus justo sit amet ornare. Nullam pulvinar eleifend nisi sit amet molestie.</p>
            <p>
              <f7-button fill round large card-close>Close</f7-button>
            </p>
          </div>
        </f7-card-content>
      </f7-card>

      <f7-card expandable>
        <f7-card-content :padding="false">
          <div :style="{background: 'url(./img/monkey.jpg) no-repeat center top', 'background-size': 'cover', height: '400px'}">
            <f7-card-header text-color="white">Monkeys</f7-card-header>
            <f7-link card-close color="white" class="card-opened-fade-in" :style="{position: 'absolute', right: '15px', top: '15px'}" icon-f7="xmark_circle_fill"></f7-link>
          </div>
          <div class="card-content-padding">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus rhoncus cursus. Etiam lorem est, consectetur vitae tempor a, volutpat eget purus. Duis urna lectus, vehicula at quam id, sodales dapibus turpis. Suspendisse potenti. Proin condimentum luctus nulla, et rhoncus ante rutrum eu. Maecenas ut tincidunt diam. Vestibulum lacinia dui ligula, sit amet pulvinar nisl blandit luctus. Vestibulum aliquam ligula nulla, tincidunt rhoncus tellus interdum at. Phasellus mollis ipsum at mollis tristique. Maecenas sit amet tempus justo. Duis dolor elit, mollis quis viverra quis, vehicula eu ante. Integer a molestie risus. Vestibulum eu sollicitudin massa, sit amet dictum sem. Aliquam nisi tellus, maximus eget placerat in, porta vel lorem. Aenean tempus sodales nisl in cursus. Curabitur tincidunt turpis in nisl ornare euismod eget at libero.</p>
            <p>Suspendisse ligula eros, congue in nulla pellentesque, imperdiet blandit sapien. Morbi nisi sem, efficitur a rutrum porttitor, feugiat vel enim. Fusce eget vehicula odio, et luctus neque. Donec mattis a nulla laoreet commodo. Integer eget hendrerit augue, vel porta libero. Morbi imperdiet, eros at ultricies rutrum, eros urna auctor enim, eget laoreet massa diam vitae lorem. Proin eget urna ultrices, semper ligula aliquam, dignissim eros. Donec vitae augue eu sapien tristique elementum a nec nulla. Aliquam erat volutpat. Curabitur condimentum, metus blandit lobortis fringilla, enim mauris venenatis neque, et venenatis lorem urna ut justo. Maecenas neque enim, congue ac tempor quis, tincidunt ut mi. Donec venenatis ante non consequat molestie. Quisque ut rhoncus ligula. Vestibulum sodales maximus justo sit amet ornare. Nullam pulvinar eleifend nisi sit amet molestie.</p>
            <p>
              <f7-button fill round large card-close>Close</f7-button>
            </p>
          </div>
        </f7-card-content>
      </f7-card>
    </div>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7Block, f7Card, f7CardHeader, f7CardContent, f7Link, f7Button } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7Block,
      f7Card,
      f7CardHeader,
      f7CardContent,
      f7Link,
      f7Button,
    },
  };
</script>
