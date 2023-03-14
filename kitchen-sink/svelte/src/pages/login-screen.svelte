<script>
  import {
    f7,
    Navbar,
    Page,
    LoginScreen,
    ListInput,
    List,
    ListItem,
    Block,
    Button,
    LoginScreenTitle,
    BlockFooter,
    ListButton,
  } from 'framework7-svelte';

  let loginScreenOpened = false;
  let username = '';
  let password = '';

  function signIn() {
    f7.dialog.alert(`Username: ${username}<br>Password: ${password}`, () => {
      f7.loginScreen.close();
    });
  }
</script>

<Page>
  <Navbar title="Login Screen" backLink="Back" />
  <Block>
    <p>
      Framework7 comes with ready to use Login Screen layout. It could be used inside of page or
      inside of popup (Embedded) or as a standalone overlay:
    </p>
  </Block>

  <!-- example-hidden-start -->
  <List strong insetMd outlineIos>
    <ListItem link="/login-screen-page/" title="As Separate Page" />
  </List>
  <!-- example-hidden-end -->

  <Block>
    <Button raised large fill loginScreenOpen=".demo-login-screen">As Overlay</Button>
  </Block>

  <Block>
    <Button raised large fill onClick={() => (loginScreenOpened = true)}>
      Open Via Prop Change
    </Button>
  </Block>

  <LoginScreen
    class="demo-login-screen"
    opened={loginScreenOpened}
    onLoginScreenClosed={() => {
      loginScreenOpened = false;
      console.log('foobar');
    }}
  >
    <Page loginScreen>
      <LoginScreenTitle>Framework7</LoginScreenTitle>
      <List form>
        <ListInput
          label="Username"
          type="text"
          placeholder="Your username"
          value={username}
          onInput={(e) => (username = e.target.value)}
        />
        <ListInput
          label="Password"
          type="password"
          placeholder="Your password"
          value={password}
          onInput={(e) => (password = e.target.value)}
        />
      </List>
      <List inset>
        <ListButton onClick={signIn}>Sign In</ListButton>
      </List>
      <BlockFooter>
        Some text about login information.<br />Lorem ipsum dolor sit amet, consectetur adipiscing
        elit.
      </BlockFooter>
    </Page>
  </LoginScreen>
</Page>
