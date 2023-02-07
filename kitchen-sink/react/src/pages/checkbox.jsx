import React, { useState } from 'react';
import { Navbar, Page, BlockTitle, Block, List, ListItem, Checkbox } from 'framework7-react';

export default () => {
  const [movies, setMovies] = useState(['Movie 1']);
  const onMovieChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      movies.push(value);
    } else {
      movies.splice(movies.indexOf(value), 1);
    }
    setMovies([...movies]);
  };
  const onMoviesChange = () => {
    if (movies.length === 1 || movies.length === 0) {
      setMovies(['Movie 1', 'Movie 2']);
    } else if (movies.length === 2) {
      setMovies([]);
    }
  };
  return (
    <Page>
      <Navbar title="Checkbox" backLink="Back" />
      <BlockTitle>Inline</BlockTitle>
      <Block strongIos outlineIos>
        <p>
          Lorem <Checkbox name="checkbox-1"></Checkbox> ipsum dolor sit amet, consectetur
          adipisicing elit. Alias beatae illo nihil aut eius commodi sint eveniet aliquid eligendi{' '}
          <Checkbox name="checkbox-2" defaultChecked></Checkbox> ad delectus impedit tempore nemo,
          enim vel praesentium consequatur nulla mollitia!
        </p>
      </Block>

      <BlockTitle>Checkbox Group</BlockTitle>
      <List strongIos outlineIos dividersIos>
        <ListItem checkbox title="Books" name="demo-checkbox" defaultChecked />
        <ListItem checkbox title="Movies" name="demo-checkbox" />
        <ListItem checkbox title="Food" name="demo-checkbox" />
        <ListItem checkbox title="Drinks" name="demo-checkbox" />
      </List>

      <List strongIos outlineIos dividersIos>
        <ListItem checkbox checkboxIcon="end" title="Books" name="demo-checkbox" defaultChecked />
        <ListItem checkbox checkboxIcon="end" title="Movies" name="demo-checkbox" />
        <ListItem checkbox checkboxIcon="end" title="Food" name="demo-checkbox" />
        <ListItem checkbox checkboxIcon="end" title="Drinks" name="demo-checkbox" />
      </List>

      <BlockTitle>Indeterminate State</BlockTitle>
      <List strongIos outlineIos dividersIos>
        <ListItem
          checkbox
          title="Movies"
          name="demo-checkbox"
          checked={movies.length === 2}
          indeterminate={movies.length === 1}
          onChange={(e) => onMoviesChange(e)}
        >
          <ul slot="root">
            <ListItem
              checkbox
              title="Movie 1"
              name="demo-checkbox"
              value="Movie 1"
              checked={movies.indexOf('Movie 1') >= 0}
              onChange={(e) => onMovieChange(e)}
            />
            <ListItem
              checkbox
              title="Movie 2"
              name="demo-checkbox"
              value="Movie 2"
              checked={movies.indexOf('Movie 2') >= 0}
              onChange={(e) => onMovieChange(e)}
            />
          </ul>
        </ListItem>
      </List>

      <BlockTitle>With Media Lists</BlockTitle>
      <List mediaList strongIos outlineIos dividersIos>
        <ListItem
          checkbox
          defaultChecked
          name="demo-media-checkbox"
          title="Facebook"
          after="17:14"
          subtitle="New messages from John Doe"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
        />
        <ListItem
          checkbox
          name="demo-media-checkbox"
          title="John Doe (via Twitter)"
          after="17:11"
          subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
        />
        <ListItem
          checkbox
          name="demo-media-checkbox"
          title="Facebook"
          after="16:48"
          subtitle="New messages from John Doe"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
        />
        <ListItem
          checkbox
          name="demo-media-checkbox"
          title="John Doe (via Twitter)"
          after="15:32"
          subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
        />
      </List>
    </Page>
  );
};
