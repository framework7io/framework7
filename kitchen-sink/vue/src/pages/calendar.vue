<template>
  <f7-page @page:beforeremove="onPageBeforeRemove" @page:init="onPageInit">
    <f7-navbar title="Calendar" back-link="Back"></f7-navbar>

    <f7-block>
      <p>Calendar is a touch optimized component that provides an easy way to handle dates.</p>
      <p>Calendar could be used as inline component or as overlay. Overlay Calendar will be automatically converted to Popover on tablets (iPad).</p>
    </f7-block>

    <f7-block-title>Default setup</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-input type="datepicker" placeholder="Your birth date" readonly />
    </f7-list>

    <f7-block-title>Custom date format</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-input type="datepicker" placeholder="Select date" readonly :calendar-params="{dateFormat: { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' }}" />
    </f7-list>

    <f7-block-title>Date + Time</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-input type="datepicker" placeholder="Select date and time" readonly :calendar-params="{dateFormat: { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }}"/>
    </f7-list>

    <f7-block-title>Multiple Values</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-input type="datepicker" placeholder="Select multiple dates" readonly :calendar-params="{ dateFormat: { month: 'short', day: 'numeric' }, multiple: true }" />
    </f7-list>

    <f7-block-title>Range Picker</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-input type="datepicker" placeholder="Select date range" readonly :calendar-params="{ rangePicker: true }" />
    </f7-list>

    <f7-block-title>Open in Modal</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-input type="datepicker" placeholder="Select date" readonly :calendar-params="{openIn: 'customModal', header: true, footer: true}" />
    </f7-list>

    <f7-block-title>Calendar Page</f7-block-title>
    <f7-list>
      <f7-list-item
        title="Open Calendar Page"
        link="/calendar-page/"
      />
    </f7-list>

    <f7-block-title>Inline with custom toolbar</f7-block-title>
    <f7-block class="no-padding">
      <div id="demo-calendar-inline-container"></div>
    </f7-block>

  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7Block, f7BlockTitle, f7List, f7ListInput, f7ListItem } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7Block,
      f7BlockTitle,
      f7List,
      f7ListInput,
      f7ListItem,
    },
    methods: {
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
      },
      onPageBeforeRemove() {
        const self = this;
        self.calendarInline.destroy();
      },
    },
  };
</script>
