
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
          <ListInput type="datepicker" placeholder="Your birth date" readonly />
        </List>

        <BlockTitle>Custom date format</BlockTitle>
        <List noHairlinesMd>
          <ListInput type="datepicker" placeholder="Select date" readonly calendarParams={{dateFormat: 'DD, MM dd, yyyy'}} />
        </List>

        <BlockTitle>Multiple Values</BlockTitle>
        <List noHairlinesMd>
          <ListInput type="datepicker" placeholder="Select multiple dates" readonly calendarParams={{ dateFormat: 'M dd yyyy', multiple: true }}/>
        </List>

        <BlockTitle>Range Picker</BlockTitle>
        <List noHairlinesMd>
          <ListInput type="datepicker" placeholder="Select date range" readonly calendarParams={{ dateFormat: 'M dd yyyy', rangePicker: true }} />
        </List>

        <BlockTitle>Open in Modal</BlockTitle>
        <List noHairlinesMd>
          <ListInput type="datepicker" placeholder="Select date" readonly calendarParams={{openIn: 'customModal', header: true, footer: true, dateFormat: 'MM dd yyyy'}} />
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
          <ListInput type="datepicker" placeholder="Your birth date in Jalali" readonly calendarParams={{calendarType: 'jalali'}} />
        </List>
      </Page>
    );
  }
  onPageInit(e) {
    const self = this;
    const app = self.$f7;
    const $ = self.$$;

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
    self.calendarInline.destroy();
  }
};
