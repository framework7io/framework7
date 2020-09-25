import React, { useState } from 'react';
import {
  Navbar,
  Page,
  BlockTitle,
  Range,
  List,
  ListItem,
  ListItemCell,
  Icon,
  Block,
} from 'framework7-react';

export default () => {
  const [priceMin, setPriceMin] = useState(200);
  const [priceMax, setPriceMax] = useState(200);

  const onPriceChange = (values) => {
    setPriceMin(values[0]);
    setPriceMax(values[1]);
  };

  return (
    <Page>
      <Navbar title="Range Slider" backLink="Back"></Navbar>

      <BlockTitle>Volume</BlockTitle>
      <List simpleList>
        <ListItem>
          <ListItemCell className="width-auto flex-shrink-0">
            <Icon ios="f7:speaker_fill" aurora="f7:speaker_fill" md="material:volume_mute" />
          </ListItemCell>
          <ListItemCell className="flex-shrink-3">
            <Range min={0} max={100} step={1} value={10} />
          </ListItemCell>
          <ListItemCell className="width-auto flex-shrink-0">
            <Icon ios="f7:speaker_3_fill" aurora="f7:speaker_3_fill" md="material:volume_up" />
          </ListItemCell>
        </ListItem>
      </List>

      <BlockTitle>Brightness</BlockTitle>
      <List simpleList>
        <ListItem>
          <ListItemCell className="width-auto flex-shrink-0">
            <Icon ios="f7:sun_min" aurora="f7:sun_min" md="material:brightness_low" />
          </ListItemCell>
          <ListItemCell className="flex-shrink-3">
            <Range min={0} max={100} step={1} value={50} label={true} color="orange" />
          </ListItemCell>
          <ListItemCell className="width-auto flex-shrink-0">
            <Icon ios="f7:sun_max_fill" aurora="f7:sun_max_fill" md="material:brightness_high" />
          </ListItemCell>
        </ListItem>
      </List>

      <BlockTitle className="display-flex justify-content-space-between">
        Price Filter{' '}
        <span>
          ${priceMin} - ${priceMax}
        </span>
      </BlockTitle>
      <List simpleList>
        <ListItem>
          <ListItemCell className="width-auto flex-shrink-0">
            <Icon
              ios="f7:money_dollar_circle"
              aurora="f7:money_dollar_circle"
              md="material:attach_money"
            />
          </ListItemCell>
          <ListItemCell className="flex-shrink-3">
            <Range
              min={0}
              max={500}
              step={1}
              value={[priceMin, priceMax]}
              label={true}
              dual={true}
              color="green"
              onRangeChange={onPriceChange}
            />
          </ListItemCell>
          <ListItemCell className="width-auto flex-shrink-0">
            <Icon
              ios="f7:money_dollar_circle_fill"
              aurora="f7:money_dollar_circle_fill"
              md="material:monetization_on"
            />
          </ListItemCell>
        </ListItem>
      </List>

      <BlockTitle>With Scale</BlockTitle>
      <Block strong>
        <Range
          min={0}
          max={100}
          label={true}
          step={5}
          value={25}
          scale={true}
          scaleSteps={5}
          scaleSubSteps={4}
        />
      </Block>

      <BlockTitle>Vertical</BlockTitle>
      <Block strong className="display-flex justify-content-center">
        <Range
          className="margin-right"
          style={{ height: '160px' }}
          vertical={true}
          min={0}
          max={100}
          label={true}
          step={1}
          value={25}
        />
        <Range
          className="margin-horizontal"
          style={{ height: '160px' }}
          vertical={true}
          min={0}
          max={100}
          label={true}
          step={1}
          value={50}
        />
        <Range
          className="margin-horizontal"
          style={{ height: '160px' }}
          vertical={true}
          min={0}
          max={100}
          label={true}
          step={1}
          value={75}
        />
        <Range
          className="margin-left"
          style={{ height: '160px' }}
          dual={true}
          vertical={true}
          min={0}
          max={100}
          label={true}
          step={1}
          value={[25, 75]}
        />
      </Block>

      <BlockTitle>Vertical Reversed</BlockTitle>
      <Block strong className="display-flex justify-content-center">
        <Range
          className="margin-right"
          color="red"
          style={{ height: '160px' }}
          vertical={true}
          verticalReversed={true}
          min={0}
          max={100}
          label={true}
          step={1}
          value={25}
        />
        <Range
          className="margin-horizontal"
          color="red"
          style={{ height: '160px' }}
          vertical={true}
          verticalReversed={true}
          min={0}
          max={100}
          label={true}
          step={1}
          value={50}
        />
        <Range
          className="margin-horizontal"
          color="red"
          style={{ height: '160px' }}
          vertical={true}
          verticalReversed={true}
          min={0}
          max={100}
          label={true}
          step={1}
          value={75}
        />
        <Range
          className="margin-left"
          color="red"
          style={{ height: '160px' }}
          dual={true}
          vertical={true}
          verticalReversed={true}
          min={0}
          max={100}
          label={true}
          step={1}
          value={[25, 75]}
        />
      </Block>
    </Page>
  );
};
