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
        <BlockTitle>Outline Chips</BlockTitle>
        <Block strong>
          <Chip outline text="Example Chip" />
          <Chip outline text="Another Chip" />
          <Chip outline text="One More Chip" />
          <Chip outline text="Fourth Chip" />
          <Chip outline text="Last One" />
        </Block>
        <BlockTitle>Icon Chips</BlockTitle>
        <Block strong>
          <Chip text="Add Contact" mediaBgColor="blue">
            <Icon slot="media" ios="f7:add_round" aurora="f7:add_round" md="material:add_circle"></Icon>
          </Chip>
          <Chip text="London" mediaBgColor="green">
            <Icon slot="media" ios="f7:compass" aurora="f7:compass" md="material:location_on"></Icon>
          </Chip>
          <Chip text="John Doe" mediaBgColor="red">
            <Icon slot="media" ios="f7:person" aurora="f7:person" md="material:person"></Icon>
          </Chip>
        </Block>
        <BlockTitle>Contact Chips</BlockTitle>
        <Block strong>
          <Chip text="Jane Doe">
            <img slot="media" src="https://cdn.framework7.io/placeholder/people-100x100-9.jpg" />
          </Chip>
          <Chip text="John Doe">
            <img slot="media" src="https://cdn.framework7.io/placeholder/people-100x100-3.jpg" />
          </Chip>
          <Chip text="Adam Smith">
            <img slot="media" src="https://cdn.framework7.io/placeholder/people-100x100-7.jpg" />
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
            <img slot="media" src="https://cdn.framework7.io/placeholder/people-100x100-9.jpg"/>
          </Chip>
          <Chip text="One More Chip" deleteable onClick={ this.deleteChipBound } />
          <Chip text="Jennifer" mediaBgColor="pink" media="J" deleteable onClick={ this.deleteChipBound } />
          <Chip text="Adam Smith" deleteable onClick={ this.deleteChipBound }>
            <img slot="media" src="https://cdn.framework7.io/placeholder/people-100x100-7.jpg"/>
          </Chip>
        </Block>
        <BlockTitle>Color Chips</BlockTitle>
        <Block strong>
          <Chip text="Red Chip" color="red" />
          <Chip text="Green Chip" color="green" />
          <Chip text="Blue Chip" color="blue" />
          <Chip text="Orange Chip" color="orange" />
          <Chip text="Pink Chip" color="pink" />
          <Chip outline text="Red Chip" color="red" />
          <Chip outline text="Green Chip" color="green" />
          <Chip outline text="Blue Chip" color="blue" />
          <Chip outline text="Orange Chip" color="orange" />
          <Chip outline text="Pink Chip" color="pink" />
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
