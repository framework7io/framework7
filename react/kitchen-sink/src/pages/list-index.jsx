import React from 'react';
import { Page, Navbar, List, ListGroup, ListItem, ListIndex } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Page>
        <Navbar title="List Index" backLink="Back"></Navbar>
        <ListIndex
          indexes="auto"
          listEl=".list.contacts-list"
          scrollList={true}
          label={true}
          onListIndexSelect={this.onIndexSelect.bind(this)}
        ></ListIndex>
        <List contactsList>
          <ListGroup>
            <ListItem title="A" groupTitle></ListItem>
            <ListItem title="Aaron"></ListItem>
            <ListItem title="Adam"></ListItem>
            <ListItem title="Aiden"></ListItem>
            <ListItem title="Albert"></ListItem>
            <ListItem title="Alex"></ListItem>
            <ListItem title="Alexander"></ListItem>
            <ListItem title="Alfie"></ListItem>
            <ListItem title="Archie"></ListItem>
            <ListItem title="Arthur"></ListItem>
            <ListItem title="Austin"></ListItem>
          </ListGroup>
          <ListGroup>
            <ListItem title="B" groupTitle></ListItem>
            <ListItem title="Benjamin"></ListItem>
            <ListItem title="Blake"></ListItem>
            <ListItem title="Bobby"></ListItem>
          </ListGroup>
          <ListGroup>
            <ListItem title="C" groupTitle></ListItem>
            <ListItem title="Caleb"></ListItem>
            <ListItem title="Callum"></ListItem>
            <ListItem title="Cameron"></ListItem>
            <ListItem title="Charles"></ListItem>
            <ListItem title="Charlie"></ListItem>
            <ListItem title="Connor"></ListItem>
          </ListGroup>
          <ListGroup>
            <ListItem title="D" groupTitle></ListItem>
            <ListItem title="Daniel"></ListItem>
            <ListItem title="David"></ListItem>
            <ListItem title="Dexter"></ListItem>
            <ListItem title="Dylan"></ListItem>
          </ListGroup>
          <ListGroup>
            <ListItem title="E" groupTitle></ListItem>
            <ListItem title="Edward"></ListItem>
            <ListItem title="Elijah"></ListItem>
            <ListItem title="Elliot"></ListItem>
            <ListItem title="Elliott"></ListItem>
            <ListItem title="Ethan"></ListItem>
            <ListItem title="Evan"></ListItem>
          </ListGroup>
          <ListGroup>
            <ListItem title="F" groupTitle></ListItem>
            <ListItem title="Felix"></ListItem>
            <ListItem title="Finlay"></ListItem>
            <ListItem title="Finley"></ListItem>
            <ListItem title="Frankie"></ListItem>
            <ListItem title="Freddie"></ListItem>
            <ListItem title="Frederick"></ListItem>
          </ListGroup>
          <ListGroup>
            <ListItem title="G" groupTitle></ListItem>
            <ListItem title="Gabriel"></ListItem>
            <ListItem title="George"></ListItem>
          </ListGroup>
          <ListGroup>
            <ListItem title="H" groupTitle></ListItem>
            <ListItem title="Harley"></ListItem>
            <ListItem title="Harrison"></ListItem>
            <ListItem title="Harry"></ListItem>
            <ListItem title="Harvey"></ListItem>
            <ListItem title="Henry"></ListItem>
            <ListItem title="Hugo"></ListItem>
          </ListGroup>
          <ListGroup>
            <ListItem title="I" groupTitle></ListItem>
            <ListItem title="Ibrahim"></ListItem>
            <ListItem title="Isaac"></ListItem>
          </ListGroup>
          <ListGroup>
            <ListItem title="J" groupTitle></ListItem>
            <ListItem title="Jack"></ListItem>
            <ListItem title="Jacob"></ListItem>
            <ListItem title="Jake"></ListItem>
            <ListItem title="James"></ListItem>
            <ListItem title="Jamie"></ListItem>
            <ListItem title="Jayden"></ListItem>
            <ListItem title="Jenson"></ListItem>
            <ListItem title="Joseph"></ListItem>
            <ListItem title="Joshua"></ListItem>
            <ListItem title="Jude"></ListItem>
          </ListGroup>
          <ListGroup>
            <ListItem title="K" groupTitle></ListItem>
            <ListItem title="Kai"></ListItem>
            <ListItem title="Kian"></ListItem>
          </ListGroup>
          <ListGroup>
            <ListItem title="L" groupTitle></ListItem>
            <ListItem title="Leo"></ListItem>
            <ListItem title="Leon"></ListItem>
            <ListItem title="Lewis"></ListItem>
            <ListItem title="Liam"></ListItem>
            <ListItem title="Logan"></ListItem>
            <ListItem title="Louie"></ListItem>
            <ListItem title="Louis"></ListItem>
            <ListItem title="Luca"></ListItem>
            <ListItem title="Lucas"></ListItem>
            <ListItem title="Luke"></ListItem>
          </ListGroup>
          <ListGroup>
            <ListItem title="M" groupTitle></ListItem>
            <ListItem title="Mason"></ListItem>
            <ListItem title="Matthew"></ListItem>
            <ListItem title="Max"></ListItem>
            <ListItem title="Michael"></ListItem>
            <ListItem title="Mohammad"></ListItem>
            <ListItem title="Mohammed"></ListItem>
            <ListItem title="Muhammad"></ListItem>
          </ListGroup>
          <ListGroup>
            <ListItem title="N" groupTitle></ListItem>
            <ListItem title="Nathan"></ListItem>
            <ListItem title="Noah"></ListItem>
          </ListGroup>
          <ListGroup>
            <ListItem title="O" groupTitle></ListItem>
            <ListItem title="Oliver"></ListItem>
            <ListItem title="Ollie"></ListItem>
            <ListItem title="Oscar"></ListItem>
            <ListItem title="Owen"></ListItem>
          </ListGroup>
          <ListGroup>
            <ListItem title="R" groupTitle></ListItem>
            <ListItem title="Reuben"></ListItem>
            <ListItem title="Riley"></ListItem>
            <ListItem title="Robert"></ListItem>
            <ListItem title="Ronnie"></ListItem>
            <ListItem title="Rory"></ListItem>
            <ListItem title="Ryan"></ListItem>
          </ListGroup>
          <ListGroup>
            <ListItem title="S" groupTitle></ListItem>
            <ListItem title="Samuel"></ListItem>
            <ListItem title="Sebastian"></ListItem>
            <ListItem title="Seth"></ListItem>
            <ListItem title="Sonny"></ListItem>
            <ListItem title="Stanley"></ListItem>
          </ListGroup>
          <ListGroup>
            <ListItem title="T" groupTitle></ListItem>
            <ListItem title="Teddy"></ListItem>
            <ListItem title="Theo"></ListItem>
            <ListItem title="Theodore"></ListItem>
            <ListItem title="Thomas"></ListItem>
            <ListItem title="Toby"></ListItem>
            <ListItem title="Tommy"></ListItem>
            <ListItem title="Tyler"></ListItem>
          </ListGroup>
          <ListGroup>
            <ListItem title="W" groupTitle></ListItem>
            <ListItem title="William"></ListItem>
          </ListGroup>
          <ListGroup>
            <ListItem title="Z" groupTitle></ListItem>
            <ListItem title="Zachary"></ListItem>
          </ListGroup>
        </List>
      </Page>
    )
  }
  onIndexSelect(itemContent) {
    console.log(itemContent);
  }
}