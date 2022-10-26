<script>
  import {
    f7,
    Navbar,
    Page,
    BlockTitle,
    Subnavbar,
    Searchbar,
    Block,
    List,
    ListItem,
    ListInput,
  } from 'framework7-svelte';

  const fruits = 'Apple Apricot Avocado Banana Melon Orange Peach Pear Pineapple'.split(' ');

  let autocompleteDropdownSimple;
  let autocompleteDropdownAll;
  let autocompleteDropdownPlaceholder;
  let autocompleteDropdownTypeahead;
  let autocompleteDropdownAjax;
  let autocompleteDropdownAjaxTypeahead;
  let autocompleteStandaloneSimple;
  let autocompleteStandalonePopup;
  let autocompleteStandaloneMultiple;
  let autocompleteStandaloneAjax;
  let autocompleteSearchbar;

  let searchbar;

  function onPageBeforeRemove() {
    // Destroy all autocompletes
    autocompleteDropdownSimple.destroy();
    autocompleteDropdownAll.destroy();
    autocompleteDropdownPlaceholder.destroy();
    autocompleteDropdownTypeahead.destroy();
    autocompleteDropdownAjax.destroy();
    autocompleteDropdownAjaxTypeahead.destroy();
    autocompleteStandaloneSimple.destroy();
    autocompleteStandalonePopup.destroy();
    autocompleteStandaloneMultiple.destroy();
    autocompleteStandaloneAjax.destroy();

    searchbar.destroy();
  }
  function onPageInit() {
    const $ = f7.$;

    // Simple Dropdown
    autocompleteDropdownSimple = f7.autocomplete.create({
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

    // Dropdown with all values
    autocompleteDropdownAll = f7.autocomplete.create({
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
    autocompleteDropdownPlaceholder = f7.autocomplete.create({
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
    autocompleteDropdownTypeahead = f7.autocomplete.create({
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
    autocompleteDropdownAjax = f7.autocomplete.create({
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
        fetch(`./js/autocomplete-languages.json?query=${query}`)
          .then((res) => res.json())
          .then((data) => {
            // Find matched items
            for (let i = 0; i < data.length; i += 1) {
              if (data[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0)
                results.push(data[i]);
            }
            // Hide Preoloader
            autocomplete.preloaderHide();
            // Render items by passing array with result items
            render(results);
          });
      },
    });

    // Dropdown with ajax data
    autocompleteDropdownAjaxTypeahead = f7.autocomplete.create({
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
        fetch(`./js/autocomplete-languages.json?query=${query}`)
          .then((res) => res.json())
          .then((data) => {
            // Find matched items
            for (let i = 0; i < data.length; i += 1) {
              if (data[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0)
                results.push(data[i]);
            }
            // Hide Preoloader
            autocomplete.preloaderHide();
            // Render items by passing array with result items
            render(results);
          });
      },
    });

    // Simple Standalone
    autocompleteStandaloneSimple = f7.autocomplete.create({
      openIn: 'page', // open in page
      openerEl: '#autocomplete-standalone a', // link that opens autocomplete
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
          $('#autocomplete-standalone').find('.item-after').text(value[0]);
          // Add item value to input value
          $('#autocomplete-standalone').find('input').val(value[0]);
        },
      },
    });

    // Standalone Popup
    autocompleteStandalonePopup = f7.autocomplete.create({
      openIn: 'popup', // open in page
      openerEl: '#autocomplete-standalone-popup a', // link that opens autocomplete
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
    autocompleteStandaloneMultiple = f7.autocomplete.create({
      openIn: 'page', // open in page
      openerEl: '#autocomplete-standalone-multiple a', // link that opens autocomplete
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
    autocompleteStandaloneAjax = f7.autocomplete.create({
      openIn: 'page', // open in page
      openerEl: '#autocomplete-standalone-ajax a', // link that opens autocomplete
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
        fetch(`./js/autocomplete-languages.json?query=${query}`)
          .then((res) => res.json())
          .then((data) => {
            // Find matched items
            for (let i = 0; i < data.length; i += 1) {
              if (data[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0)
                results.push(data[i]);
            }
            // Hide Preoloader
            autocomplete.preloaderHide();
            // Render items by passing array with result items
            render(results);
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
    autocompleteSearchbar = f7.autocomplete.create({
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
    searchbar = f7.searchbar.create({
      el: '#searchbar-autocomplete',
      customSearch: true,
      on: {
        search(sb, query) {
          console.log(query);
        },
      },
    });
  }
</script>

<Page {onPageInit} {onPageBeforeRemove}>
  <Navbar title="Autocomplete" backLink="Back">
    <Subnavbar inner={false}>
      <Searchbar init={false} id="searchbar-autocomplete" />
    </Subnavbar>
  </Navbar>

  <BlockTitle>Dropdown Autocomplete</BlockTitle>
  <Block>
    <p>
      Dropdown autocomplete is good to use as a quick and simple solution to provide more options in
      addition to free-type value.
    </p>
  </Block>
  <List strongIos outlineIos>
    <div class="block-header" slot="before-list">Simple Dropdown Autocomplete</div>
    <ListInput label="Fruit" type="text" placeholder="Fruit" inputId="autocomplete-dropdown" />
  </List>

  <List strongIos outlineIos>
    <div class="block-header" slot="before-list">Dropdown With All Values</div>
    <ListInput label="Fruit" type="text" placeholder="Fruit" inputId="autocomplete-dropdown-all" />
  </List>
  <List strongIos outlineIos>
    <div class="block-header" slot="before-list">Dropdown With Placeholder</div>
    <ListInput
      label="Fruit"
      type="text"
      placeholder="Fruit"
      inputId="autocomplete-dropdown-placeholder"
    />
  </List>
  <List strongIos outlineIos>
    <div class="block-header" slot="before-list">Dropdown With Typeahead</div>
    <ListInput
      label="Fruit"
      type="text"
      placeholder="Fruit"
      inputId="autocomplete-dropdown-typeahead"
    />
  </List>
  <List strongIos outlineIos>
    <div class="block-header" slot="before-list">Dropdown With Ajax-Data</div>
    <ListInput
      label="Language"
      type="text"
      placeholder="Language"
      inputId="autocomplete-dropdown-ajax"
    />
  </List>
  <List strongIos outlineIos>
    <div class="block-header" slot="before-list">Dropdown With Ajax-Data + Typeahead</div>
    <ListInput
      label="Language"
      type="text"
      placeholder="Language"
      inputId="autocomplete-dropdown-ajax-typeahead"
    />
  </List>
  <BlockTitle>Standalone Autocomplete</BlockTitle>
  <Block>
    <p>
      Standalone autocomplete provides better mobile UX by opening it in a new page or popup. Good
      to use when you need to get strict values without allowing free-type values.
    </p>
  </Block>
  <List strong outlineIos>
    <div class="block-header" slot="before-list">Simple Standalone Autocomplete</div>
    <ListItem link="#" id="autocomplete-standalone" title="Favorite Fruite" after=" ">
      <input type="hidden" />
    </ListItem>
  </List>
  <List strong outlineIos>
    <div class="block-header" slot="before-list">Popup Autocomplete</div>
    <ListItem link="#" id="autocomplete-standalone-popup" title="Favorite Fruite" after=" ">
      <input type="hidden" />
    </ListItem>
  </List>
  <List strong outlineIos>
    <div class="block-header" slot="before-list">Multiple Values</div>
    <ListItem link="#" id="autocomplete-standalone-multiple" title="Favorite Fruite" after=" ">
      <input type="hidden" />
    </ListItem>
  </List>
  <List strong outlineIos>
    <div class="block-header" slot="before-list">With Ajax-Data</div>
    <ListItem link="#" id="autocomplete-standalone-ajax" title="Language" after=" ">
      <input type="hidden" />
    </ListItem>
  </List>
</Page>
