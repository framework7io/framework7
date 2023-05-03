import React, { useRef, useState } from 'react';
import { Navbar, Page, NavTitle, List, ListItem, Block, f7 } from 'framework7-react';

export default () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const today = new Date(year, month, day);
  const events = [
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
  ];

  const [eventItems, setEventItems] = useState([]);
  const calendarRef = useRef(null);

  const renderEvents = (calendar) => {
    const currentDate = calendar.value[0];
    const currentEvents = events.filter(
      (event) =>
        event.date.getTime() >= currentDate.getTime() &&
        event.date.getTime() < currentDate.getTime() + 24 * 60 * 60 * 1000,
    );

    const newEventItems = [];
    if (currentEvents.length) {
      currentEvents.forEach((event) => {
        const hours = event.hours;
        let minutes = event.minutes;
        if (minutes < 10) minutes = `0${minutes}`;
        newEventItems.push({
          title: event.title,
          time: `${hours}:${minutes}`,
          color: event.color,
        });
      });
    }
    setEventItems([...newEventItems]);
  };
  const onPageInit = (page) => {
    const $ = f7.$;
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
    calendarRef.current = f7.calendar.create({
      containerEl: '#calendar',
      toolbar: false,
      value: [today],
      events,
      on: {
        init(calendar) {
          $('.navbar-calendar-title').text(
            `${monthNames[calendar.currentMonth]}, ${calendar.currentYear}`,
          );
          f7.navbar.size(f7.navbar.getElByPage(page.el));
          calendar.$el.addClass('no-safe-area-right');
          renderEvents(calendar);
        },
        monthYearChangeStart(calendar) {
          $('.navbar-calendar-title').text(
            `${monthNames[calendar.currentMonth]}, ${calendar.currentYear}`,
          );
          f7.navbar.size(f7.navbar.getElByPage(page.el));
        },
        change(calendar) {
          renderEvents(calendar);
        },
      },
    });
  };
  const onPageBeforeRemove = () => {
    calendarRef.current.destroy();
  };

  return (
    <Page onPageInit={onPageInit} onPageBeforeRemove={onPageBeforeRemove}>
      <Navbar backLink="Back">
        <NavTitle className="navbar-calendar-title"></NavTitle>
      </Navbar>
      <Block id="calendar" strong className="no-padding no-margin" />
      <List id="calendar-events" noHairlines className="no-margin no-safe-area-left">
        {eventItems.map((item, index) => (
          <ListItem key={index} title={item.title} after={item.time}>
            <div
              className="event-color"
              style={{ backgroundColor: item.color }}
              slot="root-start"
            ></div>
          </ListItem>
        ))}
        {eventItems.length === 0 && (
          <ListItem>
            <span className="text-color-gray" slot="title">
              No events for this day
            </span>
          </ListItem>
        )}
      </List>
    </Page>
  );
};
