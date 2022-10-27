<template>
  <f7-page>
    <f7-navbar title="Treeview" back-link="Back" />

    <f7-block-title>Basic tree view</f7-block-title>
    <f7-block strong outline-ios class="no-padding-horizontal">
      <f7-treeview>
        <f7-treeview-item label="Item 1">
          <f7-treeview-item label="Sub Item 1">
            <f7-treeview-item label="Sub Sub Item 1" />
            <f7-treeview-item label="Sub Sub Item 2" />
          </f7-treeview-item>
          <f7-treeview-item label="Sub Item 2">
            <f7-treeview-item label="Sub Sub Item 1" />
            <f7-treeview-item label="Sub Sub Item 2" />
          </f7-treeview-item>
        </f7-treeview-item>
        <f7-treeview-item label="Item 2">
          <f7-treeview-item label="Sub Item 1">
            <f7-treeview-item label="Sub Sub Item 1" />
            <f7-treeview-item label="Sub Sub Item 2" />
          </f7-treeview-item>
          <f7-treeview-item label="Sub Item 2">
            <f7-treeview-item label="Sub Sub Item 1" />
            <f7-treeview-item label="Sub Sub Item 2" />
          </f7-treeview-item>
        </f7-treeview-item>
        <f7-treeview-item label="Item 3" />
      </f7-treeview>
    </f7-block>

    <f7-block-title>With icons</f7-block-title>
    <f7-block strong outline-ios class="no-padding-horizontal">
      <f7-treeview>
        <f7-treeview-item label="images" icon-f7="folder_fill">
          <f7-treeview-item label="avatar.png" icon-f7="photo_fill" />
          <f7-treeview-item label="background.jpg" icon-f7="photo_fill" />
        </f7-treeview-item>
        <f7-treeview-item label="documents" icon-f7="folder_fill">
          <f7-treeview-item label="cv.docx" icon-f7="doc_text_fill" />
          <f7-treeview-item label="info.docx" icon-f7="doc_text_fill" />
        </f7-treeview-item>
        <f7-treeview-item label=".gitignore" icon-f7="logo_github" />
        <f7-treeview-item label="index.html" icon-f7="doc_text_fill" />
      </f7-treeview>
    </f7-block>

    <f7-block-title>With checkboxes</f7-block-title>
    <f7-block strong outline-ios class="no-padding-horizontal">
      <f7-treeview>
        <f7-treeview-item label="images" icon-f7="folder_fill">
          <template #content-start>
            <f7-checkbox
              :checked="Object.values(checkboxes.images).indexOf(false) < 0"
              :indeterminate="
                Object.values(checkboxes.images).indexOf(false) >= 0 &&
                Object.values(checkboxes.images).indexOf(true) >= 0
              "
              @change="
                (e) =>
                  Object.keys(checkboxes.images).forEach(
                    (k) => (checkboxes.images[k] = e.target.checked),
                  )
              "
            />
          </template>
          <f7-treeview-item label="avatar.png" icon-f7="photo_fill">
            <template #content-start>
              <f7-checkbox
                :checked="checkboxes.images['avatar.png']"
                @change="checkboxes.images['avatar.png'] = $event.target.checked"
              />
            </template>
          </f7-treeview-item>
          <f7-treeview-item label="background.jpg" icon-f7="photo_fill">
            <template #content-start>
              <f7-checkbox
                :checked="checkboxes.images['background.jpg']"
                @change="checkboxes.images['background.jpg'] = $event.target.checked"
              />
            </template>
          </f7-treeview-item>
        </f7-treeview-item>
        <f7-treeview-item label="documents" icon-f7="folder_fill">
          <template #content-start>
            <f7-checkbox
              :checked="Object.values(checkboxes.documents).indexOf(false) < 0"
              :indeterminate="
                Object.values(checkboxes.documents).indexOf(false) >= 0 &&
                Object.values(checkboxes.documents).indexOf(true) >= 0
              "
              @change="
                (e) =>
                  Object.keys(checkboxes.documents).forEach(
                    (k) => (checkboxes.documents[k] = e.target.checked),
                  )
              "
            />
          </template>
          <f7-treeview-item label="cv.docx" icon-f7="doc_text_fill">
            <template #content-start>
              <f7-checkbox
                :checked="checkboxes.documents['cv.docx']"
                @change="checkboxes.documents['cv.docx'] = $event.target.checked"
              />
            </template>
          </f7-treeview-item>
          <f7-treeview-item label="info.docx" icon-f7="doc_text_fill">
            <template #content-start>
              <f7-checkbox
                :checked="checkboxes.documents['info.docx']"
                @change="checkboxes.documents['info.docx'] = $event.target.checked"
              />
            </template>
          </f7-treeview-item>
        </f7-treeview-item>
        <f7-treeview-item label=".gitignore" icon-f7="logo_github">
          <template #content-start>
            <f7-checkbox
              :checked="checkboxes['.gitignore']"
              @change="checkboxes['.gitignore'] = $event.target.checked"
            />
          </template>
        </f7-treeview-item>
        <f7-treeview-item label="index.html" icon-f7="doc_text_fill">
          <template #content-start>
            <f7-checkbox
              :checked="checkboxes['index.html']"
              @change="checkboxes['index.html'] = $event.target.checked"
            />
          </template>
        </f7-treeview-item>
      </f7-treeview>
    </f7-block>

    <f7-block-title>Whole item as toggle</f7-block-title>
    <f7-block strong outline-ios class="no-padding-horizontal">
      <f7-treeview>
        <f7-treeview-item item-toggle label="images" icon-f7="folder_fill">
          <f7-treeview-item label="avatar.png" icon-f7="photo_fill" />
          <f7-treeview-item label="background.jpg" icon-f7="photo_fill" />
        </f7-treeview-item>
        <f7-treeview-item item-toggle label="documents" icon-f7="folder_fill">
          <f7-treeview-item label="cv.docx" icon-f7="doc_text_fill" />
          <f7-treeview-item label="info.docx" icon-f7="doc_text_fill" />
        </f7-treeview-item>
        <f7-treeview-item label=".gitignore" icon-f7="logo_github" />
        <f7-treeview-item label="index.html" icon-f7="doc_text_fill" />
      </f7-treeview>
    </f7-block>

    <f7-block-title>Selectable</f7-block-title>
    <f7-block strong outline-ios class="no-padding-horizontal">
      <f7-treeview>
        <f7-treeview-item
          selectable
          :selected="selectedItem === 'images'"
          label="images"
          icon-f7="folder_fill"
          @click="toggleSelectable($event, 'images')"
        >
          <f7-treeview-item
            selectable
            :selected="selectedItem === 'avatar.png'"
            label="avatar.png"
            icon-f7="photo_fill"
            @click="toggleSelectable($event, 'avatar.png')"
          />
          <f7-treeview-item
            selectable
            :selected="selectedItem === 'background.jpg'"
            label="background.jpg"
            icon-f7="photo_fill"
            @click="toggleSelectable($event, 'background.jpg')"
          />
        </f7-treeview-item>
        <f7-treeview-item
          selectable
          :selected="selectedItem === 'documents'"
          label="documents"
          icon-f7="folder_fill"
          @click="toggleSelectable($event, 'documents')"
        >
          <f7-treeview-item
            selectable
            :selected="selectedItem === 'cv.docx'"
            label="cv.docx"
            icon-f7="doc_text_fill"
            @click="toggleSelectable($event, 'cv.docx')"
          />
          <f7-treeview-item
            selectable
            :selected="selectedItem === 'info.docx'"
            label="info.docx"
            icon-f7="doc_text_fill"
            @click="toggleSelectable($event, 'info.docx')"
          />
        </f7-treeview-item>
        <f7-treeview-item
          selectable
          :selected="selectedItem === '.gitignore'"
          label=".gitignore"
          icon-f7="logo_github"
          @click="toggleSelectable($event, '.gitignore')"
        />
        <f7-treeview-item
          selectable
          :selected="selectedItem === 'index.html'"
          label="index.html"
          icon-f7="doc_text_fill"
          @click="toggleSelectable($event, 'index.html')"
        />
      </f7-treeview>
    </f7-block>

    <f7-block-title>Preload children</f7-block-title>
    <f7-block strong outline-ios class="no-padding-horizontal">
      <f7-treeview>
        <f7-treeview-item
          toggle
          load-children
          icon-f7="person_2_fill"
          label="Users"
          @treeview:loadchildren="loadChildren"
        >
          <f7-treeview-item
            v-for="(item, index) in loadedChildren"
            :key="index"
            icon-f7="person_fill"
            :label="item.name"
          />
        </f7-treeview-item>
      </f7-treeview>
    </f7-block>

    <f7-block-title>With links</f7-block-title>
    <f7-block strong outline-ios class="no-padding-horizontal">
      <f7-treeview>
        <f7-treeview-item icon-f7="square_grid_2x2_fill" item-toggle label="Modals">
          <f7-treeview-item link="/popup/" icon-f7="link" label="Popup" />
          <f7-treeview-item link="/dialog/" icon-f7="link" label="Dialog" />
          <f7-treeview-item link="/action-sheet/" icon-f7="link" label="Action Sheet" />
        </f7-treeview-item>
        <f7-treeview-item icon-f7="square_grid_2x2_fill" item-toggle label="Navigation Bars">
          <f7-treeview-item link="/navbar/" icon-f7="link" label="Navbar" />
          <f7-treeview-item link="/toolbar-tabbar/" icon-f7="link" label="Toolbar & Tabbar" />
        </f7-treeview-item>
      </f7-treeview>
    </f7-block>
  </f7-page>
</template>
<script>
import {
  f7Page,
  f7Navbar,
  f7BlockTitle,
  f7Block,
  f7Treeview,
  f7TreeviewItem,
  f7Checkbox,
} from 'framework7-vue';
import $ from 'dom7';

export default {
  components: {
    f7Page,
    f7Navbar,
    f7BlockTitle,
    f7Block,
    f7Treeview,
    f7TreeviewItem,
    f7Checkbox,
  },
  data() {
    return {
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
        'index.html': false,
      },
      selectedItem: null,
      loadedChildren: [],
    };
  },
  methods: {
    toggleSelectable(e, item) {
      const self = this;
      if ($(e.target).is('.treeview-toggle')) return;
      self.selectedItem = item;
    },
    loadChildren(e, done) {
      const self = this;
      setTimeout(() => {
        // call done() to hide preloader
        done();
        self.loadedChildren = [
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
    },
  },
};
</script>
