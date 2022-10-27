<script>
  import {
    f7,
    Page,
    Navbar,
    BlockTitle,
    Block,
    Treeview,
    TreeviewItem,
    Checkbox,
  } from 'framework7-svelte';

  let checkboxes = {
    images: {
      'avatar.png': false,
      'background.jpg': false,
    },
    documents: {
      'cv.docx': false,
      'info.docx': false,
    },
    '.gitignore': false,
    'index.html': false,
  };
  let selectedItem = null;
  let loadedChildren = [];

  function toggleSelectable(e, item) {
    const $ = f7.$;
    if ($(e.target).is('.treeview-toggle')) return;
    selectedItem = item;
  }

  function loadChildren(done) {
    setTimeout(() => {
      // call done() to hide preloader
      done();
      loadedChildren = [
        {
          name: 'John Doe',
        },
        {
          name: 'Jane Doe',
        },
        {
          name: 'Calvin Johnson',
        },
      ];
    }, 2000);
  }
</script>

<Page>
  <Navbar title="Treeview" backLink="Back" />

  <BlockTitle>Basic tree view</BlockTitle>
  <Block strong outlineIos class="no-padding-horizontal">
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
  <Block strong outlineIos class="no-padding-horizontal">
    <Treeview>
      <TreeviewItem label="images" iconF7="folder_fill">
        <TreeviewItem label="avatar.png" iconF7="photo_fill" />
        <TreeviewItem label="background.jpg" iconF7="photo_fill" />
      </TreeviewItem>
      <TreeviewItem label="documents" iconF7="folder_fill">
        <TreeviewItem label="cv.docx" iconF7="doc_text_fill" />
        <TreeviewItem label="info.docx" iconF7="doc_text_fill" />
      </TreeviewItem>
      <TreeviewItem label=".gitignore" iconF7="logo_github" />
      <TreeviewItem label="index.html" iconF7="doc_text_fill" />
    </Treeview>
  </Block>

  <BlockTitle>With checkboxes</BlockTitle>
  <Block strong outlineIos class="no-padding-horizontal">
    <Treeview>
      <TreeviewItem label="images" iconF7="folder_fill">
        <span slot="content-start">
          <Checkbox
            checked={Object.values(checkboxes.images).indexOf(false) < 0}
            indeterminate={Object.values(checkboxes.images).indexOf(false) >= 0 &&
              Object.values(checkboxes.images).indexOf(true) >= 0}
            onChange={(e) => {
              Object.keys(checkboxes.images).forEach(
                (k) => (checkboxes.images[k] = e.target.checked),
              );
              checkboxes = checkboxes;
            }}
          />
        </span>
        <TreeviewItem label="avatar.png" iconF7="photo_fill" toggle={false}>
          <span slot="content-start">
            <Checkbox
              checked={checkboxes.images['avatar.png']}
              onChange={(e) => {
                checkboxes.images['avatar.png'] = e.target.checked;
                checkboxes = checkboxes;
              }}
            />
          </span>
        </TreeviewItem>
        <TreeviewItem label="background.jpg" iconF7="photo_fill" toggle={false}>
          <span slot="content-start">
            <Checkbox
              checked={checkboxes.images['background.jpg']}
              onChange={(e) => {
                checkboxes.images['background.jpg'] = e.target.checked;
                checkboxes = checkboxes;
              }}
            />
          </span>
        </TreeviewItem>
      </TreeviewItem>
      <TreeviewItem label="documents" iconF7="folder_fill">
        <span slot="content-start">
          <Checkbox
            checked={Object.values(checkboxes.documents).indexOf(false) < 0}
            indeterminate={Object.values(checkboxes.documents).indexOf(false) >= 0 &&
              Object.values(checkboxes.documents).indexOf(true) >= 0}
            onChange={(e) => {
              Object.keys(checkboxes.documents).forEach(
                (k) => (checkboxes.documents[k] = e.target.checked),
              );
              checkboxes = checkboxes;
            }}
          />
        </span>
        <TreeviewItem label="cv.docx" iconF7="doc_text_fill" toggle={false}>
          <span slot="content-start">
            <Checkbox
              checked={checkboxes.documents['cv.docx']}
              onChange={(e) => {
                checkboxes.documents['cv.docx'] = e.target.checked;
                checkboxes = checkboxes;
              }}
            />
          </span>
        </TreeviewItem>
        <TreeviewItem label="info.docx" iconF7="doc_text_fill" toggle={false}>
          <span slot="content-start">
            <Checkbox
              checked={checkboxes.documents['info.docx']}
              onChange={(e) => {
                checkboxes.documents['info.docx'] = e.target.checked;
                checkboxes = checkboxes;
              }}
            />
          </span>
        </TreeviewItem>
      </TreeviewItem>
      <TreeviewItem label=".gitignore" iconF7="logo_github" toggle={false}>
        <span slot="content-start">
          <Checkbox
            checked={checkboxes['.gitignore']}
            onChange={(e) => {
              checkboxes['.gitignore'] = e.target.checked;
              checkboxes = checkboxes;
            }}
          />
        </span>
      </TreeviewItem>
      <TreeviewItem label="index.html" iconF7="doc_text_fill" toggle={false}>
        <span slot="content-start">
          <Checkbox
            checked={checkboxes['index.html']}
            onChange={(e) => {
              checkboxes['index.html'] = e.target.checked;
              checkboxes = checkboxes;
            }}
          />
        </span>
      </TreeviewItem>
    </Treeview>
  </Block>

  <BlockTitle>Whole item as toggle</BlockTitle>
  <Block strong outlineIos class="no-padding-horizontal">
    <Treeview>
      <TreeviewItem itemToggle label="images" iconF7="folder_fill">
        <TreeviewItem label="avatar.png" iconF7="photo_fill" />
        <TreeviewItem label="background.jpg" iconF7="photo_fill" />
      </TreeviewItem>
      <TreeviewItem itemToggle label="documents" iconF7="folder_fill">
        <TreeviewItem label="cv.docx" iconF7="doc_text_fill" />
        <TreeviewItem label="info.docx" iconF7="doc_text_fill" />
      </TreeviewItem>
      <TreeviewItem label=".gitignore" iconF7="logo_github" />
      <TreeviewItem label="index.html" iconF7="doc_text_fill" />
    </Treeview>
  </Block>

  <BlockTitle>Selectable</BlockTitle>
  <Block strong outlineIos class="no-padding-horizontal">
    <Treeview>
      <TreeviewItem
        selectable
        selected={selectedItem === 'images'}
        label="images"
        iconF7="folder_fill"
        onClick={(e) => toggleSelectable(e, 'images')}
      >
        <TreeviewItem
          selectable
          selected={selectedItem === 'avatar.png'}
          label="avatar.png"
          iconF7="photo_fill"
          onClick={(e) => toggleSelectable(e, 'avatar.png')}
        />
        <TreeviewItem
          selectable
          selected={selectedItem === 'background.jpg'}
          label="background.jpg"
          iconF7="photo_fill"
          onClick={(e) => toggleSelectable(e, 'background.jpg')}
        />
      </TreeviewItem>
      <TreeviewItem
        selectable
        selected={selectedItem === 'documents'}
        label="documents"
        iconF7="folder_fill"
        onClick={(e) => toggleSelectable(e, 'documents')}
      >
        <TreeviewItem
          selectable
          selected={selectedItem === 'cv.docx'}
          label="cv.docx"
          iconF7="doc_text_fill"
          onClick={(e) => toggleSelectable(e, 'cv.docx')}
        />
        <TreeviewItem
          selectable
          selected={selectedItem === 'info.docx'}
          label="info.docx"
          iconF7="doc_text_fill"
          onClick={(e) => toggleSelectable(e, 'info.docx')}
        />
      </TreeviewItem>
      <TreeviewItem
        selectable
        selected={selectedItem === '.gitignore'}
        label=".gitignore"
        iconF7="logo_github"
        onClick={(e) => toggleSelectable(e, '.gitignore')}
      />
      <TreeviewItem
        selectable
        selected={selectedItem === 'index.html'}
        label="index.html"
        iconF7="doc_text_fill"
        onClick={(e) => toggleSelectable(e, 'index.html')}
      />
    </Treeview>
  </Block>

  <BlockTitle>Preload children</BlockTitle>
  <Block strong outlineIos class="no-padding-horizontal">
    <Treeview>
      <TreeviewItem
        toggle
        loadChildren
        iconF7="person_2_fill"
        label="Users"
        onTreeviewLoadChildren={(el, done) => loadChildren(done)}
      >
        {#each loadedChildren as item, index (index)}
          <TreeviewItem iconF7="person_fill" label={item.name} />
        {/each}
      </TreeviewItem>
    </Treeview>
  </Block>

  <BlockTitle>With links</BlockTitle>
  <Block strong outlineIos class="no-padding-horizontal">
    <Treeview>
      <TreeviewItem iconF7="square_grid_2x2_fill" itemToggle label="Modals">
        <TreeviewItem link="/popup/" iconF7="link" label="Popup" />
        <TreeviewItem link="/dialog/" iconF7="link" label="Dialog" />
        <TreeviewItem link="/action-sheet/" iconF7="link" label="Action Sheet" />
      </TreeviewItem>
      <TreeviewItem iconF7="square_grid_2x2_fill" itemToggle label="Navigation Bars">
        <TreeviewItem link="/navbar/" iconF7="link" label="Navbar" />
        <TreeviewItem link="/toolbar-tabbar/" iconF7="link" label="Toolbar & Tabbar" />
      </TreeviewItem>
    </Treeview>
  </Block>
</Page>
