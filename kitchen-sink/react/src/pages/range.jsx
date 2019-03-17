import React from 'react';
import { Navbar, Page, BlockTitle, Range, List, ListItem, ListItemCell, Icon, Block } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      priceMin: 200,
      priceMax: 400,
    }
  }
  render() {
    return (
      <Page>
        <Navbar title="Range Slider" backLink="Back"></Navbar>

        <BlockTitle>Volume</BlockTitle>
        <List simpleList>
          <ListItem>
            <ListItemCell className="width-auto flex-shrink-0">
              <Icon ios="f7:volume_mute_fill" aurora="f7:volume_mute_fill" md="material:volume_mute"></Icon>
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
              <Icon ios="f7:volume_fill" aurora="f7:volume_fill" md="material:volume_up"></Icon>
            </ListItemCell>
          </ListItem>
        </List>

        <BlockTitle>Brightness</BlockTitle>
        <List simpleList>
          <ListItem>
            <ListItemCell className="width-auto flex-shrink-0">
              <Icon ios="f7:circle" aurora="f7:circle" md="material:brightness_low"></Icon>
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
              <Icon ios="f7:circle_half" aurora="f7:circle_half" md="material:brightness_high"></Icon>
            </ListItemCell>
          </ListItem>
        </List>

        <BlockTitle className="display-flex justify-content-space-between">Price Filter <span>${this.state.priceMin} - ${this.state.priceMax}</span></BlockTitle>
        <List simpleList>
          <ListItem>
            <ListItemCell className="width-auto flex-shrink-0">
              <Icon ios="f7:money_dollar_round" aurora="f7:money_dollar_round" md="material:attach_money"></Icon>
            </ListItemCell>
            <ListItemCell className="flex-shrink-3">
              <Range
                min={0}
                max={500}
                step={1}
                value={[this.state.priceMin, this.state.priceMax]}
                label={true}
                dual={true}
                color="green"
                onRangeChange={this.onPriceChange.bind(this)}
              ></Range>
            </ListItemCell>
            <ListItemCell className="width-auto flex-shrink-0">
              <Icon ios="f7:money_dollar_round_fill" aurora="f7:money_dollar_round_fill" md="material:monetization_on"></Icon>
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
            style={{height: '160px'}}
            vertical={true}
            min={0}
            max={100}
            label={true}
            step={1}
            value={25}
          />
          <Range
            className="margin-horizontal"
            style={{height: '160px'}}
            vertical={true}
            min={0}
            max={100}
            label={true}
            step={1}
            value={50}
          />
          <Range
            className="margin-horizontal"
            style={{height: '160px'}}
            vertical={true}
            min={0}
            max={100}
            label={true}
            step={1}
            value={75}
          />
          <Range
            className="margin-left"
            style={{height: '160px'}}
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
            style={{height: '160px'}}
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
            style={{height: '160px'}}
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
            style={{height: '160px'}}
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
            style={{height: '160px'}}
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
    )
  }
  onPriceChange(values) {
    this.setState({
      priceMin: values[0],
      priceMax: values[1],
    });
  }
}
