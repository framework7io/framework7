
import React from 'react';
import { Navbar, Page, Block, BlockTitle, List, ListItem, ListInput } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Page onPageInit={this.onPageInit.bind(this)} onPageBeforeRemove={this.onPageBeforeRemove.bind(this)}>
        <Navbar title="Calendar" backLink="Back"></Navbar>
        <Block>
          <p>Calendar is a touch optimized component that provides an easy way to handle dates.</p>
          <p>Calendar could be used as inline component or as overlay. Overlay Calendar will be automatically converted to Popover on tablets (iPad).</p>
        </Block>

        <BlockTitle>Default setup</BlockTitle>
        <List noHairlinesMd>
          <ListInput type="text" placeholder="Your birth date" readonly inputId="demo-calendar-default"/>
        </List>

        <BlockTitle>Custom date format</BlockTitle>
        <List noHairlinesMd>
          <ListInput type="text" placeholder="Select date" readonly inputId="demo-calendar-date-format"/>
        </List>

        <BlockTitle>Multiple Values</BlockTitle>
        <List noHairlinesMd>
          <ListInput type="text" placeholder="Select multiple dates" readonly inputId="demo-calendar-multiple"/>
        </List>

        <BlockTitle>Range Picker</BlockTitle>
        <List noHairlinesMd>
          <ListInput type="text" placeholder="Select date range" readonly inputId="demo-calendar-range"/>
        </List>

        <BlockTitle>Open in Modal</BlockTitle>
        <List noHairlinesMd>
          <ListInput type="text" placeholder="Select date" readonly inputId="demo-calendar-modal"/>
        </List>

        <BlockTitle>Calendar Page</BlockTitle>
        <List>
          <ListItem
            title="Open Calendar Page"
            link="/calendar-page/"
          />
        </List>

        <BlockTitle>Inline with custom toolbar</BlockTitle>
        <Block className="no-padding">
          <div id="demo-calendar-inline-container"></div>
        </Block>
        <BlockTitle>Jalali Calendar</BlockTitle>
        <List noHairlinesMd>
          <ListInput type="text" placeholder="Your birth date in Jalali" readonly inputId="demo-jcalendar-default"/>
        </List>
      </Page>
    );
  }
  onPageInit(e) {
    const self = this;
    const app = self.$f7;
    const $ = self.$$;
    // Default
    self.calendarDefault = app.calendar.create({
      inputEl: '#demo-calendar-default',
    });
    // Jalali
    self.jcalendarDefault = app.calendar.create({
      calendarType: 'jalali',
      inputEl: '#demo-jcalendar-default',
    });
    // With custom date format
    self.calendarDateFormat = app.calendar.create({
      inputEl: '#demo-calendar-date-format',
      dateFormat: 'DD, MM dd, yyyy',
    });
    // With multiple values
    self.calendarMultiple = app.calendar.create({
      inputEl: '#demo-calendar-multiple',
      dateFormat: 'M dd yyyy',
      multiple: true,
    });
    // Range Picker
    self.calendarRange = app.calendar.create({
      inputEl: '#demo-calendar-range',
      dateFormat: 'M dd yyyy',
      rangePicker: true,
    });
    // Custom modal
    self.calendarModal = app.calendar.create({
      inputEl: '#demo-calendar-modal',
      openIn: 'customModal',
      header: true,
      footer: true,
      dateFormat: 'MM dd yyyy',
    });
    // Inline with custom toolbar
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    self.calendarInline = app.calendar.create({
      containerEl: '#demo-calendar-inline-container',
      value: [new Date()],
      renderToolbar() {
        return `
          <div class="toolbar calendar-custom-toolbar no-shadow">
            <div class="toolbar-inner">
              <div class="left">
                <a href="#" class="link icon-only"><i class="icon icon-back"></i></a>
              </div>
              <div class="center"></div>
              <div class="right">
                <a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>
              </div>
            </div>
          </div>
        `.trim();
      },
      on: {
        init(c) {
          $('.calendar-custom-toolbar .center').text(`${monthNames[c.currentMonth]}, ${c.currentYear}`);
          $('.calendar-custom-toolbar .left .link').on('click', () => {
            self.calendarInline.prevMonth();
          });
          $('.calendar-custom-toolbar .right .link').on('click', () => {
            self.calendarInline.nextMonth();
          });
        },
        monthYearChangeStart(c) {
          $('.calendar-custom-toolbar .center').text(`${monthNames[c.currentMonth]}, ${c.currentYear}`);
        },
      },
    });
  }
  onPageBeforeRemove() {
    const self = this;
    self.calendarDefault.destroy();
    self.jcalendarDefault.destroy();
    self.calendarDateFormat.destroy();
    self.calendarMultiple.destroy();
    self.calendarRange.destroy();
    self.calendarModal.destroy();
    self.calendarInline.destroy();
  }
};
