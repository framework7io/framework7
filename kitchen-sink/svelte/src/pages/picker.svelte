<script>
  import { f7, Navbar, Page, Block, BlockTitle, List, ListInput } from 'framework7-svelte';

  let pickerDevice;
  let pickerDescribe;
  let pickerDependent;
  let pickerCustomToolbar;
  let pickerInline;

  function onPageInit() {
    const today = new Date();
    // iOS Device picker
    pickerDevice = f7.picker.create({
      inputEl: '#demo-picker-device',
      cols: [
        {
          textAlign: 'center',
          values: [
            'iPhone 4',
            'iPhone 4S',
            'iPhone 5',
            'iPhone 5S',
            'iPhone 6',
            'iPhone 6 Plus',
            'iPad 2',
            'iPad Retina',
            'iPad Air',
            'iPad mini',
            'iPad mini 2',
            'iPad mini 3',
          ],
        },
      ],
    });

    // Describe yourself picker
    pickerDescribe = f7.picker.create({
      inputEl: '#demo-picker-describe',
      rotateEffect: true,
      cols: [
        {
          textAlign: 'left',
          values:
            'Super Amazing Bat Iron Rocket Lex Beautiful Wonderful Raining Happy Funny Cool Hot'.split(
              ' ',
            ),
        },
        {
          values: 'Man Luthor Woman Boy Girl Person Cutie Babe Raccoon'.split(' '),
        },
      ],
    });

    // Dependent values
    const carVendors = {
      Japanese: ['Honda', 'Lexus', 'Mazda', 'Nissan', 'Toyota'],
      German: ['Audi', 'BMW', 'Mercedes', 'Volkswagen', 'Volvo'],
      American: ['Cadillac', 'Chrysler', 'Dodge', 'Ford'],
    };
    pickerDependent = f7.picker.create({
      inputEl: '#demo-picker-dependent',
      rotateEffect: true,
      formatValue(values) {
        return values[1];
      },
      cols: [
        {
          textAlign: 'left',
          values: ['Japanese', 'German', 'American'],
          onChange(picker, country) {
            if (picker.cols[1].replaceValues) {
              picker.cols[1].replaceValues(carVendors[country]);
            }
          },
        },
        {
          values: carVendors.Japanese,
          width: 160,
        },
      ],
    });

    // Custom Toolbar
    pickerCustomToolbar = f7.picker.create({
      inputEl: '#demo-picker-custom-toolbar',
      rotateEffect: true,
      renderToolbar() {
        return (
          '<div class="toolbar">' +
          '<div class="toolbar-inner">' +
          '<div class="left">' +
          '<a  class="link toolbar-randomize-link">Randomize</a>' +
          '</div>' +
          '<div class="right">' +
          '<a  class="link sheet-close popover-close">That\'s me</a>' +
          '</div>' +
          '</div>' +
          '</div>'
        );
      },
      cols: [
        {
          values: ['Mr', 'Ms'],
        },
        {
          textAlign: 'left',
          values:
            'Super Amazing Bat Iron Rocket Lex Beautiful Wonderful Raining Happy Funny Cool Hot'.split(
              ' ',
            ),
        },
        {
          values: 'Man Luthor Woman Boy Girl Person Cutie Babe Raccoon'.split(' '),
        },
      ],
      on: {
        open(picker) {
          picker.$el.find('.toolbar-randomize-link').on('click', () => {
            const col0Values = picker.cols[0].values;
            const col0Random = col0Values[Math.floor(Math.random() * col0Values.length)];

            const col1Values = picker.cols[1].values;
            const col1Random = col1Values[Math.floor(Math.random() * col1Values.length)];

            const col2Values = picker.cols[2].values;
            const col2Random = col2Values[Math.floor(Math.random() * col2Values.length)];

            picker.setValue([col0Random, col1Random, col2Random]);
          });
        },
      },
    });

    // Inline date-time
    pickerInline = f7.picker.create({
      containerEl: '#demo-picker-date-container',
      inputEl: '#demo-picker-date',
      toolbar: false,
      rotateEffect: true,
      value: [
        today.getMonth(),
        today.getDate(),
        today.getFullYear(),
        today.getHours(),
        today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes(),
      ],
      formatValue(values, displayValues) {
        return `${displayValues[0]} ${values[1]}, ${values[2]} ${values[3]}:${values[4]}`;
      },
      cols: [
        // Months
        {
          values: '0 1 2 3 4 5 6 7 8 9 10 11'.split(' '),
          displayValues:
            'January February March April May June July August September October November December'.split(
              ' ',
            ),
          textAlign: 'left',
        },
        // Days
        {
          values: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
            25, 26, 27, 28, 29, 30, 31,
          ],
        },
        // Years
        {
          // eslint-disable-next-line
          values: (function createValues() {
            const arr = [];
            for (let i = 1950; i <= 2030; i += 1) {
              arr.push(i);
            }
            return arr;
          })(),
        },
        // Space divider
        {
          divider: true,
          content: '&nbsp;&nbsp;',
        },
        // Hours
        {
          // eslint-disable-next-line
          values: (function createValues() {
            const arr = [];
            for (let i = 0; i <= 23; i += 1) {
              arr.push(i);
            }
            return arr;
          })(),
        },
        // Divider
        {
          divider: true,
          content: ':',
        },
        // Minutes
        {
          // eslint-disable-next-line
          values: (function createValues() {
            const arr = [];
            for (let i = 0; i <= 59; i += 1) {
              arr.push(i < 10 ? `0${i}` : i);
            }
            return arr;
          })(),
        },
      ],
      on: {
        change(picker, values) {
          const daysInMonth = new Date(picker.value[2], picker.value[0] * 1 + 1, 0).getDate();
          if (values[1] > daysInMonth) {
            picker.cols[1].setValue(daysInMonth);
          }
        },
      },
    });
  }

  function onPageBeforeRemove() {
    pickerDevice.destroy();
    pickerDescribe.destroy();
    pickerDependent.destroy();
    pickerCustomToolbar.destroy();
  }
</script>

<Page {onPageInit} {onPageBeforeRemove}>
  <Navbar title="Picker" backLink="Back" />
  <Block>
    <p>
      Picker is a powerful component that allows you to create custom overlay pickers which looks
      like native picker.
    </p>
    <p>
      Picker could be used as inline component or as overlay. Overlay Picker will be automatically
      converted to Popover on tablets (iPad).
    </p>
  </Block>
  <BlockTitle>Picker with single value</BlockTitle>
  <List strongIos outlineIos>
    <ListInput type="text" placeholder="Your iOS device" readonly inputId="demo-picker-device" />
  </List>
  <BlockTitle>2 values and 3d-rotate effect</BlockTitle>
  <List strongIos outlineIos>
    <ListInput
      type="text"
      placeholder="Describe yourself"
      readonly
      inputId="demo-picker-describe"
    />
  </List>
  <BlockTitle>Dependent values</BlockTitle>
  <List strongIos outlineIos>
    <ListInput type="text" placeholder="Your car" readonly inputId="demo-picker-dependent" />
  </List>

  <BlockTitle>Custom toolbar</BlockTitle>
  <List strongIos outlineIos>
    <ListInput
      type="text"
      placeholder="Describe yourself"
      readonly
      inputId="demo-picker-custom-toolbar"
    />
  </List>
  <BlockTitle>Inline Picker / Date-time</BlockTitle>
  <List class="no-margin">
    <ListInput type="text" placeholder="Date Time" readonly inputId="demo-picker-date" />
  </List>
  <Block strong insetMd outlineIos class="no-padding no-margin-top">
    <div id="demo-picker-date-container" />
  </Block>
</Page>
