import React from 'react';
import { Navbar, Page, BlockTitle, Chip, Block, Icon } from 'framework7-react';

export default class extends React.Component {
  constructor() {
    super();
    this.deleteChipBound = this.deleteChip.bind(this);
  }
  render() {
    return (
      <Page>
        <Navbar title="Chips" backLink="Back"></Navbar>
        <BlockTitle>Chips With Text</BlockTitle>
        <Block strong>
          <Chip text="Example Chip" />
          <Chip text="Another Chip" />
          <Chip text="One More Chip" />
          <Chip text="Fourth Chip" />
          <Chip text="Last One" />
        </Block>
        <BlockTitle>Icon Chips</BlockTitle>
        <Block strong>
          <Chip text="Add Contact" mediaBgColor={this.$theme.md ? 'blue' : undefined}>
            <Icon slot="media" ifIos="f7:add_round" ifMd="material:add_circle"></Icon>
          </Chip>
          <Chip text="London" mediaBgColor={this.$theme.md ? 'green' : undefined}>
            <Icon slot="media" ifIos="f7:compass" ifMd="material:location_on"></Icon>
          </Chip>
          <Chip text="John Doe" mediaBgColor={this.$theme.md ? 'red' : undefined}>
            <Icon slot="media" ifIos="f7:person" ifMd="material:person"></Icon>
          </Chip>
        </Block>
        <BlockTitle>Contact Chips</BlockTitle>
        <Block strong>
          <Chip text="Jane Doe">
            <img slot="media" src="http://lorempixel.com/100/100/people/9/" />
          </Chip>
          <Chip text="John Doe">
            <img slot="media" src="http://lorempixel.com/100/100/people/3/" />
          </Chip>
          <Chip text="Adam Smith">
            <img slot="media" src="http://lorempixel.com/100/100/people/7/" />
          </Chip>
          <Chip text="Jennifer" mediaBgColor="pink" media="J" />
          <Chip text="Chris" mediaBgColor="yellow" mediaTextColor="black" media="C" />
          <Chip text="Kate" mediaBgColor="red" media="K" />
        </Block>
        <BlockTitle>Deletable Chips / Tags</BlockTitle>
        <Block strong>
          <Chip text="Example Chip" deleteable onClick={ this.deleteChipBound } />
          <Chip text="Chris" media="C" mediaBgColor="orange" textColor="black" deleteable onClick={ this.deleteChipBound } />
          <Chip text="Jane Doe" deleteable onClick={ this.deleteChipBound }>
            <img slot="media" src="http://lorempixel.com/100/100/people/9/"/>
          </Chip>
          <Chip text="One More Chip" deleteable onClick={ this.deleteChipBound } />
          <Chip text="Jennifer" mediaBgColor="pink" media="J" deleteable onClick={ this.deleteChipBound } />
          <Chip text="Adam Smith" deleteable onClick={ this.deleteChipBound }>
            <img slot="media" src="http://lorempixel.com/100/100/people/7/"/>
          </Chip>
        </Block>
        <BlockTitle>Color Chips</BlockTitle>
        <Block strong>
          <Chip text="Red Chip" color="red" />
          <Chip text="Green Chip" color="green" />
          <Chip text="Blue Chip" color="blue" />
          <Chip text="Orange Chip" color="orange" />
          <Chip text="Pink Chip" color="pink" />
        </Block>
      </Page>
    )
  }
  deleteChip(e) {
    const $$ = this.$$;
    const app = this.$f7;
    const target = e.target;
    app.dialog.confirm('Do you want to delete this tiny demo Chip?', () => {
      $$(target).parents('.chip').remove();
    });
  }
}
