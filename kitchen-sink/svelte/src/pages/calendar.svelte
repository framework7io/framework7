<script>
  import {
    f7,
    Navbar,
    Page,
    Block,
    BlockTitle,
    List,
    ListItem,
    ListInput,
  } from 'framework7-svelte';

  let calendarInline;

  function onPageInit() {
    const $ = f7.$;

    // Inline with custom toolbar
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    calendarInline = f7.calendar.create({
      containerEl: '#demo-calendar-inline-container',
      value: [new Date()],
      renderToolbar() {
        return `
          <div class="toolbar calendar-custom-toolbar">
            <div class="toolbar-inner">
              <div class="left">
                <a  class="link icon-only"><i class="icon icon-back"></i></a>
              </div>
              <div class="center"></div>
              <div class="right">
                <a  class="link icon-only"><i class="icon icon-forward"></i></a>
              </div>
            </div>
          </div>
        `.trim();
      },
      on: {
        init(c) {
          $('.calendar-custom-toolbar .center').text(
            `${monthNames[c.currentMonth]}, ${c.currentYear}`,
          );
          $('.calendar-custom-toolbar .left .link').on('click', () => {
            calendarInline.prevMonth();
          });
          $('.calendar-custom-toolbar .right .link').on('click', () => {
            calendarInline.nextMonth();
          });
        },
        monthYearChangeStart(c) {
          $('.calendar-custom-toolbar .center').text(
            `${monthNames[c.currentMonth]}, ${c.currentYear}`,
          );
        },
      },
    });
  }
  function onPageBeforeRemove() {
    calendarInline.destroy();
  }
</script>

<Page {onPageInit} {onPageBeforeRemove}>
  <Navbar title="Calendar" backLink="Back" />
  <Block>
    <p>Calendar is a touch optimized component that provides an easy way to handle dates.</p>
    <p>
      Calendar could be used as inline component or as overlay. Overlay Calendar will be
      automatically converted to Popover on tablets (iPad).
    </p>
  </Block>

  <BlockTitle>Default setup</BlockTitle>
  <List strongIos outlineIos>
    <ListInput type="datepicker" placeholder="Your birth date" readonly />
  </List>

  <BlockTitle>Custom date format</BlockTitle>
  <List strongIos outlineIos>
    <ListInput
      type="datepicker"
      placeholder="Select date"
      readonly
      calendarParams={{
        dateFormat: { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' },
      }}
    />
  </List>

  <BlockTitle>Date + Time</BlockTitle>
  <List strongIos outlineIos>
    <ListInput
      type="datepicker"
      placeholder="Select date and time"
      readonly
      calendarParams={{
        timePicker: true,
        dateFormat: {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        },
      }}
    />
  </List>

  <BlockTitle>Multiple Values</BlockTitle>
  <List strongIos outlineIos>
    <ListInput
      type="datepicker"
      placeholder="Select multiple dates"
      readonly
      calendarParams={{ dateFormat: { month: 'short', day: 'numeric' }, multiple: true }}
    />
  </List>

  <BlockTitle>Range Picker</BlockTitle>
  <List strongIos outlineIos>
    <ListInput
      type="datepicker"
      placeholder="Select date range"
      readonly
      calendarParams={{ rangePicker: true }}
    />
  </List>

  <BlockTitle>Open in Modal</BlockTitle>
  <List strongIos outlineIos>
    <ListInput
      type="datepicker"
      placeholder="Select date"
      readonly
      calendarParams={{ openIn: 'customModal', header: true, footer: true }}
    />
  </List>

  <BlockTitle>Calendar Page</BlockTitle>
  <List strong outlineIos>
    <ListItem title="Open Calendar Page" link="/calendar-page/" />
  </List>

  <BlockTitle>Inline with custom toolbar</BlockTitle>
  <Block strong class="no-padding">
    <div id="demo-calendar-inline-container" />
  </Block>
</Page>
