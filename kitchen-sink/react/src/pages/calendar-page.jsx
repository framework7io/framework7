import React from 'react';
import { Navbar, Page, NavTitle, List, ListItem, Block } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    this.state = {
      today: new Date(year, month, day),
      events: [
        {
          date: new Date(year, month, day),
          hours: 12,
          minutes: 30,
          title: 'Meeting with Vladimir',
          color: '#2196f3',
        },
        {
          date: new Date(year, month, day),
          hours: 18,
          minutes: 0,
          title: 'Shopping',
          color: '#4caf50',
        },
        {
          date: new Date(year, month, day),
          hours: 21,
          minutes: 0,
          title: 'Gym',
          color: '#e91e63',
        },
        {
          date: new Date(year, month, day + 2),
          hours: 16,
          minutes: 0,
          title: 'Pay loan',
          color: '#2196f3',
        },
        {
          date: new Date(year, month, day + 2),
          hours: 21,
          minutes: 0,
          title: 'Gym',
          color: '#ff9800',
        },
      ],
      eventItems: [],
    }
  }
  render() {
    return (
      <Page onPageInit={this.onPageInit.bind(this)} onPageBeforeRemove={this.onPageBeforeRemove.bind(this)}>
        <Navbar backLink="Back" noShadow>
          <NavTitle className="navbar-calendar-title"></NavTitle>
        </Navbar>
        <Block
          id="calendar"
          strong
          className="no-padding no-margin no-hairline-top"
        ></Block>
        <List
          id="calendar-events"
          noHairlines
          className="no-margin no-safe-area-left"
        >
          {this.state.eventItems.map((item, index) => (
            <ListItem
              key={index}
              title={item.title}
              after={item.time}
            >
              <div class="event-color" style={{'background-color': item.color}} slot="root-start"></div>
            </ListItem>
          ))}
          {this.state.eventItems.length === 0 && (
            <ListItem>
              <span className="text-color-gray" slot="title">No events for this day</span>
            </ListItem>
          )}
        </List>
      </Page>
    );
  }
  renderEvents(calendar) {
    const self = this;
    const currentDate = calendar.value[0];
    const currentEvents = self.state.events
      .filter(event => (
        event.date.getTime() >= currentDate.getTime() &&
        event.date.getTime() < currentDate.getTime() + 24 * 60 * 60 * 1000
      ));

    const eventItems = [];
    if (currentEvents.length) {
      currentEvents.forEach((event) => {
        const hours = event.date.getHours();
        let minutes = event.date.getMinutes();
        if (minutes < 10) minutes = `0${minutes}`;
        eventItems.push({
          title: event.title,
          time: `${hours}:${minutes}`,
          color: event.color,
        });
      });
    }
    self.setState({
      eventItems,
    });
  }
  onPageInit(e, page) {
    const self = this;
    const app = self.$f7;
    const $ = self.$$;
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    self.calendar = app.calendar.create({
      containerEl: '#calendar',
      toolbar: false,
      value: [self.state.today],
      events: self.state.events,
      on: {
        init(calendar) {
          $('.navbar-calendar-title').text(`${monthNames[calendar.currentMonth]}, ${calendar.currentYear}`);
          app.navbar.size(app.navbar.getElByPage(page.el));
          calendar.$el.addClass('no-safe-area-right');
          self.renderEvents(calendar);
        },
        monthYearChangeStart(calendar) {
          $('.navbar-calendar-title').text(`${monthNames[calendar.currentMonth]}, ${calendar.currentYear}`);
          app.navbar.size(app.navbar.getElByPage(page.el));
        },
        change(calendar) {
          self.renderEvents(calendar);
        },
      },
    });
  }
  onPageBeforeRemove() {
    const self = this;
    self.calendar.destroy();
  }
};
