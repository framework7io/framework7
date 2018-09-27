import React from 'react';
import { Navbar, Page, BlockTitle, Range, List, ListItem, ListItemCell, Icon } from 'framework7-react';

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
              <Icon ios="f7:volume_mute_fill" md="material:volume_mute"></Icon>
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
              <Icon ios="f7:volume_fill" md="material:volume_up"></Icon>
            </ListItemCell>
          </ListItem>
        </List>

        <BlockTitle>Brightness</BlockTitle>
        <List simpleList>
          <ListItem>
            <ListItemCell className="width-auto flex-shrink-0">
              <Icon ios="f7:circle" md="material:brightness_low"></Icon>
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
              <Icon ios="f7:circle_half" md="material:brightness_high"></Icon>
            </ListItemCell>
          </ListItem>
        </List>

        <BlockTitle className="display-flex justify-content-space-between">Price Filter <span>${this.state.priceMin} - ${this.state.priceMax}</span></BlockTitle>
        <List simpleList>
          <ListItem>
            <ListItemCell className="width-auto flex-shrink-0">
              <Icon ios="f7:circle" md="material:brightness_low"></Icon>
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
              <Icon ios="f7:circle_half" md="material:brightness_high"></Icon>
            </ListItemCell>
          </ListItem>
        </List>
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
