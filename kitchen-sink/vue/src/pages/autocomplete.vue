<template>
  <f7-page @page:beforeremove="onPageBeforeRemove" @page:init="onPageInit">
    <f7-navbar title="Autocomplete" back-link="Back">
      <div class="subnavbar">
        <form class="searchbar" id="searchbar-autocomplete">
          <div class="searchbar-inner">
            <div class="searchbar-input-wrap">
              <input type="search" placeholder="Search"/>
              <i class="searchbar-icon"></i>
              <span class="input-clear-button"></span>
            </div>
            <span class="searchbar-disable-button" v-if="!$theme.aurora">Cancel</span>
          </div>
        </form>
      </div>
    </f7-navbar>

    <f7-block-title>Dropdown Autocomplete</f7-block-title>
    <div class="block">
      <p>Dropdown autocomplete is good to use as a quick and simple solution to provide more options in addition to free-type value.</p>
    </div>
    <div class="list no-hairlines-md">
      <div class="block-header">Simple Dropdown Autocomplete</div>
      <ul>
        <li class="item-content item-input inline-label">
          <div class="item-inner">
            <div class="item-title item-label">Fruit</div>
            <div class="item-input-wrap">
              <input type="text" placeholder="Fruit" id="autocomplete-dropdown"/>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="list no-hairlines-md">
      <div class="block-header">Dropdown With Input Expand</div>
      <ul>
        <li class="item-content item-input inline-label">
          <div class="item-inner">
            <div class="item-title item-label">Fruit</div>
            <div class="item-input-wrap">
              <input type="text" placeholder="Fruit" id="autocomplete-dropdown-expand"/>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="list no-hairlines-md">
      <div class="block-header">Dropdown With All Values</div>
      <ul>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Fruit</div>
            <div class="item-input-wrap">
              <input type="text" placeholder="Fruit" id="autocomplete-dropdown-all"/>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="list no-hairlines-md">
      <div class="block-header">Dropdown With Placeholder</div>
      <ul>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Fruit</div>
            <div class="item-input-wrap">
              <input type="text" placeholder="Fruit" id="autocomplete-dropdown-placeholder"/>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="list no-hairlines-md">
      <div class="block-header">Dropdown With Typeahead</div>
      <ul>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Fruit</div>
            <div class="item-input-wrap">
              <input type="text" placeholder="Fruit" id="autocomplete-dropdown-typeahead"/>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="list no-hairlines-md">
      <div class="block-header">Dropdown With Ajax-Data</div>
      <ul>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Language</div>
            <div class="item-input-wrap">
              <input type="text" placeholder="Language" id="autocomplete-dropdown-ajax"/>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="list no-hairlines-md">
      <div class="block-header">Dropdown With Ajax-Data + Typeahead</div>
      <ul>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Language</div>
            <div class="item-input-wrap">
              <input type="text" placeholder="Language" id="autocomplete-dropdown-ajax-typeahead"/>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <f7-block-title>Standalone Autocomplete</f7-block-title>
    <div class="block">
      <p>Standalone autocomplete provides better mobile UX by opening it in a new page or popup. Good to use when you need to get strict values without allowing free-type values.</p>
    </div>
    <div class="list">
      <div class="block-header">Simple Standalone Autocomplete</div>
      <ul>
        <li>
          <a href="#" id="autocomplete-standalone" class="item-link item-content autocomplete-opener">
            <input type="hidden"/>
            <div class="item-inner">
              <div class="item-title">Favorite Fruite</div>
              <div class="item-after"></div>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="list">
      <div class="block-header">Popup Autocomplete</div>
      <ul>
        <li>
          <a href="#" id="autocomplete-standalone-popup" class="item-link item-content autocomplete-opener">
            <input type="hidden"/>
            <div class="item-inner">
              <div class="item-title">Favorite Fruite</div>
              <div class="item-after"></div>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="list">
      <div class="block-header">Multiple Values</div>
      <ul>
        <li>
          <a href="#" id="autocomplete-standalone-multiple" class="item-link item-content autocomplete-opener">
            <input type="hidden"/>
            <div class="item-inner">
              <div class="item-title">Favorite Fruite</div>
              <div class="item-after"></div>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="list">
      <div class="block-header">With Ajax-Data</div>
      <ul>
        <li>
          <a href="#" id="autocomplete-standalone-ajax" class="item-link item-content autocomplete-opener">
            <input type="hidden"/>
            <div class="item-inner">
              <div class="item-title">Language</div>
              <div class="item-after"></div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle } from 'framework7-vue';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7BlockTitle,
    },
    data() {
      return {
        fruits: 'Apple Apricot Avocado Banana Melon Orange Peach Pear Pineapple'.split(' '),
      };
    },
    methods: {
      onPageBeforeRemove() {
        const self = this;
        // Destroy all autocompletes
        self.autocompleteDropdownSimple.destroy();
        self.autocompleteDropdownExpand.destroy();
        self.autocompleteDropdownAll.destroy();
        self.autocompleteDropdownPlaceholder.destroy();
        self.autocompleteDropdownTypeahead.destroy();
        self.autocompleteDropdownAjax.destroy();
        self.autocompleteDropdownAjaxTypeahead.destroy();
        self.autocompleteStandaloneSimple.destroy();
        self.autocompleteStandalonePopup.destroy();
        self.autocompleteStandaloneMultiple.destroy();
        self.autocompleteStandaloneAjax.destroy();
      },
      onPageInit() {
        const self = this;
        const app = self.$f7;
        const fruits = self.fruits;
        const $ = self.$$;

        // Simple Dropdown
        self.autocompleteDropdownSimple = app.autocomplete.create({
          inputEl: '#autocomplete-dropdown',
          openIn: 'dropdown',
          source(query, render) {
            const results = [];
            if (query.length === 0) {
              render(results);
              return;
            }
            // Find matched items
            for (let i = 0; i < fruits.length; i += 1) {
              if (fruits[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(fruits[i]);
            }
            // Render items by passing array with result items
            render(results);
          },
        });

        // Dropdown with input expand
        self.autocompleteDropdownExpand = app.autocomplete.create({
          inputEl: '#autocomplete-dropdown-expand',
          openIn: 'dropdown',
          expandInput: true, // expand input
          source(query, render) {
            const results = [];
            if (query.length === 0) {
              render(results);
              return;
            }
            // Find matched items
            for (let i = 0; i < fruits.length; i += 1) {
              if (fruits[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(fruits[i]);
            }
            // Render items by passing array with result items
            render(results);
          },
        });

        // Dropdown with all values
        self.autocompleteDropdownAll = app.autocomplete.create({
          inputEl: '#autocomplete-dropdown-all',
          openIn: 'dropdown',
          source(query, render) {
            const results = [];
            // Find matched items
            for (let i = 0; i < fruits.length; i += 1) {
              if (fruits[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(fruits[i]);
            }
            // Render items by passing array with result items
            render(results);
          },
        });

        // Dropdown with placeholder
        self.autocompleteDropdownPlaceholder = app.autocomplete.create({
          inputEl: '#autocomplete-dropdown-placeholder',
          openIn: 'dropdown',
          dropdownPlaceholderText: 'Try to type "Apple"',
          source(query, render) {
            const results = [];
            if (query.length === 0) {
              render(results);
              return;
            }
            // Find matched items
            for (let i = 0; i < fruits.length; i += 1) {
              if (fruits[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(fruits[i]);
            }
            // Render items by passing array with result items
            render(results);
          },
        });

        // Dropdown with typeahead
        self.autocompleteDropdownTypeahead = app.autocomplete.create({
          inputEl: '#autocomplete-dropdown-typeahead',
          openIn: 'dropdown',
          dropdownPlaceholderText: 'Try to type "Pineapple"',
          typeahead: true,
          source(query, render) {
            const results = [];
            if (query.length === 0) {
              render(results);
              return;
            }
            // Find matched items
            for (let i = 0; i < fruits.length; i += 1) {
              if (fruits[i].toLowerCase().indexOf(query.toLowerCase()) === 0) results.push(fruits[i]);
            }
            // Render items by passing array with result items
            render(results);
          },
        });

        // Dropdown with ajax data
        self.autocompleteDropdownAjax = app.autocomplete.create({
          inputEl: '#autocomplete-dropdown-ajax',
          openIn: 'dropdown',
          preloader: true, // enable preloader
          /* If we set valueProperty to "id" then input value on select will be set according to this property */
          valueProperty: 'name', // object's "value" property name
          textProperty: 'name', // object's "text" property name
          limit: 20, // limit to 20 results
          dropdownPlaceholderText: 'Try "JavaScript"',
          source(query, render) {
            const autocomplete = this;
            const results = [];
            if (query.length === 0) {
              render(results);
              return;
            }
            // Show Preloader
            autocomplete.preloaderShow();

            // Do Ajax request to Autocomplete data
            app.request({
              url: './js/autocomplete-languages.json',
              method: 'GET',
              dataType: 'json',
              // send "query" to server. Useful in case you generate response dynamically
              data: {
                query,
              },
              success(data) {
              // Find matched items
                for (let i = 0; i < data.length; i += 1) {
                  if (data[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(data[i]);
                }
                // Hide Preoloader
                autocomplete.preloaderHide();
                // Render items by passing array with result items
                render(results);
              },
            });
          },
        });

        // Dropdown with ajax data
        self.autocompleteDropdownAjaxTypeahead = app.autocomplete.create({
          inputEl: '#autocomplete-dropdown-ajax-typeahead',
          openIn: 'dropdown',
          preloader: true, // enable preloader
          /* If we set valueProperty to "id" then input value on select will be set according to this property */
          valueProperty: 'name', // object's "value" property name
          textProperty: 'name', // object's "text" property name
          limit: 20, // limit to 20 results
          typeahead: true,
          dropdownPlaceholderText: 'Try "JavaScript"',
          source(query, render) {
            const autocomplete = this;
            const results = [];
            if (query.length === 0) {
              render(results);
              return;
            }
            // Show Preloader
            autocomplete.preloaderShow();

            // Do Ajax request to Autocomplete data
            app.request({
              url: './js/autocomplete-languages.json',
              method: 'GET',
              dataType: 'json',
              // send "query" to server. Useful in case you generate response dynamically
              data: {
                query,
              },
              success(data) {
              // Find matched items
                for (let i = 0; i < data.length; i += 1) {
                  if (data[i].name.toLowerCase().indexOf(query.toLowerCase()) === 0) results.push(data[i]);
                }
                // Hide Preoloader
                autocomplete.preloaderHide();
                // Render items by passing array with result items
                render(results);
              },
            });
          },
        });

        // Simple Standalone
        self.autocompleteStandaloneSimple = app.autocomplete.create({
          openIn: 'page', // open in page
          openerEl: '#autocomplete-standalone', // link that opens autocomplete
          closeOnSelect: true, // go back after we select something
          source(query, render) {
            const results = [];
            if (query.length === 0) {
              render(results);
              return;
            }
            // Find matched items
            for (let i = 0; i < fruits.length; i += 1) {
              if (fruits[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(fruits[i]);
            }
            // Render items by passing array with result items
            render(results);
          },
          on: {
            change(value) {
              console.log(value);
              // Add item text value to item-after
              $('#autocomplete-standalone').find('.item-after').text(value[0]);
              // Add item value to input value
              $('#autocomplete-standalone').find('input').val(value[0]);
            },
          },
        });

        // Standalone Popup
        self.autocompleteStandalonePopup = app.autocomplete.create({
          openIn: 'popup', // open in page
          openerEl: '#autocomplete-standalone-popup', // link that opens autocomplete
          closeOnSelect: true, // go back after we select something
          source(query, render) {
            const results = [];
            if (query.length === 0) {
              render(results);
              return;
            }
            // Find matched items
            for (let i = 0; i < fruits.length; i += 1) {
              if (fruits[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(fruits[i]);
            }
            // Render items by passing array with result items
            render(results);
          },
          on: {
            change(value) {
              // Add item text value to item-after
              $('#autocomplete-standalone-popup').find('.item-after').text(value[0]);
              // Add item value to input value
              $('#autocomplete-standalone-popup').find('input').val(value[0]);
            },
          },
        });

        // Multiple Standalone
        self.autocompleteStandaloneMultiple = app.autocomplete.create({
          openIn: 'page', // open in page
          openerEl: '#autocomplete-standalone-multiple', // link that opens autocomplete
          multiple: true, // allow multiple values
          source(query, render) {
            const results = [];
            if (query.length === 0) {
              render(results);
              return;
            }
            // Find matched items
            for (let i = 0; i < fruits.length; i += 1) {
              if (fruits[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(fruits[i]);
            }
            // Render items by passing array with result items
            render(results);
          },
          on: {
            change(value) {
              // Add item text value to item-after
              $('#autocomplete-standalone-multiple').find('.item-after').text(value.join(', '));
              // Add item value to input value
              $('#autocomplete-standalone-multiple').find('input').val(value.join(', '));
            },
          },
        });

        // Standalone With Ajax
        self.autocompleteStandaloneAjax = app.autocomplete.create({
          openIn: 'page', // open in page
          openerEl: '#autocomplete-standalone-ajax', // link that opens autocomplete
          multiple: true, // allow multiple values
          valueProperty: 'id', // object's "value" property name
          textProperty: 'name', // object's "text" property name
          limit: 50,
          preloader: true, // enable preloader
          source(query, render) {
            const autocomplete = this;
            const results = [];
            if (query.length === 0) {
              render(results);
              return;
            }
            // Show Preloader
            autocomplete.preloaderShow();
            // Do Ajax request to Autocomplete data
            app.request({
              url: './js/autocomplete-languages.json',
              method: 'GET',
              dataType: 'json',
              // send "query" to server. Useful in case you generate response dynamically
              data: {
                query,
              },
              success(data) {
              // Find matched items
                for (let i = 0; i < data.length; i += 1) {
                  if (data[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(data[i]);
                }
                // Hide Preoloader
                autocomplete.preloaderHide();
                // Render items by passing array with result items
                render(results);
              },
            });
          },
          on: {
            change(value) {
              const itemText = [];
              const inputValue = [];
              for (let i = 0; i < value.length; i += 1) {
                itemText.push(value[i].name);
                inputValue.push(value[i].id);
              }
              // Add item text value to item-after
              $('#autocomplete-standalone-ajax').find('.item-after').text(itemText.join(', '));
              // Add item value to input value
              $('#autocomplete-standalone-ajax').find('input').val(inputValue.join(', '));
            },
          },
        });

        // Searchbar Autocomplete
        self.autocompleteSearchbar = app.autocomplete.create({
          openIn: 'dropdown',
          inputEl: '#searchbar-autocomplete input[type="search"]',
          dropdownPlaceholderText: 'Type "Apple"',
          source(query, render) {
            const results = [];
            if (query.length === 0) {
              render(results);
              return;
            }
            // Find matched items
            for (let i = 0; i < fruits.length; i += 1) {
              if (fruits[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(fruits[i]);
            }
            // Render items by passing array with result items
            render(results);
          },
        });
        self.searchbar = app.searchbar.create({
          el: '#searchbar-autocomplete',
          customSearch: true,
          on: {
            search(sb, query) {
              console.log(query);
            },
          },
        });
      },
    },
  };
</script>
