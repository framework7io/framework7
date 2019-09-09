import React from 'react';
import { Page, Navbar, BlockTitle, BlockHeader, Block, TextEditor, List, ListInput } from 'framework7-react';

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      customButtons: {
        hr: {
          content: '&lt;hr&gt;',
          onClick(editor, buttonEl) {
            document.execCommand('insertHorizontalRule', false);
          },
        },
      },
      customValue: `<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur sunt, sapiente quis eligendi consectetur hic asperiores assumenda quidem dolore quasi iusto tenetur commodi qui ullam sint sed alias! Consequatur, dolor!</p>
      <p>Provident reiciendis exercitationem reprehenderit amet repellat laborum, sequi id quam quis quo quos facere veniam ad libero dolorum animi. Nobis, illum culpa explicabo dolorem vitae ut dolor at reprehenderit magnam?</p>
      <p>Qui, animi. Dolores dicta, nobis aut expedita enim eum assumenda modi, blanditiis voluptatibus excepturi non pariatur. Facilis fugit facere sequi molestias nemo in, suscipit inventore consequuntur, repellat perferendis, voluptas odit.</p>
      <p>Tempora voluptates, doloribus architecto eligendi numquam facilis perspiciatis autem quam voluptas maxime ratione harum laudantium cum deleniti. In, alias deserunt voluptatibus eligendi libero nobis est unde et perspiciatis cumque voluptatum.</p>
      <p>Quam error doloribus qui laboriosam eligendi. Aspernatur quam pariatur perspiciatis reprehenderit atque dicta culpa, aut rem? Assumenda, quibusdam? Reprehenderit necessitatibus facere nemo iure maiores porro voluptates accusamus quibusdam. Nesciunt, assumenda?</p>`,
      listEditorValue: '',
    };
  }
  render() {
    return (
      <Page>
        <Navbar title="Text Editor" backLink="Back"></Navbar>

        <Block>
          <p>Framework7 comes with a touch-friendly Rich Text Editor component. It is based on modern "contenteditable" API so it should work everywhere as is.</p>
          <p>It comes with the basic set of formatting features. But its functionality can be easily extended and customized to fit any requirements.</p>
        </Block>

        <BlockTitle>Default Setup</BlockTitle>
        <TextEditor />

        <BlockTitle>With Placeholder</BlockTitle>
        <TextEditor
          placeholder="Enter text..."
        />

        <BlockTitle>With Default Value</BlockTitle>
        <TextEditor
          placeholder="Enter text..."
          value={this.state.customValue}
          onTextEditorChange={(value) => this.setState({ customValue: value })}
        />

        <BlockTitle>Specific Buttons</BlockTitle>
        <BlockHeader>It is possible to customize which buttons (commands) to show.</BlockHeader>
        <TextEditor
          placeholder="Enter text..."
          buttons={[
            ['bold', 'italic', 'underline', 'strikeThrough'],
            ['orderedList', 'unorderedList']
          ]}
        />

        <BlockTitle>Custom Button</BlockTitle>
        <BlockHeader>It is possible to create custom editor buttons. Here is the custom "hr" button that adds horizontal rule:</BlockHeader>
        <TextEditor
          placeholder="Enter text..."
          customButtons={this.state.customButtons}
          buttons={[
            ['bold', 'italic', 'underline', 'strikeThrough'],
            'hr'
          ]}
        />

        <BlockTitle>Resizable</BlockTitle>
        <BlockHeader>Editor will be resized based on its content.</BlockHeader>
        <TextEditor
          placeholder="Enter text..."
          resizable
          buttons={['bold', 'italic', 'underline', 'strikeThrough']}
        />

        <BlockTitle>Popover Mode</BlockTitle>
        <BlockHeader>In this mode, there is no toolbar with buttons, but they appear as popover when you select any text in editor.</BlockHeader>
        <TextEditor
          placeholder="Enter text..."
          mode="popover"
          buttons={['bold', 'italic', 'underline', 'strikeThrough']}
          style={{'--f7-text-editor-height': '150px'}}
        />

        <BlockTitle>Keyboard Toolbar Mode</BlockTitle>
        <BlockHeader>In this mode, toolbar with buttons will appear on top of virtual keyboard when editor is in the focus. It is supported only in iOS, Android cordova apps and in Android Chrome. When not supported it will fallback to "popover" mode.</BlockHeader>
        <TextEditor
          placeholder="Enter text..."
          mode="keyboard-toolbar"
          style={{'--f7-text-editor-height': '150px'}}
        />

        <BlockTitle>As List Input</BlockTitle>
        <BlockHeader>Text editor can be used in list with other inputs. In this example it is enabled with "keyboard-toolbar"/"popover" type for "About" field.</BlockHeader>
        <List>
          <ListInput
            type="text"
            label="Name"
            placeholder="Your name"
          />
          <ListInput
            type="texteditor"
            label="About"
            placeholder="About"
            resizable
            textEditorParams={{
              mode: 'popover',
              buttons: ['bold', 'italic', 'underline', 'strikeThrough']
            }}
            value={this.state.listEditorValue}
            onTextEditorChange={(value) => this.setState({listEditorValue: value})}
          />
        </List>
      </Page>
    );
  }
}
