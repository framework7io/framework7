import React from 'react';
import { Page, Navbar, BlockTitle, Block, Treeview, TreeviewItem, Checkbox } from 'framework7-react';

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      checkboxes: {
        images: {
          'avatar.png': false,
          'background.jpg': false,
        },
        documents: {
          'cv.docx': false,
          'info.docx': false,
        },
        '.gitignore': false,
        '.index.html': false,
      },
      selectedItem: null,
      loadedChildren: [],
    };
  }

  toggleSelectable(e, item) {
    var self = this;
    var $ = self.$$;
    if ($(e.target).is('.treeview-toggle')) return;
    self.setState({selectedItem: item});
  }

  loadChildren(done) {
    var self = this;
    setTimeout(function () {
      // call done() to hide preloader
      done();
      self.setState({
        loadedChildren: [
          {
            name: 'John Doe',
          },
          {
            name: 'Jane Doe',
          },
          {
            name: 'Calvin Johnson',
          },
        ],
      });
    }, 2000);
  }

  render() {
    return (
      <Page>
        <Navbar title="Treeview" backLink="Back" />

        <BlockTitle>Basic tree view</BlockTitle>
        <Block strong className="no-padding-horizontal">
          <Treeview>
            <TreeviewItem label="Item 1">
              <TreeviewItem label="Sub Item 1">
                <TreeviewItem label="Sub Sub Item 1" />
                <TreeviewItem label="Sub Sub Item 2" />
              </TreeviewItem>
              <TreeviewItem label="Sub Item 2">
                <TreeviewItem label="Sub Sub Item 1" />
                <TreeviewItem label="Sub Sub Item 2" />
              </TreeviewItem>
            </TreeviewItem>
            <TreeviewItem label="Item 2">
              <TreeviewItem label="Sub Item 1">
                <TreeviewItem label="Sub Sub Item 1" />
                <TreeviewItem label="Sub Sub Item 2" />
              </TreeviewItem>
              <TreeviewItem label="Sub Item 2">
                <TreeviewItem label="Sub Sub Item 1" />
                <TreeviewItem label="Sub Sub Item 2" />
              </TreeviewItem>
            </TreeviewItem>
            <TreeviewItem label="Item 3" />
          </Treeview>
        </Block>

        <BlockTitle>With icons</BlockTitle>
        <Block strong className="no-padding-horizontal">
          <Treeview>
            <TreeviewItem label="images" iconF7="folder_fill">
              <TreeviewItem label="avatar.png" iconF7="images_fill" />
              <TreeviewItem label="background.jpg" iconF7="images_fill" />
            </TreeviewItem>
            <TreeviewItem label="documents" iconF7="folder_fill">
              <TreeviewItem label="cv.docx" iconF7="document_text_fill" />
              <TreeviewItem label="info.docx" iconF7="document_text_fill" />
            </TreeviewItem>
            <TreeviewItem label=".gitignore" iconF7="logo_github" />
            <TreeviewItem label="index.html" iconF7="document_text_fill" />
          </Treeview>
        </Block>

        <BlockTitle>With checkboxes</BlockTitle>
        <Block strong className="no-padding-horizontal">
          <Treeview>
            <TreeviewItem label="images" iconF7="folder_fill">
              <Checkbox slot="content-start"
                checked={Object.values(this.state.checkboxes.images).indexOf(false) < 0}
                indeterminate={Object.values(this.state.checkboxes.images).indexOf(false) >= 0 && Object.values(this.state.checkboxes.images).indexOf(true) >= 0}
                onChange={(e) => {
                  Object.keys(this.state.checkboxes.images).forEach(k => this.state.checkboxes.images[k] = e.target.checked);
                  this.setState({...this.state});
                }}
              />
              <TreeviewItem label="avatar.png" iconF7="images_fill">
                <Checkbox slot="content-start"
                  checked={this.state.checkboxes.images['avatar.png']}
                  onChange={(e) => {
                    this.state.checkboxes.images['avatar.png'] = e.target.checked;
                    this.setState({...this.state});
                  }}
                />
              </TreeviewItem>
              <TreeviewItem label="background.jpg" iconF7="images_fill">
                <Checkbox slot="content-start"
                  checked={this.state.checkboxes.images['background.jpg']}
                  onChange={(e) => {
                    this.state.checkboxes.images['background.jpg'] = e.target.checked;
                    this.setState({...this.state});
                  }}
                />
              </TreeviewItem>
            </TreeviewItem>
            <TreeviewItem label="documents" iconF7="folder_fill">
              <Checkbox slot="content-start"
                checked={Object.values(this.state.checkboxes.documents).indexOf(false) < 0}
                indeterminate={Object.values(this.state.checkboxes.documents).indexOf(false) >= 0 && Object.values(this.state.checkboxes.documents).indexOf(true) >= 0}
                onChange={(e) => {
                  Object.keys(this.state.checkboxes.documents).forEach(k => this.state.checkboxes.documents[k] = e.target.checked);
                  this.setState({...this.state});
                }}
              />
              <TreeviewItem label="cv.docx" iconF7="document_text_fill">
                <Checkbox slot="content-start"
                  checked={this.state.checkboxes.documents['cv.docx']}
                  onChange={(e) => {
                    this.state.checkboxes.documents['cv.docx'] = e.target.checked;
                    this.setState({...this.state});
                  }}
                />
              </TreeviewItem>
              <TreeviewItem label="info.docx" iconF7="document_text_fill">
                <Checkbox slot="content-start"
                  checked={this.state.checkboxes.documents['info.docx']}
                  onChange={(e) => {
                    this.state.checkboxes.documents['info.docx'] = e.target.checked;
                    this.setState({...this.state});
                  }}
                />
              </TreeviewItem>
            </TreeviewItem>
            <TreeviewItem label=".gitignore" iconF7="logo_github">
              <Checkbox slot="content-start" checked={this.state.checkboxes['.gitignore']} onChange={(e) => {
                this.state.checkboxes['.gitignore'] = e.target.checked;
                this.setState({...this.state});
              }}/>
            </TreeviewItem>
            <TreeviewItem label="index.html" iconF7="document_text_fill">
              <Checkbox slot="content-start" checked={this.state.checkboxes['index.html']} onChange={(e) => {
                this.state.checkboxes['index.html'] = e.target.checked;
                this.setState({...this.state});
              }}/>
            </TreeviewItem>
          </Treeview>
        </Block>

        <BlockTitle>Whole item as toggle</BlockTitle>
        <Block strong className="no-padding-horizontal">
          <Treeview>
            <TreeviewItem itemToggle label="images" iconF7="folder_fill">
              <TreeviewItem label="avatar.png" iconF7="images_fill" />
              <TreeviewItem label="background.jpg" iconF7="images_fill" />
            </TreeviewItem>
            <TreeviewItem itemToggle label="documents" iconF7="folder_fill">
              <TreeviewItem label="cv.docx" iconF7="document_text_fill" />
              <TreeviewItem label="info.docx" iconF7="document_text_fill" />
            </TreeviewItem>
            <TreeviewItem label=".gitignore" iconF7="logo_github" />
            <TreeviewItem label="index.html" iconF7="document_text_fill" />
          </Treeview>
        </Block>

        <BlockTitle>Selectable</BlockTitle>
        <Block strong className="no-padding-horizontal">
          <Treeview>
            <TreeviewItem
              selectable
              selected={this.state.selectedItem === 'images'}
              label="images"
              iconF7="folder_fill"
              onClick={(e) => this.toggleSelectable(e, 'images')}
            >
              <TreeviewItem
                selectable
                selected={this.state.selectedItem === 'avatar.png'}
                label="avatar.png"
                iconF7="images_fill"
                onClick={(e) => this.toggleSelectable(e, 'avatar.png')}
              />
              <TreeviewItem
                selectable
                selected={this.state.selectedItem === 'background.jpg'}
                label="background.jpg"
                iconF7="images_fill"
                onClick={(e) => this.toggleSelectable(e, 'background.jpg')}
              />
            </TreeviewItem>
            <TreeviewItem
              selectable
              selected={this.state.selectedItem === 'documents'}
              label="documents"
              iconF7="folder_fill"
              onClick={(e) => this.toggleSelectable(e, 'documents')}
            >
              <TreeviewItem
                selectable
                selected={this.state.selectedItem === 'cv.docx'}
                label="cv.docx"
                iconF7="document_text_fill"
                onClick={(e) => this.toggleSelectable(e, 'cv.docx')}
              />
              <TreeviewItem
                selectable
                selected={this.state.selectedItem === 'info.docx'}
                label="info.docx"
                iconF7="document_text_fill"
                onClick={(e) => this.toggleSelectable(e, 'info.docx')}
              />
            </TreeviewItem>
            <TreeviewItem
              selectable
              selected={this.state.selectedItem === '.gitignore'}
              label=".gitignore"
              iconF7="logo_github"
              onClick={(e) => this.toggleSelectable(e, '.gitignore')}
            />
            <TreeviewItem
              selectable
              selected={this.state.selectedItem === 'index.html'}
              label="index.html"
              iconF7="document_text_fill"
              onClick={(e) => this.toggleSelectable(e, 'index.html')}
            />
          </Treeview>
        </Block>

        <BlockTitle>Preload children</BlockTitle>
        <Block strong className="no-padding-horizontal">
          <Treeview>
            <TreeviewItem
              toggle
              loadChildren
              iconF7="persons"
              label="Users"
              onTreeviewLoadChildren={(e, done) => this.loadChildren(done)}
            >
              {this.state.loadedChildren.map((item, index) => (
                <TreeviewItem
                  key={index}
                  iconF7="person"
                  label={item.name}
                />
              ))}
            </TreeviewItem>
          </Treeview>
        </Block>

        <BlockTitle>With links</BlockTitle>
        <Block strong className="no-padding-horizontal">
          <Treeview>
            <TreeviewItem iconF7="data_fill" itemToggle label="Modals">
              <TreeviewItem link="/popup/" iconF7="link" label="Popup" />
              <TreeviewItem link="/dialog/" iconF7="link" label="Dialog" />
              <TreeviewItem link="/action-sheet/" iconF7="link" label="Action Sheet" />
            </TreeviewItem>
            <TreeviewItem iconF7="data_fill" itemToggle label="Navigation Bars">
              <TreeviewItem link="/navbar/" iconF7="link" label="Navbar" />
              <TreeviewItem link="/toolbar-tabbar/" iconF7="link" label="Toolbar & Tabbar" />
            </TreeviewItem>
          </Treeview>
        </Block>
      </Page>
    );
  }

}