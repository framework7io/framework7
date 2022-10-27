import React from 'react';
import { Page, Navbar, List, ListGroup, ListItem, ListIndex } from 'framework7-react';

export default () => {
  const onIndexSelect = (itemContent) => {
    console.log(itemContent);
  };
  return (
    <Page>
      <Navbar title="List Index" backLink="Back"></Navbar>
      <ListIndex
        indexes="auto"
        listEl=".list.contacts-list"
        scrollList={true}
        label={true}
        onListIndexSelect={onIndexSelect}
      />
      <List contactsList strongIos dividersIos>
        <ListGroup>
          <ListItem title="A" groupTitle />
          <ListItem title="Aaron" />
          <ListItem title="Adam" />
          <ListItem title="Aiden" />
          <ListItem title="Albert" />
          <ListItem title="Alex" />
          <ListItem title="Alexander" />
          <ListItem title="Alfie" />
          <ListItem title="Archie" />
          <ListItem title="Arthur" />
          <ListItem title="Austin" />
        </ListGroup>
        <ListGroup>
          <ListItem title="B" groupTitle />
          <ListItem title="Benjamin" />
          <ListItem title="Blake" />
          <ListItem title="Bobby" />
        </ListGroup>
        <ListGroup>
          <ListItem title="C" groupTitle />
          <ListItem title="Caleb" />
          <ListItem title="Callum" />
          <ListItem title="Cameron" />
          <ListItem title="Charles" />
          <ListItem title="Charlie" />
          <ListItem title="Connor" />
        </ListGroup>
        <ListGroup>
          <ListItem title="D" groupTitle />
          <ListItem title="Daniel" />
          <ListItem title="David" />
          <ListItem title="Dexter" />
          <ListItem title="Dylan" />
        </ListGroup>
        <ListGroup>
          <ListItem title="E" groupTitle />
          <ListItem title="Edward" />
          <ListItem title="Elijah" />
          <ListItem title="Elliot" />
          <ListItem title="Elliott" />
          <ListItem title="Ethan" />
          <ListItem title="Evan" />
        </ListGroup>
        <ListGroup>
          <ListItem title="F" groupTitle />
          <ListItem title="Felix" />
          <ListItem title="Finlay" />
          <ListItem title="Finley" />
          <ListItem title="Frankie" />
          <ListItem title="Freddie" />
          <ListItem title="Frederick" />
        </ListGroup>
        <ListGroup>
          <ListItem title="G" groupTitle />
          <ListItem title="Gabriel" />
          <ListItem title="George" />
        </ListGroup>
        <ListGroup>
          <ListItem title="H" groupTitle />
          <ListItem title="Harley" />
          <ListItem title="Harrison" />
          <ListItem title="Harry" />
          <ListItem title="Harvey" />
          <ListItem title="Henry" />
          <ListItem title="Hugo" />
        </ListGroup>
        <ListGroup>
          <ListItem title="I" groupTitle />
          <ListItem title="Ibrahim" />
          <ListItem title="Isaac" />
        </ListGroup>
        <ListGroup>
          <ListItem title="J" groupTitle />
          <ListItem title="Jack" />
          <ListItem title="Jacob" />
          <ListItem title="Jake" />
          <ListItem title="James" />
          <ListItem title="Jamie" />
          <ListItem title="Jayden" />
          <ListItem title="Jenson" />
          <ListItem title="Joseph" />
          <ListItem title="Joshua" />
          <ListItem title="Jude" />
        </ListGroup>
        <ListGroup>
          <ListItem title="K" groupTitle />
          <ListItem title="Kai" />
          <ListItem title="Kian" />
        </ListGroup>
        <ListGroup>
          <ListItem title="L" groupTitle />
          <ListItem title="Leo" />
          <ListItem title="Leon" />
          <ListItem title="Lewis" />
          <ListItem title="Liam" />
          <ListItem title="Logan" />
          <ListItem title="Louie" />
          <ListItem title="Louis" />
          <ListItem title="Luca" />
          <ListItem title="Lucas" />
          <ListItem title="Luke" />
        </ListGroup>
        <ListGroup>
          <ListItem title="M" groupTitle />
          <ListItem title="Mason" />
          <ListItem title="Matthew" />
          <ListItem title="Max" />
          <ListItem title="Michael" />
          <ListItem title="Mohammad" />
          <ListItem title="Mohammed" />
          <ListItem title="Muhammad" />
        </ListGroup>
        <ListGroup>
          <ListItem title="N" groupTitle />
          <ListItem title="Nathan" />
          <ListItem title="Noah" />
        </ListGroup>
        <ListGroup>
          <ListItem title="O" groupTitle />
          <ListItem title="Oliver" />
          <ListItem title="Ollie" />
          <ListItem title="Oscar" />
          <ListItem title="Owen" />
        </ListGroup>
        <ListGroup>
          <ListItem title="R" groupTitle />
          <ListItem title="Reuben" />
          <ListItem title="Riley" />
          <ListItem title="Robert" />
          <ListItem title="Ronnie" />
          <ListItem title="Rory" />
          <ListItem title="Ryan" />
        </ListGroup>
        <ListGroup>
          <ListItem title="S" groupTitle />
          <ListItem title="Samuel" />
          <ListItem title="Sebastian" />
          <ListItem title="Seth" />
          <ListItem title="Sonny" />
          <ListItem title="Stanley" />
        </ListGroup>
        <ListGroup>
          <ListItem title="T" groupTitle />
          <ListItem title="Teddy" />
          <ListItem title="Theo" />
          <ListItem title="Theodore" />
          <ListItem title="Thomas" />
          <ListItem title="Toby" />
          <ListItem title="Tommy" />
          <ListItem title="Tyler" />
        </ListGroup>
        <ListGroup>
          <ListItem title="W" groupTitle />
          <ListItem title="William" />
        </ListGroup>
        <ListGroup>
          <ListItem title="Z" groupTitle />
          <ListItem title="Zachary" />
        </ListGroup>
      </List>
    </Page>
  );
};
