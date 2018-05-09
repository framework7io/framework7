<template>
  <Page>
    <Navbar title="Range Slider" backLink="Back"></Navbar>

    <BlockTitle>Volume</BlockTitle>
    <List simpleList>
      <ListItem>
        <ListItemCell className="width-auto flex-shrink-0">
          <Icon if-ios="f7:volume_mute_fill" if-md="material:volume_mute"></Icon>
        </ListItemCell>
        <ListItemCell className="flex-shrink-3">
          <Range
            min={0}
            max={100}
            step={1}
            value={10}
          ></Range>
        </ListItemCell>
        <ListItemCell className="width-auto flex-shrink-0">
          <Icon if-ios="f7:volume_fill" if-md="material:volume_up"></Icon>
        </ListItemCell>
      </ListItem>
    </List>

    <BlockTitle>Brightness</BlockTitle>
    <List simpleList>
      <ListItem>
        <ListItemCell className="width-auto flex-shrink-0">
          <Icon if-ios="f7:circle" if-md="material:brightness_low"></Icon>
        </ListItemCell>
        <ListItemCell className="flex-shrink-3">
          <Range
            min={0}
            max={100}
            step={1}
            value={50}
            label={true}
            color="orange"
          ></Range>
        </ListItemCell>
        <ListItemCell className="width-auto flex-shrink-0">
          <Icon if-ios="f7:circle_half" if-md="material:brightness_high"></Icon>
        </ListItemCell>
      </ListItem>
    </List>

    <BlockTitle className="display-flex justify-content-space-between">Price Filter <span>${{priceMin}} - ${{priceMax}}</span></BlockTitle>
    <List simpleList>
      <ListItem>
        <ListItemCell className="width-auto flex-shrink-0">
          <Icon if-ios="f7:circle" if-md="material:brightness_low"></Icon>
        </ListItemCell>
        <ListItemCell className="flex-shrink-3">
          <Range
            min={0}
            max={500}
            step={1}
            :value="[priceMin, priceMax]"
            label={true}
            dual={true}
            color="green"
            @range:change="onPriceChange"
          ></Range>
        </ListItemCell>
        <ListItemCell className="width-auto flex-shrink-0">
          <Icon if-ios="f7:circle_half" if-md="material:brightness_high"></Icon>
        </ListItemCell>
      </ListItem>
    </List>
  </Page>
</template>
<script>
  import React from 'react';
  import { Navbar, Page, BlockTitle, Range, List, ListItem, ListItemCell, Icon } from 'framework7-react';

  export default {
    components: {
      Navbar,
      Page,
      BlockTitle,
      Range,
      List,
      ListItem,
      ListItemCell,
      Icon,
    },
    data() {
      return {
        priceMin: 200,
        priceMax: 400,
      };
    },
    methods: {
      onPriceChange(values) {
        this.priceMin = values[0];
        this.priceMax = values[1];
      },
    },
  };
</script>
