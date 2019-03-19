import React from 'react';
import { Navbar, Page, Block, Card, CardHeader, CardContent, Link, Button } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Cards Expandable" backLink="Back" />

    <Block>
      <p>In addition to usual <a href="/cards/">Cards</a> there are also Expandable Cards that allow to store more information and illustrations about particular subject.</p>
    </Block>

    <div className="demo-expandable-cards">
      <Card expandable>
        <CardContent padding={false}>
          <div className="bg-color-red" style={{height: '300px'}}>
            <CardHeader textColor="white" className="display-block">
              Framework7
              <br />
              <small style={{opacity: 0.7}}>Build Mobile Apps</small>
            </CardHeader>
            <Link cardClose color="white" className="card-opened-fade-in" style={{position: 'absolute', right: '15px', top: '15px'}} iconF7="close_round_fill" />
          </div>
          <div className="card-content-padding">
            <p>Framework7 - is a free and open source HTML mobile framework to develop hybrid mobile apps or web apps with iOS or Android (Material) native look and feel. It is also an indispensable prototyping apps tool to show working app prototype as soon as possible in case you need to. Framework7 is created by Vladimir Kharlampidi (iDangero.us).</p>
            <p>The main approach of the Framework7 is to give you an opportunity to create iOS and Android (Material) apps with HTML, CSS and JavaScript easily and clear. Framework7 is full of freedom. It doesn't limit your imagination or offer ways of any solutions somehow. Framework7 gives you freedom!</p>
            <p>Framework7 is not compatible with all platforms. It is focused only on iOS and Android (Material) to bring the best experience and simplicity.</p>
            <p>Framework7 is definitely for you if you decide to build iOS and Android hybrid app (Cordova or PhoneGap) or web app that looks like and feels as great native iOS or Android (Material) apps.</p>
            <p>
              <Button fill round large cardClose color="red">Close</Button>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card expandable>
        <CardContent padding={false}>
          <div className="bg-color-yellow" style={{height: '300px'}}>
            <CardHeader textColor="black" className="display-block">
              Framework7
              <br/>
              <small style={{opacity: 0.7}}>Build Mobile Apps</small>
            </CardHeader>
            <Link cardClose color="black" className="card-opened-fade-in" style={{position: 'absolute', right: '15px', top: '15px'}} iconF7="close_round_fill" />
          </div>
          <div className="card-content-padding">
            <p>Framework7 - is a free and open source HTML mobile framework to develop hybrid mobile apps or web apps with iOS or Android (Material) native look and feel. It is also an indispensable prototyping apps tool to show working app prototype as soon as possible in case you need to. Framework7 is created by Vladimir Kharlampidi (iDangero.us).</p>
            <p>The main approach of the Framework7 is to give you an opportunity to create iOS and Android (Material) apps with HTML, CSS and JavaScript easily and clear. Framework7 is full of freedom. It doesn't limit your imagination or offer ways of any solutions somehow. Framework7 gives you freedom!</p>
            <p>Framework7 is not compatible with all platforms. It is focused only on iOS and Android (Material) to bring the best experience and simplicity.</p>
            <p>Framework7 is definitely for you if you decide to build iOS and Android hybrid app (Cordova or PhoneGap) or web app that looks like and feels as great native iOS or Android (Material) apps.</p>
            <p>
              <Button fill round large cardClose color="yellow" textColor="black">Close</Button>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card expandable>
        <CardContent padding={false}>
          <div style={{background: 'url(./img/beach.jpg) no-repeat center bottom', backgroundSize: 'cover', height: '240px'}}></div>
          <Link cardClose color="white" className="card-opened-fade-in" style={{position: 'absolute', right: '15px', top: '15px'}} iconF7="close_round_fill" />
          <CardHeader style={{height: '60px'}}>Beach, Goa</CardHeader>
          <div className="card-content-padding">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus rhoncus cursus. Etiam lorem est, consectetur vitae tempor a, volutpat eget purus. Duis urna lectus, vehicula at quam id, sodales dapibus turpis. Suspendisse potenti. Proin condimentum luctus nulla, et rhoncus ante rutrum eu. Maecenas ut tincidunt diam. Vestibulum lacinia dui ligula, sit amet pulvinar nisl blandit luctus. Vestibulum aliquam ligula nulla, tincidunt rhoncus tellus interdum at. Phasellus mollis ipsum at mollis tristique. Maecenas sit amet tempus justo. Duis dolor elit, mollis quis viverra quis, vehicula eu ante. Integer a molestie risus. Vestibulum eu sollicitudin massa, sit amet dictum sem. Aliquam nisi tellus, maximus eget placerat in, porta vel lorem. Aenean tempus sodales nisl in cursus. Curabitur tincidunt turpis in nisl ornare euismod eget at libero.</p>
            <p>Suspendisse ligula eros, congue in nulla pellentesque, imperdiet blandit sapien. Morbi nisi sem, efficitur a rutrum porttitor, feugiat vel enim. Fusce eget vehicula odio, et luctus neque. Donec mattis a nulla laoreet commodo. Integer eget hendrerit augue, vel porta libero. Morbi imperdiet, eros at ultricies rutrum, eros urna auctor enim, eget laoreet massa diam vitae lorem. Proin eget urna ultrices, semper ligula aliquam, dignissim eros. Donec vitae augue eu sapien tristique elementum a nec nulla. Aliquam erat volutpat. Curabitur condimentum, metus blandit lobortis fringilla, enim mauris venenatis neque, et venenatis lorem urna ut justo. Maecenas neque enim, congue ac tempor quis, tincidunt ut mi. Donec venenatis ante non consequat molestie. Quisque ut rhoncus ligula. Vestibulum sodales maximus justo sit amet ornare. Nullam pulvinar eleifend nisi sit amet molestie.</p>
            <p>
              <Button fill round large cardClose>Close</Button>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card expandable>
        <CardContent padding={false}>
          <div style={{background: 'url(./img/monkey.jpg) no-repeat center top', backgroundSize: 'cover', height: '400px'}}>
            <CardHeader textColor="white">Monkeys</CardHeader>
            <Link cardClose color="white" className="card-opened-fade-in" style={{position: 'absolute', right: '15px', top: '15px'}} iconF7="close_round_fill" />
          </div>
          <div className="card-content-padding">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus rhoncus cursus. Etiam lorem est, consectetur vitae tempor a, volutpat eget purus. Duis urna lectus, vehicula at quam id, sodales dapibus turpis. Suspendisse potenti. Proin condimentum luctus nulla, et rhoncus ante rutrum eu. Maecenas ut tincidunt diam. Vestibulum lacinia dui ligula, sit amet pulvinar nisl blandit luctus. Vestibulum aliquam ligula nulla, tincidunt rhoncus tellus interdum at. Phasellus mollis ipsum at mollis tristique. Maecenas sit amet tempus justo. Duis dolor elit, mollis quis viverra quis, vehicula eu ante. Integer a molestie risus. Vestibulum eu sollicitudin massa, sit amet dictum sem. Aliquam nisi tellus, maximus eget placerat in, porta vel lorem. Aenean tempus sodales nisl in cursus. Curabitur tincidunt turpis in nisl ornare euismod eget at libero.</p>
            <p>Suspendisse ligula eros, congue in nulla pellentesque, imperdiet blandit sapien. Morbi nisi sem, efficitur a rutrum porttitor, feugiat vel enim. Fusce eget vehicula odio, et luctus neque. Donec mattis a nulla laoreet commodo. Integer eget hendrerit augue, vel porta libero. Morbi imperdiet, eros at ultricies rutrum, eros urna auctor enim, eget laoreet massa diam vitae lorem. Proin eget urna ultrices, semper ligula aliquam, dignissim eros. Donec vitae augue eu sapien tristique elementum a nec nulla. Aliquam erat volutpat. Curabitur condimentum, metus blandit lobortis fringilla, enim mauris venenatis neque, et venenatis lorem urna ut justo. Maecenas neque enim, congue ac tempor quis, tincidunt ut mi. Donec venenatis ante non consequat molestie. Quisque ut rhoncus ligula. Vestibulum sodales maximus justo sit amet ornare. Nullam pulvinar eleifend nisi sit amet molestie.</p>
            <p>
              <Button fill round large cardClose>Close</Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </Page>
);
