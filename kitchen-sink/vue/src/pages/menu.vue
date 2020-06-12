<template>
  <f7-page @page:afterin="onPageAfterIn">
    <f7-navbar title="Menu" back-link="Back"></f7-navbar>
    <f7-block strong>
      <p>Menu component is designed to be used as overlay control. It can be very helpful when you need controls on top of the map, images, some text/code editor, etc.</p>
    </f7-block>
    <f7-block-title>Links</f7-block-title>
    <f7-block strong class="no-padding-horizontal">
      <f7-menu>
        <f7-menu-item href="#" text="Item 1"></f7-menu-item>
        <f7-menu-item href="#" text="Item 2"></f7-menu-item>
        <f7-menu-item href="#" icon-f7="pencil"></f7-menu-item>
        <f7-menu-item href="#" icon-f7="square_arrow_up"></f7-menu-item>
      </f7-menu>
    </f7-block>

    <f7-block-title>Dropdowns</f7-block-title>
    <f7-block strong class="no-padding-horizontal" style="z-index: 2000">
      <p class="padding-horizontal">Dropdown can be position on left, center or right of the menu item. It also can be scrollable.</p>
      <f7-menu>
        <f7-menu-item text="Left" dropdown>
          <f7-menu-dropdown left>
            <f7-menu-dropdown-item href="#" text="Menu Item 1"></f7-menu-dropdown-item>
            <f7-menu-dropdown-item href="#" text="Menu Item 2"></f7-menu-dropdown-item>
            <f7-menu-dropdown-item href="#" text="Menu Item 3"></f7-menu-dropdown-item>
            <f7-menu-dropdown-item href="#" text="Menu Item 4"></f7-menu-dropdown-item>
            <f7-menu-dropdown-item divider></f7-menu-dropdown-item>
            <f7-menu-dropdown-item href="#" text="Menu Item 5"></f7-menu-dropdown-item>
            <f7-menu-dropdown-item href="#" text="Menu Item 6"></f7-menu-dropdown-item>
          </f7-menu-dropdown>
        </f7-menu-item>

        <f7-menu-item text="Center" dropdown>
          <f7-menu-dropdown center content-height="200px">
            <f7-menu-dropdown-item href="#" text="Menu Item 1"></f7-menu-dropdown-item>
            <f7-menu-dropdown-item href="#" text="Menu Item 2"></f7-menu-dropdown-item>
            <f7-menu-dropdown-item href="#" text="Menu Item 3"></f7-menu-dropdown-item>
            <f7-menu-dropdown-item href="#" text="Menu Item 4"></f7-menu-dropdown-item>
            <f7-menu-dropdown-item divider></f7-menu-dropdown-item>
            <f7-menu-dropdown-item href="#" text="Menu Item 5"></f7-menu-dropdown-item>
            <f7-menu-dropdown-item href="#" text="Menu Item 6"></f7-menu-dropdown-item>
            <f7-menu-dropdown-item href="#" text="Menu Item 7"></f7-menu-dropdown-item>
            <f7-menu-dropdown-item divider></f7-menu-dropdown-item>
            <f7-menu-dropdown-item href="#" text="Menu Item 8"></f7-menu-dropdown-item>
            <f7-menu-dropdown-item href="#" text="Menu Item 9"></f7-menu-dropdown-item>
            <f7-menu-dropdown-item href="#" text="Menu Item 10"></f7-menu-dropdown-item>
          </f7-menu-dropdown>
        </f7-menu-item>

        <f7-menu-item text="Right" dropdown>
          <f7-menu-dropdown right>
            <f7-menu-dropdown-item href="#" text="Menu Item 1"></f7-menu-dropdown-item>
            <f7-menu-dropdown-item href="#" text="Menu Item 2"></f7-menu-dropdown-item>
            <f7-menu-dropdown-item href="#" text="Menu Item 3"></f7-menu-dropdown-item>
            <f7-menu-dropdown-item href="#" text="Menu Item 4"></f7-menu-dropdown-item>
            <f7-menu-dropdown-item divider></f7-menu-dropdown-item>
            <f7-menu-dropdown-item href="#" text="Menu Item 5"></f7-menu-dropdown-item>
            <f7-menu-dropdown-item href="#" text="Menu Item 6"></f7-menu-dropdown-item>
          </f7-menu-dropdown>
        </f7-menu-item>

        <f7-menu-item style="margin-left: auto" icon-f7="square_arrow_up" dropdown>
          <f7-menu-dropdown right>
            <f7-menu-dropdown-item href="#">
              <span>Share on Facebook</span>
              <f7-icon class="margin-left" f7="logo_facebook"></f7-icon>
            </f7-menu-dropdown-item>
            <f7-menu-dropdown-item href="#">
              <span>Share on Twitter</span>
              <f7-icon class="margin-left" f7="logo_twitter"></f7-icon>
            </f7-menu-dropdown-item>
          </f7-menu-dropdown>
        </f7-menu-item>

        <f7-menu-item href="#" icon-f7="pencil"></f7-menu-item>
      </f7-menu>
    </f7-block>

    <f7-block-title>On Top Of Map</f7-block-title>
    <f7-card>
      <f7-card-content :padding="false">
        <div ref="map" style="height: 240px"></div>
        <f7-menu style="position: absolute; left: 0px; top: 6px">
          <f7-menu-item href="#" icon-f7="zoom_in"></f7-menu-item>
          <f7-menu-item href="#" icon-f7="zoom_out"></f7-menu-item>
          <f7-menu-item icon-f7="layers_fill" dropdown>
            <f7-menu-dropdown left>
              <f7-menu-dropdown-item href="#" text="Terrain"></f7-menu-dropdown-item>
              <f7-menu-dropdown-item href="#" text="Satellite"></f7-menu-dropdown-item>
            </f7-menu-dropdown>
          </f7-menu-item>
        </f7-menu>
      </f7-card-content>
    </f7-card>
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7BlockTitle, f7Block, f7Menu, f7MenuItem, f7MenuDropdown, f7MenuDropdownItem, f7Card, f7CardContent, f7Icon } from 'framework7-vue';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7BlockTitle,
      f7Block,
      f7Menu,
      f7MenuItem,
      f7MenuDropdown,
      f7MenuDropdownItem,
      f7Card,
      f7CardContent,
      f7Icon,
    },
    data() {
      return {
        mapStyleLoaded: false,
        mapScriptLoaded: false,
        mapInitialized: false,
      }
    },
    methods: {
      onPageAfterIn() {
        var self = this;
        if (self.mapInitialized) return;
        if (!window.L) {
          self.loadMapAssets();
          return;
        }
        self.initMap();
      },
      loadMapAssets: function () {
        var self = this;
        var style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = 'https://unpkg.com/leaflet@1.4.0/dist/leaflet.css';
        style.integrity='sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA==';
        style.setAttribute('crossorigin', '')
        style.onload = function () {
          self.mapStyleLoaded = true;
          if (self.mapScriptLoaded) self.initMap();
        }
        document.head.appendChild(style);

        var script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.4.0/dist/leaflet.js';
        script.integrity='sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg==';
        script.setAttribute('crossorigin', '')
        script.onload = function () {
          self.mapScriptLoaded = true;
          if (self.mapStyleLoaded) self.initMap();
        }
        document.head.appendChild(script);
      },
      initMap: function () {
        var self = this;
        var mymap = L.map(self.$refs.map, { zoomControl: false }).setView([51.505, -0.09], 10);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoibm9saW1pdHM0d2ViIiwiYSI6ImNqcXA4NTdmczBocm8zeG13Zm1zNTdyeDAifQ.HoJgmqQ_uH4zLyNJmiY98A', {
          maxZoom: 18,
          attribution: `Map data &copy; <a class="external" target="_blank" href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,
            <a class="external" target="_blank" href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,
            Imagery © <a class="external" target="_blank" href="https://www.mapbox.com/">Mapbox</a>`,
          id: 'mapbox.streets'
        }).addTo(mymap);
        self.mapInitialized = true;
      },
    },
  };
</script>
