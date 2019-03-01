<template>
  <f7-page :page-content="false" @page:beforeremove="onPageBeforeRemove" @page:init="onPageInit">
    <f7-navbar back-link="Back" no-shadow>
      <f7-nav-title class="navbar-calendar-title"></f7-nav-title>
    </f7-navbar>
    <div class="page-content">
      <div id="calendar" class="block block-strong no-padding no-margin no-hairline-top"></div>
      <f7-list id="calendar-events" class="no-margin no-hairlines no-safe-area-left">
        <f7-list-item v-for="(item, index) in eventItems"
          :key="index"
          :title="item.title"
          :after="item.time"
        >
          <div class="event-color" :style="{'background-color': item.color}" slot="root-start"></div>
        </f7-list-item>
        <f7-list-item v-if="eventItems.length === 0">
          <span class="text-color-gray" slot="title">No events for this day</span>
        </f7-list-item>
      </f7-list>
    </div>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7NavTitle, f7List, f7ListItem } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7NavTitle,
      f7List,
      f7ListItem,
    },
    data() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      return {
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
      };
    },
    methods: {
      renderEvents(calendar) {
        const self = this;
        const currentDate = calendar.value[0];
        const currentEvents = self.events
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
        self.eventItems = eventItems;
      },
      onPageInit(e, page) {
        const self = this;
        const app = self.$f7;
        const $ = self.$$;
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        self.calendar = app.calendar.create({
          containerEl: '#calendar',
          toolbar: false,
          value: [self.today],
          events: self.events,
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
      },
      onPageBeforeRemove() {
        const self = this;
        self.calendar.destroy();
      },
    },
  };
</script>
