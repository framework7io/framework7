<template>
  <f7-page>
    <f7-navbar title="Smart Select" back-link="Back"></f7-navbar>
    <f7-block>
      Framework7 allows you to easily convert your usual form selects to dynamic pages with radios:
    </f7-block>
    <f7-list strong-ios outline-ios dividers-ios>
      <f7-list-item title="Fruit" smart-select>
        <select name="fruits">
          <option value="apple" selected>Apple</option>
          <option value="pineapple">Pineapple</option>
          <option value="pear">Pear</option>
          <option value="orange">Orange</option>
          <option value="melon">Melon</option>
          <option value="peach">Peach</option>
          <option value="banana">Banana</option>
        </select>
      </f7-list-item>
      <f7-list-item
        title="Car"
        smart-select
        :smart-select-params="{
          openIn: 'popup',
          searchbar: true,
          searchbarPlaceholder: 'Search car',
        }"
      >
        <select name="car" multiple>
          <optgroup label="Japanese">
            <option value="honda" selected>Honda</option>
            <option value="lexus">Lexus</option>
            <option value="mazda">Mazda</option>
            <option value="nissan">Nissan</option>
            <option value="toyota">Toyota</option>
          </optgroup>
          <optgroup label="German">
            <option value="audi" selected>Audi</option>
            <option value="bmw">BMW</option>
            <option value="mercedes">Mercedes</option>
            <option value="vw">Volkswagen</option>
            <option value="volvo">Volvo</option>
          </optgroup>
          <optgroup label="American">
            <option value="cadillac">Cadillac</option>
            <option value="chrysler">Chrysler</option>
            <option value="dodge">Dodge</option>
            <option value="ford" selected>Ford</option>
          </optgroup>
        </select>
      </f7-list-item>
      <f7-list-item title="Mac or Windows" smart-select :smart-select-params="{ openIn: 'sheet' }">
        <select name="mac-windows">
          <option value="mac" selected>Mac</option>
          <option value="windows">Windows</option>
        </select>
      </f7-list-item>
      <f7-list-item title="Super Hero" smart-select :smart-select-params="{ openIn: 'popover' }">
        <select name="superhero" multiple>
          <option value="Batman" selected>Batman</option>
          <option value="Superman">Superman</option>
          <option value="Hulk">Hulk</option>
          <option value="Spiderman">Spiderman</option>
          <option value="Ironman">Ironman</option>
          <option value="Thor">Thor</option>
          <option value="Wonder Woman">Wonder Woman</option>
        </select>
      </f7-list-item>
    </f7-list>

    <f7-block-title>Vue Model</f7-block-title>
    <f7-list strong-ios outline-ios dividers-ios class="no-margin-top">
      <f7-list-item group-title title="Coin flip guess" />
      <f7-list-item
        v-model:smart-selection="predictedCoinFlip"
        title="Predicted outcome"
        smart-select
        :smart-select-params="{ openIn: 'sheet' }"
      >
        <select name="coin-flip">
          <option value="heads">Heads</option>
          <option value="tails">Tails</option>
        </select>
      </f7-list-item>
      <f7-list-button title="Toggle prediction" @click="toggleCoinGuess" />
      <f7-list-item group-title title="Purchase" />
      <f7-list-item title="Total amout">
        <template #after>
          $15 + ${{ 15 * (tipPercentage / 100) }} ({{ tipPercentage }}%) tip
        </template>
      </f7-list-item>
      <f7-list-item
        v-model:smart-selection.number="tipPercentage"
        title="Tip percentage"
        smart-select
        :smart-select-params="{ openIn: 'sheet' }"
      >
        <select name="tip-1">
          <option value="10">10% tip</option>
          <option value="20">20% tip</option>
        </select>
      </f7-list-item>
      <f7-list-item
        v-model:smart-selection.number="tipPercentage"
        title="Tip formula"
        smart-select
        :smart-select-params="{ openIn: 'sheet' }"
      >
        <select name="tip-2">
          <option value="10">purchase * 0.10</option>
          <option value="20">purchase * 0.20</option>
        </select>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
import {
  f7Navbar,
  f7Page,
  f7List,
  f7ListButton,
  f7BlockTitle,
  f7Block,
  f7ListItem,
} from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
    f7List,
    f7ListButton,
    f7Block,
    f7BlockTitle,
    f7ListItem,
  },
  data() {
    return {
      predictedCoinFlip: 'tails',
      tipPercentage: 20,
    };
  },
  methods: {
    toggleCoinGuess() {
      this.predictedCoinFlip = this.predictedCoinFlip === 'tails' ? 'heads' : 'tails';
    },
  },
};
</script>
